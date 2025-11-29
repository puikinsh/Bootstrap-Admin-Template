# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.2.0] - 2025-11-29

### 🎉 Maintenance Release - Dependencies, Build Optimization & DX Improvements

This release brings all dependencies to their latest versions, significantly improves build performance through chunk splitting, and enhances developer experience with new configuration files.

### 🚀 Build Performance Improvements

- **Vendor Chunk Splitting** - Main bundle reduced from 993KB to 33KB
  - `vendor-bootstrap.js` (82KB) - Bootstrap & Popper
  - `vendor-ui.js` (123KB) - Alpine.js, SweetAlert2, Day.js
  - `vendor-charts.js` (756KB) - Chart.js, ApexCharts
- **Better Browser Caching** - Vendor chunks cached separately from app code
- **Optimized Dependency Pre-bundling** - Faster dev server startup

### 📦 Updated Production Dependencies

- **Font Awesome** 7.0.1 → **7.1.0** - New icons and improvements
- **Alpine.js** 3.15.0 → **3.15.2** - Bug fixes and enhancements
- **ApexCharts** 5.3.5 → **5.3.6** - Chart rendering improvements
- **Chart.js** 4.5.0 → **4.5.1** - Bug fixes
- **Day.js** 1.11.18 → **1.11.19** - Date utilities update
- **SweetAlert2** 11.23.0 → **11.26.3** - Enhanced notification features
- **Lucide** 0.544.0 → **0.555.0** - More icon options

### 📦 Updated Development Dependencies

- **Vite** 7.1.7 → **7.2.4** - Build performance improvements
- **Sass** 1.93.2 → **1.94.2** - Latest SCSS compiler
- **ESLint** 9.36.0 → **9.39.1** - Updated linting rules
- **Prettier** 3.6.2 → **3.7.2** - Improved code formatting
- **Autoprefixer** 10.4.20 → **10.4.22** - Better CSS compatibility
- **PostCSS** 8.5.2 → **8.5.6** - CSS processing updates
- **Rimraf** 6.0.1 → **6.1.2** - Cleanup utility update

### ✨ Added

- **`.prettierrc.json`** - Standardized code formatting configuration
- **`.prettierignore`** - Exclude build artifacts from formatting
- **`.editorconfig`** - IDE-agnostic coding standards
- **`postcss.config.js`** - PostCSS/Autoprefixer configuration
- **`.env.example`** - Environment variable template for easy onboarding
- **`DEVELOPMENT.md`** - Comprehensive development documentation
- **ESLint v9 Configuration** - New `eslint.config.js` flat config format
- **New npm scripts**:
  - `npm run serve` - Build and preview in one command
  - `npm run lint:fix` - Auto-fix linting issues
  - `npm run format:check` - Check formatting without changes
  - `npm run check` - Run lint + format check
  - `npm run clean:all` - Deep clean including node_modules

### 🐛 Fixed

- **Duplicate Method Error** - Fixed duplicate `changePassword()` in security component
- **Unused Bootstrap Imports** - Removed unused Alert, Button, Carousel, ScrollSpy imports
- **ESLint Warnings** - Fixed all 16 warnings (now 0 errors, 0 warnings)

### 🔧 Changed

- **Vite Configuration** - Cleaner syntax with `__dirname` helper
- **CLAUDE.md** - Streamlined to quick reference, detailed docs moved to DEVELOPMENT.md
- **`.gitignore`** - Added environment file patterns, removed CLAUDE.md exclusion

### 🔒 Security

- **0 Vulnerabilities** - All dependencies updated with no known security issues

---

## [3.1.0] - 2025-09-29

### 🎉 Enhanced Release - Dependency Updates & Optimization

This release brings the template to the latest standards with updated dependencies, bug fixes, and codebase cleanup.

### ✨ Added
- **CLAUDE.md** - Comprehensive AI assistant configuration for better development experience
- **Responsive Chart Handling** - Improved chart overflow protection with responsive breakpoints
- **Window Resize Handlers** - Charts now properly resize with browser window changes

### 📦 Updated Dependencies
- **Bootstrap** 5.3.7 → **5.3.8** - Latest Bootstrap framework version
- **Alpine.js** 3.14.9 → **3.15.0** - Enhanced reactive framework
- **ApexCharts** 4.7.0 → **5.3.5** - Major version upgrade with new features
- **Font Awesome** 6.7.2 → **7.0.1** - Major version upgrade with new icons
- **Vite** 7.0.4 → **7.1.7** - Improved build performance
- **Sass** 1.89.2 → **1.93.2** - Latest SCSS compiler
- **ESLint** 9.18.0 → **9.36.0** - Updated linting rules
- **Prettier** 3.4.2 → **3.6.2** - Improved code formatting
- **Day.js** 1.11.13 → **1.11.18** - Date utilities update
- **SweetAlert2** 11.22.1 → **11.23.0** - Enhanced notifications
- **Lucide** 0.469.0 → **0.544.0** - More icon options
- **@vitejs/plugin-legacy** 7.0.0 → **7.2.1** - Better browser compatibility

### 🐛 Fixed
- **Chart Overflow Issue** - Revenue Analytics chart now properly contains itself within card boundaries
- **ApexCharts Responsive Rendering** - Charts properly resize and redraw on container changes
- **CSS Overflow Protection** - Added proper overflow handling in chart containers

### 🧹 Removed (Cleanup)
- **Legacy Configuration Files**
  - Removed `.babelrc` (obsolete with Vite)
  - Removed `.jshintrc` (replaced by ESLint)
  - Removed `.travis.yml` (outdated CI/CD)
  - Removed `.verb.md` (old documentation generator)
- **Legacy Directories**
  - Removed `docs/` directory with outdated Bootstrap 3 documentation
  - Confirmed removal of old `src/` and `dist/` directories
- **Gitignore Cleanup**
  - Removed references to bower_components
  - Removed grunt-html-validation entries
  - Cleaned up vendor directory references

### 🔧 Changed
- **Chart Container Mixin** - Enhanced with better overflow protection and responsive handling
- **Analytics Component** - Added proper chart cleanup and resize event handlers
- **Project Structure** - Streamlined to only modern Bootstrap 5 codebase

## [3.0.0] - 2025-07-08

### 🚀 Major Release - Complete Modernization

This is a **complete rewrite** of the Metis Admin Template with modern web technologies and best practices.

### ✨ Added

#### **Framework & Technology Stack**
- **Bootstrap 5.3.7** - Complete upgrade from Bootstrap 3
- **Alpine.js** - Lightweight reactive framework replacing jQuery
- **Vite Build System** - Modern build tool with HMR and optimizations
- **ES6+ JavaScript** - Modern JavaScript with modules and async/await
- **SCSS Architecture** - Organized, maintainable stylesheet structure
- **Bootstrap Icons** - 1,800+ modern SVG icons

#### **New Dashboard Pages**
- **📈 Analytics Dashboard** - Advanced charts and KPI tracking
- **👥 User Management** - Complete CRUD operations with data tables
- **📦 Product Management** - E-commerce ready product listings with filtering
- **🛒 Order Management** - Order tracking and status management
- **📁 File Manager** - Modern file browser with upload/download capabilities
- **📅 Calendar** - Full-featured event management with modal dialogs
- **💬 Messages** - Modern chat interface with real-time styling
- **📊 Reports** - Advanced data tables with export functionality
- **⚙️ Settings** - Comprehensive admin configuration panels
- **🔒 Security** - User permissions and security settings
- **❓ Help & Support** - FAQ system, documentation, and support tickets

#### **Design System**
- **Dark/Light Mode** - Seamless theme switching with persistence
- **CSS Custom Properties** - Full theme customization support
- **Modern Typography** - Inter font family for enhanced readability
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Component Library** - Reusable UI components with consistent styling
- **Animation System** - Smooth transitions and micro-interactions

#### **Developer Experience**
- **Hot Module Replacement** - Instant development feedback
- **Component Architecture** - Modular, reusable JavaScript components
- **TypeScript Ready** - Full TypeScript support (optional)
- **Modern Build Pipeline** - Optimized assets with tree shaking
- **Source Maps** - Better debugging experience
- **Linting & Formatting** - Code quality tools integration

#### **Interactive Features**
- **Advanced Forms** - Modern form controls with validation
- **Data Tables** - Sortable, filterable, and searchable tables
- **Modal Dialogs** - Enhanced user interactions
- **Toast Notifications** - Rich feedback system
- **Search Functionality** - Global search with results dropdown
- **Keyboard Shortcuts** - Improved accessibility and UX
- **Fullscreen Toggle** - Immersive dashboard experience

### 🔄 Changed

#### **Complete Technology Migration**
- **jQuery → Alpine.js** - Modern reactive framework (95% smaller bundle)
- **LESS → SCSS** - More powerful CSS preprocessing
- **Gulp → Vite** - Lightning-fast build system
- **Bootstrap 3 → Bootstrap 5** - Latest framework with utilities
- **Font Awesome → Bootstrap Icons** - Native Bootstrap icon system
- **Static HTML → Interactive Components** - Rich, app-like experience

#### **Architecture Improvements**
- **Modular JavaScript** - ES6 modules for better organization
- **Component-Based CSS** - ITCSS methodology with BEM naming
- **Performance Optimization** - Tree shaking, code splitting, asset optimization
- **Browser Support** - Modern browsers only (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

#### **Design Evolution**
- **Modern Color Palette** - Updated with contemporary design trends
- **Enhanced Spacing** - Improved visual hierarchy and breathing room
- **Professional Typography** - Better readability and information density
- **Accessibility Improvements** - WCAG 2.1 AA compliance
- **Mobile Experience** - Touch-optimized interactions

### 📦 Technical Improvements

#### **Performance**
- **90%+ Lighthouse Score** - Optimized for Core Web Vitals
- **Faster Load Times** - Modern bundling and asset optimization
- **Smaller Bundle Size** - Tree shaking and dead code elimination
- **Efficient Caching** - Better browser caching strategies

#### **Code Quality**
- **Modern JavaScript** - ES6+, async/await, destructuring
- **Type Safety** - Optional TypeScript support
- **Consistent Styling** - Prettier and ESLint integration
- **Documentation** - Comprehensive code comments and guides

#### **Build System**
- **Development Server** - Fast HMR with Vite
- **Production Builds** - Optimized, minified assets
- **Asset Handling** - Automatic image optimization
- **Environment Support** - Development, staging, production configs

### 🗑️ Removed

#### **Legacy Dependencies**
- **jQuery** - Replaced with Alpine.js
- **Bootstrap 3** - Upgraded to Bootstrap 5
- **LESS** - Migrated to SCSS
- **Gulp Build System** - Replaced with Vite
- **Bower** - Removed in favor of npm
- **Grunt** - No longer needed with Vite

#### **Outdated Features**
- **IE11 Support** - Focus on modern browsers
- **Legacy Browser Fallbacks** - Simplified for modern web
- **Outdated JavaScript Patterns** - Replaced with modern alternatives
- **Static HTML Includes** - Replaced with component architecture

#### **Cleanup**
- **Unused CSS** - Removed redundant styles
- **Dead JavaScript Code** - Eliminated unused functions
- **Legacy Assets** - Removed outdated images and icons
- **Development Cruft** - Cleaned build artifacts and temporary files

### 🛠️ Migration Guide

#### **For Developers**
1. **Node.js 18+** required (previously no Node.js requirement)
2. **npm install** replaces bower install
3. **npm run dev** replaces gulp serve
4. **src-modern/** contains new source files
5. **Alpine.js syntax** replaces jQuery code

#### **For Customization**
1. **SCSS Variables** in `src-modern/styles/scss/abstracts/_variables.scss`
2. **Component Styles** in `src-modern/styles/scss/components/`
3. **JavaScript Components** in `src-modern/scripts/components/`
4. **Vite Configuration** in `vite.config.js`

### 📈 Breaking Changes

- **Node.js 18+ Required** - Modern development environment needed
- **Browser Support** - IE11 and legacy browsers no longer supported
- **Build System** - Complete change from Gulp to Vite
- **JavaScript API** - Alpine.js replaces jQuery patterns
- **CSS Structure** - SCSS architecture replaces LESS files
- **File Organization** - New directory structure in `src-modern/`

### 🎯 Upgrade Path

1. **Backup Current Implementation** - Save existing customizations
2. **Install Dependencies** - `npm install` with Node.js 18+
3. **Review New Structure** - Familiarize with `src-modern/` organization
4. **Migrate Customizations** - Port themes and custom code
5. **Test Functionality** - Verify all features work as expected
6. **Deploy New Version** - Use `npm run build` for production

---

## [2.3.2] - 2015-01-12 (Legacy)

### Added
- Bootstrap 3.3.6 support
- Many plugins updated
- RTL language support
- Gulp build system
- jQuery-based interactions

### Features
- Basic admin dashboard
- Form components
- Data tables
- Chart integration
- File upload functionality

---

## [2.3.1] - 2014-11-01 (Legacy)

### Added
- Bootstrap 3.3.0 support
- Fixed jquery-timepicker stylesheet
- Added metisMenu plugin
- Many plugins updated

---

## [2.2.7] - 2014-07-18 (Legacy)

### Added
- Added some layouts sample

---

## [2.2.6] - 2014-07-07 (Legacy)

### Added
- Bootstrap 3.2.0 support

---

## [2.2.5] - 2014-06-04 (Legacy)

### Added
- Fixed side panel(s) code
- Deprecated main.js
- Added core.js & app.js

---

## [2.2.4] - 2014-04-23 (Legacy)

### Added
- RTL version added
- Remove CLEditor
- Added CKEditor

---

## [2.2.3] - 2014-04-13 (Legacy)

### Added
- Rewrite all code

---

## [2.2.2] - 2014-04-10 (Legacy)

### Added
- Remove `alterne.html`
- Right panel available

---

## [2.2.1] - 2014-04-07 (Legacy)

### Added
- All dependency require bower & npm

---

## [2.2.0] - 2014-02-28 (Legacy)

### Added
- Rewrite menu, layout, etc

---

## [2.1.4] - 2014-02-16 (Legacy)

### Added
- Update bootstrap 3.1.1
- Add screenfull.js
- Fixed #menu

---

## [2.1.3] - 2014-01-19 (Legacy)

### Added
- Add suitcss's flex-embed component

---

## [2.1.2] - 2013-11-30 (Legacy)

### Added
- Create menu plugin
- Rewrite `menu.less`

---

## [2.1.1.2] - 2013-10-28 (Legacy)

### Added
- Add bower

---

## [2.1.1.1] - 2013-10-28 (Legacy)

### Added
- Remove bootstrap, font awesome, gmaps submodule

---

## [2.1.1] - 2013-10-23 (Legacy)

### Added
- Added `bgimage.html`
- Added `bgcolor.html` pages

---

## [2.1] - 2013-10-22 (Legacy)

### Added
- Various improvements

---

## [1.0] - 2013-02-14 (Legacy)

### Added
- Initial release
- Bootstrap 2.3.2 framework
- Basic admin layout
- Essential components

---

**Note**: Versions prior to 3.0.0 are considered legacy and are no longer actively maintained. Please upgrade to 3.0.0 for the latest features, security updates, and modern web standards compliance.