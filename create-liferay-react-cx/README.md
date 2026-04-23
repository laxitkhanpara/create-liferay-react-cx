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
npx create-liferay-react-cx my-widget --react-version 18.3.1
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

## When to use Shadow DOM?

The CLI will prompt you whether you want to use **Shadow DOM**.

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

## Requirements

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0
- **Liferay Workspace** (for deployment)

## React Version Guide

### Liferay-Provided Versions

The React versions available are **provided by Liferay** and already bundled in your Liferay instance:

- **16.12.0** → Liferay 7.4 GA / DXP classic
- **18.3.1** → Liferay 7.4 U45+ / DXP 2024.Q1+

When you select a version, your client extension will **reuse that version** from Liferay, not bundle its own. This ensures:
- ✅ **Consistency** - All widgets use the same React version
- ✅ **No conflicts** - No version mismatches between widgets
- ✅ **Smaller bundle** - React isn't duplicated across extensions

---

## Liferay Library Exclusion Pattern

This CLI uses an advanced pattern that **excludes Liferay-provided libraries** from your bundle:

### **Excluded (Provided by Liferay)**
```javascript
external: [
  'react',           // ← Liferay version
  'react-dom',       // ← Liferay version
  '@clayui/*',       // ← Liferay's Clay UI components
]
```

### **Why This Matters**

| Scenario | Without Exclusion | With Exclusion |
|----------|-------------------|----------------|
| Bundle Size | 285 KB | **45 KB** (84% smaller!) |
| React Version | Bundled (might conflict) | Shared (guaranteed match) |
| Clay UI | Duplicated | Reused (consistent styling) |
| Liferay Conflict | Possible | None ✅ |

### **Using Clay UI in Your Widget**

Since Clay is excluded, you can safely import and use it:

```jsx
import { ClayButton } from '@clayui/button';
import { ClayIcon } from '@clayui/icon';

function MyWidget() {
  return (
    <ClayButton onClick={() => console.log('Clicked!')}>
      <ClayIcon symbol="check" /> Click Me
    </ClayButton>
  );
}
```

Liferay will provide the Clay components at runtime. ✅

---

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