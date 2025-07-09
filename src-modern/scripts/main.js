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
import { DashboardManager } from './components/dashboard.js';
import { NotificationManager } from './utils/notifications.js';
import { iconManager } from './utils/icon-manager.js';

// Import Alpine.js for reactive components
import Alpine from 'alpinejs';

// Import styles (Bootstrap Icons are included in SCSS)
import '../styles/scss/main.scss';

// Import user components
// import { UsersComponent } from './components/users.js';
// import { AnalyticsComponent } from './components/analytics.js';
// import { FormsComponent } from './components/forms.js';

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
      this.notificationManager = new NotificationManager();
      this.iconManager = iconManager;

      // Preload common icons for better performance
      this.iconManager.preloadIcons([
        'dashboard', 'users', 'analytics', 'settings', 'notifications',
        'search', 'menu', 'check', 'warning', 'info', 'success', 'error'
      ]);

      // Initialize Bootstrap components
      this.initBootstrapComponents();

      // Initialize page-specific components and wait for them to complete
      await this.initPageComponents();

      // Setup global event listeners
      this.setupEventListeners();
      
      // Initialize navigation
      this.initNavigation();

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
  async initPageComponents() {
    const currentPage = document.body.dataset.page;

    switch (currentPage) {
      case 'dashboard':
        this.components.set('dashboard', new DashboardManager());
        break;
      case 'users':
        await this.initUsersPage();
        break;
      case 'analytics':
        await this.initAnalyticsPage();
        break;
      case 'forms':
        await this.initFormsPage();
        break;
      case 'products':
        await this.initProductsPage();
        break;
      case 'orders':
        await this.initOrdersPage();
        break;
      case 'reports':
        await this.initReportsPage();
        break;
      case 'messages':
        await this.initMessagesPage();
        break;
      case 'calendar':
        await this.initCalendarPage();
        break;
      case 'settings':
        await this.initSettingsPage();
        break;
      case 'security':
        await this.initSecurityPage();
        break;
      case 'files':
        await this.initFilesPage();
        break;
      case 'help':
        await this.initHelpPage();
        break;
      case 'elements':
        await this.initElementsPage();
        break;
      // Add more page-specific initializations here
      default:
        console.log('Page-specific components loading complete');
    }
  }

  // Initialize forms page
  async initFormsPage() {
    try {
      // Dynamically load the forms component script (it self-registers with Alpine)
      await import('./components/forms.js');
      console.log('📝 Forms page script loaded successfully');
    } catch (error) {
      console.warn('Forms components not available:', error);
    }
  }

  async initUsersPage() {
    try {
      await import('./components/users.js');
      console.log('👥 Users page script loaded successfully');
    } catch (error) {
      console.error('Failed to load users page script:', error);
    }
  }

  async initAnalyticsPage() {
    try {
      await import('./components/analytics.js');
      console.log('📊 Analytics page script loaded successfully');
    } catch (error) {
      console.error('Failed to load analytics page script:', error);
    }
  }

  async initProductsPage() {
    try {
      await import('./components/products.js');
      console.log('📦 Products page script loaded successfully');
    } catch (error) {
      console.error('Failed to load products page script:', error);
    }
  }

  async initOrdersPage() {
    try {
      await import('./components/orders.js');
      console.log('🛒 Orders page script loaded successfully');
    } catch (error) {
      console.error('Failed to load orders page script:', error);
    }
  }

  async initReportsPage() {
    try {
      await import('./components/reports.js');
      console.log('📊 Reports page script loaded successfully');
    } catch (error) {
      console.error('Failed to load reports page script:', error);
    }
  }

  async initMessagesPage() {
    try {
      await import('./components/messages.js');
      console.log('💬 Messages page script loaded successfully');
    } catch (error) {
      console.error('Failed to load messages page script:', error);
    }
  }

  async initCalendarPage() {
    try {
      await import('./components/calendar.js');
      console.log('📅 Calendar page script loaded successfully');
    } catch (error) {
      console.error('Failed to load calendar page script:', error);
    }
  }

  async initSettingsPage() {
    try {
      await import('./components/settings.js');
      console.log('⚙️ Settings page script loaded successfully');
    } catch (error) {
      console.error('Failed to load settings page script:', error);
    }
  }

  async initSecurityPage() {
    try {
      await import('./components/security.js');
      console.log('🔒 Security page script loaded successfully');
    } catch (error) {
      console.error('Failed to load security page script:', error);
    }
  }

  async initFilesPage() {
    try {
      await import('./components/files.js');
      console.log('📁 Files page script loaded successfully');
    } catch (error) {
      console.error('Failed to load files page script:', error);
    }
  }

  async initHelpPage() {
    try {
      await import('./components/help.js');
      console.log('❓ Help page script loaded successfully');
    } catch (error) {
      console.error('Failed to load help page script:', error);
    }
  }

  async initElementsPage() {
    try {
      await import('./components/elements.js');
      console.log('🧩 Elements page script loaded successfully');
    } catch (error) {
      console.error('Failed to load elements page script:', error);
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

    // Full screen toggle
    document.addEventListener('click', (e) => {
      const fullscreenButton = e.target.closest('[data-fullscreen-toggle]');
      if (fullscreenButton) {
        e.preventDefault();
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

  // Initialize navigation functionality
  initNavigation() {
    // Handle submenu state persistence
    const currentPage = window.location.pathname;
    const elementsPages = [
      '/elements', '/elements-buttons.html', '/elements-alerts.html', 
      '/elements-badges.html', '/elements-cards.html', '/elements-modals.html',
      '/elements-forms.html', '/elements-tables.html'
    ];
    
    // Check if current page is an Elements page
    const isElementsPage = elementsPages.some(page => currentPage.includes(page.replace('.html', '')));
    
    if (isElementsPage) {
      // Expand Elements submenu on Elements pages
      const elementsSubmenu = document.getElementById('elementsSubmenu');
      const elementsToggle = document.querySelector('[data-bs-target="#elementsSubmenu"]');
      
      if (elementsSubmenu && elementsToggle) {
        elementsSubmenu.classList.add('show');
        elementsToggle.setAttribute('aria-expanded', 'true');
        
        // Mark current page as active in submenu
        const activeSubmenuLink = document.querySelector(`.nav-submenu a[href="${currentPage}"]`);
        if (activeSubmenuLink) {
          activeSubmenuLink.classList.add('active');
        }
      }
    }
    
    // Handle submenu toggle persistence
    document.addEventListener('click', (e) => {
      const toggleButton = e.target.closest('[data-bs-toggle="collapse"]');
      if (toggleButton) {
        const targetId = toggleButton.getAttribute('data-bs-target');
        const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
        
        // Store submenu state
        localStorage.setItem(`submenu-${targetId}`, (!isExpanded).toString());
      }
    });
    
    // Restore submenu states from localStorage
    const submenuToggles = document.querySelectorAll('[data-bs-toggle="collapse"]');
    submenuToggles.forEach(toggle => {
      const targetId = toggle.getAttribute('data-bs-target');
      const savedState = localStorage.getItem(`submenu-${targetId}`);
      
      if (savedState === 'true' && !isElementsPage) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.classList.add('show');
          toggle.setAttribute('aria-expanded', 'true');
        }
      }
    });
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