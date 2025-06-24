// ==========================================================================
// Form Components - Advanced Form Management with Alpine.js
// ==========================================================================

import { iconManager } from '../utils/icon-manager.js';

// Form Validation Class
export class FormValidator {
  constructor() {
    this.rules = new Map();
    this.messages = new Map();
    this.setupDefaultRules();
  }

  setupDefaultRules() {
    // Email validation
    this.addRule('email', (value) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(value);
    }, 'Please enter a valid email address');

    // Required field validation
    this.addRule('required', (value) => {
      return value !== null && value !== undefined && value.toString().trim() !== '';
    }, 'This field is required');

    // Minimum length validation
    this.addRule('minLength', (value, length) => {
      return value && value.length >= length;
    }, (length) => `Must be at least ${length} characters long`);

    // Maximum length validation
    this.addRule('maxLength', (value, length) => {
      return !value || value.length <= length;
    }, (length) => `Must be no more than ${length} characters long`);

    // Password strength validation
    this.addRule('password', (value) => {
      if (!value) return false;
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumbers = /\d/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const hasMinLength = value.length >= 8;
      return hasUpper && hasLower && hasNumbers && hasSpecial && hasMinLength;
    }, 'Password must contain uppercase, lowercase, numbers, special characters and be 8+ characters');

    // Phone number validation
    this.addRule('phone', (value) => {
      const regex = /^[\+]?[1-9][\d]{0,15}$/;
      return !value || regex.test(value.replace(/[\s\-\(\)]/g, ''));
    }, 'Please enter a valid phone number');

    // URL validation
    this.addRule('url', (value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }, 'Please enter a valid URL');

    // Numeric validation
    this.addRule('numeric', (value) => {
      return !value || !isNaN(value) && !isNaN(parseFloat(value));
    }, 'Please enter a valid number');

    // Confirm password validation
    this.addRule('confirmPassword', (value, originalPassword) => {
      return value === originalPassword;
    }, 'Passwords do not match');
  }

  addRule(name, validator, message) {
    this.rules.set(name, validator);
    this.messages.set(name, message);
  }

  validate(value, ruleName, ...params) {
    const rule = this.rules.get(ruleName);
    if (!rule) return { valid: true };

    const isValid = rule(value, ...params);
    const message = this.messages.get(ruleName);
    
    return {
      valid: isValid,
      message: typeof message === 'function' ? message(...params) : message
    };
  }

  validateField(field) {
    const rules = field.dataset.validate ? field.dataset.validate.split('|') : [];
    const value = field.value;
    
    for (const ruleString of rules) {
      const [ruleName, ...params] = ruleString.split(':');
      const result = this.validate(value, ruleName, ...params);
      
      if (!result.valid) {
        return result;
      }
    }
    
    return { valid: true };
  }
}

// File Upload Manager
export class FileUploadManager {
  constructor(options = {}) {
    this.maxFileSize = options.maxFileSize || 10 * 1024 * 1024; // 10MB
    this.allowedTypes = options.allowedTypes || ['image/*', 'application/pdf', 'text/*'];
    this.maxFiles = options.maxFiles || 10;
    this.uploadUrl = options.uploadUrl || '/api/upload';
  }

  validateFile(file) {
    const errors = [];

    // Check file size
    if (file.size > this.maxFileSize) {
      errors.push(`File size must be less than ${this.formatFileSize(this.maxFileSize)}`);
    }

    // Check file type
    const isValidType = this.allowedTypes.some(type => {
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.slice(0, -1));
      }
      return file.type === type;
    });

    if (!isValidType) {
      errors.push('File type not allowed');
    }

    return errors;
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  async uploadFile(file, onProgress) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const percentComplete = (e.loaded / e.total) * 100;
          onProgress(percentComplete);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error('Upload failed'));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'));
      });

      xhr.open('POST', this.uploadUrl);
      xhr.send(formData);
    });
  }
}

// Password Strength Calculator
export class PasswordStrength {
  static calculate(password) {
    if (!password) return { score: 0, feedback: [] };

    let score = 0;
    const feedback = [];

    // Length check
    if (password.length >= 8) score += 1;
    else feedback.push('Use at least 8 characters');

    if (password.length >= 12) score += 1;

    // Character variety checks
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Add lowercase letters');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Add uppercase letters');

    if (/[0-9]/.test(password)) score += 1;
    else feedback.push('Add numbers');

    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else feedback.push('Add special characters');

    // Bonus points
    if (password.length >= 16) score += 1;
    if (/(.)\1{2,}/.test(password)) score -= 1; // Repeated characters

    const strength = Math.min(Math.max(score, 0), 4);
    const levels = ['weak', 'weak', 'fair', 'good', 'strong'];
    
    return {
      score: strength,
      level: levels[strength],
      feedback: feedback
    };
  }
}

// Alpine.js Form Components
export const formComponents = {
  // Real-time validation component
  validationForm: () => ({
    validator: new FormValidator(),
    fields: {},
    isSubmitting: false,

    init() {
      // Initialize form fields
      this.$el.querySelectorAll('[data-validate]').forEach(field => {
        this.fields[field.name] = {
          value: field.value,
          isValid: null,
          message: '',
          isValidating: false
        };

        // Add real-time validation
        field.addEventListener('input', () => this.validateField(field));
        field.addEventListener('blur', () => this.validateField(field));
      });
    },

    validateField(field) {
      const fieldData = this.fields[field.name];
      if (!fieldData) return;

      fieldData.isValidating = true;
      fieldData.value = field.value;

      // Simulate async validation delay
      setTimeout(() => {
        const result = this.validator.validateField(field);
        fieldData.isValid = result.valid;
        fieldData.message = result.message || '';
        fieldData.isValidating = false;

        // Update field classes
        field.classList.remove('is-valid-realtime', 'is-invalid-realtime', 'validating');
        
        if (fieldData.isValidating) {
          field.classList.add('validating');
        } else if (fieldData.isValid) {
          field.classList.add('is-valid-realtime');
        } else if (fieldData.isValid === false) {
          field.classList.add('is-invalid-realtime');
        }
      }, 300);
    },

    async submitForm() {
      this.isSubmitting = true;
      
      // Validate all fields
      const isValid = Object.values(this.fields).every(field => field.isValid);
      
      if (!isValid) {
        this.isSubmitting = false;
        return;
      }

      try {
        // Submit form logic here
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
        console.log('Form submitted successfully');
      } catch (error) {
        console.error('Form submission failed:', error);
      } finally {
        this.isSubmitting = false;
      }
    }
  }),

  // Form wizard component
  formWizard: () => ({
    currentStep: 1,
    totalSteps: 3,
    steps: [],
    isValid: true,

    init() {
      this.steps = Array.from(this.$el.querySelectorAll('.wizard-step-content')).map((step, index) => ({
        id: index + 1,
        title: step.dataset.title || `Step ${index + 1}`,
        isCompleted: false,
        isValid: true
      }));
    },

    nextStep() {
      if (this.currentStep < this.totalSteps && this.validateCurrentStep()) {
        this.steps[this.currentStep - 1].isCompleted = true;
        this.currentStep++;
      }
    },

    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },

    goToStep(step) {
      if (step <= this.currentStep || this.steps[step - 1].isCompleted) {
        this.currentStep = step;
      }
    },

    validateCurrentStep() {
      const currentStepElement = this.$el.querySelector(`.wizard-step-content:nth-child(${this.currentStep})`);
      const fields = currentStepElement.querySelectorAll('[data-validate]');
      
      let isValid = true;
      fields.forEach(field => {
        const validator = new FormValidator();
        const result = validator.validateField(field);
        if (!result.valid) {
          isValid = false;
        }
      });

      this.steps[this.currentStep - 1].isValid = isValid;
      return isValid;
    },

    isStepActive(step) {
      return this.currentStep === step;
    },

    isStepCompleted(step) {
      return this.steps[step - 1]?.isCompleted || false;
    }
  }),

  // File upload component
  fileUpload: () => ({
    files: [],
    dragOver: false,
    uploading: false,
    uploadManager: new FileUploadManager(),

    init() {
      this.$el.addEventListener('dragover', (e) => {
        e.preventDefault();
        this.dragOver = true;
      });

      this.$el.addEventListener('dragleave', () => {
        this.dragOver = false;
      });

      this.$el.addEventListener('drop', (e) => {
        e.preventDefault();
        this.dragOver = false;
        this.handleFiles(e.dataTransfer.files);
      });
    },

    handleFiles(fileList) {
      Array.from(fileList).forEach(file => {
        const errors = this.uploadManager.validateFile(file);
        
        const fileObj = {
          id: Date.now() + Math.random(),
          file: file,
          name: file.name,
          size: this.uploadManager.formatFileSize(file.size),
          progress: 0,
          status: errors.length > 0 ? 'error' : 'pending',
          errors: errors
        };

        this.files.push(fileObj);

        if (errors.length === 0) {
          this.uploadFile(fileObj);
        }
      });
    },

    async uploadFile(fileObj) {
      fileObj.status = 'uploading';
      
      try {
        await this.uploadManager.uploadFile(fileObj.file, (progress) => {
          fileObj.progress = progress;
        });
        
        fileObj.status = 'completed';
        fileObj.progress = 100;
      } catch (error) {
        fileObj.status = 'error';
        fileObj.errors = [error.message];
      }
    },

    removeFile(fileId) {
      this.files = this.files.filter(file => file.id !== fileId);
    },

    openFileDialog() {
      this.$refs.fileInput.click();
    }
  }),

  // Password strength component
  passwordStrength: () => ({
    password: '',
    strength: { score: 0, level: 'weak', feedback: [] },

    updateStrength() {
      this.strength = PasswordStrength.calculate(this.password);
    }
  }),

  // Dynamic form builder
  dynamicForm: () => ({
    formSchema: [],
    formData: {},

    init() {
      // Example schema - can be loaded from API
      this.formSchema = [
        {
          type: 'text',
          name: 'firstName',
          label: 'First Name',
          required: true,
          validation: 'required|minLength:2'
        },
        {
          type: 'email',
          name: 'email',
          label: 'Email Address',
          required: true,
          validation: 'required|email'
        },
        {
          type: 'select',
          name: 'country',
          label: 'Country',
          options: [
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'uk', label: 'United Kingdom' }
          ]
        }
      ];

      // Initialize form data
      this.formSchema.forEach(field => {
        this.formData[field.name] = field.defaultValue || '';
      });
    },

    getFieldClasses(field) {
      return {
        'form-control': ['text', 'email', 'password', 'tel', 'url'].includes(field.type),
        'form-select': field.type === 'select',
        'form-check-input': ['checkbox', 'radio'].includes(field.type)
      };
    }
  })
};

// Form Manager Class
export class FormManager {
  constructor() {
    this.forms = new Map();
    this.validator = new FormValidator();
  }

  registerForm(formElement, options = {}) {
    const formId = formElement.id || `form_${Date.now()}`;
    
    const formInstance = {
      element: formElement,
      options: options,
      validator: this.validator,
      isValid: false,
      isDirty: false
    };

    this.forms.set(formId, formInstance);
    this.initializeForm(formInstance);
    
    return formId;
  }

  initializeForm(formInstance) {
    const { element } = formInstance;

    // Add validation to all fields
    element.querySelectorAll('[data-validate]').forEach(field => {
      field.addEventListener('input', () => {
        this.validateField(field, formInstance);
        formInstance.isDirty = true;
      });

      field.addEventListener('blur', () => {
        this.validateField(field, formInstance);
      });
    });

    // Handle form submission
    element.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit(formInstance);
    });
  }

  validateField(field, formInstance) {
    const result = this.validator.validateField(field);
    
    // Update visual feedback
    field.classList.remove('is-valid-realtime', 'is-invalid-realtime');
    
    const feedbackElement = field.parentNode.querySelector('.feedback-message');
    if (feedbackElement) {
      feedbackElement.remove();
    }

    if (result.valid) {
      field.classList.add('is-valid-realtime');
    } else {
      field.classList.add('is-invalid-realtime');
      
      // Add feedback message
      const feedback = document.createElement('div');
      feedback.className = 'feedback-message invalid-feedback-realtime';
      feedback.innerHTML = `
        <i class="${iconManager.get('error')} feedback-icon"></i>
        ${result.message}
      `;
      field.parentNode.appendChild(feedback);
    }

    // Update form validity
    this.updateFormValidity(formInstance);
  }

  updateFormValidity(formInstance) {
    const fields = formInstance.element.querySelectorAll('[data-validate]');
    const isValid = Array.from(fields).every(field => {
      return this.validator.validateField(field).valid;
    });

    formInstance.isValid = isValid;
  }

  async handleSubmit(formInstance) {
    const { element, options } = formInstance;
    
    // Validate all fields
    const fields = element.querySelectorAll('[data-validate]');
    let isValid = true;
    
    fields.forEach(field => {
      this.validateField(field, formInstance);
      if (!this.validator.validateField(field).valid) {
        isValid = false;
      }
    });

    if (!isValid) {
      return;
    }

    // Handle submission
    if (options.onSubmit) {
      const formData = new FormData(element);
      await options.onSubmit(formData);
    }
  }

  getForm(formId) {
    return this.forms.get(formId);
  }

  destroyForm(formId) {
    this.forms.delete(formId);
  }
}

// Export default instance
export const formManager = new FormManager(); 