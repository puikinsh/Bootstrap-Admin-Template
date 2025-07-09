# Styling and Theming Guide

This guide covers how to customize the visual appearance of Metis to match your brand and requirements.

## SCSS Architecture

Metis uses a modular SCSS architecture organized into distinct layers:

```
styles/scss/
├── main.scss              # Main entry point
├── abstracts/             # Variables, mixins, utilities
│   ├── _variables.scss    # Design tokens and theme variables
│   ├── _mixins.scss       # Reusable mixins
│   └── _utilities.scss    # Utility classes
├── components/            # Component-specific styles
│   ├── _buttons.scss      # Button styles
│   ├── _cards.scss        # Card components
│   ├── _forms.scss        # Form elements
│   ├── _navigation.scss   # Navigation components
│   └── ...
├── layout/               # Layout styles
│   ├── _header.scss      # Header layout
│   ├── _sidebar.scss     # Sidebar layout
│   └── _main.scss        # Main content area
├── pages/                # Page-specific styles
│   ├── _dashboard.scss   # Dashboard styles
│   ├── _analytics.scss   # Analytics page
│   └── ...
└── themes/               # Theme variations
    ├── _light.scss       # Light theme
    └── _dark.scss        # Dark theme
```

## Color Customization

### Primary Brand Colors

Edit `styles/scss/abstracts/_variables.scss`:

```scss
// Brand Colors
$primary: #6366f1;          // Primary brand color
$primary-dark: #4f46e5;     // Darker shade for hover states
$primary-light: #a5b4fc;    // Lighter shade for backgrounds

$secondary: #64748b;         // Secondary brand color
$secondary-dark: #475569;    // Darker shade
$secondary-light: #cbd5e1;   // Lighter shade

// Accent Colors
$accent: #f59e0b;           // Accent/warning color
$accent-dark: #d97706;      // Darker accent
$accent-light: #fbbf24;     // Lighter accent
```

### Status Colors

```scss
// Status Colors
$success: #10b981;          // Success states
$success-dark: #059669;     // Darker success
$success-light: #34d399;    // Lighter success

$warning: #f59e0b;          // Warning states
$warning-dark: #d97706;     // Darker warning
$warning-light: #fbbf24;    // Lighter warning

$danger: #ef4444;           // Error/danger states
$danger-dark: #dc2626;      // Darker danger
$danger-light: #f87171;     // Lighter danger

$info: #3b82f6;             // Info states
$info-dark: #2563eb;        // Darker info
$info-light: #60a5fa;       // Lighter info
```

### Gray Scale

```scss
// Gray Scale
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

### Custom Color Palette

Create your own color palette:

```scss
// Custom Brand Palette
$brand-colors: (
  'primary': $primary,
  'secondary': $secondary,
  'accent': $accent,
  'success': $success,
  'warning': $warning,
  'danger': $danger,
  'info': $info
);

// Generate utility classes
@each $name, $color in $brand-colors {
  .text-#{$name} { color: $color; }
  .bg-#{$name} { background-color: $color; }
  .border-#{$name} { border-color: $color; }
}
```

## Typography

### Font Configuration

```scss
// Font Families
$font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
$font-family-secondary: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
$font-family-monospace: 'Fira Code', 'Monaco', 'Consolas', 'Ubuntu Mono', monospace;

// Font Sizes
$font-size-xs: 0.75rem;     // 12px
$font-size-sm: 0.875rem;    // 14px
$font-size-base: 1rem;      // 16px
$font-size-lg: 1.125rem;    // 18px
$font-size-xl: 1.25rem;     // 20px
$font-size-2xl: 1.5rem;     // 24px
$font-size-3xl: 1.875rem;   // 30px
$font-size-4xl: 2.25rem;    // 36px

// Font Weights
$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;
$font-weight-black: 900;

// Line Heights
$line-height-tight: 1.25;
$line-height-snug: 1.375;
$line-height-normal: 1.5;
$line-height-relaxed: 1.625;
$line-height-loose: 2;
```

### Typography Scale

```scss
// Heading Styles
$h1-font-size: $font-size-4xl;
$h1-font-weight: $font-weight-bold;
$h1-line-height: $line-height-tight;

$h2-font-size: $font-size-3xl;
$h2-font-weight: $font-weight-semibold;
$h2-line-height: $line-height-tight;

$h3-font-size: $font-size-2xl;
$h3-font-weight: $font-weight-semibold;
$h3-line-height: $line-height-snug;

$h4-font-size: $font-size-xl;
$h4-font-weight: $font-weight-medium;
$h4-line-height: $line-height-snug;

$h5-font-size: $font-size-lg;
$h5-font-weight: $font-weight-medium;
$h5-line-height: $line-height-normal;

$h6-font-size: $font-size-base;
$h6-font-weight: $font-weight-medium;
$h6-line-height: $line-height-normal;
```

## Layout Customization

### Container and Spacing

```scss
// Container Widths
$container-max-widths: (
  sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px,
  xxl: 1320px
);

// Spacing Scale
$spacer: 1rem;
$spacers: (
  0: 0,
  1: $spacer * 0.25,    // 4px
  2: $spacer * 0.5,     // 8px
  3: $spacer,           // 16px
  4: $spacer * 1.5,     // 24px
  5: $spacer * 3,       // 48px
  6: $spacer * 4,       // 64px
  7: $spacer * 5,       // 80px
  8: $spacer * 6        // 96px
);

// Component Spacing
$component-padding: 1.5rem;
$component-margin: 1rem;
$section-padding: 2rem;
```

### Layout Dimensions

```scss
// Sidebar
$sidebar-width: 280px;
$sidebar-mini-width: 80px;
$sidebar-transition: all 0.3s ease;

// Header
$header-height: 70px;
$header-padding: 1rem;
$header-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

// Main Content
$main-padding: 2rem;
$main-max-width: 1200px;

// Footer
$footer-height: 60px;
$footer-padding: 1rem;
```

## Component Customization

### Button Styles

```scss
// Button Variables
$btn-padding-y: 0.5rem;
$btn-padding-x: 1rem;
$btn-font-size: $font-size-sm;
$btn-font-weight: $font-weight-medium;
$btn-line-height: 1.5;
$btn-border-radius: 0.5rem;
$btn-transition: all 0.15s ease-in-out;

// Button Sizes
$btn-padding-y-sm: 0.25rem;
$btn-padding-x-sm: 0.5rem;
$btn-font-size-sm: $font-size-xs;

$btn-padding-y-lg: 0.75rem;
$btn-padding-x-lg: 1.5rem;
$btn-font-size-lg: $font-size-base;

// Custom Button Variants
@mixin btn-variant($color, $background, $border) {
  color: $color;
  background-color: $background;
  border-color: $border;

  &:hover,
  &:focus {
    color: $color;
    background-color: darken($background, 7.5%);
    border-color: darken($border, 10%);
  }

  &:active {
    color: $color;
    background-color: darken($background, 10%);
    border-color: darken($border, 12.5%);
  }
}
```

### Card Styles

```scss
// Card Variables
$card-spacer-y: 1rem;
$card-spacer-x: 1rem;
$card-border-width: 1px;
$card-border-color: $gray-200;
$card-border-radius: 0.75rem;
$card-bg: $white;
$card-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

// Card Hover Effect
$card-hover-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
$card-hover-transform: translateY(-2px);

// Card Header
$card-header-padding-y: 0.75rem;
$card-header-padding-x: 1rem;
$card-header-bg: $gray-50;
$card-header-border-color: $gray-200;
```

### Form Elements

```scss
// Form Variables
$input-padding-y: 0.5rem;
$input-padding-x: 0.75rem;
$input-font-size: $font-size-sm;
$input-line-height: 1.5;
$input-bg: $white;
$input-border-color: $gray-300;
$input-border-radius: 0.5rem;
$input-focus-border-color: $primary;
$input-focus-box-shadow: 0 0 0 0.2rem rgba($primary, 0.25);

// Form Sizes
$input-padding-y-sm: 0.25rem;
$input-padding-x-sm: 0.5rem;
$input-font-size-sm: $font-size-xs;

$input-padding-y-lg: 0.75rem;
$input-padding-x-lg: 1rem;
$input-font-size-lg: $font-size-base;
```

## Theme System

### Dark Theme Variables

```scss
// Dark Theme Colors
$dark-bg-primary: #1e293b;
$dark-bg-secondary: #334155;
$dark-bg-tertiary: #475569;
$dark-text-primary: #f8fafc;
$dark-text-secondary: #cbd5e1;
$dark-text-muted: #94a3b8;
$dark-border-color: #475569;

// Dark Theme Implementation
[data-theme="dark"] {
  --bg-primary: #{$dark-bg-primary};
  --bg-secondary: #{$dark-bg-secondary};
  --bg-tertiary: #{$dark-bg-tertiary};
  --text-primary: #{$dark-text-primary};
  --text-secondary: #{$dark-text-secondary};
  --text-muted: #{$dark-text-muted};
  --border-color: #{$dark-border-color};
}
```

### Light Theme Variables

```scss
// Light Theme Colors
$light-bg-primary: #ffffff;
$light-bg-secondary: #f8fafc;
$light-bg-tertiary: #f1f5f9;
$light-text-primary: #0f172a;
$light-text-secondary: #334155;
$light-text-muted: #64748b;
$light-border-color: #e2e8f0;

// Light Theme Implementation
[data-theme="light"] {
  --bg-primary: #{$light-bg-primary};
  --bg-secondary: #{$light-bg-secondary};
  --bg-tertiary: #{$light-bg-tertiary};
  --text-primary: #{$light-text-primary};
  --text-secondary: #{$light-text-secondary};
  --text-muted: #{$light-text-muted};
  --border-color: #{$light-border-color};
}
```

## Animation and Transitions

### Transition Variables

```scss
// Transition Durations
$transition-fast: 0.15s;
$transition-base: 0.3s;
$transition-slow: 0.5s;

// Transition Easings
$ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
$ease-out: cubic-bezier(0, 0, 0.2, 1);
$ease-in: cubic-bezier(0.4, 0, 1, 1);

// Common Transitions
$transition-colors: color $transition-base $ease-in-out,
                   background-color $transition-base $ease-in-out,
                   border-color $transition-base $ease-in-out;

$transition-transform: transform $transition-base $ease-in-out;
$transition-opacity: opacity $transition-base $ease-in-out;
$transition-shadow: box-shadow $transition-base $ease-in-out;
```

### Animation Mixins

```scss
// Fade In Animation
@mixin fade-in($duration: $transition-base) {
  opacity: 0;
  animation: fadeIn $duration $ease-in-out forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

// Slide In Animation
@mixin slide-in($direction: 'up', $distance: 20px, $duration: $transition-base) {
  opacity: 0;
  @if $direction == 'up' {
    transform: translateY($distance);
  } @else if $direction == 'down' {
    transform: translateY(-$distance);
  } @else if $direction == 'left' {
    transform: translateX($distance);
  } @else if $direction == 'right' {
    transform: translateX(-$distance);
  }
  animation: slideIn#{capitalize($direction)} $duration $ease-in-out forwards;
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Scale Animation
@mixin scale-in($duration: $transition-base) {
  opacity: 0;
  transform: scale(0.95);
  animation: scaleIn $duration $ease-in-out forwards;
}

@keyframes scaleIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

## Responsive Design

### Breakpoint System

```scss
// Breakpoint Map
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);

// Responsive Mixins
@mixin media-breakpoint-up($name) {
  $min: map-get($grid-breakpoints, $name);
  @media (min-width: $min) {
    @content;
  }
}

@mixin media-breakpoint-down($name) {
  $max: map-get($grid-breakpoints, $name) - 0.02;
  @media (max-width: $max) {
    @content;
  }
}

@mixin media-breakpoint-between($lower, $upper) {
  $min: map-get($grid-breakpoints, $lower);
  $max: map-get($grid-breakpoints, $upper) - 0.02;
  @media (min-width: $min) and (max-width: $max) {
    @content;
  }
}
```

### Responsive Typography

```scss
// Responsive Font Sizes
@mixin responsive-font-size($min-size, $max-size, $min-vw: 320px, $max-vw: 1200px) {
  font-size: $min-size;
  
  @media (min-width: $min-vw) {
    font-size: calc(#{$min-size} + (#{strip-unit($max-size)} - #{strip-unit($min-size)}) * ((100vw - #{$min-vw}) / (#{strip-unit($max-vw)} - #{strip-unit($min-vw)})));
  }
  
  @media (min-width: $max-vw) {
    font-size: $max-size;
  }
}

// Usage
.responsive-heading {
  @include responsive-font-size(1.5rem, 3rem);
}
```

## Best Practices

### 1. Use Design Tokens

```scss
// Define design tokens
$design-tokens: (
  'space': (
    'xs': 0.25rem,
    'sm': 0.5rem,
    'md': 1rem,
    'lg': 1.5rem,
    'xl': 2rem
  ),
  'colors': (
    'primary': $primary,
    'secondary': $secondary,
    'success': $success
  ),
  'typography': (
    'font-size-sm': $font-size-sm,
    'font-size-md': $font-size-base,
    'font-size-lg': $font-size-lg
  )
);

// Token accessor function
@function token($category, $key) {
  @return map-get(map-get($design-tokens, $category), $key);
}

// Usage
.my-component {
  padding: token('space', 'md');
  color: token('colors', 'primary');
  font-size: token('typography', 'font-size-md');
}
```

### 2. Component-Scoped Styles

```scss
// Component-specific styles
.dashboard-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: $card-border-radius;
  padding: $card-spacer-y $card-spacer-x;
  
  &__header {
    margin-bottom: $card-spacer-y;
    padding-bottom: $card-spacer-y * 0.5;
    border-bottom: 1px solid var(--border-color);
  }
  
  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: var(--text-primary);
  }
  
  &__content {
    color: var(--text-secondary);
  }
}
```

### 3. Utility Classes

```scss
// Spacing utilities
@each $prop, $abbrev in (margin: m, padding: p) {
  @each $size, $length in $spacers {
    .#{$abbrev}-#{$size} { #{$prop}: $length !important; }
    .#{$abbrev}t-#{$size} { #{$prop}-top: $length !important; }
    .#{$abbrev}r-#{$size} { #{$prop}-right: $length !important; }
    .#{$abbrev}b-#{$size} { #{$prop}-bottom: $length !important; }
    .#{$abbrev}l-#{$size} { #{$prop}-left: $length !important; }
    .#{$abbrev}x-#{$size} { #{$prop}-left: $length !important; #{$prop}-right: $length !important; }
    .#{$abbrev}y-#{$size} { #{$prop}-top: $length !important; #{$prop}-bottom: $length !important; }
  }
}

// Color utilities
@each $color, $value in $brand-colors {
  .text-#{$color} { color: $value !important; }
  .bg-#{$color} { background-color: $value !important; }
  .border-#{$color} { border-color: $value !important; }
}
```

## Compilation and Build

### Watch Mode

```bash
# Watch SCSS files for changes
npm run watch:scss

# Or with sass directly
sass --watch styles/scss:styles/css
```

### Production Build

```bash
# Build optimized CSS
npm run build:css

# Or with sass directly
sass styles/scss/main.scss styles/css/main.css --style compressed
```

## Next Steps

After customizing your styles:

1. **Test thoroughly** across different browsers and devices
2. **Validate accessibility** with screen readers and keyboard navigation
3. **Optimize performance** by removing unused styles
4. **Document your changes** for future reference

Continue to [JavaScript Customization](javascript.md) to learn about customizing the interactive behavior of your template.