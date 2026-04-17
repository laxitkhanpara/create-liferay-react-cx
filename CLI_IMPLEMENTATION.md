# CLI Implementation Guide - TypeScript Support

## Overview
This document explains the implementation changes to `bin/index.js` to add TypeScript support to the create-liferay-react-cx CLI.

## Architecture Changes

### 1. Language Selection Flow

The CLI now follows this flow:

```
┌─ User Input ─────────────────────────────────┐
│                                              │
│  Command line args?                          │
│  ├─ Yes: Use defaults (JS)                  │
│  └─ No: Ask interactive questions            │
│                                              │
│  Interactive Questions (if no args):         │
│  ┌─ What is your app name?                   │
│  ├─ Which language? ← NEW                   │
│  │  ├─ JavaScript                            │
│  │  └─ TypeScript                            │
│  ├─ React version?                           │
│  │  ├─ 16.12.0 (classic)                    │
│  │  ├─ 18.2.0 (modern)                      │
│  │  └─ Custom                                │
│  └─ Install npm dependencies now?            │
│                                              │
└────────────────────────────────────────────┘
         │
         ▼
┌─ Template Selection ──────────────────────────┐
│                                              │
│  if language === 'typescript'                │
│    → Load: templates/custom-element-ts/     │
│  else                                        │
│    → Load: templates/custom-element/        │
│                                              │
└────────────────────────────────────────────┘
         │
         ▼
┌─ Project Scaffolding ─────────────────────────┐
│                                              │
│  1. Copy template to project directory       │
│  2. Replace __APP_NAME__ placeholders        │
│  3. Generate package.json with:              │
│     - React & React-DOM                      │
│     - Vite                                   │
│     - TypeScript extras (if TS selected)    │
│  4. Install npm dependencies (optional)      │
│                                              │
└────────────────────────────────────────────┘
```

## Code Changes Explained

### 1. Language Prompt Addition

**Location:** Lines 140-150 (in interactive mode)

```javascript
{
  type: 'list',
  name: 'language',
  message: chalk.cyan('Choose language:'),
  choices: [
    { name: 'JavaScript', value: 'javascript' },
    { name: 'TypeScript', value: 'typescript' },
  ],
  default: 'javascript',
}
```

**Purpose:** Asks the user to select their preferred language
**Default:** JavaScript (maintains backward compatibility)
**Return Value:** Stored in `answers.language`

### 2. Non-Interactive Mode Handling

**Location:** Lines 128-135 (command-line args path)

```javascript
if (appNameArg) {
  answers = {
    appName: appNameArg,
    language: 'javascript',  // ← Default to JS for CLI args
    reactVersion: reactVersionArg || '16.12.0',
    installDeps: true,
  };
}
```

**Purpose:** When using CLI arguments (fast track), defaults to JavaScript
**Reason:** Maintains backward compatibility with existing scripts

### 3. Template Path Selection

**Location:** Lines 205-211

```javascript
const { appName, language, reactVersion, installDeps } = answers;
const projectPath = path.resolve(process.cwd(), appName);
const templatePath = path.join(
  __dirname,
  '..',
  'templates',
  language === 'typescript' ? 'custom-element-ts' : 'custom-element'
);
```

**Purpose:** Dynamically selects which template to copy based on language choice
**Logic:**
- If `language === 'typescript'` → Use `custom-element-ts/`
- Otherwise → Use `custom-element/`

### 4. Dynamic DevDependencies

**Location:** Lines 254-269

```javascript
devDependencies: {
  '@vitejs/plugin-react': '^4.3.3',
  vite: '^4.4.9',
  ...(language === 'typescript' && {
    typescript: '^5.3.3',
    '@types/react': '^18.2.43',
    '@types/react-dom': '^18.2.17',
  }),
}
```

**Purpose:** Conditionally includes TypeScript dependencies
**Logic:**
- **Always included:** `@vitejs/plugin-react`, `vite`
- **Only if TypeScript:**
  - `typescript` - The TypeScript compiler
  - `@types/react` - React type definitions
  - `@types/react-dom` - React DOM type definitions

**Spread Operator:** `...(boolean && object)` pattern
- If boolean is true: spreads the object properties
- If boolean is false: spreads an empty object (no effect)

### 5. Updated Help Text

**Location:** Lines 91-130

Added FEATURES section:
```javascript
${chalk.bold('FEATURES')}
  • JavaScript or TypeScript support
  • Vite-powered development
  • Shadow DOM isolated components
  • Ready for Liferay deployment
```

**Purpose:** Informs users about new TypeScript capability

## Variable Flow

### In Interactive Mode (Full Prompts)

```javascript
// After all prompts are answered
answers = {
  appName: 'my-widget',
  language: 'typescript',        // ← From prompt
  reactVersion: '18.2.0',
  installDeps: true
}

// Destructured
const { appName, language, reactVersion, installDeps } = answers;

// Used for:
// 1. Template selection
const templatePath = path.join(..., language === 'typescript' ? '...' : '...');

// 2. Package.json generation
const projectPackageJson = {
  // ... other fields ...
  devDependencies: {
    // ... base deps ...
    ...(language === 'typescript' && { ... }) // ← Used here
  }
}
```

### In CLI Args Mode

```javascript
// Command: npx create-liferay-react-cx my-widget
answers = {
  appName: 'my-widget',      // From positional arg
  language: 'javascript',     // ← Default (no prompt)
  reactVersion: '16.12.0',    // Default
  installDeps: true           // Default
}
```

## Backward Compatibility

✅ **Fully backward compatible:**
- Existing CLI commands still work (default to JavaScript)
- Non-interactive mode unchanged in behavior
- JavaScript template is the default
- Help text enhanced but not breaking

## File Dependencies

```
bin/index.js
├── Reads: templates/custom-element/       (JS template)
├── Reads: templates/custom-element-ts/   (TS template - new)
├── Writes: <project>/package.json
├── Writes: <project>/src/**/*
├── Writes: <project>/client-extension.yaml
└── Depends on: inquirer, chalk, fs-extra
```

## Error Handling

The CLI handles:
- Invalid app names (alphanumeric + hyphens only)
- Existing directory conflicts
- NPM install failures (graceful fallback)
- Missing React version semver (validation)

No new error handling needed for TypeScript selection (it's a list, always valid).

## Testing Scenarios

### Scenario 1: Interactive JavaScript
```bash
$ npx create-liferay-react-cx
App name: my-js-app
Language: JavaScript
React: 18.2.0
Install deps: Yes
```
**Expected:** JavaScript template scaffolded, no TS deps in package.json

### Scenario 2: Interactive TypeScript
```bash
$ npx create-liferay-react-cx
App name: my-ts-app
Language: TypeScript
React: 18.2.0
Install deps: Yes
```
**Expected:** TypeScript template scaffolded, TS deps in package.json

### Scenario 3: CLI Args (Fast Track)
```bash
$ npx create-liferay-react-cx my-app 18.2.0
```
**Expected:** JavaScript template (default), no prompts

### Scenario 4: Help
```bash
$ npx create-liferay-react-cx --help
```
**Expected:** Help text includes TypeScript mention

## Performance Impact

- **Minimal:** Addition is just a string comparison
- **No breaking changes:** Already-minimal CLI overhead maintained
- **Lazy loading:** Templates only loaded when needed

## Future Enhancements

Possible follow-up improvements:
1. Add `--language` CLI flag option
2. Support additional languages (Vue, Svelte)
3. Add template selection wizard
4. Store user preferences in `.createlayoutrc`
5. Integration testing suite

## Code Quality

- ✅ Uses existing patterns (inquirer prompts, chalk coloring)
- ✅ Conditional logic is clear and maintainable
- ✅ No external dependencies needed (uses spread operator)
- ✅ Consistent with existing code style
