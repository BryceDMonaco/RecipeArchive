import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { recipeManifestPlugin } from './vite-plugins/recipe-manifest';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), recipeManifestPlugin()],
  base: '/RecipeArchive/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      buffer: 'buffer/',
    },
  },
  define: {
    'global.Buffer': ['buffer', 'Buffer'],
  },
});
