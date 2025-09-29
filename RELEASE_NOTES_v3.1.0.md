# Release Notes - Version 3.1.0

## 🎉 Bootstrap Admin Template v3.1.0
*Release Date: September 29, 2025*

We're excited to announce version 3.1.0 of the Bootstrap Admin Template! This release focuses on keeping the template up-to-date with the latest web standards, fixing critical issues, and cleaning up the codebase for better maintainability.

---

## 📦 Dependency Updates

All dependencies have been updated to their latest stable versions to ensure security, performance, and access to the newest features:

### Major Updates
- **Bootstrap**: `5.3.7` → `5.3.8` - Latest Bootstrap 5 release
- **ApexCharts**: `4.7.0` → `5.3.5` - Major version upgrade with enhanced chart features
- **Font Awesome**: `6.7.2` → `7.0.1` - Major version upgrade with expanded icon library

### Framework & Build Tools
- **Alpine.js**: `3.14.9` → `3.15.0` - Improved reactive framework
- **Vite**: `7.0.4` → `7.1.7` - Faster builds and better performance
- **Sass**: `1.89.2` → `1.93.2` - Latest SCSS compiler improvements

### Development Tools
- **ESLint**: `9.18.0` → `9.36.0` - Enhanced code quality checks
- **Prettier**: `3.4.2` → `3.6.2` - Better code formatting
- **@vitejs/plugin-legacy**: `7.0.0` → `7.2.1` - Improved browser compatibility

### Utilities
- **Day.js**: `1.11.13` → `1.11.18` - Date manipulation improvements
- **SweetAlert2**: `11.22.1` → `11.23.0` - Better notifications
- **Lucide**: `0.469.0` → `0.544.0` - Extended icon collection

---

## 🐛 Bug Fixes

### Chart Overflow Issue - FIXED ✅
**Problem**: The Revenue Analytics chart in the Analytics dashboard was overflowing outside its card boundaries, causing horizontal scrolling and layout issues.

**Solution**:
- Added responsive configuration to ApexCharts initialization
- Implemented proper overflow handling in chart containers
- Added window resize event handlers for dynamic chart resizing
- Enhanced the `chart-container` SCSS mixin with better overflow protection

**Impact**: Charts now properly contain themselves within card boundaries across all screen sizes and respond correctly to window resizing.

---

## 🧹 Code Cleanup

### Legacy Code Removal
We've completed a comprehensive cleanup of all Bootstrap 3 legacy code:

**Removed Files**:
- `.babelrc` - Obsolete with Vite
- `.jshintrc` - Replaced by ESLint
- `.travis.yml` - Outdated CI/CD configuration
- `.verb.md` - Old documentation generator
- `docs/` directory - Outdated Bootstrap 3 documentation

**Cleaned Configuration**:
- Updated `.gitignore` to remove legacy references
- Removed bower_components references
- Cleaned up grunt-related entries
- Streamlined vendor directory references

**Result**: The codebase is now cleaner, more maintainable, and contains only modern Bootstrap 5 code.

---

## 📚 Documentation Improvements

### New Documentation
- **CLAUDE.md**: Added comprehensive AI assistant configuration file for better development experience with Claude Code
- **Enhanced README**: Updated with latest version information and clearer project structure

### Updated Documentation
- **CHANGELOG.md**: Now includes detailed version history
- **README.md**: Updated with v3.1.0 features and improvements
- **Package.json**: Version bumped to 3.1.0

---

## 🚀 Performance Improvements

- Charts now initialize more efficiently with proper cleanup
- Reduced memory leaks by implementing chart destroy methods
- Better responsive performance with optimized resize handlers
- Cleaner codebase results in faster build times

---

## 💻 Developer Experience

- **AI-Assisted Development**: CLAUDE.md provides clear instructions for AI coding assistants
- **Cleaner Project Structure**: Removed all legacy directories and files
- **Updated Dependencies**: Access to latest features and security patches
- **Better Documentation**: Clearer guidance for development and customization

---

## 🔄 Migration Guide

### Upgrading from v3.0.0 to v3.1.0

1. **Update Dependencies**:
   ```bash
   npm update
   ```

2. **Clear Cache**:
   ```bash
   npm run clean
   rm -rf node_modules
   npm install
   ```

3. **Rebuild Project**:
   ```bash
   npm run build
   ```

### Breaking Changes
- None! This is a backward-compatible update.

### Deprecations
- Legacy Bootstrap 3 support completely removed
- Old configuration files no longer supported

---

## 📈 What's Next

We're committed to keeping this template modern and maintainable. Future updates will focus on:
- Adding more dashboard variations
- Implementing more interactive components
- Performance optimizations
- Accessibility improvements
- Additional theme variations

---

## 🙏 Acknowledgments

Thank you to all contributors and users who have helped make this template better. Special thanks to the open-source community for maintaining the excellent libraries we depend on.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

## 🐛 Bug Reports & Feature Requests

Please report any issues or feature requests on our [GitHub Issues](https://github.com/puikinsh/Bootstrap-Admin-Template/issues) page.

---

**Happy coding!** 🚀

The Bootstrap Admin Template Team