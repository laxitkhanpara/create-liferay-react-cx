import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  build: {
    outDir: 'vite-build',
  },
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
  ],
});
