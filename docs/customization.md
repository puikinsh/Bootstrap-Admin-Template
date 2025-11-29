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
$primary: #6366f1;

// Secondary colors
$secondary: #64748b;
$success: #10b981;
$info: #06b6d4;
$warning: #f59e0b;
$danger: #ef4444;

// Neutral colors
$gray-100: #f8fafc;
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

// Spacing scale
$spacers: (
  0: 0,
  1: $spacer * 0.25,   // 4px
  2: $spacer * 0.5,    // 8px
  3: $spacer,          // 16px
  4: $spacer * 1.5,    // 24px
  5: $spacer * 3       // 48px
);
```

#### Border Radius

```scss
$border-radius: 0.5rem;
$border-radius-sm: 0.25rem;
$border-radius-lg: 0.75rem;
$border-radius-xl: 1rem;
$border-radius-pill: 50rem;
```

#### Shadows

```scss
$box-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
$box-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
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

### Pre-built Color Schemes

The template includes several pre-built color schemes in `src-modern/styles/scss/themes/`:

```scss
// themes/_blue.scss
$primary: #2563eb;
$primary-light: #3b82f6;
$primary-dark: #1d4ed8;

// themes/_purple.scss
$primary: #7c3aed;
$primary-light: #8b5cf6;
$primary-dark: #6d28d9;

// themes/_green.scss
$primary: #059669;
$primary-light: #10b981;
$primary-dark: #047857;
```

To use a different theme, import it in `main.scss`:

```scss
// Import theme before other styles
@import 'themes/purple';
@import 'abstracts/variables';
// ... rest of imports
```

---

## Typography

### Font Family

```scss
// Primary font (UI elements)
$font-family-sans-serif: 'Inter', system-ui, -apple-system, sans-serif;

// Monospace font (code blocks)
$font-family-monospace: 'JetBrains Mono', 'Fira Code', monospace;

// Heading font (optional different font for headings)
$headings-font-family: $font-family-sans-serif;
```

### Font Sizes

```scss
$font-size-base: 0.9rem;    // 14.4px
$font-size-sm: 0.8rem;      // 12.8px
$font-size-lg: 1.1rem;      // 17.6px

// Heading sizes
$h1-font-size: 2.5rem;
$h2-font-size: 2rem;
$h3-font-size: 1.75rem;
$h4-font-size: 1.5rem;
$h5-font-size: 1.25rem;
$h6-font-size: 1rem;
```

### Font Weights

```scss
$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

$headings-font-weight: 600;
```

### Line Heights

```scss
$line-height-base: 1.5;
$line-height-sm: 1.25;
$line-height-lg: 2;

$headings-line-height: 1.2;
```

### Using Custom Fonts

1. **Add font files** to `src-modern/assets/fonts/`

2. **Import in SCSS**:

```scss
// In abstracts/_fonts.scss
@font-face {
  font-family: 'CustomFont';
  src: url('../assets/fonts/CustomFont.woff2') format('woff2'),
       url('../assets/fonts/CustomFont.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

3. **Use in variables**:

```scss
$font-family-sans-serif: 'CustomFont', system-ui, sans-serif;
```

---

## Layout Customization

### Sidebar Width

```scss
// Sidebar dimensions
$sidebar-width: 260px;
$sidebar-collapsed-width: 70px;
$sidebar-transition: 0.3s ease;
```

### Header Height

```scss
$header-height: 60px;
$header-height-mobile: 56px;
```

### Content Area

```scss
// Main content padding
$content-padding: 1.5rem;
$content-padding-mobile: 1rem;

// Container max-width
$container-max-width: 1400px;
```

### Grid Customization

```scss
// Custom breakpoints
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);

// Container widths
$container-max-widths: (
  sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px,
  xxl: 1320px
);
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
    font-weight: $font-weight-semibold;
    color: var(--bs-heading-color);
  }

  &__body {
    // Widget content styles
  }

  // Variants
  &--primary {
    border-left: 4px solid $primary;
  }

  &--success {
    border-left: 4px solid $success;
  }
}
```

### Step 2: Import in Main SCSS

```scss
// In main.scss
@import 'components/custom-widget';
```

### Step 3: Create Component JavaScript

Create a new file in `src-modern/scripts/components/`:

```javascript
// components/custom-widget.js
import Alpine from 'alpinejs';

document.addEventListener('alpine:init', () => {
  Alpine.data('customWidget', (config = {}) => ({
    isLoading: false,
    data: null,

    init() {
      this.loadData();
    },

    async loadData() {
      this.isLoading = true;
      try {
        // Fetch data logic
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
<div class="custom-widget custom-widget--primary" x-data="customWidget()">
  <div class="custom-widget__header">
    <h5 class="custom-widget__title">Widget Title</h5>
    <button @click="loadData()" class="btn btn-sm btn-light">
      <i class="bi bi-arrow-clockwise"></i>
    </button>
  </div>
  <div class="custom-widget__body">
    <template x-if="isLoading">
      <div class="text-center py-4">
        <div class="spinner-border text-primary"></div>
      </div>
    </template>
    <template x-if="!isLoading && data">
      <div x-text="data"></div>
    </template>
  </div>
</div>
```

---

## Dark Mode

### How Dark Mode Works

The template uses CSS custom properties and Bootstrap's `data-bs-theme` attribute:

```html
<!-- Light mode -->
<html data-bs-theme="light">

<!-- Dark mode -->
<html data-bs-theme="dark">
```

### Customizing Dark Mode Colors

Override dark mode colors in `src-modern/styles/scss/themes/_dark.scss`:

```scss
[data-bs-theme="dark"] {
  // Background colors
  --bs-body-bg: #0f172a;
  --bs-body-bg-rgb: 15, 23, 42;

  // Card backgrounds
  --bs-card-bg: #1e293b;

  // Text colors
  --bs-body-color: #e2e8f0;
  --bs-heading-color: #f1f5f9;

  // Border colors
  --bs-border-color: #334155;

  // Custom component colors
  --sidebar-bg: #1e293b;
  --header-bg: #1e293b;
}
```

### Implementing Theme Toggle

```javascript
// Theme switching logic
Alpine.data('themeSwitch', () => ({
  theme: localStorage.getItem('theme') || 'light',

  init() {
    this.applyTheme(this.theme);
  },

  toggle() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.theme);
    localStorage.setItem('theme', this.theme);
  },

  applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
}));
```

```html
<button x-data="themeSwitch()" @click="toggle()" class="btn btn-light">
  <i class="bi" :class="theme === 'light' ? 'bi-moon' : 'bi-sun'"></i>
</button>
```

---

## CSS Custom Properties Reference

### Colors

```css
:root {
  --bs-primary: #6366f1;
  --bs-secondary: #64748b;
  --bs-success: #10b981;
  --bs-info: #06b6d4;
  --bs-warning: #f59e0b;
  --bs-danger: #ef4444;
  --bs-light: #f8fafc;
  --bs-dark: #0f172a;
}
```

### Layout

```css
:root {
  --sidebar-width: 260px;
  --sidebar-collapsed-width: 70px;
  --header-height: 60px;
  --content-padding: 1.5rem;
}
```

### Typography

```css
:root {
  --bs-font-sans-serif: 'Inter', system-ui, sans-serif;
  --bs-font-monospace: 'JetBrains Mono', monospace;
  --bs-body-font-size: 0.9rem;
  --bs-body-line-height: 1.5;
}
```

---

## Build Customization

### Vite Configuration

Edit `vite.config.js` for build customization:

```javascript
export default defineConfig({
  // Custom build output directory
  build: {
    outDir: 'dist-custom',

    // Chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-bootstrap': ['bootstrap', '@popperjs/core'],
          'vendor-charts': ['chart.js', 'apexcharts'],
          'vendor-ui': ['alpinejs', 'sweetalert2'],
        }
      }
    }
  },

  // Custom dev server port
  server: {
    port: 8080
  }
});
```

### Environment Variables

Create `.env.local` for local configuration:

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

For more detailed examples, explore the source files in `src-modern/`.
