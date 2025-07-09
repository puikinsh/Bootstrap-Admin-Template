# System Requirements

Before installing and using Metis, ensure your development environment meets these requirements.

## Browser Support

Metis is designed to work with modern browsers that support current web standards.

### Supported Browsers

| Browser | Version | Notes |
|---------|---------|-------|
| **Chrome** | Latest | Fully supported |
| **Firefox** | Latest | Fully supported |
| **Safari** | Latest | Fully supported |
| **Edge** | Latest | Fully supported |
| **iOS Safari** | 13+ | Mobile support |
| **Chrome Mobile** | Latest | Mobile support |
| **Samsung Internet** | Latest | Mobile support |

### Browser Features Required

Metis relies on these modern browser features:

- **CSS Grid and Flexbox**: For responsive layouts
- **CSS Custom Properties**: For theme switching
- **ES6+ JavaScript**: For modern JavaScript features
- **Fetch API**: For data loading
- **LocalStorage**: For user preferences
- **Service Workers**: For PWA functionality (optional)

## Development Environment

### Required Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| **Text Editor** | Code editing | VS Code, Sublime Text, Atom |
| **Web Browser** | Testing and development | Chrome recommended for DevTools |
| **Web Server** | Local development | Live Server, Python SimpleHTTPServer |

### Optional Tools

| Tool | Purpose | Installation |
|------|---------|--------------|
| **Node.js** | Build tools and dev server | [Download](https://nodejs.org/) |
| **npm/yarn** | Package management | Comes with Node.js |
| **Git** | Version control | [Download](https://git-scm.com/) |

## Technical Specifications

### Minimum Requirements

- **Screen Resolution**: 1024x768 (desktop)
- **RAM**: 4GB (for development)
- **Storage**: 500MB free space
- **Internet Connection**: Required for CDN resources

### Recommended Requirements

- **Screen Resolution**: 1920x1080 or higher
- **RAM**: 8GB or more
- **Storage**: 1GB free space
- **Internet Connection**: Broadband for optimal development

## Dependencies

### Core Dependencies

Metis includes these core libraries:

#### Bootstrap 5.3.7
- **CSS Framework**: Core styling and components
- **JavaScript**: Interactive components
- **Icons**: Bootstrap Icons included

#### Alpine.js 3.14.9
- **Reactive Framework**: Component interactivity
- **Size**: ~37KB minified
- **Purpose**: Form validation, dynamic content

#### Chart.js 4.5.0
- **Data Visualization**: Charts and graphs
- **Size**: ~200KB minified
- **Purpose**: Dashboard analytics

### Optional Dependencies

#### Development Tools (if using build system)
- **Vite 7.0.0**: Build tool and dev server
- **SCSS/Sass**: CSS preprocessing
- **ESLint**: JavaScript linting
- **Prettier**: Code formatting

#### Additional Libraries
- **Day.js**: Date manipulation
- **SweetAlert2**: Enhanced modals
- **Popper.js**: Positioning engine

## Performance Considerations

### Loading Times
- **Initial Load**: ~300KB (minified + gzipped)
- **Subsequent Loads**: ~50KB (cached resources)
- **Page Transitions**: <100ms

### Memory Usage
- **JavaScript Heap**: ~10MB typical
- **DOM Nodes**: ~500-1000 per page
- **Event Listeners**: Minimal, auto-cleanup

### Network Requirements
- **CDN Resources**: Bootstrap, fonts, icons
- **Offline Support**: Available with service worker
- **Bandwidth**: 1-2MB initial download

## Development Setup Options

### Option 1: Simple Setup (No Build Tools)
**Requirements:**
- Web browser
- Text editor
- Local web server

**Pros:**
- Quick setup
- No build process
- Easy to understand

**Cons:**
- No SCSS compilation
- No modern JavaScript features
- Manual optimization

### Option 2: Advanced Setup (With Build Tools)
**Requirements:**
- Node.js 16+
- npm or yarn
- Command line familiarity

**Pros:**
- SCSS compilation
- Modern JavaScript
- Automated optimization
- Development server

**Cons:**
- More complex setup
- Build process required
- Additional dependencies

## File System Requirements

### File Structure
```
project-root/
├── src-modern/                 # Main template files
│   ├── *.html                 # HTML pages
│   ├── styles/                # SCSS files
│   ├── scripts/               # JavaScript files
│   └── assets/                # Images and icons
├── docs/                      # Documentation
└── package.json               # Dependencies (if using npm)
```

### File Permissions
- **Read Access**: All template files
- **Write Access**: For customization
- **Execute Access**: For build scripts (if using)

## Security Considerations

### Content Security Policy
If implementing CSP, allow:
- **Scripts**: CDN resources, inline scripts
- **Styles**: CDN resources, inline styles
- **Images**: Local assets, data URLs
- **Fonts**: Google Fonts, local fonts

### HTTPS Requirements
- **Development**: HTTP acceptable
- **Production**: HTTPS required for:
  - Service Workers
  - Geolocation API
  - Camera/microphone access
  - Secure cookies

## Accessibility Requirements

### WCAG Compliance
- **Level AA**: Target compliance level
- **Screen Readers**: Tested with NVDA, JAWS
- **Keyboard Navigation**: Full keyboard support
- **Color Contrast**: Meets minimum ratios

### Assistive Technology
- **Screen Readers**: NVDA, JAWS, VoiceOver
- **Voice Control**: Dragon NaturallySpeaking
- **Switch Navigation**: Supported
- **Magnification**: High contrast mode

## Mobile Requirements

### Device Support
- **iOS**: 13.0+
- **Android**: 8.0+ (API level 26)
- **Screen Sizes**: 320px - 2048px width
- **Touch Support**: Full touch interaction

### Performance Targets
- **First Paint**: <1 second
- **Interactive**: <3 seconds
- **Memory**: <50MB typical
- **Battery**: Optimized for mobile

## Checking Your Environment

### Browser Feature Detection
```javascript
// Check for required features
const hasRequiredFeatures = (
  'fetch' in window &&
  'localStorage' in window &&
  'customElements' in window &&
  CSS.supports('display', 'grid')
);

if (!hasRequiredFeatures) {
  console.warn('Browser may not support all Metis features');
}
```

### Development Tools Check
```bash
# Check Node.js version
node --version  # Should be 16.0.0 or higher

# Check npm version
npm --version   # Should be 8.0.0 or higher

# Check if git is available
git --version   # Optional but recommended
```

## Common Issues

### Browser Compatibility
- **IE11**: Not supported
- **Old Chrome**: Versions <90 may have issues
- **Mobile Safari**: iOS 12 and below not supported

### Development Environment
- **Node.js**: Versions below 16 not supported
- **npm**: Versions below 8 may have issues
- **File Paths**: Avoid spaces in folder names

### Performance Issues
- **Large Images**: Optimize images for web
- **Too Many Requests**: Use CDN for external resources
- **Memory Leaks**: Properly cleanup event listeners

## Next Steps

Once you've verified your environment meets these requirements:

1. **[Installation Guide](installation.md)** - Detailed setup instructions
2. **[First Run](first-run.md)** - Getting the template running
3. **[Quick Start](quick-start.md)** - Basic customization guide

## Getting Help

If you encounter issues with system requirements:

- **[Troubleshooting](../troubleshooting/installation.md)** - Common setup problems
- **[FAQ](../troubleshooting/faq.md)** - Frequently asked questions
- **[Browser Support](../overview/browser-support.md)** - Detailed compatibility information

---

**Ready to proceed?** Continue to the [Installation Guide](installation.md) to set up Metis on your system.