# Create Liferay React CX - Templates

This directory contains the scaffolding templates for creating Liferay React Client Extensions.

## Available Templates

### 1. `custom-element/` - JavaScript Template
Standard JavaScript/JSX template for Liferay React Client Extensions.

**Tech Stack:**
- React (configurable version)
- Vite (build tool)
- JavaScript/JSX
- CSS (with Shadow DOM styling)

**Files:**
- `src/App.jsx` - Main React component
- `src/main.jsx` - Web Component initialization
- `vite.config.js` - Vite configuration
- `client-extension.yaml` - Liferay manifest

**When to Use:**
- Rapid prototyping without type checking
- Teams comfortable with JavaScript
- Smaller projects with less complexity
- Legacy browser support requirements

---

### 2. `custom-element-ts/` - TypeScript Template
Enterprise-ready TypeScript template with full type safety and modern development experience.

**Tech Stack:**
- React (configurable version)
- TypeScript 5.3+
- Vite (build tool)
- Strict Type Checking
- Type Definitions for React (@types/react, @types/react-dom)

**Files:**
- `src/App.tsx` - Typed React component
- `src/main.tsx` - Typed Web Component initialization
- `vite.config.ts` - TypeScript Vite configuration
- `tsconfig.json` - TypeScript compiler options
- `tsconfig.node.json` - TypeScript config for build tooling
- `client-extension.yaml` - Liferay manifest

**When to Use:**
- Large-scale projects requiring type safety
- Teams with TypeScript expertise
- Complex component hierarchies
- Long-term maintainability is critical
- IDE autocompletion and documentation needed

---

## Shared Features (Both Templates)

✅ **Shadow DOM Isolation** - Components run in isolated DOM scope
✅ **Vite-Powered** - Lightning-fast development and optimized builds
✅ **Web Components** - Native custom element support
✅ **Liferay Ready** - Pre-configured for Liferay DXP deployment
✅ **Modern React** - Supports React 16.12.0 and 18.3.1
✅ **Professional Styling** - Modern gradient-based design system
✅ **ESM Support** - Full ES Module support

---

## Choosing Between Templates

### Use **JavaScript** if:
- Your team is unfamiliar with TypeScript
- The project is small or personal
- You want minimal setup overhead
- You need to get started immediately

### Use **TypeScript** if:
- Your team has TypeScript experience
- The project is large or complex
- Code maintainability is important
- You want IDE autocompletion help
- Working in an enterprise environment

---

## File Comparison

| Feature | JavaScript | TypeScript |
|---------|-----------|-----------|
| Main Component | App.jsx | App.tsx |
| Initialization | main.jsx | main.tsx |
| Vite Config | vite.config.js | vite.config.ts |
| Type Definitions | None | @types/react, @types/react-dom |
| Type Checking | Runtime errors | Compile-time errors |
| Configuration | Minimal | tsconfig.json + tsconfig.node.json |
| IDE Support | Basic | Enhanced |
| Bundle Size | Smaller | Slightly larger |

---

## Common File Structure

Both templates follow the same organizational structure:

```text
template/
├── .gitignore              # Git ignore rules
├── client-extension.yaml   # Liferay manifest
├── index.html              # HTML entry
├── vite.config.[js|ts]     # Vite configuration
├── [tsconfig.json]         # TS only: TypeScript config
└── src/
    ├── App.[jsx|tsx]       # React component
    ├── index.css           # Base styles
    ├── main.[jsx|tsx]      # Web Component init
    ├── util/
    │   ├── Liferay.[js|ts] # Liferay global object mock
    │   └── setupShadowRootStyles.[js|ts]
    └── assets/
        └── style.css       # Component styles
```

---

## Placeholder Variables

Both templates use `__APP_NAME__` as a placeholder that gets automatically replaced with your app name in:
- `client-extension.yaml` - Element name, friendly URL mapping
- `index.html` - Custom element tag name
- `App.[jsx|tsx]` - Page title

Example replacement:
```
Input: npx create-liferay-react-cx my-awesome-widget
__APP_NAME__ → my-awesome-widget

Output:
- <my-awesome-widget></my-awesome-widget>
- friendlyURLMapping: my-awesome-widget
- htmlElementName: my-awesome-widget
```

---

## Getting Started with Each Template

### JavaScript Template
```bash
npx create-liferay-react-cx my-app
# Select "JavaScript" when prompted
cd my-app
npm install
npm run dev
```

### TypeScript Template
```bash
npx create-liferay-react-cx my-app
# Select "TypeScript" when prompted
cd my-app
npm install  # Includes TypeScript dependencies
npm run dev
```

---

## Development Commands (Both Templates)

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Liferay (from parent directory)
../../gradlew deploy
```

---

## Styling & Shadow DOM

Both templates are optimized for Shadow DOM environment:
- CSS reset via `:host` selector
- Isolated styles that don't leak out
- Professional gradient-based design
- Responsive utilities
- Support for dark/light themes

---

## TypeScript-Specific Features

The TypeScript template includes:
- **Strict Compiler Settings** - Catches errors early
- **Type Declarations** - Full React type support
- **Source Maps** - Better debugging experience
- **Declaration Files** - For library distribution
- **JSX Support** - Modern React JSX runtime

---

## Browser Support

Both templates target **ES2020**, supporting:
- Chrome 91+
- Firefox 89+
- Safari 14.1+
- Edge 91+

Liferay DXP typically uses modern browsers, so this should be compatible with all supported Liferay versions.

---

## Further Reading

- [Liferay Client Extensions Documentation](https://learn.liferay.com/dxp/latest/en/building-applications/client-extensions.html)
- [Web Components Standard](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## Template Maintenance Notes

- Both templates should maintain feature parity
- Updates to styling should apply to both
- Configuration changes usually apply to both
- Keep `__APP_NAME__` placeholder pattern consistent
- Test changes in both JavaScript and TypeScript paths
