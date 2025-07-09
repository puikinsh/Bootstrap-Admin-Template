# Quick Start Guide

Get up and running with Metis in just a few minutes. This guide will help you set up the template and start building your admin dashboard.

## Prerequisites

Before you begin, ensure you have the following:

- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge
- **Code Editor**: VS Code, Sublime Text, or similar
- **Basic Knowledge**: HTML, CSS, and JavaScript fundamentals
- **Node.js** (optional): For build tools and development server

## Installation Options

### Option 1: Direct Download (Recommended for Beginners)

1. **Download** the Metis template files
2. **Extract** the archive to your desired location
3. **Navigate** to the `src-modern` folder
4. **Open** `index.html` in your browser

```
metis-bootstrap-5/
└── src-modern/
    ├── index.html          ← Main dashboard
    ├── analytics.html      ← Analytics page
    ├── users.html          ← User management
    ├── styles/             ← SCSS files
    ├── scripts/            ← JavaScript files
    └── assets/             ← Images and icons
```

### Option 2: Development Setup (Advanced)

If you want to use the build tools and development server:

```bash
# Navigate to the project directory
cd metis-bootstrap-5/src-modern

# Install dependencies (if package.json exists)
npm install

# Start development server
npm run dev
```

## First Look

Once you have the template running, you'll see:

### Main Dashboard (`index.html`)
- **Header Navigation**: Brand logo, search, theme toggle, user menu
- **Sidebar Navigation**: Main menu with collapsible sections
- **Dashboard Content**: KPI cards, charts, and activity feed
- **Footer**: Simple footer with version info

### Key Features to Explore
- **Theme Toggle**: Switch between light and dark themes
- **Responsive Design**: Resize your browser to see mobile layouts
- **Navigation**: Explore different pages through the sidebar
- **Interactive Elements**: Hover effects, animations, and transitions

## File Structure Overview

```
src-modern/
├── index.html              # Main dashboard
├── analytics.html          # Analytics dashboard
├── users.html              # User management
├── products.html           # Product management
├── orders.html             # Order management
├── elements.html           # UI components showcase
├── elements-*.html         # Individual component pages
├── styles/
│   └── scss/
│       ├── main.scss       # Main stylesheet
│       ├── abstracts/      # Variables, mixins
│       ├── components/     # Component styles
│       ├── layout/         # Layout styles
│       └── pages/          # Page-specific styles
├── scripts/
│   ├── main.js             # Main JavaScript
│   ├── components/         # Page-specific scripts
│   └── utils/              # Utility functions
└── assets/
    ├── images/             # Images and graphics
    └── icons/              # Icons and favicons
```

## Basic Customization

### 1. Change Colors

Edit the color variables in `styles/scss/abstracts/_variables.scss`:

```scss
// Primary color
$primary: #6366f1;          // Default: Indigo
$primary-dark: #4f46e5;     // Darker shade

// Success color
$success: #10b981;          // Default: Green
$success-dark: #059669;     // Darker shade

// Custom colors
$gray-50: #f8fafc;
$gray-900: #0f172a;
```

### 2. Update Logo

Replace the logo files in `assets/images/`:
- `logo.svg` - Main logo (SVG format recommended)
- Update the logo reference in HTML files

### 3. Customize Typography

Modify font settings in `styles/scss/abstracts/_variables.scss`:

```scss
// Font family
$font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

// Font weights
$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;
```

### 4. Modify Layout

Adjust layout dimensions in `styles/scss/abstracts/_variables.scss`:

```scss
// Sidebar
$sidebar-width: 280px;
$sidebar-mini-width: 80px;

// Header
$header-height: 70px;

// Responsive breakpoints
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);
```

## Essential Components

### Navigation
- **Sidebar**: Main navigation with collapsible sections
- **Header**: Top navigation with search and user menu
- **Breadcrumbs**: Page hierarchy navigation

### UI Elements
- **Cards**: Content containers with headers and footers
- **Buttons**: Various styles and states
- **Forms**: Input fields with validation
- **Tables**: Data display with sorting and filtering
- **Modals**: Dialog boxes and overlays
- **Alerts**: Notification messages

### Interactive Features
- **Charts**: Data visualization with Chart.js
- **Theme Switching**: Dark/light mode toggle
- **Search**: Global search functionality
- **File Upload**: Drag-and-drop file handling
- **Notifications**: Toast messages and alerts

## Next Steps

Now that you have Metis running, here's what to do next:

### 1. Explore the Template
- **Browse all pages** to understand the full feature set
- **Test responsive design** on different screen sizes
- **Try interactive elements** like theme switching and search

### 2. Read the Documentation
- [Template Overview](../overview/features.md) - Comprehensive feature list
- [Template Introduction](../overview/introduction.md) - Understanding the template architecture

### 3. Start Customizing
- Review the customization examples in this guide
- Modify the SCSS variables in `styles/scss/abstracts/_variables.scss`
- Update logo files in `assets/images/` directory

### 4. Build Your Application
- Set up your development environment using the build tools
- Create new components following the existing patterns
- Integrate with your backend APIs using the provided examples

## Common First Steps

### Adding a New Page
1. Create a new HTML file based on existing pages
2. Update the navigation in the sidebar
3. Add page-specific styles if needed
4. Include any required JavaScript

### Customizing the Dashboard
1. Modify the KPI cards with your data
2. Update chart configurations
3. Customize the activity feed
4. Add or remove dashboard widgets

### Setting Up Your Brand
1. Replace logo files in `assets/images/`
2. Update color scheme in SCSS variables
3. Modify the page title and meta tags
4. Customize the favicon

## Troubleshooting

### Common Issues
- **Styles not loading**: Check file paths and SCSS compilation
- **JavaScript errors**: Verify script includes and dependencies
- **Layout issues**: Review responsive breakpoints and CSS

### Getting Help
- Review the documentation files in the `docs/` directory
- Check the template's built-in examples and comments
- Refer to Bootstrap 5 documentation for framework-specific questions

---

**Congratulations!** You now have Metis running and ready for customization. Continue to the [System Requirements](requirements.md) to learn about technical prerequisites, or explore the [Template Overview](../overview/features.md) to understand the available features.