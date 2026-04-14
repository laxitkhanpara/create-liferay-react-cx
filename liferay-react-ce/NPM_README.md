# create-liferay-react-cx

⚡ **Zero-config CLI** to scaffold **Liferay React Client Extensions** in seconds.

[![npm version](https://img.shields.io/npm/v/create-liferay-react-cx)](https://www.npmjs.com/package/create-liferay-react-cx)
[![license](https://img.shields.io/npm/l/create-liferay-react-cx)](https://github.com/laxitkhanpara/create-liferay-react-cx/blob/main/LICENSE)

---

## Quick Start

```bash
npx create-liferay-react-cx my-widget
cd my-widget
../../gradlew deploy
```

## What You Get

- ✅ **Vite-powered** React project (fast builds, HMR)
- ✅ **client-extension.yaml** pre-configured
- ✅ **Shadow DOM** isolated styles
- ✅ **Ready to deploy** to Liferay 7.4+ / DXP

## Usage

### Interactive Mode
```bash
npx create-liferay-react-cx
```

### With Arguments
```bash
npx create-liferay-react-cx my-widget --react-version 18.2.0
```

### Using npm create
```bash
npm create liferay-react-cx my-widget
```

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--name, -n` | App name (kebab-case) | _(prompted)_ |
| `--react-version, -r` | React version | `16.12.0` |
| `--help, -h` | Show help | — |
| `--version, -v` | Show version | — |

## Requirements

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0
- **Liferay Workspace** (for deployment)

## React Version Guide

- **16.12.0** → Liferay 7.4 GA / DXP classic
- **18.2.0** → Liferay 7.4 U45+ / DXP 2024.Q1+

## After Scaffolding

1. Navigate into your project: `cd my-widget`
2. Deploy to Liferay: `../../gradlew deploy`
3. Add widget to a page in **Liferay Admin → Client Extensions**

## Documentation

📖 Full documentation: [GitHub Repository](https://github.com/laxitkhanpara/create-liferay-react-cx)

## Links

- [GitHub](https://github.com/laxitkhanpara/create-liferay-react-cx)
- [Issues](https://github.com/laxitkhanpara/create-liferay-react-cx/issues)
- [Liferay Docs](https://learn.liferay.com/dxp/latest/en/building-applications/client-extensions.html)

## License

MIT © [Laxit Khanpara](https://github.com/laxitkhanpara)