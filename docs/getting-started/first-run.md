# First Run Guide

Congratulations on successfully installing Metis! This guide will walk you through your first run experience and help you get familiar with the template's features.

## Initial Setup

### Step 1: Launch the Template

After completing the installation, launch Metis using your preferred method:

**Option A: Using Local Web Server**
```bash
cd metis-bootstrap-5/src-modern
python -m http.server 8000
```

**Option B: Using Development Server**
```bash
cd metis-bootstrap-5/src-modern
npm run dev
```

Navigate to `http://localhost:8000` (or your configured port) in your browser.

### Step 2: First Load

When you first load Metis, you'll see:

1. **Loading Screen**: Brief initialization
2. **Dashboard**: Main admin interface
3. **Welcome Tour**: Optional guided tour (can be dismissed)

## Dashboard Overview

### Main Components

#### 1. Header Navigation
- **Logo**: Metis branding (customizable)
- **Search Bar**: Global search functionality
- **User Menu**: Profile, settings, logout
- **Notifications**: System alerts and messages
- **Theme Toggle**: Dark/light mode switch

#### 2. Sidebar Navigation
- **Dashboard**: Main overview page
- **Analytics**: Data visualization
- **Users**: User management
- **Products**: Product catalog
- **Orders**: Order management
- **Elements**: UI components showcase

#### 3. Main Content Area
- **Statistics Cards**: Key metrics at a glance
- **Charts**: Interactive data visualization
- **Recent Activity**: Latest system activities
- **Quick Actions**: Common tasks

## Essential Features Tour

### 1. Theme Switching

Test the theme functionality:

```javascript
// Toggle theme manually
document.querySelector('[data-theme-toggle]').click();

// Or programmatically
window.themeManager.setTheme('dark');
window.themeManager.setTheme('light');
```

**What to expect:**
- Smooth transition between themes
- Persistent theme preference
- All components adapt to the selected theme

### 2. Responsive Design

Test responsiveness:

1. **Desktop (1920px+)**: Full sidebar, expanded layout
2. **Tablet (768px-1919px)**: Collapsible sidebar
3. **Mobile (320px-767px)**: Overlay sidebar, stacked layout

**Key breakpoints:**
- `1200px`: Large desktop
- `992px`: Desktop
- `768px`: Tablet
- `576px`: Mobile

### 3. Navigation Testing

Navigate through different sections:

1. **Dashboard** → Overview and statistics
2. **Analytics** → Charts and data visualization
3. **Users** → User management interface
4. **Products** → Product catalog
5. **Orders** → Order management
6. **Elements** → UI components showcase

### 4. Interactive Components

Test key interactive elements:

#### Buttons
- **Primary Actions**: Main CTA buttons
- **Secondary Actions**: Supporting actions
- **Loading States**: Progress indicators

#### Forms
- **Input Validation**: Real-time feedback
- **File Upload**: Drag-and-drop functionality
- **Date Pickers**: Calendar integration

#### Modals and Alerts
- **Confirmation Dialogs**: User actions
- **Success Messages**: Operation feedback
- **Error Handling**: Graceful error display

## Configuration Check

### 1. Browser Console

Open Developer Tools (F12) and check:

```javascript
// Verify core libraries are loaded
console.log('Bootstrap:', typeof bootstrap !== 'undefined');
console.log('Alpine.js:', typeof Alpine !== 'undefined');
console.log('Chart.js:', typeof Chart !== 'undefined');

// Check theme system
console.log('Theme Manager:', typeof window.themeManager !== 'undefined');
console.log('Current Theme:', localStorage.getItem('theme') || 'light');
```

**Expected output:**
```
Bootstrap: true
Alpine.js: true
Chart.js: true
Theme Manager: true
Current Theme: light
```

### 2. Network Tab

Verify all resources load successfully:

- ✅ **CSS Files**: Bootstrap, custom styles
- ✅ **JavaScript Files**: Alpine.js, Chart.js, custom scripts
- ✅ **Images**: Logo, icons, placeholders
- ✅ **Fonts**: Google Fonts, icon fonts

**No 404 errors should appear.**

### 3. Performance Check

Basic performance verification:

```javascript
// Check page load time
console.log('Page Load Time:', performance.now() + 'ms');

// Check memory usage (approximate)
console.log('JavaScript Heap:', (performance.memory?.usedJSHeapSize / 1024 / 1024).toFixed(2) + 'MB');
```

## User Experience Testing

### 1. Accessibility Check

Test keyboard navigation:

1. **Tab Navigation**: Should flow logically
2. **Focus Indicators**: Clear visual feedback
3. **Screen Reader**: Test with screen reader if available
4. **High Contrast**: Test with system high contrast mode

### 2. Mobile Experience

Test on mobile devices or using browser dev tools:

1. **Touch Interactions**: Buttons, swipes, scrolling
2. **Viewport Scaling**: Proper zoom behavior
3. **Performance**: Smooth animations and transitions
4. **Offline Support**: Basic functionality without internet

### 3. User Workflow

Complete a typical user workflow:

1. **Login** (if authentication is implemented)
2. **Navigate** to different sections
3. **View Data** in charts and tables
4. **Interact** with forms and components
5. **Change Settings** (theme, preferences)
6. **Logout** (if authentication is implemented)

## Common First-Run Issues

### Issue 1: Blank Page
**Symptoms:** White screen, no content
**Solutions:**
```bash
# Check web server is running
curl http://localhost:8000

# Verify file paths
ls -la index.html
ls -la styles/
ls -la scripts/
```

### Issue 2: Missing Styles
**Symptoms:** Unstyled content, broken layout
**Solutions:**
```html
<!-- Verify CSS links in HTML -->
<link href="styles/scss/main.scss" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
```

### Issue 3: JavaScript Errors
**Symptoms:** Non-functional components, console errors
**Solutions:**
```javascript
// Check script loading order
// Bootstrap should load before Alpine.js
// Alpine.js should load before custom scripts
```

### Issue 4: Theme Not Working
**Symptoms:** Theme toggle doesn't work
**Solutions:**
```javascript
// Verify theme manager initialization
if (typeof window.themeManager === 'undefined') {
  console.error('Theme manager not loaded');
}

// Check localStorage permissions
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
} catch (e) {
  console.error('LocalStorage not available');
}
```

## Customization Quick Start

### 1. Basic Branding

Update the logo and colors:

```scss
// styles/scss/abstracts/_variables.scss
$primary: #your-color;
$secondary: #your-secondary-color;
```

```html
<!-- Update logo in header -->
<img src="assets/images/your-logo.svg" alt="Your Brand">
```

### 2. Content Updates

Modify the dashboard content:

```html
<!-- index.html -->
<div class="stats-card">
  <h3>Your Metric</h3>
  <span class="value">Your Value</span>
</div>
```

### 3. Navigation Customization

Update sidebar navigation:

```html
<!-- Sidebar navigation -->
<nav class="sidebar-nav">
  <a href="your-page.html" class="nav-link">
    <i class="bi bi-your-icon"></i>
    <span>Your Page</span>
  </a>
</nav>
```

## Performance Optimization

### 1. Image Optimization

Optimize images for better performance:

```bash
# Compress images
npx imagemin src/assets/images/* --out-dir=dist/assets/images/
```

### 2. CSS Optimization

If using SCSS:

```scss
// Only import needed Bootstrap components
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/utilities";
```

### 3. JavaScript Optimization

Remove unused features:

```javascript
// Remove unused chart types
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement);
```

## Next Steps

After completing your first run:

### Immediate Actions
1. **[Template Overview](../overview/introduction.md)** - Understand the template
2. **[Features Overview](../overview/features.md)** - Explore available features
3. **[Quick Start Guide](quick-start.md)** - Get started quickly

### Long-term Planning
1. **[Requirements Guide](requirements.md)** - Technical requirements
2. **[Installation Guide](installation.md)** - Complete setup process
3. **[Template Features](../overview/features.md)** - Explore all capabilities

## Getting Help

If you encounter issues during your first run:

### Documentation
- **[Installation Guide](installation.md)** - Complete setup instructions
- **[Requirements](requirements.md)** - System requirements and compatibility
- **[Quick Start](quick-start.md)** - Get up and running quickly

### Community Support
- **GitHub Issues** - Report bugs and feature requests
- **Stack Overflow** - Community-driven Q&A
- **Bootstrap Documentation** - Official Bootstrap 5 docs

### Professional Support
- **Custom Development** - Tailored solutions
- **Priority Support** - Fast response times
- **Training** - Team training sessions

## Verification Checklist

Before proceeding to customization:

- [ ] Template loads without errors
- [ ] All navigation links work
- [ ] Theme switching functions properly
- [ ] Responsive design works on all devices
- [ ] JavaScript components are interactive
- [ ] Performance is acceptable
- [ ] No console errors
- [ ] All resources load successfully

---

**First run complete!** You're now ready to start customizing Metis for your specific needs. Continue to [Template Overview](../overview/introduction.md) to understand how the template is organized.