// ==========================================================================
// Icon Manager - Lightweight icon system with tree-shaking
// ==========================================================================

// Option 1: Bootstrap Icons (CSS-based, already included)
export class BootstrapIconManager {
  constructor() {
    this.prefix = 'bi';
    this.icons = new Map();
    this.loadCommonIcons();
  }

  loadCommonIcons() {
    // Pre-define commonly used icons for better performance
    this.icons.set('dashboard', 'bi-speedometer2');
    this.icons.set('users', 'bi-people');
    this.icons.set('analytics', 'bi-graph-up');
    this.icons.set('settings', 'bi-gear');
    this.icons.set('notifications', 'bi-bell');
    this.icons.set('search', 'bi-search');
    this.icons.set('menu', 'bi-list');
    this.icons.set('close', 'bi-x');
    this.icons.set('check', 'bi-check');
    this.icons.set('warning', 'bi-exclamation-triangle');
    this.icons.set('info', 'bi-info-circle');
    this.icons.set('success', 'bi-check-circle');
    this.icons.set('error', 'bi-x-circle');
    this.icons.set('arrow-up', 'bi-arrow-up');
    this.icons.set('arrow-down', 'bi-arrow-down');
    this.icons.set('plus', 'bi-plus');
    this.icons.set('edit', 'bi-pencil');
    this.icons.set('delete', 'bi-trash');
    this.icons.set('download', 'bi-download');
    this.icons.set('upload', 'bi-upload');
    this.icons.set('home', 'bi-house');
    this.icons.set('calendar', 'bi-calendar');
    this.icons.set('clock', 'bi-clock');
    this.icons.set('mail', 'bi-envelope');
    this.icons.set('phone', 'bi-telephone');
    this.icons.set('location', 'bi-geo-alt');
    this.icons.set('heart', 'bi-heart');
    this.icons.set('star', 'bi-star');
    this.icons.set('bookmark', 'bi-bookmark');
    this.icons.set('share', 'bi-share');
    this.icons.set('copy', 'bi-clipboard');
    this.icons.set('link', 'bi-link');
    this.icons.set('external', 'bi-box-arrow-up-right');
    this.icons.set('refresh', 'bi-arrow-clockwise');
    this.icons.set('filter', 'bi-funnel');
    this.icons.set('sort', 'bi-sort-down');
    this.icons.set('grid', 'bi-grid');
    this.icons.set('list', 'bi-list-ul');
    this.icons.set('image', 'bi-image');
    this.icons.set('file', 'bi-file-text');
    this.icons.set('folder', 'bi-folder');
    this.icons.set('eye', 'bi-eye');
    this.icons.set('eye-slash', 'bi-eye-slash');
    this.icons.set('lock', 'bi-lock');
    this.icons.set('unlock', 'bi-unlock');
    this.icons.set('user', 'bi-person');
    this.icons.set('team', 'bi-people');
    this.icons.set('crown', 'bi-crown');
    this.icons.set('shield', 'bi-shield-check');
  }

  get(iconName, fallback = 'bi-question-circle') {
    return this.icons.get(iconName) || fallback;
  }

  create(iconName, className = '', attributes = {}) {
    const iconClass = this.get(iconName);
    const element = document.createElement('i');
    element.className = `${iconClass} ${className}`.trim();
    
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });

    return element;
  }

  createSVG(iconName, size = 16, className = '') {
    // For future SVG-based icons if needed
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('class', className);
    svg.setAttribute('aria-hidden', 'true');
    return svg;
  }
}

// Option 2: Lucide Icons (SVG-based, tree-shakable alternative)
export class LucideIconManager {
  constructor() {
    this.icons = new Map();
    this.size = 20;
    this.strokeWidth = 2;
    this.loadLucideIcons();
  }

  async loadLucideIcons() {
    // Tree-shakable Lucide imports (only load what we use) - Optional dependency
    try {
      // Check if lucide is available as optional dependency
      const lucideModule = await import('lucide').catch(() => null);
      
      if (!lucideModule) {
        console.info('Lucide icons not installed, using Bootstrap Icons only');
        return;
      }

      const { 
        BarChart3, 
        Users, 
        Settings, 
        Bell, 
        Search, 
        Menu, 
        X, 
        Check, 
        AlertTriangle,
        Info,
        CheckCircle,
        XCircle,
        ArrowUp,
        ArrowDown,
        Plus,
        Edit,
        Trash2,
        Download,
        Upload,
        Home,
        Calendar,
        Clock,
        Mail,
        Phone,
        MapPin,
        Heart,
        Star,
        Bookmark,
        Share,
        Copy,
        ExternalLink,
        RefreshCw,
        Filter,
        ArrowUpDown,
        Grid3X3,
        List,
        Image,
        FileText,
        Folder,
        Eye,
        EyeOff,
        Lock,
        Unlock,
        User,
        Crown,
        Shield
      } = lucideModule;

      // Map icon names to Lucide components
      this.icons.set('dashboard', BarChart3);
      this.icons.set('users', Users);
      this.icons.set('settings', Settings);
      this.icons.set('notifications', Bell);
      this.icons.set('search', Search);
      this.icons.set('menu', Menu);
      this.icons.set('close', X);
      this.icons.set('check', Check);
      this.icons.set('warning', AlertTriangle);
      this.icons.set('info', Info);
      this.icons.set('success', CheckCircle);
      this.icons.set('error', XCircle);
      this.icons.set('arrow-up', ArrowUp);
      this.icons.set('arrow-down', ArrowDown);
      this.icons.set('plus', Plus);
      this.icons.set('edit', Edit);
      this.icons.set('delete', Trash2);
      this.icons.set('download', Download);
      this.icons.set('upload', Upload);
      this.icons.set('home', Home);
      this.icons.set('calendar', Calendar);
      this.icons.set('clock', Clock);
      this.icons.set('mail', Mail);
      this.icons.set('phone', Phone);
      this.icons.set('location', MapPin);
      this.icons.set('heart', Heart);
      this.icons.set('star', Star);
      this.icons.set('bookmark', Bookmark);
      this.icons.set('share', Share);
      this.icons.set('copy', Copy);
      this.icons.set('external', ExternalLink);
      this.icons.set('refresh', RefreshCw);
      this.icons.set('filter', Filter);
      this.icons.set('sort', ArrowUpDown);
      this.icons.set('grid', Grid3X3);
      this.icons.set('list', List);
      this.icons.set('image', Image);
      this.icons.set('file', FileText);
      this.icons.set('folder', Folder);
      this.icons.set('eye', Eye);
      this.icons.set('eye-slash', EyeOff);
      this.icons.set('lock', Lock);
      this.icons.set('unlock', Unlock);
      this.icons.set('user', User);
      this.icons.set('crown', Crown);
      this.icons.set('shield', Shield);

      console.info('✨ Lucide icons loaded successfully');

    } catch (error) {
      console.info('Lucide icons not available, falling back to Bootstrap Icons only');
    }
  }

  create(iconName, options = {}) {
    const IconComponent = this.icons.get(iconName);
    if (!IconComponent) {
      console.warn(`Icon "${iconName}" not found in Lucide icons`);
      return null;
    }

    const {
      size = this.size,
      strokeWidth = this.strokeWidth,
      className = '',
      color = 'currentColor'
    } = options;

    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', color);
    svg.setAttribute('stroke-width', strokeWidth);
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('class', `lucide lucide-${iconName} ${className}`.trim());
    svg.setAttribute('aria-hidden', 'true');

    // This would need actual Lucide SVG paths - simplified for demo
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svg.appendChild(path);

    return svg;
  }
}

// Main Icon Manager (configurable)
export class IconManager {
  constructor(provider = 'bootstrap') {
    this.provider = provider;
    this.manager = provider === 'lucide' 
      ? new LucideIconManager() 
      : new BootstrapIconManager();
  }

  // Unified API for both providers
  get(iconName) {
    return this.manager.get ? this.manager.get(iconName) : iconName;
  }

  create(iconName, options = {}) {
    if (this.provider === 'lucide') {
      return this.manager.create(iconName, options);
    } else {
      // Bootstrap Icons
      const { className = '', ...attributes } = options;
      return this.manager.create(iconName, className, attributes);
    }
  }

  // Utility method to replace icon in existing element
  replaceIcon(element, iconName, options = {}) {
    if (this.provider === 'bootstrap') {
      const iconClass = this.get(iconName);
      element.className = element.className.replace(/bi-[\w-]+/g, '');
      element.classList.add(iconClass);
    } else {
      const newIcon = this.create(iconName, options);
      if (newIcon && element.parentNode) {
        element.parentNode.replaceChild(newIcon, element);
      }
    }
  }

  // Batch icon loading for better performance
  preloadIcons(iconNames = []) {
    iconNames.forEach(name => {
      this.create(name);
    });
  }

  // Switch provider dynamically
  switchProvider(provider) {
    this.provider = provider;
    this.manager = provider === 'lucide' 
      ? new LucideIconManager() 
      : new BootstrapIconManager();
  }
}

// Export default instance
export const iconManager = new IconManager('bootstrap');

// Export for easy switching
export const switchToLucide = () => {
  iconManager.switchProvider('lucide');
};

export const switchToBootstrap = () => {
  iconManager.switchProvider('bootstrap');
}; 