import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [],
  root: 'src-modern',
  publicDir: '../public-assets',
  build: {
    outDir: '../dist-modern',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src-modern/index.html'),
        // Add more pages as needed
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "bootstrap/scss/functions"; @import "bootstrap/scss/variables";`
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(fileURLToPath(new URL('.', import.meta.url)), 'src-modern'),
      '~bootstrap': resolve(fileURLToPath(new URL('.', import.meta.url)), 'node_modules/bootstrap'),
    }
  }
}); 