// ==========================================================================
// Bootstrap Admin Template - Modern JavaScript Entry Point
// ES6+ Modules with Bootstrap 5
// ==========================================================================

// Import Bootstrap 5 JavaScript components
import { 
  Alert, 
  Button, 
  Carousel, 
  Collapse, 
  Dropdown, 
  Modal, 
  Offcanvas, 
  Popover, 
  ScrollSpy, 
  Tab, 
  Toast, 
  Tooltip 
} from 'bootstrap';

// Import our custom modules
import { ThemeManager } from './utils/theme-manager.js';
import { SidebarManager } from './components/sidebar.js';
import { DashboardManager } from './components/dashboard.js';
import { NotificationManager } from './utils/notifications.js';
import { iconManager } from './utils/icon-manager.js';

// Import Alpine.js for reactive components
import Alpine from 'alpinejs';

// Import styles
import '../styles/scss/main.scss';

// Import Bootstrap Icons CSS (more efficient than SCSS import in Vite)
import 'bootstrap-icons/font/bootstrap-icons.css';

// Application Class
class AdminApp {
  constructor() {
    this.components = new Map();
    this.isInitialized = false;
  }

  // Initialize the application
  async init() {
    if (this.isInitialized) return;

    try {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve);
        });
      }

      // Initialize core managers
      this.themeManager = new ThemeManager();
      this.sidebarManager = new SidebarManager();
      this.notificationManager = new NotificationManager();
      this.iconManager = iconManager;

      // Preload common icons for better performance
      this.iconManager.preloadIcons([
        'dashboard', 'users', 'analytics', 'settings', 'notifications',
        'search', 'menu', 'check', 'warning', 'info', 'success', 'error'
      ]);

      // Initialize Bootstrap components
      this.initBootstrapComponents();

      // Initialize page-specific components
      this.initPageComponents();

      // Setup global event listeners
      this.setupEventListeners();

      // Initialize tooltips and popovers globally
      this.initTooltipsAndPopovers();

      // Initialize Alpine.js
      this.initAlpine();

      this.isInitialized = true;
      console.log('🚀 Admin App initialized successfully');

      // Show initialization complete notification
      this.notificationManager.show('Application loaded successfully!', 'success');

    } catch (error) {
      console.error('❌ Failed to initialize Admin App:', error);
    }
  }

  // Initialize Bootstrap components
  initBootstrapComponents() {
    // Initialize dropdowns
    document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(element => {
      new Dropdown(element);
    });

    // Initialize modals
    document.querySelectorAll('.modal').forEach(element => {
      new Modal(element);
    });

    // Initialize offcanvas
    document.querySelectorAll('.offcanvas').forEach(element => {
      new Offcanvas(element);
    });

    // Initialize collapse elements
    document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(element => {
      new Collapse(element);
    });

    // Initialize tabs
    document.querySelectorAll('[data-bs-toggle="tab"]').forEach(element => {
      new Tab(element);
    });

    // Initialize toasts
    document.querySelectorAll('.toast').forEach(element => {
      new Toast(element);
    });
  }

  // Initialize tooltips and popovers
  initTooltipsAndPopovers() {
    // Initialize tooltips
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(element => {
      new Tooltip(element);
    });

    // Initialize popovers
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(element => {
      new Popover(element);
    });
  }

  // Initialize page-specific components
  initPageComponents() {
    const currentPage = document.body.dataset.page;

    switch (currentPage) {
      case 'dashboard':
        this.components.set('dashboard', new DashboardManager());
        break;
      // Add more page-specific initializations here
    }
  }

  // Setup global event listeners
  setupEventListeners() {
    // Theme toggle
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-theme-toggle]')) {
        this.themeManager.toggleTheme();
      }
    });

    // Sidebar toggle
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-sidebar-toggle]')) {
        this.sidebarManager.toggle();
      }
    });

    // Full screen toggle
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-fullscreen-toggle]')) {
        this.toggleFullscreen();
      }
    });

    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardShortcuts(e);
    });
  }

  // Handle keyboard shortcuts
  handleKeyboardShortcuts(event) {
    // Ctrl/Cmd + K for search
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      // Open search modal or focus search input
      const searchInput = document.querySelector('[data-search-input]');
      if (searchInput) {
        searchInput.focus();
      }
    }

    // Ctrl/Cmd + \ for sidebar toggle
    if ((event.ctrlKey || event.metaKey) && event.key === '\\') {
      event.preventDefault();
      this.sidebarManager.toggle();
    }
  }

  // Toggle fullscreen
  async toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen toggle failed:', error);
    }
  }

  // Get component instance
  getComponent(name) {
    return this.components.get(name);
  }

  // Initialize Alpine.js
  initAlpine() {
    // Register Alpine data components
    Alpine.data('searchComponent', () => ({
      query: '',
      results: [],
      isLoading: false,
      
      async search() {
        if (this.query.length < 2) {
          this.results = [];
          return;
        }
        
        this.isLoading = true;
        // Simulate API search
        await new Promise(resolve => setTimeout(resolve, 300));
        
        this.results = [
          { title: 'Dashboard', url: '/', type: 'page' },
          { title: 'Users', url: '/users', type: 'page' },
          { title: 'Settings', url: '/settings', type: 'page' },
          { title: 'Analytics', url: '/analytics', type: 'page' }
        ].filter(item => 
          item.title.toLowerCase().includes(this.query.toLowerCase())
        );
        
        this.isLoading = false;
      }
    }));

    Alpine.data('statsCounter', (initialValue = 0, increment = 1) => ({
      value: initialValue,
      
      init() {
        // Auto-increment every 5 seconds
        setInterval(() => {
          this.value += Math.floor(Math.random() * increment) + 1;
        }, 5000);
      }
    }));

    Alpine.data('themeSwitch', () => ({
      currentTheme: 'light',
      
      init() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
      },
      
      toggle() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
      }
    }));

    Alpine.data('iconDemo', () => ({
      currentProvider: 'bootstrap',
      
      switchProvider(provider) {
        this.currentProvider = provider;
        iconManager.switchProvider(provider);
        console.log(`🎨 Switched to ${provider} icons`);
      },
      
      getIcon(iconName) {
        return iconManager.get(iconName);
      }
    }));

    // Start Alpine.js
    Alpine.start();
    window.Alpine = Alpine;
  }

  // Show demo notifications
  showDemoNotifications() {
    setTimeout(() => {
      this.notificationManager.info('New user registered', {
        action: {
          text: 'View',
          handler: 'window.location.href="/users"'
        }
      });
    }, 3000);

    setTimeout(() => {
      this.notificationManager.warning('Server maintenance in 10 minutes');
    }, 6000);

    setTimeout(() => {
      this.notificationManager.success('Backup completed successfully');
    }, 9000);
  }

  // Cleanup method
  destroy() {
    this.components.forEach(component => {
      if (component.destroy) {
        component.destroy();
      }
    });
    this.components.clear();
    this.isInitialized = false;
  }
}

// Create global app instance
const app = new AdminApp();

// Initialize app when module loads
app.init();

// Export for global access
window.AdminApp = app;
window.IconManager = iconManager;

// Export the app instance for module imports
export default app; 