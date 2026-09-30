import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        // Nothing else is a global. Alpine, Chart.js, Swal and bootstrap are
        // all ES module imports in this codebase — declaring them here told
        // `no-undef` to stay quiet about genuinely undefined references, which
        // is how `new bootstrap.Tooltip(...)` and a bare chart-library
        // constructor survived on pages that never imported them.
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // Allow console in source — production bundles strip it via esbuild.drop in vite.config.js.
      'no-console': 'off',
      'no-case-declarations': 'off',
      eqeqeq: ['warn', 'smart'],
      'prefer-const': 'warn',
      'no-var': 'error',
    },
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'dist-modern/**',
      'src/**',
      '*.min.js',
    ],
  },
];
