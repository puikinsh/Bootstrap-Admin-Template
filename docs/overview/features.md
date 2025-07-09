# Template Features

Metis offers a comprehensive set of features designed to accelerate admin panel development and provide exceptional user experience. This guide details all major features and their implementations.

## Core Features

### 1. Responsive Dashboard Layout

#### Multi-Layout Support
- **Fixed Sidebar**: Traditional admin layout
- **Collapsible Sidebar**: Space-efficient design
- **Mini Sidebar**: Icon-only navigation
- **Mobile Overlay**: Touch-friendly mobile navigation

#### Responsive Breakpoints
```scss
// Responsive behavior
@media (max-width: 768px) {
  .sidebar { transform: translateX(-100%); }
  .sidebar.show { transform: translateX(0); }
}

@media (min-width: 1200px) {
  .sidebar-mini .sidebar { width: 80px; }
}
```

#### Layout Components
- **Header**: Logo, search, notifications, user menu
- **Sidebar**: Navigation menu with nested items
- **Main Content**: Dynamic content area
- **Footer**: Optional footer information

### 2. Advanced Navigation System

#### Hierarchical Navigation
```html
<!-- Multi-level navigation -->
<nav class="sidebar-nav">
  <div class="nav-item">
    <a href="#" class="nav-link has-submenu">
      <i class="bi bi-speedometer2"></i>
      <span>Dashboard</span>
    </a>
    <ul class="submenu">
      <li><a href="index.html">Overview</a></li>
      <li><a href="analytics.html">Analytics</a></li>
    </ul>
  </div>
</nav>
```

#### Navigation Features
- **Active State Management**: Automatic current page highlighting
- **Smooth Animations**: CSS transitions for interactions
- **Keyboard Navigation**: Full keyboard accessibility
- **Breadcrumb Support**: Hierarchical navigation context

#### Smart Navigation
```javascript
// Auto-highlight current page
Alpine.data('navigation', () => ({
  currentPath: window.location.pathname,
  
  isActive(path) {
    return this.currentPath === path;
  },
  
  isParentActive(submenu) {
    return submenu.some(item => this.isActive(item.path));
  }
}));
```

### 3. Theme Management System

#### Theme Architecture
```javascript
// Complete theme system
class ThemeManager {
  constructor() {
    this.themes = {
      light: {
        primary: '#6366f1',
        background: '#ffffff',
        text: '#1f2937',
        card: '#f8fafc'
      },
      dark: {
        primary: '#6366f1',
        background: '#111827',
        text: '#f9fafb',
        card: '#1f2937'
      }
    };
  }
  
  setTheme(theme) {
    const colors = this.themes[theme];
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });
    localStorage.setItem('theme', theme);
  }
  
  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
```

#### Theme Features
- **Light/Dark Modes**: Complete visual themes
- **System Preference**: Auto-detection of OS theme
- **Persistent Storage**: Remembers user preference
- **Smooth Transitions**: Animated theme switching
- **Component Adaptation**: All components support both themes

### 4. Interactive Dashboard Components

#### Statistics Cards
```html
<!-- Animated statistics display -->
<div class="stats-card" x-data="{ value: 0, target: 12847 }" x-init="animateValue()">
  <div class="stats-icon">
    <i class="bi bi-people"></i>
  </div>
  <div class="stats-content">
    <h3 x-text="value.toLocaleString()">0</h3>
    <span class="stats-label">Total Users</span>
    <span class="stats-trend positive">+12%</span>
  </div>
</div>
```

#### Chart Integration
```javascript
// Chart.js integration
Alpine.data('chartComponent', () => ({
  chart: null,
  
  initChart() {
    const ctx = this.$refs.chart.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Sales',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.1)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}));
```

### 5. Data Management Features

#### Advanced Tables
```html
<!-- Interactive data table -->
<div class="table-container" x-data="dataTable()">
  <div class="table-controls">
    <input type="text" x-model="search" placeholder="Search..." class="form-control">
    <select x-model="sortBy" class="form-select">
      <option value="name">Name</option>
      <option value="email">Email</option>
      <option value="date">Date</option>
    </select>
  </div>
  
  <table class="table table-striped">
    <thead>
      <tr>
        <th @click="sort('name')">Name</th>
        <th @click="sort('email')">Email</th>
        <th @click="sort('date')">Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <template x-for="item in filteredItems" :key="item.id">
        <tr>
          <td x-text="item.name"></td>
          <td x-text="item.email"></td>
          <td x-text="formatDate(item.date)"></td>
          <td>
            <button @click="editItem(item)" class="btn btn-sm btn-primary">Edit</button>
            <button @click="deleteItem(item)" class="btn btn-sm btn-danger">Delete</button>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  
  <div class="table-pagination">
    <nav aria-label="Table pagination">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" @click="currentPage--">Previous</a>
        </li>
        <template x-for="page in totalPages" :key="page">
          <li class="page-item" :class="{ active: currentPage === page }">
            <a class="page-link" @click="currentPage = page" x-text="page"></a>
          </li>
        </template>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" @click="currentPage++">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</div>
```

#### Table Features
- **Sorting**: Click column headers to sort
- **Filtering**: Real-time search across all columns
- **Pagination**: Configurable page sizes
- **Selection**: Multiple row selection
- **Export**: CSV, PDF, Excel export options

### 6. Form Management System

#### Advanced Form Controls
```html
<!-- Enhanced form with validation -->
<form x-data="formHandler()" @submit.prevent="submitForm">
  <div class="form-group">
    <label for="name" class="form-label">Name</label>
    <input 
      type="text" 
      id="name" 
      x-model="form.name"
      class="form-control"
      :class="{ 'is-invalid': errors.name }"
      @blur="validateField('name')"
      required
    >
    <div class="invalid-feedback" x-show="errors.name" x-text="errors.name"></div>
  </div>
  
  <div class="form-group">
    <label for="email" class="form-label">Email</label>
    <input 
      type="email" 
      id="email" 
      x-model="form.email"
      class="form-control"
      :class="{ 'is-invalid': errors.email }"
      @blur="validateField('email')"
      required
    >
    <div class="invalid-feedback" x-show="errors.email" x-text="errors.email"></div>
  </div>
  
  <div class="form-group">
    <label for="avatar" class="form-label">Avatar</label>
    <div class="file-upload" x-data="fileUpload()">
      <input 
        type="file" 
        id="avatar" 
        @change="handleFileSelect"
        accept="image/*"
        class="form-control"
      >
      <div class="file-preview" x-show="preview">
        <img :src="preview" alt="Preview" class="img-thumbnail">
        <button type="button" @click="removeFile" class="btn btn-sm btn-danger">Remove</button>
      </div>
    </div>
  </div>
  
  <button type="submit" class="btn btn-primary" :disabled="loading">
    <span x-show="loading" class="spinner-border spinner-border-sm me-2"></span>
    Submit
  </button>
</form>
```

#### Form Features
- **Real-time Validation**: Instant feedback on form fields
- **File Upload**: Drag-and-drop file upload with preview
- **Multi-step Forms**: Wizard-style form navigation
- **Auto-save**: Periodic form data saving
- **Custom Validators**: Extensible validation system

### 7. Notification System

#### Toast Notifications
```javascript
// Notification manager
class NotificationManager {
  constructor() {
    this.notifications = [];
    this.container = document.getElementById('notifications');
  }
  
  show(message, type = 'info', duration = 5000) {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    
    this.notifications.push(notification);
    this.render(notification);
    
    if (duration > 0) {
      setTimeout(() => this.remove(notification.id), duration);
    }
  }
  
  success(message) { this.show(message, 'success'); }
  error(message) { this.show(message, 'error'); }
  warning(message) { this.show(message, 'warning'); }
  info(message) { this.show(message, 'info'); }
}
```

#### Notification Features
- **Multiple Types**: Success, error, warning, info
- **Auto-dismiss**: Configurable timeout
- **Action Buttons**: Custom action buttons
- **Positioning**: Multiple position options
- **Persistent**: Optional persistent notifications

### 8. Search and Filtering

#### Global Search
```javascript
// Global search functionality
Alpine.data('globalSearch', () => ({
  query: '',
  results: [],
  loading: false,
  
  async search() {
    if (this.query.length < 2) {
      this.results = [];
      return;
    }
    
    this.loading = true;
    try {
      const response = await fetch(`/api/search?q=${this.query}`);
      this.results = await response.json();
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      this.loading = false;
    }
  }
}));
```

#### Search Features
- **Real-time Search**: Instant results as you type
- **Fuzzy Matching**: Flexible search algorithms
- **Categorized Results**: Results grouped by type
- **Keyboard Navigation**: Arrow keys for result navigation
- **Recent Searches**: Search history and suggestions

### 9. Modal and Dialog System

#### Advanced Modals
```html
<!-- Configurable modal system -->
<div class="modal fade" x-data="modalManager()" x-show="show" x-transition>
  <div class="modal-dialog" :class="sizeClass">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" x-text="title"></h5>
        <button type="button" class="btn-close" @click="close"></button>
      </div>
      <div class="modal-body" x-html="content"></div>
      <div class="modal-footer" x-show="showFooter">
        <button type="button" class="btn btn-secondary" @click="close">Cancel</button>
        <button type="button" class="btn btn-primary" @click="confirm">Confirm</button>
      </div>
    </div>
  </div>
</div>
```

#### Modal Features
- **Size Variations**: Small, medium, large, extra-large
- **Custom Content**: HTML content support
- **Confirmation Dialogs**: Yes/No confirmation modals
- **Form Modals**: Forms within modals
- **Stacking**: Multiple modal support

### 10. Data Visualization

#### Chart Types
- **Line Charts**: Time series data
- **Bar Charts**: Categorical comparisons
- **Pie Charts**: Proportional data
- **Doughnut Charts**: Circular data representation
- **Area Charts**: Filled line charts
- **Scatter Charts**: Correlation visualization

#### Chart Features
```javascript
// Interactive chart configuration
const chartConfig = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top'
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff'
    }
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Time'
      }
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Value'
      }
    }
  }
};
```

### 11. User Management

#### User Interface Components
- **User Profile**: Profile management and settings
- **User List**: Paginated user directory
- **Role Management**: User permissions and roles
- **Activity Tracking**: User activity logs

#### User Features
- **Profile Pictures**: Avatar upload and management
- **Personal Settings**: Customizable user preferences
- **Security Settings**: Password and security options
- **Notification Preferences**: Alert and notification settings

### 12. File Management

#### File Upload System
```javascript
// Advanced file upload
Alpine.data('fileUpload', () => ({
  files: [],
  uploading: false,
  progress: 0,
  
  async uploadFiles(files) {
    this.uploading = true;
    const formData = new FormData();
    
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        onUploadProgress: (progressEvent) => {
          this.progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
        }
      });
      
      const result = await response.json();
      this.files = [...this.files, ...result.files];
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      this.uploading = false;
      this.progress = 0;
    }
  }
}));
```

#### File Management Features
- **Drag and Drop**: Intuitive file uploads
- **Progress Tracking**: Upload progress indicators
- **File Preview**: Image and document previews
- **Batch Operations**: Multiple file handling
- **File Validation**: Type and size restrictions

### 13. Real-time Features

#### Live Data Updates
```javascript
// WebSocket integration
class LiveDataManager {
  constructor() {
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }
  
  connect() {
    this.ws = new WebSocket('ws://localhost:8080');
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };
    
    this.ws.onclose = () => {
      this.reconnect();
    };
  }
  
  handleMessage(data) {
    switch (data.type) {
      case 'stats_update':
        this.updateDashboardStats(data.payload);
        break;
      case 'notification':
        this.showNotification(data.payload);
        break;
    }
  }
}
```

#### Real-time Features
- **Live Statistics**: Real-time dashboard updates
- **Instant Notifications**: Push notifications
- **Live Chat**: Real-time messaging
- **Activity Feeds**: Live activity streams
- **Collaborative Editing**: Multi-user editing

### 14. Progressive Web App (PWA)

#### PWA Configuration
```json
{
  "name": "Metis Admin",
  "short_name": "Metis",
  "description": "Bootstrap 5 Admin Template",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#6366f1",
  "icons": [
    {
      "src": "assets/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "assets/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

#### PWA Features
- **Offline Support**: Works without internet
- **App-like Experience**: Native app feel
- **Push Notifications**: Engagement notifications
- **Background Sync**: Offline data synchronization
- **Installation**: Can be installed on device

### 15. Performance Optimization

#### Code Splitting
```javascript
// Lazy loading components
const loadComponent = async (componentName) => {
  const module = await import(`./components/${componentName}.js`);
  return module.default;
};
```

#### Performance Features
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Responsive images
- **Caching**: Browser and service worker caching
- **Minification**: Compressed assets
- **Tree Shaking**: Unused code elimination

## Feature Integration Examples

### Dashboard Integration
```javascript
// Complete dashboard component
Alpine.data('dashboard', () => ({
  stats: {
    users: 0,
    sales: 0,
    orders: 0,
    revenue: 0
  },
  
  charts: {
    sales: null,
    users: null
  },
  
  notifications: [],
  
  async init() {
    await this.loadStats();
    this.initCharts();
    this.connectWebSocket();
  },
  
  async loadStats() {
    const response = await fetch('/api/dashboard/stats');
    this.stats = await response.json();
  },
  
  initCharts() {
    // Initialize all dashboard charts
  },
  
  connectWebSocket() {
    // Connect to real-time updates
  }
}));
```

### Form Integration
```javascript
// Complete form handling
Alpine.data('userForm', () => ({
  form: {
    name: '',
    email: '',
    role: 'user'
  },
  
  errors: {},
  loading: false,
  
  async submitForm() {
    this.loading = true;
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form)
      });
      
      if (response.ok) {
        this.showSuccess('User created successfully');
        this.resetForm();
      } else {
        this.handleErrors(await response.json());
      }
    } catch (error) {
      this.showError('Network error occurred');
    } finally {
      this.loading = false;
    }
  }
}));
```

## Next Steps

After exploring the features:

### Implementation
1. **[Component Library](../components/overview.md)** - Using individual components
2. **[Customization](../customization/branding.md)** - Tailoring features
3. **[API Integration](../integration/apis.md)** - Connecting backends

### Advanced Usage
1. **[Performance](../advanced/performance.md)** - Optimization techniques
2. **[Security](../advanced/security.md)** - Security implementation
3. **[Testing](../advanced/testing.md)** - Quality assurance

---

**Ready to use these features?** Continue to [Template Structure](structure.md) to understand how everything fits together.