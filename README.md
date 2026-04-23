# create-liferay-react-cx

> ⚡ Zero-config CLI scaffold for **Liferay React Client Extensions** (custom element type).  
> Powered by [Vite](https://vitejs.dev/) · Compatible with **Liferay 7.4 / DXP 2024.Q1+**

[![npm version](https://img.shields.io/npm/v/create-liferay-react-cx?color=8B5CF6&label=npm)](https://www.npmjs.com/package/create-liferay-react-cx)
[![license](https://img.shields.io/npm/l/create-liferay-react-cx?color=8B5CF6)](./LICENSE)
[![node](https://img.shields.io/node/v/create-liferay-react-cx?color=8B5CF6)](https://nodejs.org)

---

## Table of Contents

- [What is a Liferay Client Extension?](#what-is-a-liferay-client-extension)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [All Ways to Use This CLI](#all-ways-to-use-this-cli)
  - [Method 1 — npm create (Recommended)](#method-1--npm-create-recommended)
  - [Method 2 — npx (No Install)](#method-2--npx-no-install)
- [Options & Flags](#options--flags)
- [Interactive Mode](#interactive-mode)
- [Generated Project Structure](#generated-project-structure)
- [Development Workflow](#development-workflow)
- [React Version Compatibility](#react-version-compatibility)
- [Contributing](#contributing)
- [License](#license)

---

## What is a Liferay Client Extension?

A **Client Extension (CE)** is the modern, decoupled way to extend Liferay DXP / Community Edition — no Java, no OSGi, no portal restarts required.

A **Custom Element** CE wraps your React app as a standard Web Component (`<my-widget />`), which Liferay embeds directly on any page. This CLI scaffolds everything you need to build, preview, and deploy one in seconds.

---

## Requirements

Before you start, make sure you have:

| Requirement | Version |
|---|---|
| Node.js | ≥ 18.0.0 |
| npm | ≥ 9.0.0 |
| [Liferay Workspace](https://learn.liferay.com/dxp/latest/en/building-applications/tooling/liferay-workspace/what-is-liferay-workspace.html) | For `gradlew deploy` |

> **Note:** The generated project must sit inside a Liferay Workspace at `[workspace]/client-extensions/my-widget/` for Gradle deployment to work.

---

## Quick Start

```bash
npx create-liferay-react-cx my-widget
cd my-widget
../../gradlew deploy
```

That's it. Your custom element is live in Liferay. 🚀

---

## All Ways to Use This CLI

### Method 1 — `npm create` (Recommended)

`npm create` is the standard npm convention for scaffolding tools (like `npm create vite`, `npm create react-app`). It automatically resolves `create-liferay-react-cx` under the hood.

**With a project name (fastest):**
```bash
npm create liferay-react-cx my-widget
```

**With a specific React version:**
```bash
npm create liferay-react-cx -- --name my-widget --react-version 18.3.1
```
> ⚠️ Note the `--` before flags — this is required when using `npm create` with named options, so npm passes them through to the CLI correctly.

**Interactive wizard (no arguments):**
```bash
npm create liferay-react-cx
```

---

### Method 2 — `npx` (No Install)

Use `npx` to run the CLI directly without installing anything globally. The full package name `create-liferay-react-cx` is used here.

**With a project name:**
```bash
npx create-liferay-react-cx my-widget
```

**With a specific React version:**
```bash
npx create-liferay-react-cx --name my-widget --react-version 18.3.1
```

**Interactive wizard:**
```bash
npx create-liferay-react-cx
```

---

## Options & Flags

| Flag | Short | Description | Default |
|------|-------|-------------|---------|
| `--name` | `-n` | App name in **kebab-case** | _(prompted)_ |
| `--react-version` | `-r` | React version to scaffold with | `16.12.0` |
| `--help` | `-h` | Print help and exit | — |
| `--version` | `-v` | Print version and exit | — |

**App name rules:** lowercase letters, numbers, and hyphens only. Must start with a letter. Examples: `my-widget`, `employee-portal`, `news-feed`.

---

## Interactive Mode

Run the CLI with no arguments to enter the interactive wizard:

```bash
npx create-liferay-react-cx
# or
npm create liferay-react-cx
```

You will be asked:

1. **App name** — enter a kebab-case name for your widget
2. **Choose language** — select between **JavaScript** or **TypeScript**
3. **React version** — choose from a list (16.12.0 or 18.3.1)
4. **Use Shadow DOM?** — decide if you want strict style isolation and slots support

### When to use Shadow DOM?

**✅ Yes (Recommended for most apps)**
Select **Yes** if you want your widget's styles to be **completely isolated**.
- Your CSS will not affect the rest of the Liferay page.
- Liferay's global CSS (like Clay UI styles or portal themes) will not accidentally override your widget's design.
- Highly recommended for complex widgets, third-party integrations, or when using custom CSS frameworks like Tailwind.

**❌ No**
Select **No** if you want your widget to **inherit Liferay's global styles**.
- Your widget will seamlessly pick up the portal's fonts, colors, and Clay UI themes.
- CSS written in your widget *could* leak out and affect other elements on the page if not scoped properly.
- Recommended if you rely heavily on Liferay's Clay UI components and want them to perfectly match the portal theme.

---

## Generated Project Structure

Running the CLI creates the following layout:

```text
my-widget/
├── client-extension.yaml     ← Liferay CE descriptor (auto-configured)
├── index.html                ← Vite dev-server entry point
├── package.json              ← Project dependencies & scripts
├── vite.config.[js|ts]       ← Vite build config
├── [tsconfig.json]           ← TS only: TypeScript config
└── src/
    ├── main.[jsx|tsx]      ← Web Component registration (HTMLElement)
    ├── App.[jsx|tsx]       ← Your React component — start editing here
    ├── index.css           ← Global reset (shadow DOM scoped)
    ├── util/               ← Liferay helper utilities (Mocks + Styles)
    │   ├── Liferay.[js|ts]
    │   └── setupShadowRootStyles.[js|ts]
    └── assets/
        └── style.css       ← Component styles (shadow DOM isolated)
```

### What `client-extension.yaml` does

This file tells Liferay how to register and display your widget:

```yaml
assemble:
    - from: vite-build
      into: static

# Import map entry for importing the element in custom fragments
my-widget:
    bareSpecifier: my-widget
    name: my-widget
    type: jsImportMapsEntry
    url: assets/index.js

# Custom element definition
my-widget-element:
    friendlyURLMapping: my-widget
    htmlElementName: my-widget
    instanceable: false
    name: my-widget
    portletCategoryName: category.client-extensions
    type: customElement
    urls:
        - assets/*.js
    useESM: true
    liferay.virtual.instance.id: default
```

All values are automatically replaced with your app name during scaffolding.

---

## Development Workflow

### ✅ Deploying to Liferay (Standard Workflow)

When working inside a Liferay Workspace, **you only need one command**. Gradle handles the npm install, Vite build, and deployment automatically — no manual `npm run build` needed.

**1. Navigate into your project:**
```bash
cd my-widget
```

**2. Deploy directly to Liferay** (from the Liferay Workspace root):
```bash
../../gradlew deploy
```

That's it. Under the hood, Gradle will:
- Run `npm install` (if `node_modules` is missing)
- Run `npm run build` (Vite compiles to `vite-build/`)
- Copy the output into Liferay's deploy folder
- Hot-reload the bundle in your running Liferay instance

> After deployment, go to **Liferay Admin → Fragments and Resources → Client Extensions** to find and add your widget to a page.

---

### 🖥️ Local Preview (Optional)

If you want to preview your React component in a browser **outside of Liferay** during development (faster feedback, hot reload), you can use Vite's dev server:

```bash
npm install       # only needed once
npm run dev       # starts at http://localhost:5173
```

> This is purely optional and useful for rapid UI development. The component will render standalone — not inside Liferay's portal context.

---

## React Version Compatibility

| React Version | Liferay Compatibility | Notes |
|:---:|:---|:---|
| `16.12.0` | Liferay 7.4 GA / DXP classic | Uses Liferay's bundled React. Smaller bundle. |
| `18.3.1` | Liferay 7.4 U45+ / DXP 2024.Q1+ | Fully isolated in shadow DOM. Concurrent features. |

Not sure which to pick? Use `16.12.0` for maximum compatibility with older Liferay instances, or `18.3.1` for newer deployments that support isolated client extensions.

---

## Contributing

Contributions, issues, and feature requests are welcome!

```bash
# 1. Clone the repo
git clone https://github.com/laxitkhanpara/liferay-react-ce.git
cd liferay-react-cx

# 2. Install dependencies
npm install

# 3. Test locally
node bin/index.js my-test-app

# 4. Clean up
rm -rf my-test-app
```

Please open an [issue](https://github.com/laxitkhanpara/liferay-react-ce/issues) first to discuss any significant changes.

---

## License

[MIT](./LICENSE) © [Laxit Khanpara](https://github.com/laxitkhanpara)

---

## Links

- 📦 [npm package](https://www.npmjs.com/package/create-liferay-react-cx)
- 🐛 [Report a bug](https://github.com/laxitkhanpara/liferay-react-ce/issues)
- 📖 [Liferay Client Extensions docs](https://learn.liferay.com/dxp/latest/en/building-applications/client-extensions.html)
- 🏗️ [Liferay Workspace docs](https://learn.liferay.com/dxp/latest/en/building-applications/tooling/liferay-workspace/what-is-liferay-workspace.html)