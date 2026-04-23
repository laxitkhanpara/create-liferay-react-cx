#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commandName = 'create-liferay-react-cx';
const PKG_VERSION = '1.0.5';

// ─── Helpers ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const hasFlag = (flags) => flags.some((f) => args.includes(f));

const getArgValue = (names) => {
  const i = args.findIndex((arg) => names.includes(arg));
  return i >= 0 && args[i + 1] ? args[i + 1] : undefined;
};

const positionalArgs = args.filter((a) => !a.startsWith('-'));

// ─── Banner ──────────────────────────────────────────────────────────────────

function printBanner() {
  console.log('');
  console.log(chalk.bold.hex('#0B5FFF')('   ██╗     ██╗███████╗███████╗██████╗  █████╗ ██╗   ██╗'));
  console.log(chalk.bold.hex('#0B5FFF')('   ██║     ██║██╔════╝██╔════╝██╔══██╗██╔══██╗╚██╗ ██╔╝'));
  console.log(chalk.bold.hex('#0B5FFF')('   ██║     ██║█████╗  █████╗  ██████╔╝███████║ ╚████╔╝ '));
  console.log(chalk.bold.hex('#0B5FFF')('   ██║     ██║██╔══╝  ██╔══╝  ██╔══██╗██╔══██║  ╚██╔╝  '));
  console.log(chalk.bold.hex('#0B5FFF')('   ███████╗██║██║     ███████╗██║  ██║██║  ██║   ██║   '));
  console.log(chalk.bold.hex('#0B5FFF')('   ╚══════╝╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   '));
  console.log('');
  console.log(chalk.bold('   Liferay React Client Extension Scaffolding'));
  console.log(chalk.dim(`   Version: ${PKG_VERSION}`));
  console.log(chalk.dim('   ─────────────────────────────────────────────'));
  console.log('');
}

// ─── Main ────────────────────────────────────────────────────────────────────

(async () => {
  printBanner();

  const appNameArg = getArgValue(['--name', '-n']) || positionalArgs[0];
  const reactVersionArg = getArgValue(['--react-version', '-r']) || positionalArgs[1];

  let answers;

  if (appNameArg) {
    answers = {
      appName: appNameArg,
      language: 'javascript',
      reactVersion: reactVersionArg || '16.12.0',
      useShadow: false,
    };
  } else {
    answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'appName',
        message: chalk.cyan('App name') + chalk.dim(' (kebab-case):'),
        validate: (input) =>
          /^[a-z][a-z0-9-]*$/.test(input.trim()) ? true : chalk.red('Use kebab-case — e.g. my-widget'),
        filter: (v) => v.trim(),
      },
      {
        type: 'list',
        name: 'language',
        message: chalk.cyan('Choose language:'),
        choices: [
          { name: 'JavaScript', value: 'javascript' },
          { name: 'TypeScript', value: 'typescript' },
        ],
        default: 'javascript',
      },
      {
        type: 'list',
        name: 'reactVersion',
        message: chalk.cyan('React version (Liferay-provided):'),
        choices: [
          { name: '18.3.1   (Liferay 7.4 U45+ / DXP 2024.Q1+)', value: '18.3.1' },
          { name: '16.12.0  (Liferay 7.4 / DXP classic)', value: '16.12.0' },
        ],
        default: '18.3.1',
      },
      {
        type: 'confirm',
        name: 'useShadow',
        message: chalk.cyan('Use Shadow DOM?') + chalk.dim(' (isolation + slots):'),
        default: false,
      },
    ]);
  }

  const { appName, language, reactVersion, useShadow } = answers;
  const projectPath = path.resolve(process.cwd(), appName);
  const templatePath = path.join(
    __dirname,
    '..',
    'templates',
    language === 'typescript' ? 'custom-element-ts' : 'custom-element'
  );

  if (fs.existsSync(projectPath)) {
    console.error(chalk.red(`\n  ✖  Directory "${appName}" already exists.\n`));
    process.exit(1);
  }

  // 1. Copy Templates
  process.stdout.write(chalk.blue('\n  📁  Scaffolding project…'));
  await fs.copy(templatePath, projectPath);
  console.log(chalk.green('  ✔'));

  // 2. Process Files & Placeholders
  const replaceInFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(/__APP_NAME__/g, appName);

    if (
      filePath.endsWith('main.tsx') ||
      filePath.endsWith('main.jsx') ||
      filePath.endsWith('README.md')
    ) {
      const isReact18 = reactVersion.startsWith('18');

      const vRemove = isReact18 ? '@react-16' : '@react-18';
      const vKeep = isReact18 ? '@react-18' : '@react-16';

      const sRemove = useShadow ? '@shadow-n' : '@shadow-y';
      const sKeep = useShadow ? '@shadow-y' : '@shadow-n';

      content = content
        .split('\n')
        .filter((line) => !line.includes(vRemove) && !line.includes(sRemove))
        .map((line) => {
          if (line.includes(vKeep) || line.includes(sKeep)) {
            return line.replace(/^\s*\/\/\s*/, '')
              .replace(vKeep, '')
              .replace(sKeep, '')
              .trimEnd();
          }
          return line;
        })
        .join('\n');
    }

    fs.writeFileSync(filePath, content);
  };

  const walk = (dir) => {
    for (const file of fs.readdirSync(dir)) {
      const full = path.join(dir, file);
      fs.statSync(full).isDirectory() ? walk(full) : replaceInFile(full);
    }
  };

  walk(projectPath);

  // 3. Generate package.json
  process.stdout.write(chalk.blue('  📦  Writing package.json…'));

  const isReact18 = reactVersion.startsWith('18');
  const typeVersion = isReact18 ? '^18.3.1' : '^16.12.0';

  const projectPackageJson = {
    name: appName,
    version: '1.0.0',
    private: true,
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      lint: 'eslint .',
      preview: 'vite preview',
    },
    dependencies: {
      react: reactVersion,
      'react-dom': reactVersion,
    },
    devDependencies: {
      '@vitejs/plugin-react': '^4.3.3',
      'vite-plugin-css-injected-by-js': '^3.4.0',
      vite: '^4.4.9',
      eslint: '^9.13.0',
      '@eslint/js': '^9.13.0',
      'globals': '^15.11.0',
      'eslint-plugin-react': '^7.37.2',
      'eslint-plugin-react-hooks': '^5.0.0',
      'eslint-plugin-react-refresh': '^0.4.14',
      ...(language === 'typescript' && {
        typescript: '^5.3.3',
        'typescript-eslint': '^8.13.0',
        '@types/react': typeVersion,
        '@types/react-dom': typeVersion,
      }),
    },
  };

  fs.writeJsonSync(path.join(projectPath, 'package.json'), projectPackageJson, { spaces: 2 });
  console.log(chalk.green('  ✔'));

  // ── Done ──────────────────────────────────────────────────────────────────
  console.log(chalk.bold.green('\n  ✅  Project created successfully!\n'));
  console.log(chalk.bold('  Next steps:\n'));
  console.log(chalk.cyan(`    cd ${appName}`));
  console.log(chalk.cyan('    ../../gradlew deploy') + chalk.dim('   # deploy to Liferay\n'));
})();
