# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern Bootstrap 5 Admin Dashboard Template (v3.2.0) using Vite, Alpine.js, and SCSS.

| Directory | Purpose |
|-----------|---------|
| `src-modern/` | Source files (Bootstrap 5.3.8, ES6+ modules) |
| `dist-modern/` | Production build output |
| `src/`, `dist/` | Legacy Bootstrap 3 code - **do not use** |

## Commands

```bash
npm run dev      # Dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint check
npm run format   # Prettier format
```

## Key Files

| File | Purpose |
|------|---------|
| `src-modern/scripts/main.js` | App entry point, initializes AdminApp class |
| `src-modern/styles/scss/main.scss` | SCSS entry point |
| `vite.config.js` | Build config with multi-page entries |
| `eslint.config.js` | ESLint v9 flat config |

## Architecture Quick Reference

**Page Detection**: Each HTML page needs `data-page="pagename"` on `<body>` to load correct component.

**Component Loading**: Dynamic imports in `main.js` based on page:

```javascript
case 'users':
  await import('./components/users.js');
  break;
```

**Alpine.js Pattern**: Components register via `Alpine.data()`:

```javascript
Alpine.data('componentName', () => ({
  init() { /* setup */ },
  // methods and state
}));
```

## Adding a New Page

1. Create `src-modern/newpage.html` with `data-page="newpage"` on body
2. Add entry to `vite.config.js` → `rollupOptions.input`
3. Create `src-modern/scripts/components/newpage.js`
4. Add case to `initPageComponents()` in `main.js`
5. Optional: Create `src-modern/styles/scss/pages/_newpage.scss` and import in `main.scss`

## Dependencies

- **UI**: Bootstrap 5.3.8, Bootstrap Icons 1.13.1
- **Reactive**: Alpine.js 3.15.2
- **Charts**: ApexCharts 5.3.6, Chart.js 4.5.1
- **Notifications**: SweetAlert2 11.26.3
- **Build**: Vite 7.2.4, Sass 1.94.2

## Documentation

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed architecture, patterns, and styling guide.
