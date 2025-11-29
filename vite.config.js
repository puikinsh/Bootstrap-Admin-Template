import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [],
  root: 'src-modern',
  publicDir: '../public-assets',
  base: './',

  build: {
    outDir: '../dist-modern',
    emptyOutDir: true,
    sourcemap: false,
    // Warn for chunks over 500KB
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src-modern/index.html'),
        analytics: resolve(__dirname, 'src-modern/analytics.html'),
        calendar: resolve(__dirname, 'src-modern/calendar.html'),
        elements: resolve(__dirname, 'src-modern/elements.html'),
        'elements-alerts': resolve(__dirname, 'src-modern/elements-alerts.html'),
        'elements-badges': resolve(__dirname, 'src-modern/elements-badges.html'),
        'elements-buttons': resolve(__dirname, 'src-modern/elements-buttons.html'),
        'elements-cards': resolve(__dirname, 'src-modern/elements-cards.html'),
        'elements-forms': resolve(__dirname, 'src-modern/elements-forms.html'),
        'elements-modals': resolve(__dirname, 'src-modern/elements-modals.html'),
        'elements-tables': resolve(__dirname, 'src-modern/elements-tables.html'),
        files: resolve(__dirname, 'src-modern/files.html'),
        forms: resolve(__dirname, 'src-modern/forms.html'),
        help: resolve(__dirname, 'src-modern/help.html'),
        messages: resolve(__dirname, 'src-modern/messages.html'),
        orders: resolve(__dirname, 'src-modern/orders.html'),
        products: resolve(__dirname, 'src-modern/products.html'),
        reports: resolve(__dirname, 'src-modern/reports.html'),
        security: resolve(__dirname, 'src-modern/security.html'),
        settings: resolve(__dirname, 'src-modern/settings.html'),
        users: resolve(__dirname, 'src-modern/users.html'),
      },

      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Core Bootstrap framework
          'vendor-bootstrap': ['bootstrap', '@popperjs/core'],
          // Charting libraries
          'vendor-charts': ['chart.js', 'apexcharts'],
          // UI utilities
          'vendor-ui': ['alpinejs', 'sweetalert2', 'dayjs'],
        },
        // Asset naming for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },

  server: {
    port: 3000,
    open: true,
    // Enable CORS for development
    cors: true,
  },

  preview: {
    port: 4173,
    open: true,
  },

  css: {
    // Enable CSS source maps in development
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions'],
      },
    },
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src-modern'),
      '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
    },
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['bootstrap', 'alpinejs', 'chart.js', 'apexcharts', 'sweetalert2', 'dayjs'],
  },
});
