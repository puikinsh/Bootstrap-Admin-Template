# Metis Admin Template v3.2.0

## 🎉 Maintenance Release - Dependencies, Build Optimization & DX Improvements

This release brings all dependencies to their latest versions, significantly improves build performance through chunk splitting, and enhances developer experience with new configuration files.

---

## 🚀 Highlights

### Build Performance: 97% Smaller Main Bundle
The main JavaScript bundle has been reduced from **993KB to 33KB** through intelligent vendor chunk splitting:

| Chunk | Size | Contents |
|-------|------|----------|
| `main.js` | 33KB | Application code |
| `vendor-bootstrap.js` | 82KB | Bootstrap & Popper |
| `vendor-ui.js` | 123KB | Alpine.js, SweetAlert2, Day.js |
| `vendor-charts.js` | 756KB | Chart.js, ApexCharts |

### Zero ESLint Warnings
All 16 ESLint warnings have been fixed. The codebase now passes linting with **0 errors, 0 warnings**.

### New Developer Experience Files
- `.prettierrc.json` - Standardized code formatting
- `.editorconfig` - IDE-agnostic coding standards
- `postcss.config.js` - PostCSS/Autoprefixer configuration
- `.env.example` - Environment variable template
- `DEVELOPMENT.md` - Comprehensive development documentation

---

## 📦 Updated Dependencies

### Production
| Package | Previous | New |
|---------|----------|-----|
| Font Awesome | 7.0.1 | **7.1.0** |
| Alpine.js | 3.15.0 | **3.15.2** |
| ApexCharts | 5.3.5 | **5.3.6** |
| Chart.js | 4.5.0 | **4.5.1** |
| Day.js | 1.11.18 | **1.11.19** |
| SweetAlert2 | 11.23.0 | **11.26.3** |
| Lucide | 0.544.0 | **0.555.0** |

### Development
| Package | Previous | New |
|---------|----------|-----|
| Vite | 7.1.7 | **7.2.4** |
| Sass | 1.93.2 | **1.94.2** |
| ESLint | 9.36.0 | **9.39.1** |
| Prettier | 3.6.2 | **3.7.2** |
| Autoprefixer | 10.4.20 | **10.4.22** |
| PostCSS | 8.5.2 | **8.5.6** |

---

## ✨ New npm Scripts

```bash
npm run serve        # Build and preview in one command
npm run lint:fix     # Auto-fix linting issues
npm run format:check # Check formatting without changes
npm run check        # Run lint + format check together
npm run clean:all    # Deep clean including node_modules
```

---

## 🐛 Bug Fixes

- Fixed duplicate `changePassword()` method in security component
- Removed unused Bootstrap imports (Alert, Button, Carousel, ScrollSpy)
- Fixed all 16 ESLint warnings across multiple files

---

## 🔒 Security

**0 vulnerabilities** - All dependencies updated with no known security issues.

---

## 📋 Installation

```bash
# Clone the repository
git clone https://github.com/puikinsh/Bootstrap-Admin-Template-3.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🔗 Links

- [Live Demo](https://puikinsh.github.io/Bootstrap-Admin-Template-3/)
- [Documentation](DEVELOPMENT.md)
- [Changelog](CHANGELOG.md)

---

**Full Changelog**: [v3.1.0...v3.2.0](https://github.com/puikinsh/Bootstrap-Admin-Template-3/compare/v3.1.0...v3.2.0)
