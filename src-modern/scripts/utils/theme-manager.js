// ==========================================================================
// Theme Manager - Handle dark/light mode switching
// ==========================================================================

export class ThemeManager {
  constructor() {
    this.currentTheme = this.getStoredTheme() || this.getPreferredTheme();
    this.themeToggleButtons = [];
    this.init();
  }

  init() {
    // Set initial theme
    this.setTheme(this.currentTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (!this.getStoredTheme()) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
  }

  getStoredTheme() {
    return localStorage.getItem('theme');
  }

  getPreferredTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
    this.updateThemeIcons();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  updateThemeIcons() {
    const lightIcons = document.querySelectorAll('.theme-icon-light');
    const darkIcons = document.querySelectorAll('.theme-icon-dark');
    
    if (this.currentTheme === 'dark') {
      lightIcons.forEach(icon => icon.classList.add('d-none'));
      darkIcons.forEach(icon => icon.classList.remove('d-none'));
    } else {
      lightIcons.forEach(icon => icon.classList.remove('d-none'));
      darkIcons.forEach(icon => icon.classList.add('d-none'));
    }
  }

  getCurrentTheme() {
    return this.currentTheme;
  }
} 