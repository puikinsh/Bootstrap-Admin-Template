import Alpine from 'alpinejs';

document.addEventListener('alpine:init', () => {
  Alpine.data('securityComponent', () => ({
    // UI State
    activeSection: 'account',
    loading: false,
    sidebarVisible: false,
    
    // Security Overview Data
    securityScore: 85,
    lastSecurityAudit: '2024-01-15',
    activeThreats: 2,
    blockedAttempts: 47,
    
    // Authentication Settings
    auth: {
      twoFactorEnabled: true,
      biometricEnabled: false,
      sessionTimeout: 30,
      maxSessions: 5,
      requirePasswordChange: 90,
      passwordMinLength: 12,
      requireSpecialChars: true,
      requireNumbers: true,
      requireUppercase: true
    },
    
    // Session Management
    activeSessions: [
      {
        id: 1,
        device: 'Desktop - Chrome',
        deviceIcon: 'bi-laptop',
        location: 'New York, USA',
        ip: '192.168.1.100',
        lastActive: '2 minutes ago',
        current: true,
        isCurrent: true
      },
      {
        id: 2,
        device: 'Mobile - Safari',
        deviceIcon: 'bi-phone',
        location: 'New York, USA',
        ip: '192.168.1.101',
        lastActive: '1 hour ago',
        current: false,
        isCurrent: false
      },
      {
        id: 3,
        device: 'Tablet - Chrome',
        deviceIcon: 'bi-tablet',
        location: 'Chicago, USA',
        ip: '203.0.113.42',
        lastActive: '2 days ago',
        current: false,
        isCurrent: false
      }
    ],
    
    // Access Control
    permissions: {
      adminAccess: false,
      userManagement: true,
      systemSettings: false,
      dataExport: true,
      apiAccess: true
    },
    
    // Data structure to match HTML expectations
    securityData: {
      recoveryEmail: 'john.doe@example.com',
      lockoutProtection: true,
      twoFactor: {
        app: true,
        sms: false
      },
      privacy: {
        profileVisibility: 'friends',
        showActivity: true,
        dataCollection: false
      }
    },
    
    // Navigation sections
    sections: [
      { id: 'account', name: 'Account Security', icon: 'bi-shield-check' },
      { id: 'twofactor', name: 'Two-Factor Auth', icon: 'bi-key' },
      { id: 'sessions', name: 'Active Sessions', icon: 'bi-laptop' },
      { id: 'privacy', name: 'Privacy Settings', icon: 'bi-eye-slash' },
      { id: 'activity', name: 'Security Activity', icon: 'bi-activity' }
    ],
    
    // Security activity for the log
    securityActivity: [
      {
        id: 1,
        type: 'login_success',
        message: 'Successful login from new device',
        timestamp: '2024-01-20 14:30:00',
        severity: 'info',
        icon: 'bi-check-circle',
        details: 'Chrome on Windows from New York, USA'
      },
      {
        id: 2,
        type: 'password_change',
        message: 'Password changed successfully',
        timestamp: '2024-01-19 09:15:00',
        severity: 'success',
        icon: 'bi-shield-lock',
        details: 'Password updated via security settings'
      },
      {
        id: 3,
        type: 'failed_login',
        message: 'Multiple failed login attempts detected',
        timestamp: '2024-01-18 16:45:00',
        severity: 'warning',
        icon: 'bi-exclamation-triangle',
        details: '5 failed attempts from IP 203.0.113.99'
      },
      {
        id: 4,
        type: 'account_locked',
        message: 'Account temporarily locked due to suspicious activity',
        timestamp: '2024-01-17 11:20:00',
        severity: 'danger',
        icon: 'bi-lock',
        details: 'Auto-locked after 10 failed login attempts'
      }
    ],
    
    // Security Events
    securityEvents: [
      {
        id: 1,
        type: 'login_success',
        message: 'Successful login from new device',
        timestamp: '2024-01-20 14:30:00',
        severity: 'info',
        details: 'Chrome on Windows from New York, USA'
      },
      {
        id: 2,
        type: 'password_change',
        message: 'Password changed successfully',
        timestamp: '2024-01-19 09:15:00',
        severity: 'success',
        details: 'Password updated via security settings'
      },
      {
        id: 3,
        type: 'failed_login',
        message: 'Multiple failed login attempts detected',
        timestamp: '2024-01-18 16:45:00',
        severity: 'warning',
        details: '5 failed attempts from IP 203.0.113.99'
      },
      {
        id: 4,
        type: 'account_locked',
        message: 'Account temporarily locked due to suspicious activity',
        timestamp: '2024-01-17 11:20:00',
        severity: 'danger',
        details: 'Auto-locked after 10 failed login attempts'
      }
    ],
    
    // Notification Settings
    notifications: {
      loginAlerts: true,
      securityUpdates: true,
      suspiciousActivity: true,
      weeklyReports: false
    },
    
    // Backup Codes
    backupCodes: [
      'ABC123-DEF456',
      'GHI789-JKL012',
      'MNO345-PQR678',
      'STU901-VWX234',
      'YZA567-BCD890'
    ],
    
    init() {
      this.loadSecuritySettings();
    },
    
    // Navigation
    setActiveSection(section) {
      this.activeSection = section;
    },
    
    // Security Score Calculation
    get securityScoreColor() {
      if (this.securityScore >= 90) return 'success';
      if (this.securityScore >= 70) return 'warning';
      return 'danger';
    },
    
    get securityScoreText() {
      if (this.securityScore >= 90) return 'Excellent';
      if (this.securityScore >= 70) return 'Good';
      if (this.securityScore >= 50) return 'Fair';
      return 'Poor';
    },
    
    // Additional methods referenced in HTML
    changePassword() {
      this.showNotification('Password change dialog would open here', 'info');
    },
    
    updateRecoveryEmail() {
      this.showNotification('Recovery email update dialog would open here', 'info');
    },
    
    setupAuthenticatorApp() {
      if (this.securityData.twoFactor.app) {
        this.showNotification('Authenticator app management would open here', 'info');
      } else {
        this.securityData.twoFactor.app = true;
        this.showNotification('Authenticator app setup completed', 'success');
        this.recalculateSecurityScore();
      }
    },
    
    setupSMSVerification() {
      if (this.securityData.twoFactor.sms) {
        this.showNotification('SMS verification management would open here', 'info');
      } else {
        this.securityData.twoFactor.sms = true;
        this.showNotification('SMS verification setup completed', 'success');
        this.recalculateSecurityScore();
      }
    },
    
    generateBackupCodes() {
      this.regenerateBackupCodes();
    },
    
    viewSecurityLog() {
      this.setActiveSection('activity');
      this.showNotification('Switched to security activity log', 'info');
    },
    
    emergencyLockdown() {
      if (confirm('Are you sure you want to initiate emergency lockdown? This will log out all sessions and require password reset.')) {
        this.activeSessions = this.activeSessions.filter(session => session.current);
        this.showNotification('Emergency lockdown initiated. All sessions terminated.', 'warning');
      }
    },
    
    loadMoreActivity() {
      this.showNotification('Loading more security activity...', 'info');
      // In a real app, this would load more activity from the server
    },

    // Authentication Methods
    toggleTwoFactor() {
      if (this.auth.twoFactorEnabled) {
        if (confirm('Are you sure you want to disable two-factor authentication? This will make your account less secure.')) {
          this.auth.twoFactorEnabled = false;
          this.showNotification('Two-factor authentication disabled', 'warning');
          this.recalculateSecurityScore();
        }
      } else {
        // In a real app, this would open 2FA setup wizard
        this.showTwoFactorSetup();
      }
    },
    
    showTwoFactorSetup() {
      // Simulate 2FA setup process
      if (confirm('Set up two-factor authentication using your mobile device?')) {
        this.auth.twoFactorEnabled = true;
        this.showNotification('Two-factor authentication enabled', 'success');
        this.recalculateSecurityScore();
      }
    },
    
    toggleBiometric() {
      if ('credentials' in navigator) {
        this.auth.biometricEnabled = !this.auth.biometricEnabled;
        const status = this.auth.biometricEnabled ? 'enabled' : 'disabled';
        this.showNotification(`Biometric authentication ${status}`, 'success');
        this.recalculateSecurityScore();
      } else {
        this.showNotification('Biometric authentication not supported on this device', 'warning');
      }
    },
    
    // Session Management
    terminateSession(sessionId) {
      if (confirm('Are you sure you want to terminate this session?')) {
        this.activeSessions = this.activeSessions.filter(session => session.id !== sessionId);
        this.showNotification('Session terminated successfully', 'success');
      }
    },
    
    terminateAllSessions() {
      if (confirm('Are you sure you want to terminate all other sessions? You will need to log in again on those devices.')) {
        this.activeSessions = this.activeSessions.filter(session => session.current);
        this.showNotification('All other sessions terminated', 'success');
      }
    },
    
    // Password Management
    changePassword() {
      // In a real app, this would open password change modal
      if (confirm('Open password change dialog?')) {
        this.showNotification('Password change dialog would open here', 'info');
      }
    },
    
    generatePassword() {
      const length = this.auth.passwordMinLength;
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
      let password = '';
      
      for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      
      // Copy to clipboard
      navigator.clipboard.writeText(password).then(() => {
        this.showNotification('Strong password generated and copied to clipboard', 'success');
      }).catch(() => {
        this.showNotification(`Generated password: ${password}`, 'info');
      });
    },
    
    // Backup Codes
    regenerateBackupCodes() {
      if (confirm('Are you sure you want to regenerate backup codes? This will invalidate all existing codes.')) {
        this.backupCodes = this.generateNewBackupCodes();
        this.showNotification('Backup codes regenerated successfully', 'success');
      }
    },
    
    generateNewBackupCodes() {
      const codes = [];
      for (let i = 0; i < 5; i++) {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase() + '-' +
                     Math.random().toString(36).substring(2, 8).toUpperCase();
        codes.push(code);
      }
      return codes;
    },
    
    downloadBackupCodes() {
      const content = this.backupCodes.join('\\n');
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'backup-codes.txt';
      a.click();
      URL.revokeObjectURL(url);
      this.showNotification('Backup codes downloaded', 'success');
    },
    
    // Security Audit
    runSecurityAudit() {
      this.loading = true;
      this.showNotification('Running security audit...', 'info');
      
      // Simulate audit process
      setTimeout(() => {
        this.loading = false;
        this.lastSecurityAudit = new Date().toISOString().split('T')[0];
        this.securityScore = Math.floor(Math.random() * 20) + 80; // 80-100
        this.showNotification('Security audit completed', 'success');
      }, 3000);
    },
    
    recalculateSecurityScore() {
      let score = 60; // Base score
      
      if (this.auth.twoFactorEnabled) score += 20;
      if (this.auth.biometricEnabled) score += 10;
      if (this.auth.passwordMinLength >= 12) score += 10;
      if (this.auth.requireSpecialChars && this.auth.requireNumbers) score += 5;
      
      this.securityScore = Math.min(score, 100);
    },
    
    // Data Export
    exportSecurityLog() {
      const exportData = {
        securityEvents: this.securityEvents,
        activeSessions: this.activeSessions,
        securityScore: this.securityScore,
        exportDate: new Date().toISOString()
      };
      
      const content = JSON.stringify(exportData, null, 2);
      const blob = new Blob([content], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'security-log.json';
      a.click();
      URL.revokeObjectURL(url);
      this.showNotification('Security log exported', 'success');
    },
    
    // Settings Management
    loadSecuritySettings() {
      const saved = localStorage.getItem('securitySettings');
      if (saved) {
        try {
          const settings = JSON.parse(saved);
          this.auth = { ...this.auth, ...settings.auth };
          this.notifications = { ...this.notifications, ...settings.notifications };
          this.permissions = { ...this.permissions, ...settings.permissions };
        } catch (error) {
          console.warn('Failed to load security settings:', error);
        }
      }
      this.recalculateSecurityScore();
    },
    
    saveSecuritySettings() {
      const settings = {
        auth: this.auth,
        notifications: this.notifications,
        permissions: this.permissions
      };
      
      try {
        localStorage.setItem('securitySettings', JSON.stringify(settings));
        this.showNotification('Security settings saved', 'success');
      } catch (error) {
        this.showNotification('Failed to save settings', 'error');
      }
    },
    
    // Notifications
    showNotification(message, type = 'info') {
      // Simple notification system - in a real app you'd use a proper notification library
      const alertClass = {
        success: 'alert-success',
        warning: 'alert-warning',
        danger: 'alert-danger',
        error: 'alert-danger',
        info: 'alert-info'
      }[type] || 'alert-info';
      
      console.log(`[${type.toUpperCase()}] ${message}`);
      
      // You could also dispatch a custom event here for a global notification system
      document.dispatchEvent(new CustomEvent('showNotification', {
        detail: { message, type }
      }));
    }
  }));

  // Also register search and theme components for this page
  Alpine.data('searchComponent', () => ({
    query: '',
    results: [],
    
    search() {
      if (this.query.trim()) {
        console.log('Searching for:', this.query);
        this.results = [];
      }
    }
  }));

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