import Alpine from 'alpinejs';

document.addEventListener('alpine:init', () => {
  Alpine.data('settingsComponent', () => ({
    // UI State
    sidebarVisible: false,
    activeSection: 'general',
    
    // Storage Information
    storageUsed: 47.3,
    storageTotal: 100,
    
    // Settings Data
    settings: {
      // General Settings
      language: 'en',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      autoSave: true,
      
      // Appearance Settings
      theme: 'light',
      collapsedSidebar: false,
      animations: true,
      highContrast: false,
      
      // Notifications Settings
      notifications: {
        desktop: true,
        email: true,
        sound: false,
        marketing: false
      },
      
      // Privacy Settings
      privacy: {
        analytics: true,
        performance: true,
        activityHistory: true
      },
      
      // Storage Settings
      storage: {
        autoCleanup: true,
        cacheLimit: '1000'
      }
    },
    
    // Navigation Sections
    sections: [
      {
        id: 'general',
        name: 'General',
        icon: 'bi-gear'
      },
      {
        id: 'appearance',
        name: 'Appearance',
        icon: 'bi-palette'
      },
      {
        id: 'notifications',
        name: 'Notifications',
        icon: 'bi-bell'
      },
      {
        id: 'privacy',
        name: 'Privacy',
        icon: 'bi-shield-check'
      },
      {
        id: 'storage',
        name: 'Storage',
        icon: 'bi-hdd'
      }
    ],

    init() {
      // Get current theme from document or localStorage
      const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 
                          localStorage.getItem('theme') || 'light';
      
      // Update settings theme to match current theme
      this.settings.theme = currentTheme;
      
      this.loadSettings();
    },

    // Computed Properties
    get storagePercentage() {
      return (this.storageUsed / this.storageTotal) * 100;
    },

    get storageRemaining() {
      return (this.storageTotal - this.storageUsed).toFixed(1);
    },

    // Settings Management
    loadSettings() {
      // Load settings from localStorage if available
      const savedSettings = localStorage.getItem('appSettings');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          // Only merge non-theme settings to avoid overriding current theme
          const { theme, ...otherSettings } = parsed;
          this.settings = { ...this.settings, ...otherSettings };
        } catch (error) {
          console.warn('Failed to load saved settings:', error);
        }
      }
      
      // Don't change the theme here - it should remain as set in init()
    },

    saveSettings() {
      try {
        localStorage.setItem('appSettings', JSON.stringify(this.settings));
        this.showNotification('Settings saved successfully!', 'success');
        
        // Apply theme change immediately and sync with global theme system
        if (this.settings.theme) {
          document.documentElement.setAttribute('data-bs-theme', this.settings.theme);
          localStorage.setItem('theme', this.settings.theme);
        }
      } catch (error) {
        this.showNotification('Failed to save settings', 'error');
        console.error('Failed to save settings:', error);
      }
    },

    resetSettings() {
      if (confirm('Are you sure you want to reset all settings to their default values? This action cannot be undone.')) {
        // Reset to default values
        this.settings = {
          language: 'en',
          timezone: 'America/New_York',
          dateFormat: 'MM/DD/YYYY',
          autoSave: true,
          theme: 'light',
          collapsedSidebar: false,
          animations: true,
          highContrast: false,
          notifications: {
            desktop: true,
            email: true,
            sound: false,
            marketing: false
          },
          privacy: {
            analytics: true,
            performance: true,
            activityHistory: true
          },
          storage: {
            autoCleanup: true,
            cacheLimit: '1000'
          }
        };
        
        // Clear localStorage
        localStorage.removeItem('appSettings');
        
        // Apply default theme
        document.documentElement.setAttribute('data-bs-theme', 'light');
        
        this.showNotification('Settings reset to defaults', 'success');
      }
    },

    // Navigation
    setActiveSection(sectionId) {
      this.activeSection = sectionId;
    },

    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },

    // Theme Management
    setTheme(theme) {
      this.settings.theme = theme;
      document.documentElement.setAttribute('data-bs-theme', theme);
      
      // Save immediately for theme changes
      this.saveSettings();
    },

    // Storage Management
    clearCache() {
      // Simulate cache clearing
      this.showNotification('Cache cleared successfully', 'success');
      
      // Simulate storage reduction
      this.storageUsed = Math.max(this.storageUsed - 5, 30);
    },

    optimizeStorage() {
      // Simulate storage optimization
      this.showNotification('Storage optimized successfully', 'success');
      
      // Simulate storage reduction
      this.storageUsed = Math.max(this.storageUsed - 2, 35);
    },

    // Data Export
    exportData(format) {
      const exportData = {
        settings: this.settings,
        exportDate: new Date().toISOString(),
        format: format
      };
      
      let content, mimeType, filename;
      
      switch (format) {
        case 'json':
          content = JSON.stringify(exportData, null, 2);
          mimeType = 'application/json';
          filename = 'settings-export.json';
          break;
        case 'csv':
          content = this.convertToCSV(exportData);
          mimeType = 'text/csv';
          filename = 'settings-export.csv';
          break;
        case 'pdf':
          this.showNotification('PDF export would be generated here', 'info');
          return;
        case 'xml':
          content = this.convertToXML(exportData);
          mimeType = 'application/xml';
          filename = 'settings-export.xml';
          break;
        default:
          this.showNotification('Unsupported export format', 'error');
          return;
      }
      
      // Create and trigger download
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      this.showNotification(`Data exported as ${format.toUpperCase()}`, 'success');
    },

    convertToCSV(data) {
      const rows = [];
      rows.push('Setting,Value');
      
      const flattenObject = (obj, prefix = '') => {
        for (const key in obj) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            flattenObject(obj[key], prefix + key + '.');
          } else {
            rows.push(`${prefix}${key},${obj[key]}`);
          }
        }
      };
      
      flattenObject(data.settings);
      return rows.join('\n');
    },

    convertToXML(data) {
      const convertObjectToXML = (obj, indent = 0) => {
        let xml = '';
        const indentStr = '  '.repeat(indent);
        
        for (const key in obj) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            xml += `${indentStr}<${key}>\n`;
            xml += convertObjectToXML(obj[key], indent + 1);
            xml += `${indentStr}</${key}>\n`;
          } else {
            xml += `${indentStr}<${key}>${obj[key]}</${key}>\n`;
          }
        }
        
        return xml;
      };
      
      return `<?xml version="1.0" encoding="UTF-8"?>\n<export>\n${convertObjectToXML(data, 1)}</export>`;
    },

    // Utility Methods
    showNotification(message, type = 'info') {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: message,
          icon: type === 'success' ? 'success' : type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'info',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
      } else {
        alert(message);
      }
    }
  }));

  // Search component for header
  Alpine.data('searchComponent', () => ({
    query: '',
    results: [],
    
    search() {
      console.log('Searching for:', this.query);
      this.results = [];
    }
  }));

  // Theme switch component
  Alpine.data('themeSwitch', () => ({
    currentTheme: 'light',

    init() {
      this.currentTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
    },

    toggle() {
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
      localStorage.setItem('theme', this.currentTheme);
    }
  }));

  // Also register search and theme components for this page

  Alpine.data('themeSwitch', () => ({
    currentTheme: 'light',
    
    init() {
      this.currentTheme = document.documentElement.getAttribute('data-bs-theme') || 
                         localStorage.getItem('theme') || 'light';
    },
    
    toggle() {
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
      localStorage.setItem('theme', this.currentTheme);
    }
  }));
});