// ==========================================================================
// Sidebar Manager - Handle sidebar toggle and state
// ==========================================================================

export class SidebarManager {
  constructor() {
    this.sidebar = document.getElementById('admin-sidebar');
    this.wrapper = document.getElementById('admin-wrapper');
    this.isCollapsed = false;
    this.init();
  }

  init() {
    // Set initial state from localStorage
    const storedState = localStorage.getItem('sidebar-collapsed');
    if (storedState === 'true') {
      this.collapse();
    }
  }

  toggle() {
    if (this.isCollapsed) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  collapse() {
    this.wrapper?.classList.add('sidebar-collapsed');
    this.isCollapsed = true;
    localStorage.setItem('sidebar-collapsed', 'true');
  }

  expand() {
    this.wrapper?.classList.remove('sidebar-collapsed');
    this.isCollapsed = false;
    localStorage.setItem('sidebar-collapsed', 'false');
  }
} 