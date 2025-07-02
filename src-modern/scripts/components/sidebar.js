// ==========================================================================
// Sidebar Manager - Handle sidebar toggle and state
// ==========================================================================

export class SidebarManager {
  constructor() {
    this.wrapper = document.getElementById('admin-wrapper');
    this.toggleButton = document.querySelector('[data-sidebar-toggle]');
    
    // If essential elements aren't found, do nothing.
    if (!this.wrapper || !this.toggleButton) {
      console.warn('SidebarManager: Essential elements (wrapper or toggle button) not found. Manager will be inactive.');
      return;
    }

    this.init();
  }

  init() {
    // Set initial state from localStorage on page load.
    const isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
    if (isCollapsed) {
      this.wrapper.classList.add('sidebar-collapsed');
      this.toggleButton.classList.add('is-active');
    }
  }

  toggle() {
    // The DOM is the single source of truth.
    const isCurrentlyCollapsed = this.wrapper.classList.contains('sidebar-collapsed');

    if (isCurrentlyCollapsed) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  collapse() {
    this.wrapper.classList.add('sidebar-collapsed');
    this.toggleButton.classList.add('is-active');
    localStorage.setItem('sidebar-collapsed', 'true');
  }

  expand() {
    this.wrapper.classList.remove('sidebar-collapsed');
    this.toggleButton.classList.remove('is-active');
    localStorage.setItem('sidebar-collapsed', 'false');
  }
} 