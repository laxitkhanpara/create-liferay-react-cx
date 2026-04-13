#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execa } from 'execa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commandName = path.basename(process.argv[1]);

const PKG_VERSION = '1.0.1';

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
  console.log(
    chalk.bold.hex('#4B0082')(
      '  ██      ███████ ███████ ███████ █████    ███     ██   ██ '
    )
  );
  console.log(
    chalk.bold.hex('#6A0DAD')(
      '  ██        ██   ██      ██      ██  ██  ██ ██    ██   ██ '
    )
  );
  console.log(
    chalk.bold.hex('#8B00FF')(
      '  ██        ██   █████   █████   █████   ██ ██ ██   ███    '
    )
  );
  console.log(
    chalk.bold.hex('#9B30FF')(
      '  ██        ██   ██      ██      ██  ██  ██  ████    ██    '
    )
  );
  console.log(
    chalk.bold.hex('#B44FFF')(
      '  ███████ ███████ ██      ███████ ██   ██ ██   ███    ██    '
    )
  );
  console.log(
    chalk.bold.hex('#CC6FFF')(
      '                                                                '
    )
  );
  console.log('');
  console.log(
    chalk.hex('#888')(`  liferay-react-ce — Scaffold a Liferay React Client Extension  `) +
      chalk.dim(`v${PKG_VERSION}`)
  );
  console.log(
    chalk.dim('  ─────────────────────────────────────────────────────')
  );
  console.log('');
}

// ─── Version / Help ──────────────────────────────────────────────────────────

if (hasFlag(['--version', '-v'])) {
  console.log(`liferay-react-ce v${PKG_VERSION}`);
  process.exit(0);
}

if (hasFlag(['--help', '-h'])) {
  console.log(`
${chalk.bold('liferay-react-ce')} — Scaffold a Liferay React Client Extension

${chalk.bold('USAGE')}
  liferay-react-ce [app-name] [react-version]
  liferay-react-ce --name <app-name> [--react-version <version>]
  -n, --name            App name in kebab-case  (e.g. my-widget)
  -r, --react-version   React version to use    (default: 16.12.0)
  -v, --version         Print version
  -h, --help            Show this help

${chalk.bold('EXAMPLES')}
  npm create liferay-react-ce my-widget
  npm create liferay-react-ce -- --name my-widget --react-version 18.2.0
  npm create liferay-react-ce                        # interactive mode

${chalk.bold('AFTER SCAFFOLDING')}
  cd <app-name>
  ../../gradlew deploy    # deploy to Liferay

${chalk.dim('https://github.com/laxitkhanpara/liferay-react-ce')}
`);
  process.exit(0);
}

// ─── Main ────────────────────────────────────────────────────────────────────

(async () => {
  printBanner();

  // Resolve inputs
  const appNameArg = getArgValue(['--name', '-n']) || positionalArgs[0];
  const reactVersionArg =
    getArgValue(['--react-version', '-r']) || positionalArgs[1];

  // Interactive prompts only for missing fields
  let answers;

  if (appNameArg) {
    answers = {
      appName: appNameArg,
      reactVersion: reactVersionArg || '16.12.0',
      installDeps: true,
    };
  } else {
    answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'appName',
        message: chalk.cyan('App name') + chalk.dim(' (kebab-case):'),
        validate: (input) =>
          /^[a-z][a-z0-9-]*$/.test(input.trim())
            ? true
            : chalk.red('Use lowercase kebab-case — e.g. my-widget'),
        filter: (v) => v.trim(),
      },
      {
        type: 'list',
        name: 'reactVersion',
        message: chalk.cyan('React version:'),
        choices: [
          { name: '16.12.0  (Liferay 7.4 / DXP classic)', value: '16.12.0' },
          { name: '18.2.0   (Liferay 7.4 U45+ / DXP 2024.Q1+)', value: '18.2.0' },
          { name: 'Custom   (enter manually)', value: '__custom__' },
        ],
        default: '16.12.0',
      },
      {
        type: 'input',
        name: 'reactVersionCustom',
        message: chalk.cyan('Enter React version:'),
        when: (prev) => prev.reactVersion === '__custom__',
        validate: (v) =>
          /^\d+\.\d+\.\d+/.test(v.trim()) ? true : 'Enter a valid semver e.g. 17.0.2',
        filter: (v) => v.trim(),
      },
      {
        type: 'confirm',
        name: 'installDeps',
        message: chalk.cyan('Install npm dependencies now?'),
        default: true,
      },
    ]);

    if (answers.reactVersion === '__custom__') {
      answers.reactVersion = answers.reactVersionCustom;
    }
  }

  const { appName, reactVersion, installDeps } = answers;
  const projectPath = path.resolve(process.cwd(), appName);
  const templatePath = path.join(__dirname, '..', 'templates', 'custom-element');

  // Guard: existing directory
  if (fs.existsSync(projectPath)) {
    console.error(
      chalk.red(`\n  ✖  Directory "${appName}" already exists. Choose a different name.\n`)
    );
    process.exit(1);
  }

  // ── Step 1: Copy template ──────────────────────────────────────────────────
  process.stdout.write(chalk.blue('\n  📁  Scaffolding project…'));
  await fs.copy(templatePath, projectPath);
  console.log(chalk.green('  ✔'));

  // ── Step 2: Replace __APP_NAME__ placeholders ─────────────────────────────
  const replaceInFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(/__APP_NAME__/g, appName);
    fs.writeFileSync(filePath, content);
  };

  const walk = (dir) => {
    for (const file of fs.readdirSync(dir)) {
      const full = path.join(dir, file);
      fs.statSync(full).isDirectory() ? walk(full) : replaceInFile(full);
    }
  };

  walk(projectPath);

  // ── Step 3: Write package.json ────────────────────────────────────────────
  process.stdout.write(chalk.blue('  📦  Writing package.json…'));

  const projectPackageJson = {
    name: appName,
    version: '1.0.0',
    private: true,
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview',
    },
    dependencies: {
      react: reactVersion,
      'react-dom': reactVersion,
    },
    devDependencies: {
      '@vitejs/plugin-react': '^4.3.3',
      vite: '^4.4.9',
    },
  };

  fs.writeJsonSync(path.join(projectPath, 'package.json'), projectPackageJson, {
    spaces: 2,
  });
  console.log(chalk.green('  ✔'));

  // ── Step 4: Install dependencies ──────────────────────────────────────────
  if (installDeps !== false) {
    console.log(chalk.blue('\n  📥  Installing dependencies…\n'));
    try {
      await execa('npm', ['install'], { cwd: projectPath, stdio: 'inherit' });
    } catch {
      console.warn(
        chalk.yellow(
          '\n  ⚠  npm install failed. Run it manually inside the project folder.\n'
        )
      );
    }
  }

  // ── Done ──────────────────────────────────────────────────────────────────
  console.log('');
  console.log(
    chalk.bold.green('  ✅  Project created successfully!\n')
  );
  console.log(chalk.bold('  Next steps:\n'));
  console.log(chalk.cyan(`    cd ${appName}`));
  if (installDeps === false) {
    console.log(chalk.cyan('    npm install'));
  }
  console.log(
    chalk.cyan('    ../../gradlew deploy') + chalk.dim('   # deploy to Liferay')
  );
  console.log('');
  console.log(
    chalk.dim(
      '  Docs: https://learn.liferay.com/dxp/latest/en/building-applications/client-extensions.html'
    )
  );
  console.log('');
})();
