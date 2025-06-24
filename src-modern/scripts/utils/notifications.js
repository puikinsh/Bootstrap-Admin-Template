// ==========================================================================
// Notification Manager - Advanced toast and modal notifications
// ==========================================================================

import Swal from 'sweetalert2';
import { Toast } from 'bootstrap';

export class NotificationManager {
  constructor() {
    this.container = document.getElementById('toast-container') || this.createToastContainer();
    this.defaultDuration = 5000;
    this.activeToasts = new Set();
    this.init();
  }

  init() {
    // Create toast container if it doesn't exist
    if (!this.container) {
      this.container = this.createToastContainer();
    }

    // Configure SweetAlert2 defaults
    this.configureSweetAlert();
  }

  createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'position-fixed top-0 end-0 p-3';
    container.style.zIndex = '11';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
    document.body.appendChild(container);
    return container;
  }

  configureSweetAlert() {
    Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary me-2',
        cancelButton: 'btn btn-secondary',
        popup: 'rounded-3 shadow-lg',
        title: 'fs-4 fw-bold',
        content: 'text-muted'
      },
      buttonsStyling: false,
      reverseButtons: true,
      focusConfirm: false,
      allowOutsideClick: true,
      allowEscapeKey: true,
      showCloseButton: true
    });
  }

  // Toast Notifications
  show(message, type = 'info', options = {}) {
    const toastConfig = {
      message,
      type,
      duration: options.duration || this.defaultDuration,
      persistent: options.persistent || false,
      action: options.action || null,
      icon: options.icon || this.getIconForType(type)
    };

    const toast = this.createToast(toastConfig);
    this.container.appendChild(toast);

    const bsToast = new Toast(toast, {
      autohide: !toastConfig.persistent,
      delay: toastConfig.duration
    });

    this.activeToasts.add(bsToast);

    // Remove from active toasts when hidden
    toast.addEventListener('hidden.bs.toast', () => {
      this.activeToasts.delete(bsToast);
      toast.remove();
    });

    bsToast.show();
    return bsToast;
  }

  createToast(config) {
    const toastId = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-bg-${config.type} border-0`;
    toast.id = toastId;
    toast.role = 'alert';
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    const closeButton = config.persistent ? '' : `
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    `;

    const actionButton = config.action ? `
      <button type="button" class="btn btn-sm btn-outline-light me-2" onclick="${config.action.handler}">
        ${config.action.text}
      </button>
    ` : '';

    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center">
          <i class="${config.icon} me-2"></i>
          <span class="flex-grow-1">${config.message}</span>
          ${actionButton}
        </div>
        ${closeButton}
      </div>
    `;

    return toast;
  }

  getIconForType(type) {
    const icons = {
      success: 'bi bi-check-circle-fill',
      error: 'bi bi-exclamation-triangle-fill',
      warning: 'bi bi-exclamation-triangle-fill',
      info: 'bi bi-info-circle-fill',
      primary: 'bi bi-info-circle-fill',
      secondary: 'bi bi-info-circle-fill',
      danger: 'bi bi-exclamation-triangle-fill',
      light: 'bi bi-info-circle-fill',
      dark: 'bi bi-info-circle-fill'
    };
    return icons[type] || icons.info;
  }

  // Convenience methods
  success(message, options = {}) {
    return this.show(message, 'success', options);
  }

  error(message, options = {}) {
    return this.show(message, 'danger', options);
  }

  warning(message, options = {}) {
    return this.show(message, 'warning', options);
  }

  info(message, options = {}) {
    return this.show(message, 'info', options);
  }

  // SweetAlert2 Modal Notifications
  async confirm(options = {}) {
    const defaultOptions = {
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed',
      cancelButtonText: 'Cancel'
    };

    const result = await Swal.fire({
      ...defaultOptions,
      ...options
    });

    return result.isConfirmed;
  }

  async prompt(options = {}) {
    const defaultOptions = {
      title: 'Enter value',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter a value';
        }
      }
    };

    const result = await Swal.fire({
      ...defaultOptions,
      ...options
    });

    return result.isConfirmed ? result.value : null;
  }

  async alert(message, type = 'info', title = '') {
    const icons = {
      success: 'success',
      error: 'error',
      warning: 'warning',
      info: 'info'
    };

    await Swal.fire({
      title: title,
      text: message,
      icon: icons[type] || 'info',
      confirmButtonText: 'OK'
    });
  }

  async showLoading(message = 'Loading...') {
    Swal.fire({
      title: message,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });
  }

  hideLoading() {
    Swal.close();
  }

  // Progress notification
  async showProgress(title, onProgress) {
    let currentStep = 0;
    const totalSteps = 100;

    await Swal.fire({
      title: title,
      html: `
        <div class="progress mb-3">
          <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div id="progress-text">Starting...</div>
      `,
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        const progressBar = Swal.getHtmlContainer().querySelector('.progress-bar');
        const progressText = Swal.getHtmlContainer().querySelector('#progress-text');

        if (onProgress && typeof onProgress === 'function') {
          onProgress((step, text) => {
            currentStep = step;
            progressBar.style.width = `${step}%`;
            progressBar.setAttribute('aria-valuenow', step);
            if (text) {
              progressText.textContent = text;
            }

            if (step >= 100) {
              setTimeout(() => {
                Swal.close();
                this.success('Operation completed successfully!');
              }, 500);
            }
          });
        }
      }
    });
  }

  // Bulk operations
  clearAll() {
    this.activeToasts.forEach(toast => {
      toast.hide();
    });
    this.activeToasts.clear();
  }

  // Real-time notifications (for WebSocket/SSE integration)
  handleRealTimeNotification(data) {
    const { type, message, priority = 'normal', persistent = false } = data;
    
    const options = {
      persistent: priority === 'high' || persistent,
      duration: priority === 'high' ? 10000 : this.defaultDuration
    };

    // Add sound for high priority notifications
    if (priority === 'high') {
      this.playNotificationSound();
    }

    this.show(message, type, options);
  }

  playNotificationSound() {
    // Create audio element for notification sound
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiS2O/FeCkFKXnJ8N+PQAoSXrTp6qpTFAlEnt//wUfZBBmBzOvQDh8VHH/H7N4=' );
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Ignore audio play errors (browser restrictions)
    });
  }

  // Activity feed integration
  addToActivityFeed(notification) {
    const activityFeed = document.querySelector('.activity-feed');
    if (!activityFeed) return;

    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.innerHTML = `
      <div class="activity-icon bg-${notification.type} bg-opacity-10 text-${notification.type}">
        <i class="${this.getIconForType(notification.type)}"></i>
      </div>
      <div class="activity-content">
        <p class="mb-1">${notification.message}</p>
        <small class="text-muted">Just now</small>
      </div>
    `;

    activityFeed.insertBefore(activityItem, activityFeed.firstChild);

    // Limit activity feed to 10 items
    const items = activityFeed.querySelectorAll('.activity-item');
    if (items.length > 10) {
      items[items.length - 1].remove();
    }
  }

  // Browser notification API
  async requestNotificationPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  showBrowserNotification(title, options = {}) {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      });

      // Auto close after 5 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);

      return notification;
    }
  }
} 