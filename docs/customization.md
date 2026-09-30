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
// Primary brand color — the single accent. It marks primary actions, the active
// nav item and focus rings; it is not used to tint icon tiles or headings.
$primary: #2563eb;    // Blue 600

// Semantic colors — all 600-step, so each clears 4.5:1 on white for text and
// stays legible as a 2px chart line.
$secondary: #52525b;  // Zinc 600
$success: #16a34a;    // Green 600
$info: #0891b2;       // Cyan 600
$warning: #d97706;    // Amber 600
$danger: #dc2626;     // Red 600
$light: #fafafa;      // Zinc 50
$dark: #18181b;       // Zinc 900

// Extended palette — charts and the showcase pages only.
$purple: #7c3aed;
$pink: #db2777;
$teal: #0d9488;
$orange: #ea580c;
```

#### Grayscale

Zinc, not Slate. Slate carries a blue cast that reads as "tinted grey" next to a
blue accent; Zinc is near-achromatic, so the accent is the only chroma on a
default screen.

```scss
$gray-50:  #fafafa;
$gray-100: #f4f4f5;
$gray-200: #e4e4e7;
$gray-300: #d4d4d8;
$gray-400: #a1a1aa;
$gray-500: #71717a;
$gray-600: #52525b;
$gray-700: #3f3f46;
$gray-800: #27272a;
$gray-900: #18181b;
$gray-950: #09090b;
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

### Responsive Sidebar Behavior

The sidebar has two distinct modes controlled by the `SidebarManager` class. Both modes are driven by the CSS custom properties above, so changing them adjusts both modes simultaneously.

**Desktop (>= 992px):** Toggle between full and collapsed sidebar by changing:

```scss
// Full sidebar width
$sidebar-width: 280px;

// Collapsed (mini) sidebar width - shows icons only
$sidebar-mini-width: 70px;
```

**Mobile (< 992px):** The sidebar uses the full `--sidebar-width` value but slides in as an overlay. To adjust the mobile sidebar width independently, add a media query override:

```scss
@media (max-width: 991.98px) {
  :root {
    --sidebar-width: 260px; // narrower on mobile if desired
  }
}
```

### Hamburger Button Styling

The hamburger toggle button (`.hamburger-menu`) is defined in `components/_hamburger.scss`. Key customization points:

```scss
.hamburger-menu {
  // Button size
  width: 40px;
  height: 40px;

  // Icon size
  i { font-size: 1.2rem; }

  // Hover background
  &:hover {
    background-color: rgba(var(--bs-secondary-rgb), 0.08);
  }
}
```

On desktop, the hamburger is absolutely positioned at the right edge of the sidebar. Adjust its horizontal position by changing the `left` value:

```scss
@media (min-width: 992px) {
  .admin-header .hamburger-menu {
    left: calc(var(--sidebar-width) - 40px - 0.5rem);
  }
}
```

### Mobile Sidebar Overlay

The sidebar backdrop (`.sidebar-backdrop`) provides the semi-transparent overlay behind the mobile sidebar. Customize its appearance:

```scss
.sidebar-backdrop {
  background-color: rgba(0, 0, 0, 0.5); // darkness level
  z-index: 1040;
}
```

The mobile sidebar shadow can be adjusted in `layout/_sidebar.scss`:

```scss
@media (max-width: 991.98px) {
  .admin-sidebar.show {
    box-shadow: 4px 0 16px rgba(0, 0, 0, 0.15);
  }
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

Dark mode is designed, not colour-flipped: the app ground is the darkest
surface and panels sit one step *above* it, the inverse of the light theme's
relationship. That is what keeps a dark UI reading as layered rather than muddy.

```scss
[data-bs-theme="dark"] {
  // Surfaces — panels sit above the app ground
  --surface-app: #09090b;     // Zinc 950
  --surface-panel: #18181b;   // Zinc 900
  --surface-sunken: #09090b;
  --surface-hover: #27272a;

  // Ink
  --ink-primary: #f4f4f5;
  --ink-secondary: #a1a1aa;
  --ink-muted: #71717a;

  // Borders carry the structure, so they matter more here than in light mode
  --bs-border-color: #27272a;
}
```

Keep card backgrounds fully opaque. They were previously `rgba(30, 41, 59, 0.7)`,
which let every card blend with whatever sat behind it so no two matched.

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

    // Chunk splitting (already configured) — Vite 8 / rolldown requires the
    // function form. Each branch returns the chunk name an `id` belongs to.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/bootstrap/') || id.includes('node_modules/@popperjs/core/')) {
            return 'vendor-bootstrap';
          }
          if (id.includes('node_modules/chart.js/') || id.includes('node_modules/@kurkle/color/') || id.includes('node_modules/chartjs-chart-treemap/')) {
            return 'vendor-charts';
          }
          if (id.includes('node_modules/alpinejs/') || id.includes('node_modules/sweetalert2/')) {
            return 'vendor-ui';
          }
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
│   ├── _hamburger.scss     # Sidebar toggle button
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
