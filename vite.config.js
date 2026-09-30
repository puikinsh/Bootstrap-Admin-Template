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
    target: 'es2020',
    cssCodeSplit: true,
    cssMinify: 'lightningcss',
    minify: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 600,

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

        // Standalone pages — rendered outside the admin shell, entry `auth.js`.
        login: resolve(__dirname, 'src-modern/login.html'),
        register: resolve(__dirname, 'src-modern/register.html'),
        'forgot-password': resolve(__dirname, 'src-modern/forgot-password.html'),
        'reset-password': resolve(__dirname, 'src-modern/reset-password.html'),
        'two-factor': resolve(__dirname, 'src-modern/two-factor.html'),
        'lock-screen': resolve(__dirname, 'src-modern/lock-screen.html'),
        '404': resolve(__dirname, 'src-modern/404.html'),
        '500': resolve(__dirname, 'src-modern/500.html'),
        maintenance: resolve(__dirname, 'src-modern/maintenance.html'),
      },

      output: {
        // Manual chunk splitting for better caching
        manualChunks(id) {
          if (id.includes('node_modules/bootstrap/') || id.includes('node_modules/@popperjs/core/')) {
            return 'vendor-bootstrap';
          }
          // Chart.js core + the treemap controller. chartjs-plugin-zoom (and
          // hammerjs) is left out on purpose: only the reports page uses it,
          // so it stays in that page's chunk.
          if (
            id.includes('node_modules/chart.js/') ||
            id.includes('node_modules/@kurkle/color/') ||
            id.includes('node_modules/chartjs-chart-treemap/')
          ) {
            return 'vendor-charts';
          }
          if (id.includes('node_modules/alpinejs/') || id.includes('node_modules/sweetalert2/')) {
            return 'vendor-ui';
          }
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
        silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions', 'if-function'],
      },
    },
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src-modern'),
      '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
      '~bootstrap-icons': resolve(__dirname, 'node_modules/bootstrap-icons'),
    },
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['bootstrap', 'alpinejs', 'chart.js', 'chartjs-chart-treemap', 'chartjs-plugin-zoom', 'sweetalert2'],
  },

  esbuild: {
    // Strip console.* and debugger statements from production bundles
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
});
