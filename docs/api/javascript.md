# JavaScript API Reference

This document provides comprehensive API documentation for the JavaScript components and utilities in the Metis template.

## Core Framework

### Alpine.js Integration

Metis uses Alpine.js for reactive components. All Alpine.js features are available:

```javascript
// Basic Alpine.js component
Alpine.data('myComponent', () => ({
  count: 0,
  increment() {
    this.count++
  }
}))

// Usage in HTML
<div x-data="myComponent">
  <button x-on:click="increment">Count: <span x-text="count"></span></button>
</div>
```

## Theme Management

### ThemeManager Class

The theme management system provides methods for handling light/dark themes.

#### Methods

##### `setTheme(theme)`
Sets the current theme.

```javascript
// Set theme to dark
window.themeManager.setTheme('dark')

// Set theme to light  
window.themeManager.setTheme('light')

// Set theme to auto (follows system preference)
window.themeManager.setTheme('auto')
```

**Parameters:**
- `theme` (string): Theme name ('light', 'dark', or 'auto')

**Returns:** `void`

##### `getTheme()`
Gets the current theme.

```javascript
const currentTheme = window.themeManager.getTheme()
console.log(currentTheme) // 'light', 'dark', or 'auto'
```

**Returns:** `string` - Current theme name

##### `toggleTheme()`
Toggles between light and dark themes.

```javascript
window.themeManager.toggleTheme()
```

**Returns:** `void`

##### `init()`
Initializes the theme system.

```javascript
window.themeManager.init()
```

**Returns:** `void`

#### Events

The theme manager dispatches custom events:

```javascript
// Listen for theme changes
document.addEventListener('themeChanged', (event) => {
  console.log('Theme changed to:', event.detail.theme)
})

// Listen for theme initialization
document.addEventListener('themeInitialized', (event) => {
  console.log('Theme system initialized')
})
```

## Icon Management

### IconManager Class

Manages icons throughout the application.

#### Methods

##### `setIcon(element, iconName)`
Sets an icon on an element.

```javascript
const button = document.querySelector('.my-button')
window.iconManager.setIcon(button, 'check')
```

**Parameters:**
- `element` (HTMLElement): Target element
- `iconName` (string): Bootstrap icon name

**Returns:** `void`

##### `getIcon(iconName)`
Gets the HTML for an icon.

```javascript
const iconHtml = window.iconManager.getIcon('home')
console.log(iconHtml) // '<i class="bi bi-home"></i>'
```

**Parameters:**
- `iconName` (string): Bootstrap icon name

**Returns:** `string` - Icon HTML

##### `replaceIcon(element, newIconName)`
Replaces an existing icon.

```javascript
const element = document.querySelector('.icon-element')
window.iconManager.replaceIcon(element, 'star')
```

**Parameters:**
- `element` (HTMLElement): Element containing icon
- `newIconName` (string): New icon name

**Returns:** `void`

## Notification System

### NotificationManager Class

Handles toast notifications and alerts.

#### Methods

##### `show(message, type, options)`
Shows a notification.

```javascript
// Basic notification
window.notificationManager.show('Operation successful!', 'success')

// With options
window.notificationManager.show('Error occurred', 'danger', {
  duration: 5000,
  position: 'top-right',
  dismissible: true
})
```

**Parameters:**
- `message` (string): Notification message
- `type` (string): Notification type ('success', 'danger', 'warning', 'info')
- `options` (object): Configuration options

**Options:**
- `duration` (number): Auto-hide duration in milliseconds (default: 4000)
- `position` (string): Position ('top-right', 'top-left', 'bottom-right', 'bottom-left')
- `dismissible` (boolean): Whether notification can be dismissed (default: true)
- `progress` (boolean): Show progress bar (default: false)

**Returns:** `string` - Notification ID

##### `hide(id)`
Hides a specific notification.

```javascript
const id = window.notificationManager.show('Message', 'info')
setTimeout(() => {
  window.notificationManager.hide(id)
}, 2000)
```

**Parameters:**
- `id` (string): Notification ID

**Returns:** `void`

##### `hideAll()`
Hides all notifications.

```javascript
window.notificationManager.hideAll()
```

**Returns:** `void`

## Dashboard Components

### DashboardManager Class

Manages dashboard-specific functionality.

#### Methods

##### `init()`
Initializes the dashboard.

```javascript
window.dashboardManager.init()
```

**Returns:** `void`

##### `updateStats(stats)`
Updates dashboard statistics.

```javascript
window.dashboardManager.updateStats({
  users: 1250,
  revenue: 45000,
  orders: 89,
  growth: 12.5
})
```

**Parameters:**
- `stats` (object): Statistics object

**Returns:** `void`

##### `refreshCharts()`
Refreshes all dashboard charts.

```javascript
window.dashboardManager.refreshCharts()
```

**Returns:** `void`

## Chart Components

### ChartManager Class

Manages Chart.js instances throughout the application.

#### Methods

##### `createChart(canvas, config)`
Creates a new chart instance.

```javascript
const canvas = document.getElementById('myChart')
const chart = window.chartManager.createChart(canvas, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [{
      label: 'Sales',
      data: [10, 20, 30],
      borderColor: '#6366f1'
    }]
  }
})
```

**Parameters:**
- `canvas` (HTMLCanvasElement): Canvas element
- `config` (object): Chart.js configuration

**Returns:** `Chart` - Chart.js instance

##### `updateChart(chartId, data)`
Updates chart data.

```javascript
window.chartManager.updateChart('salesChart', {
  labels: ['Jan', 'Feb', 'Mar', 'Apr'],
  datasets: [{
    label: 'Sales',
    data: [10, 20, 30, 40]
  }]
})
```

**Parameters:**
- `chartId` (string): Chart identifier
- `data` (object): New chart data

**Returns:** `void`

##### `destroyChart(chartId)`
Destroys a chart instance.

```javascript
window.chartManager.destroyChart('salesChart')
```

**Parameters:**
- `chartId` (string): Chart identifier

**Returns:** `void`

## Form Components

### FormManager Class

Handles form validation and submission.

#### Methods

##### `validate(form)`
Validates a form.

```javascript
const form = document.getElementById('myForm')
const isValid = window.formManager.validate(form)
```

**Parameters:**
- `form` (HTMLFormElement): Form element

**Returns:** `boolean` - Validation result

##### `submit(form, options)`
Submits a form.

```javascript
const form = document.getElementById('myForm')
window.formManager.submit(form, {
  url: '/api/submit',
  method: 'POST',
  onSuccess: (response) => {
    console.log('Form submitted successfully')
  },
  onError: (error) => {
    console.error('Form submission failed')
  }
})
```

**Parameters:**
- `form` (HTMLFormElement): Form element
- `options` (object): Submission options

**Options:**
- `url` (string): Submission URL
- `method` (string): HTTP method (default: 'POST')
- `onSuccess` (function): Success callback
- `onError` (function): Error callback

**Returns:** `Promise` - Submission promise

##### `reset(form)`
Resets a form.

```javascript
const form = document.getElementById('myForm')
window.formManager.reset(form)
```

**Parameters:**
- `form` (HTMLFormElement): Form element

**Returns:** `void`

## Navigation Components

### NavigationManager Class

Manages navigation state and behavior.

#### Methods

##### `init()`
Initializes navigation.

```javascript
window.navigationManager.init()
```

**Returns:** `void`

##### `setActive(href)`
Sets active navigation item.

```javascript
window.navigationManager.setActive('/dashboard')
```

**Parameters:**
- `href` (string): Navigation href

**Returns:** `void`

##### `toggle()`
Toggles navigation visibility (mobile).

```javascript
window.navigationManager.toggle()
```

**Returns:** `void`

##### `collapse()`
Collapses navigation.

```javascript
window.navigationManager.collapse()
```

**Returns:** `void`

##### `expand()`
Expands navigation.

```javascript
window.navigationManager.expand()
```

**Returns:** `void`

## Data Management

### DataManager Class

Handles data loading and caching.

#### Methods

##### `fetch(url, options)`
Fetches data from API.

```javascript
const data = await window.dataManager.fetch('/api/users', {
  method: 'GET',
  cache: true,
  timeout: 5000
})
```

**Parameters:**
- `url` (string): API endpoint
- `options` (object): Request options

**Options:**
- `method` (string): HTTP method (default: 'GET')
- `cache` (boolean): Enable caching (default: false)
- `timeout` (number): Request timeout in milliseconds

**Returns:** `Promise<any>` - Response data

##### `cache(key, data)`
Caches data.

```javascript
window.dataManager.cache('users', userData)
```

**Parameters:**
- `key` (string): Cache key
- `data` (any): Data to cache

**Returns:** `void`

##### `getCached(key)`
Gets cached data.

```javascript
const cachedData = window.dataManager.getCached('users')
```

**Parameters:**
- `key` (string): Cache key

**Returns:** `any` - Cached data or null

##### `clearCache(key)`
Clears cache.

```javascript
// Clear specific cache
window.dataManager.clearCache('users')

// Clear all cache
window.dataManager.clearCache()
```

**Parameters:**
- `key` (string, optional): Cache key to clear

**Returns:** `void`

## Utility Functions

### Helper Functions

#### `debounce(func, delay)`
Debounces a function.

```javascript
const debouncedFunction = window.utils.debounce((query) => {
  console.log('Searching for:', query)
}, 300)

// Usage
input.addEventListener('input', (e) => {
  debouncedFunction(e.target.value)
})
```

#### `throttle(func, limit)`
Throttles a function.

```javascript
const throttledFunction = window.utils.throttle(() => {
  console.log('Scrolling')
}, 100)

window.addEventListener('scroll', throttledFunction)
```

#### `formatCurrency(amount, currency)`
Formats currency values.

```javascript
const formatted = window.utils.formatCurrency(1234.56, 'USD')
console.log(formatted) // '$1,234.56'
```

#### `formatDate(date, format)`
Formats dates.

```javascript
const formatted = window.utils.formatDate(new Date(), 'YYYY-MM-DD')
console.log(formatted) // '2024-01-15'
```

#### `generateId(prefix)`
Generates unique IDs.

```javascript
const id = window.utils.generateId('user')
console.log(id) // 'user-abc123'
```

## Event System

### Custom Events

The template uses custom events for component communication:

```javascript
// Dispatch custom event
document.dispatchEvent(new CustomEvent('dataUpdated', {
  detail: { type: 'users', count: 50 }
}))

// Listen for custom events
document.addEventListener('dataUpdated', (event) => {
  console.log('Data updated:', event.detail)
})
```

### Event Listeners

#### Global Event Listeners

```javascript
// Theme change events
document.addEventListener('themeChanged', (event) => {
  console.log('Theme changed to:', event.detail.theme)
})

// Navigation events
document.addEventListener('navigationToggled', (event) => {
  console.log('Navigation toggled:', event.detail.expanded)
})

// Data events
document.addEventListener('dataLoaded', (event) => {
  console.log('Data loaded:', event.detail.type)
})
```

## Error Handling

### Error Manager

```javascript
// Handle errors globally
window.errorManager = {
  handle(error, context) {
    console.error('Error in', context, ':', error)
    
    // Show user-friendly message
    window.notificationManager.show(
      'An error occurred. Please try again.',
      'danger'
    )
    
    // Log to external service (optional)
    if (window.analytics) {
      window.analytics.track('error', {
        message: error.message,
        context: context
      })
    }
  }
}

// Usage
try {
  // Some operation
} catch (error) {
  window.errorManager.handle(error, 'user-form')
}
```

## Performance Optimization

### Lazy Loading

```javascript
// Lazy load components
const lazyLoadComponent = (selector, callback) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target)
        observer.unobserve(entry.target)
      }
    })
  })
  
  document.querySelectorAll(selector).forEach(el => {
    observer.observe(el)
  })
}

// Usage
lazyLoadComponent('.lazy-chart', (element) => {
  // Initialize chart when visible
  window.chartManager.createChart(element, chartConfig)
})
```

### Memory Management

```javascript
// Cleanup functions
const cleanup = () => {
  // Destroy chart instances
  window.chartManager.destroyAll()
  
  // Clear caches
  window.dataManager.clearCache()
  
  // Remove event listeners
  document.removeEventListener('scroll', scrollHandler)
}

// Call cleanup when navigating away
window.addEventListener('beforeunload', cleanup)
```

## Browser Compatibility

### Feature Detection

```javascript
// Check for required features
const hasRequiredFeatures = () => {
  return (
    'fetch' in window &&
    'localStorage' in window &&
    'IntersectionObserver' in window &&
    CSS.supports('display', 'grid')
  )
}

if (!hasRequiredFeatures()) {
  console.warn('Some features may not work in this browser')
}
```

### Polyfills

```javascript
// Load polyfills for older browsers
if (!('fetch' in window)) {
  import('whatwg-fetch')
}

if (!('IntersectionObserver' in window)) {
  import('intersection-observer')
}
```

## Best Practices

### 1. Component Initialization

```javascript
// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.themeManager.init()
  window.navigationManager.init()
  window.dashboardManager.init()
})
```

### 2. Error Handling

```javascript
// Always handle errors appropriately
const safeApiCall = async (url) => {
  try {
    const response = await window.dataManager.fetch(url)
    return response
  } catch (error) {
    window.errorManager.handle(error, 'api-call')
    return null
  }
}
```

### 3. Performance Optimization

```javascript
// Use debouncing for expensive operations
const expensiveOperation = window.utils.debounce(() => {
  // Expensive operation here
}, 300)

// Use throttling for frequent events
const scrollHandler = window.utils.throttle(() => {
  // Scroll handling here
}, 100)
```

### 4. Memory Management

```javascript
// Clean up resources when components are destroyed
const component = {
  init() {
    this.chart = window.chartManager.createChart(canvas, config)
  },
  
  destroy() {
    if (this.chart) {
      this.chart.destroy()
      this.chart = null
    }
  }
}
```

## Next Steps

For more advanced customization:

1. **[Styling Guide](../customization/styling.md)** - Learn about CSS customization
2. **[Component Development](../development/components.md)** - Create custom components
3. **[Build System](../development/build.md)** - Understand the build process

---

This API reference provides the foundation for extending and customizing the Metis template. All methods and classes are thoroughly tested and documented for reliable use in production applications.