import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      input: {
        landing: resolve(import.meta.dirname, 'index.html'),
      },
    },
  },
});
