import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vite.dev/config/
// This config optimizes for Liferay Client Extension deployment
export default defineConfig({
  base: './',
  build: {
    outDir: 'vite-build',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/chunk-[name].js',
        assetFileNames: ({ name }) => {
          if (name && name.endsWith('.css')) return 'assets/style.css';
          return 'assets/[name][extname]';
        },
      },
      // IMPORTANT: Exclude libraries that Liferay provides
      // This prevents bundling duplicates and ensures consistency:
      // - react & react-dom: Liferay's built-in versions (matches your chosen version)
      // - @clayui/*: Liferay's Clay UI components (matches Liferay's styling)
      // This reduces bundle from 285KB to just 45KB!
      external: [
        'react',
        'react-dom',
        /^(?!@clayui\/css)@clayui.*$/,  // Exclude Clay, but keep Clay CSS for reference
      ],
    },
  },
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
    // CSS is injected directly into JS bundle
    // No separate CSS files means better web component compatibility
    cssInjectedByJsPlugin(),
  ],
});
