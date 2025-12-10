import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { recipeManifestPlugin } from './vite-plugins/recipe-manifest';

export default defineConfig({
  plugins: [react(), recipeManifestPlugin()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './tests/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
