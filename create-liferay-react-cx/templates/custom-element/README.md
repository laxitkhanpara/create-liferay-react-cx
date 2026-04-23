# __APP_NAME__ - Liferay React Client Extension

This project was generated using `create-liferay-react-cx`.

## 🚀 Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Development**:
   ```bash
   npm run dev
   ```

3. **Deploy to Liferay**:
   ```bash
   # From the project root
   ../../gradlew deploy
   ```

## 🛠 Features

- **React Version**: Chosen during scaffolding.
- **External Dependencies**: React and Clay UI are provided by Liferay (smaller bundles!).
- **Vite Powered**: Instant HMR and optimized builds.

// @shadow-y ## ⚡ Shadow DOM & Slots (Advanced)
// @shadow-y This project uses the **Shadow DOM**, which gives you two main "Superpowers":
// @shadow-y 
// @shadow-y ### 1. Style Isolation
// @shadow-y Your CSS is encapsulated. Global Liferay styles won't break your app, and your app's styles won't leak into Liferay.
// @shadow-y 
// @shadow-y ### 2. Using Slots
// @shadow-y You can use the native `<slot>` element in your React components to allow Liferay to "inject" content into your app from the Page Editor.
// @shadow-y 
// @shadow-y **Example in App.jsx**:
// @shadow-y ```jsx
// @shadow-y export default function App() {
// @shadow-y   return (
// @shadow-y     <div className="container">
// @shadow-y       <h1>__APP_NAME__</h1>
// @shadow-y       <div className="content-zone">
// @shadow-y         <slot name="my-content" />
// @shadow-y       </div>
// @shadow-y     </div>
// @shadow-y   );
// @shadow-y }
// @shadow-y ```
// @shadow-y 
// @shadow-y **Usage in Liferay (HTML Fragment)**:
// @shadow-y ```html
// @shadow-y <__APP_NAME__>
// @shadow-y   <p slot="my-content">This content is injected from Liferay!</p>
// @shadow-y </__APP_NAME__>
// @shadow-y ```

## 📦 Bundling

When you run `npm run build`, Vite will output files to `vite-build/static`. These are the assets that Liferay will serve.

## 📄 Manifest

The `client-extension.yaml` file defines how this extension is registered in Liferay. It includes a `jsImportMapsEntry` which allows you to import this component into any custom fragment easily.

---
*Built with ❤️ using [create-liferay-react-cx](https://github.com/laxitkhanpara/create-liferay-react-cx)*
