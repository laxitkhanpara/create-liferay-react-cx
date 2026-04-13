# liferay-react-ce

> ⚡ Zero-config CLI scaffold for **Liferay React Client Extensions** (custom element type).  
> Powered by [Vite](https://vitejs.dev/) · Compatible with **Liferay 7.4 / DXP 2024.Q1+**

[![npm version](https://img.shields.io/npm/v/liferay-react-ce?color=8B5CF6&label=npm)](https://www.npmjs.com/package/liferay-react-ce)
[![license](https://img.shields.io/npm/l/liferay-react-ce?color=8B5CF6)](./LICENSE)
[![node](https://img.shields.io/node/v/liferay-react-ce?color=8B5CF6)](https://nodejs.org)

---

## What is a Liferay Client Extension?

A **Client Extension** (CE) is the modern way to extend Liferay DXP / CE without touching the core portal. A *Custom Element* CE lets you embed any React (or vanilla JS) component directly on a Liferay page as a standard Web Component — no OSGi, no portlet Java code required.

---

## Quick Start

```bash
npx liferay-react-ce my-widget
cd my-widget
npm run dev
```

Or use the interactive wizard (no arguments):

```bash
npx liferay-react-ce
```

---

## Usage

```
liferay-react-ce [app-name] [react-version]
liferay-react-ce --name <app-name> [--react-version <version>]
```

### Options

| Flag | Short | Description |
|------|-------|-------------|
| `--name` | `-n` | App name in **kebab-case** (e.g. `my-widget`) |
| `--react-version` | `-r` | React version (default: `16.12.0`) |
| `--help` | `-h` | Show help |
| `--version` | `-v` | Print version |

### Examples

```bash
# Positional — fastest
npx liferay-react-ce my-widget

# Named flags
npx liferay-react-ce --name my-widget --react-version 18.2.0

# Interactive wizard
npx liferay-react-ce
```

---

## Generated Project Structure

```
my-widget/
├── client-extension.yaml     ← Liferay CE descriptor
├── index.html                ← Vite dev-server entry
├── package.json
├── vite.config.js
├── eslint.config.js
└── src/
    ├── main.jsx              ← Web Component bootstrap
    ├── App.jsx               ← React component
    ├── index.css
    └── assets/
        └── style.css         ← Shadow-DOM scoped styles
```

### `client-extension.yaml` — what it does

```yaml
my-widget:
  type: customElement          # renders as <my-widget> HTML element
  htmlElementName: my-widget
  urls:
    - assets/*.js              # built JS bundle
  cssURLs:
    - assets/*.css             # built CSS bundle
  useESM: true
  instanceable: false
  portletCategoryName: category.client-extensions
```

---

## Development Workflow

```bash
# Deploy to your Liferay instance (from the workspace root)
../../gradlew deploy
```

> **Tip:** Your Liferay workspace must live inside a [Liferay Workspace Gradle project](https://learn.liferay.com/dxp/latest/en/building-applications/tooling/liferay-workspace/what-is-liferay-workspace.html).  
> Place the generated project at `[workspace]/client-extensions/my-widget/`.

---

## React Version Compatibility

| React version | Liferay version |
|:---:|:---|
| `16.12.0` | 7.4 GA / DXP classic (bundled React) |
| `18.2.0` | 7.4 U45+ / DXP 2024.Q1+ (isolated shadow DOM) |

The CLI lets you choose during scaffolding or pass `--react-version`.

---

## Requirements

- **Node.js** ≥ 18
- **npm** ≥ 9
- A [Liferay Workspace](https://learn.liferay.com/dxp/latest/en/building-applications/tooling/liferay-workspace.html) (for `gradlew deploy`)

---

## Contributing

Pull requests are welcome!  
Please open an issue first to discuss what you'd like to change.

```bash
git clone https://github.com/laxitkhanpara/liferay-react-ce.git
cd liferay-react-ce
npm install
node index.js my-test-app
```

---

## License

[MIT](./LICENSE) © [Laxit Khanpara](https://github.com/laxitkhanpara)

---

## Links

- 📦 [npm package](https://www.npmjs.com/package/liferay-react-ce)
- 🐛 [Report a bug](https://github.com/laxitkhanpara/liferay-react-ce/issues)
- 📖 [Liferay Client Extensions docs](https://learn.liferay.com/dxp/latest/en/building-applications/client-extensions.html)
