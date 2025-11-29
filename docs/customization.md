# Customization Guide

This guide explains how to customize the Metis Admin Template to match your brand and requirements.

## Table of Contents

- [Theme Customization](#theme-customization)
- [Color Schemes](#color-schemes)
- [Typography](#typography)
- [Layout Customization](#layout-customization)
- [Adding Custom Components](#adding-custom-components)
- [Dark Mode](#dark-mode)

---

## Theme Customization

### SCSS Variables

The primary way to customize the template is through SCSS variables located in `src-modern/styles/scss/abstracts/_variables.scss`.

#### Brand Colors

```scss
// Primary brand color
$primary: #6366f1;    // Indigo

// Secondary colors
$secondary: #64748b;  // Slate
$success: #10b981;    // Emerald
$info: #06b6d4;       // Cyan
$warning: #f59e0b;    // Amber
$danger: #ef4444;     // Red
$light: #f8fafc;      // Slate 50
$dark: #1e293b;       // Slate 800

// Extended Color Palette
$purple: #8b5cf6;
$pink: #ec4899;
$teal: #14b8a6;
$orange: #f97316;
```

#### Grayscale

```scss
$gray-50: #f8fafc;
$gray-100: #f1f5f9;
$gray-200: #e2e8f0;
$gray-300: #cbd5e1;
$gray-400: #94a3b8;
$gray-500: #64748b;
$gray-600: #475569;
$gray-700: #334155;
$gray-800: #1e293b;
$gray-900: #0f172a;
```

#### Spacing

```scss
// Base spacing unit
$spacer: 1rem;

// Spacing scale (extended)
$spacers: (
  0: 0,
  1: $spacer * 0.25,   // 4px
  2: $spacer * 0.5,    // 8px
  3: $spacer * 0.75,   // 12px
  4: $spacer,          // 16px
  5: $spacer * 1.25,   // 20px
  6: $spacer * 1.5,    // 24px
  7: $spacer * 1.75,   // 28px
  8: $spacer * 2,      // 32px
  9: $spacer * 2.25,   // 36px
  10: $spacer * 2.5,   // 40px
  11: $spacer * 3,     // 48px
  12: $spacer * 3.5    // 56px
);
```

#### Border Radius

```scss
$border-radius: 0.75rem;      // 12px
$border-radius-sm: 0.5rem;    // 8px
$border-radius-lg: 1rem;      // 16px
$border-radius-xl: 1.25rem;   // 20px
$border-radius-2xl: 1.5rem;   // 24px
```

#### Shadows

```scss
$box-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
$box-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
$box-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
```

---

## Color Schemes

### Creating a Custom Color Scheme

1. **Define your colors** in `_variables.scss`:

```scss
// Custom brand colors
$brand-primary: #2563eb;    // Blue
$brand-secondary: #7c3aed;  // Purple
$brand-accent: #ec4899;     // Pink

// Override Bootstrap variables
$primary: $brand-primary;
$secondary: $brand-secondary;
```

2. **Create color utilities** in `abstracts/_utilities.scss`:

```scss
// Custom color utilities
.text-brand {
  color: $brand-primary !important;
}

.bg-brand {
  background-color: $brand-primary !important;
}

.border-brand {
  border-color: $brand-primary !important;
}
```

### Available Themes

The template includes two theme files in `src-modern/styles/scss/themes/`:

- `_dark.scss` - Dark mode overrides
- `_light.scss` - Light mode overrides

These are imported in `main.scss` and work with Bootstrap's `data-bs-theme` attribute.

---

## Typography

### Font Family

```scss
// Primary font (UI elements)
$font-family-sans-serif: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

// Monospace font (code blocks)
$font-family-monospace: "Fira Code", "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
```

### Font Sizes

```scss
$font-size-base: 0.9rem;     // 14.4px

// Heading sizes
$h1-font-size: 2.25rem;      // 36px
$h2-font-size: 1.875rem;     // 30px
$h3-font-size: 1.5rem;       // 24px
$h4-font-size: 1.25rem;      // 20px
$h5-font-size: 1.125rem;     // 18px
$h6-font-size: 1rem;         // 16px
```

### Line Height

```scss
$line-height-base: 1.6;
```

### Using Custom Fonts

1. **Add font via Google Fonts** (already configured in HTML):

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

2. **Or add local font files** to `src-modern/assets/fonts/` and create a `@font-face` rule in your SCSS.

---

## Layout Customization

### Sidebar Width

```scss
// Sidebar dimensions
$sidebar-width: 280px;
$sidebar-mini-width: 70px;
```

### Header Height

```scss
$header-height: 70px;
```

### Footer Height

```scss
$footer-height: 60px;
```

### Transitions

```scss
$transition-base: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
$transition-fast: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
$transition-slow: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
```

### CSS Custom Properties

These SCSS variables are also exposed as CSS custom properties:

```css
:root {
  --sidebar-width: 280px;
  --sidebar-mini-width: 70px;
  --header-height: 70px;
  --footer-height: 60px;

  --transition-base: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-fast: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  --border-radius: 0.75rem;
  --border-radius-sm: 0.5rem;
  --border-radius-lg: 1rem;

  --box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --box-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --box-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
}
```

---

## Adding Custom Components

### Step 1: Create Component SCSS

Create a new file in `src-modern/styles/scss/components/`:

```scss
// components/_custom-widget.scss

.custom-widget {
  background: var(--bs-card-bg);
  border-radius: $border-radius-lg;
  padding: $spacer * 1.5;
  box-shadow: $box-shadow;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacer;
  }

  &__title {
    font-weight: 600;
    color: var(--bs-heading-color);
  }
}
```

### Step 2: Import in Main SCSS

Add to `src-modern/styles/scss/main.scss`:

```scss
// In the components section
@import "components/custom-widget";
```

### Step 3: Create Component JavaScript

Create a new file in `src-modern/scripts/components/`:

```javascript
// components/custom-widget.js
import Alpine from 'alpinejs';

document.addEventListener('alpine:init', () => {
  Alpine.data('customWidget', () => ({
    isLoading: false,
    data: null,

    init() {
      this.loadData();
    },

    async loadData() {
      this.isLoading = true;
      try {
        this.data = await this.fetchData();
      } finally {
        this.isLoading = false;
      }
    },

    async fetchData() {
      // Implementation
    }
  }));
});

export default {};
```

### Step 4: Use in HTML

```html
<div class="custom-widget" x-data="customWidget()">
  <div class="custom-widget__header">
    <h5 class="custom-widget__title">Widget Title</h5>
  </div>
  <template x-if="isLoading">
    <div class="spinner-border text-primary"></div>
  </template>
  <template x-if="!isLoading && data">
    <div x-text="data"></div>
  </template>
</div>
```

---

## Dark Mode

### How Dark Mode Works

The template uses Bootstrap 5's `data-bs-theme` attribute:

```html
<!-- Light mode -->
<html lang="en" data-bs-theme="light">

<!-- Dark mode -->
<html lang="en" data-bs-theme="dark">
```

### Customizing Dark Mode Colors

Override dark mode colors in `src-modern/styles/scss/themes/_dark.scss`:

```scss
[data-bs-theme="dark"] {
  // Background colors
  --bs-body-bg: #0f172a;

  // Card backgrounds
  --bs-card-bg: #1e293b;

  // Text colors
  --bs-body-color: #e2e8f0;

  // Border colors
  --bs-border-color: #334155;
}
```

### Theme Toggle Implementation

The template includes a built-in `themeSwitch` Alpine component:

```html
<div x-data="themeSwitch">
  <button @click="toggle()" class="btn btn-outline-secondary">
    <i class="bi bi-sun-fill" x-show="currentTheme === 'light'"></i>
    <i class="bi bi-moon-fill" x-show="currentTheme === 'dark'"></i>
  </button>
</div>
```

The component automatically:
- Persists theme preference to localStorage
- Updates `data-bs-theme` attribute on HTML element
- Syncs icon display with current theme

---

## Build Customization

### Vite Configuration

Edit `vite.config.js` for build customization:

```javascript
export default defineConfig({
  root: 'src-modern',

  build: {
    outDir: '../dist-modern',

    // Chunk splitting (already configured)
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-bootstrap': ['bootstrap', '@popperjs/core'],
          'vendor-charts': ['chart.js', 'apexcharts'],
          'vendor-ui': ['alpinejs', 'sweetalert2', 'dayjs'],
        }
      }
    }
  },

  server: {
    port: 3000,
    open: true
  }
});
```

### Environment Variables

Create `.env.local` for local configuration (see `.env.example`):

```bash
VITE_PORT=3000
VITE_API_URL=http://localhost:3001/api
VITE_ENABLE_DEMO_DATA=true
```

Access in JavaScript:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## SCSS File Structure

```
src-modern/styles/scss/
├── abstracts/
│   ├── _variables.scss    # All customizable variables
│   ├── _mixins.scss       # Reusable mixins
│   └── _utilities.scss    # Custom utility classes
├── components/
│   ├── _buttons.scss
│   ├── _cards.scss
│   ├── _charts.scss
│   ├── _forms.scss
│   ├── _icons.scss
│   ├── _modals.scss
│   ├── _navigation.scss
│   ├── _sidebar.scss
│   └── _tables.scss
├── layout/
│   ├── _header.scss
│   ├── _sidebar.scss
│   ├── _main.scss
│   └── _footer.scss
├── pages/
│   ├── _dashboard.scss
│   ├── _users.scss
│   ├── _products.scss
│   └── ... (page-specific styles)
├── themes/
│   ├── _dark.scss
│   └── _light.scss
└── main.scss              # Main entry point
```

---

For more detailed examples, explore the source files in `src-modern/`.
