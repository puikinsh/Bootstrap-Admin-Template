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

// Import styles
import '../styles/scss/main.scss';

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

      // Initialize Bootstrap components
      this.initBootstrapComponents();

      // Initialize page-specific components
      this.initPageComponents();

      // Setup global event listeners
      this.setupEventListeners();

      // Initialize tooltips and popovers globally
      this.initTooltipsAndPopovers();

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

// Export the app instance for module imports
export default app; 