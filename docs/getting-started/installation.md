# Installation Guide

This comprehensive guide will walk you through installing and setting up Metis Bootstrap 5 admin template on your system.

## Installation Methods

### Method 1: Direct Download (Recommended)

The simplest way to get started with Metis is to download the template files directly.

#### Step 1: Download the Template
1. Download the Metis template package
2. Extract the archive to your desired location
3. You should see a folder structure like this:

```
metis-bootstrap-5/
├── src-modern/           # Modern Bootstrap 5 version
├── public/              # Legacy version (for reference)
├── docs/                # Documentation
└── README.md            # Project overview
```

#### Step 2: Navigate to the Modern Version
```bash
cd metis-bootstrap-5/src-modern
```

#### Step 3: Set Up Local Web Server
Since modern browsers have CORS restrictions, you'll need a local web server:

**Option A: Using Python (if installed)**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Option B: Using Node.js (if installed)**
```bash
# Install live-server globally
npm install -g live-server

# Start server
live-server
```

**Option C: Using VS Code Live Server Extension**
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

#### Step 4: Open in Browser
Navigate to `http://localhost:8000` (or the port your server is using)

### Method 2: Development Setup (Advanced)

For developers who want to use build tools and customize SCSS:

#### Prerequisites
- **Node.js** 16.0.0 or higher
- **npm** 8.0.0 or higher

#### Step 1: Install Dependencies
```bash
cd metis-bootstrap-5/src-modern
npm install
```

#### Step 2: Development Server
```bash
npm run dev
```

This will:
- Start a development server (usually on `http://localhost:3000`)
- Enable hot reloading
- Compile SCSS files
- Watch for file changes

#### Step 3: Build for Production
```bash
npm run build
```

This creates optimized files in the `dist/` directory.

### Method 3: CDN Setup (Quick Start)

For rapid prototyping, you can use CDN resources:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Metis Admin</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.css" rel="stylesheet">
    
    <!-- Custom CSS (you'll need to host this) -->
    <link href="path/to/metis-custom.css" rel="stylesheet">
</head>
<body>
    <!-- Your content here -->
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Alpine.js -->
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.9/dist/cdn.min.js" defer></script>
</body>
</html>
```

## File Structure Overview

After installation, you'll have this structure:

```
src-modern/
├── index.html                    # Main dashboard
├── analytics.html               # Analytics page
├── users.html                   # User management
├── products.html                # Product management
├── orders.html                  # Order management
├── elements.html                # UI components showcase
├── elements-*.html              # Individual component pages
├── styles/
│   └── scss/
│       ├── main.scss           # Main stylesheet
│       ├── abstracts/          # Variables and mixins
│       │   ├── _variables.scss
│       │   ├── _mixins.scss
│       │   └── _utilities.scss
│       ├── components/         # Component styles
│       │   ├── _buttons.scss
│       │   ├── _cards.scss
│       │   ├── _forms.scss
│       │   ├── _navigation.scss
│       │   └── ...
│       ├── layout/             # Layout styles
│       │   ├── _header.scss
│       │   ├── _sidebar.scss
│       │   ├── _main.scss
│       │   └── _footer.scss
│       ├── pages/              # Page-specific styles
│       │   ├── _dashboard.scss
│       │   ├── _analytics.scss
│       │   └── ...
│       └── themes/             # Theme variations
│           ├── _dark.scss
│           └── _light.scss
├── scripts/
│   ├── main.js                 # Main JavaScript
│   ├── components/             # Page-specific scripts
│   │   ├── dashboard.js
│   │   ├── analytics.js
│   │   ├── users.js
│   │   └── ...
│   └── utils/                  # Utility functions
│       ├── theme-manager.js
│       ├── notifications.js
│       └── icon-manager.js
├── assets/
│   ├── images/                 # Images and graphics
│   │   ├── logo.svg
│   │   └── placeholders/
│   └── icons/                  # Favicons and PWA icons
│       ├── favicon.svg
│       ├── favicon.png
│       └── icon-*.png
├── manifest.json               # PWA manifest
└── package.json               # Dependencies (if using npm)
```

## Configuration

### Environment Configuration

Create a basic configuration file for your environment:

```javascript
// config.js
const config = {
  development: {
    apiUrl: 'http://localhost:3000/api',
    debug: true,
    theme: 'light'
  },
  production: {
    apiUrl: 'https://your-api.com/api',
    debug: false,
    theme: 'light'
  }
};

export default config;
```

### SCSS Configuration

If using the development setup, customize variables:

```scss
// styles/scss/abstracts/_variables.scss

// Brand colors
$primary: #6366f1;
$secondary: #64748b;
$success: #10b981;
$warning: #f59e0b;
$danger: #ef4444;
$info: #3b82f6;

// Typography
$font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
$font-size-base: 0.875rem;
$line-height-base: 1.6;

// Layout
$sidebar-width: 280px;
$sidebar-mini-width: 80px;
$header-height: 70px;

// Spacing
$spacer: 1rem;
$spacers: (
  0: 0,
  1: $spacer * 0.25,
  2: $spacer * 0.5,
  3: $spacer,
  4: $spacer * 1.5,
  5: $spacer * 3,
);

// Border radius
$border-radius: 0.75rem;
$border-radius-sm: 0.5rem;
$border-radius-lg: 1rem;
```

## Verification

### Step 1: Check Installation
Ensure all files are in place:

```bash
# Check if main files exist
ls -la index.html
ls -la styles/scss/main.scss
ls -la scripts/main.js
ls -la assets/images/logo.svg
```

### Step 2: Test in Browser
1. Open `index.html` in your browser
2. Verify the dashboard loads correctly
3. Check that navigation works
4. Test theme switching (light/dark toggle)
5. Verify responsive design on mobile

### Step 3: Console Check
Open browser developer tools and verify:
- No JavaScript errors in console
- All resources load successfully
- No 404 errors for missing files

## Dependencies

### Core Dependencies (Included)
- **Bootstrap 5.3.7**: CSS framework
- **Bootstrap Icons**: Icon library
- **Alpine.js 3.14.9**: Reactive JavaScript framework

### Optional Dependencies (Development)
- **Node.js 16+**: Build tools
- **Vite**: Build tool and dev server
- **Sass**: CSS preprocessing
- **ESLint**: Code linting
- **Prettier**: Code formatting

### External Dependencies (CDN)
- **Chart.js**: Data visualization
- **Day.js**: Date manipulation
- **SweetAlert2**: Enhanced alerts
- **Google Fonts**: Typography

## Common Installation Issues

### Issue 1: Files Not Loading
**Symptoms**: Blank page, missing styles, or broken layout
**Solution**: 
```bash
# Check file paths
ls -la styles/scss/
ls -la scripts/

# Verify web server is running
curl http://localhost:8000
```

### Issue 2: CORS Errors
**Symptoms**: Console errors about cross-origin requests
**Solution**: Always use a local web server, never open files directly in browser

### Issue 3: Node.js Version Issues
**Symptoms**: npm install fails or build errors
**Solution**: 
```bash
# Check Node.js version
node --version  # Should be 16.0.0 or higher

# Update Node.js if needed
# Visit https://nodejs.org/
```

### Issue 4: Port Already in Use
**Symptoms**: "Port 8000 is already in use" error
**Solution**: 
```bash
# Use a different port
python -m http.server 8080

# Or find and kill the process
lsof -ti:8000 | xargs kill
```

## Security Considerations

### Development Environment
- Use HTTPS in production
- Validate all user inputs
- Sanitize data before display
- Implement proper authentication

### File Permissions
Ensure proper file permissions:
```bash
# Make scripts executable (if needed)
chmod +x scripts/*.js

# Set proper directory permissions
chmod 755 assets/
chmod 644 assets/images/*
```

## Next Steps

After successful installation:

1. **[First Run](first-run.md)**: Complete the initial setup
2. **[Features Overview](../overview/features.md)**: Explore template features
3. **[Introduction](../overview/introduction.md)**: Learn about the template architecture

## Getting Help

If you encounter issues during installation:

### Documentation
- **[System Requirements](requirements.md)**: Check prerequisites
- **[Quick Start Guide](quick-start.md)**: Get up and running quickly
- **[Welcome Guide](welcome.md)**: Introduction to the template

### Community Resources
- **GitHub Issues**: Report bugs and get help
- **Stack Overflow**: Community-driven support
- **Bootstrap Documentation**: Official Bootstrap 5 docs

### Professional Support
For commercial projects requiring professional support:
- **Custom Development**: Tailored solutions
- **Priority Support**: Fast response times
- **Training**: Team training sessions

---

**Installation Complete!** Continue to [First Run](first-run.md) to complete the setup process and start customizing your Metis admin template.