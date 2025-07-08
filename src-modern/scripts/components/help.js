import Alpine from 'alpinejs';

document.addEventListener('alpine:init', () => {
  Alpine.data('helpComponent', () => ({
    // UI State
    activeSection: 'getting-started',
    loading: false,
    
    // Search functionality
    faqSearch: '',
    filteredFAQ: [],
    
    // Documentation
    selectedDocCategory: 'getting-started',
    
    // Support ticket form
    supportTicket: {
      name: '',
      email: '',
      priority: '',
      category: '',
      subject: '',
      description: ''
    },
    submittingTicket: false,
    
    // Feature request form
    featureRequest: {
      title: '',
      category: '',
      description: ''
    },
    
    // Navigation sections
    sections: [
      { id: 'getting-started', name: 'Getting Started', icon: 'bi-play-circle' },
      { id: 'faq', name: 'FAQ', icon: 'bi-question-circle' },
      { id: 'documentation', name: 'Documentation', icon: 'bi-book' },
      { id: 'contact', name: 'Contact Support', icon: 'bi-headset' },
      { id: 'features', name: 'Feature Requests', icon: 'bi-lightbulb' }
    ],
    
    // FAQ data
    faqData: [
      {
        question: 'How do I reset my password?',
        answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page. Enter your email address and follow the instructions sent to your email.',
        open: false
      },
      {
        question: 'How do I add new users to the system?',
        answer: 'Navigate to the Users page from the sidebar, click the "Add User" button, fill in the required information, and assign appropriate roles and permissions.',
        open: false
      },
      {
        question: 'Can I export data from the dashboard?',
        answer: 'Yes, most pages include export functionality. Look for the "Export" button or dropdown menu to download data in various formats including CSV, Excel, and PDF.',
        open: false
      },
      {
        question: 'How do I change the dashboard theme?',
        answer: 'Click on the theme toggle button in the top navigation bar to switch between light and dark modes. Your preference will be saved automatically.',
        open: false
      },
      {
        question: 'What browsers are supported?',
        answer: 'The dashboard supports all modern browsers including Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+. Internet Explorer is not supported.',
        open: false
      },
      {
        question: 'How do I set up two-factor authentication?',
        answer: 'Go to Security settings, find the Two-Factor Authentication section, and follow the setup wizard to configure 2FA using an authenticator app or SMS.',
        open: false
      },
      {
        question: 'Can I customize the dashboard layout?',
        answer: 'Yes, you can customize widget arrangements, hide/show components, and adjust various layout preferences in the Settings page under the Appearance section.',
        open: false
      },
      {
        question: 'How do I contact technical support?',
        answer: 'You can reach our support team through live chat, email, or by submitting a support ticket. Live chat is available during business hours for immediate assistance.',
        open: false
      },
      {
        question: 'Is there a mobile app available?',
        answer: 'Currently, the dashboard is optimized for mobile browsers. A native mobile app is planned for future release. You can add the web app to your home screen for app-like experience.',
        open: false
      },
      {
        question: 'How do I backup my data?',
        answer: 'Data backups are performed automatically. You can also export your data manually from various sections of the dashboard. Contact support for full account backup options.',
        open: false
      }
    ],
    
    // Documentation categories
    docCategories: [
      { id: 'getting-started', name: 'Getting Started', icon: 'bi-play-circle', count: 5 },
      { id: 'user-management', name: 'User Management', icon: 'bi-people', count: 8 },
      { id: 'analytics', name: 'Analytics & Reports', icon: 'bi-graph-up', count: 12 },
      { id: 'security', name: 'Security', icon: 'bi-shield-check', count: 6 },
      { id: 'integrations', name: 'Integrations', icon: 'bi-puzzle', count: 10 },
      { id: 'api', name: 'API Reference', icon: 'bi-code-slash', count: 15 },
      { id: 'troubleshooting', name: 'Troubleshooting', icon: 'bi-tools', count: 7 }
    ],
    
    // Documentation articles
    documentationData: {
      'getting-started': [
        {
          id: 'quick-start',
          title: 'Quick Start Guide',
          description: 'Get up and running with the admin dashboard in 5 minutes',
          type: 'Guide',
          lastUpdated: 'Jan 15, 2032',
          readTime: 5
        },
        {
          id: 'dashboard-overview',
          title: 'Dashboard Overview',
          description: 'Understanding the main dashboard interface and navigation',
          type: 'Tutorial',
          lastUpdated: 'Jan 12, 2032',
          readTime: 8
        },
        {
          id: 'first-login',
          title: 'First Login Setup',
          description: 'Complete your profile and configure initial settings',
          type: 'Guide',
          lastUpdated: 'Jan 10, 2032',
          readTime: 6
        }
      ],
      'user-management': [
        {
          id: 'adding-users',
          title: 'Adding New Users',
          description: 'Step-by-step guide to adding users to your organization',
          type: 'Tutorial',
          lastUpdated: 'Jan 18, 2032',
          readTime: 7
        },
        {
          id: 'user-roles',
          title: 'User Roles & Permissions',
          description: 'Configure roles and manage user permissions effectively',
          type: 'Guide',
          lastUpdated: 'Jan 16, 2032',
          readTime: 12
        }
      ],
      'analytics': [
        {
          id: 'custom-reports',
          title: 'Creating Custom Reports',
          description: 'Build and customize reports to meet your specific needs',
          type: 'Tutorial',
          lastUpdated: 'Jan 20, 2032',
          readTime: 15
        },
        {
          id: 'data-visualization',
          title: 'Data Visualization Guide',
          description: 'Understanding charts, graphs, and dashboard widgets',
          type: 'Guide',
          lastUpdated: 'Jan 14, 2032',
          readTime: 10
        }
      ],
      'security': [
        {
          id: 'two-factor-auth',
          title: 'Two-Factor Authentication Setup',
          description: 'Secure your account with two-factor authentication',
          type: 'Guide',
          lastUpdated: 'Jan 22, 2032',
          readTime: 8
        },
        {
          id: 'password-security',
          title: 'Password Security Best Practices',
          description: 'Learn how to create and manage secure passwords',
          type: 'Guide',
          lastUpdated: 'Jan 19, 2032',
          readTime: 6
        }
      ],
      'integrations': [
        {
          id: 'third-party',
          title: 'Third-Party Integrations',
          description: 'Connect with popular services and applications',
          type: 'Guide',
          lastUpdated: 'Jan 25, 2032',
          readTime: 12
        },
        {
          id: 'webhooks',
          title: 'Webhook Configuration',
          description: 'Set up webhooks for real-time data synchronization',
          type: 'Tutorial',
          lastUpdated: 'Jan 23, 2032',
          readTime: 10
        }
      ],
      'api': [
        {
          id: 'authentication',
          title: 'API Authentication',
          description: 'Learn how to authenticate with our REST API',
          type: 'Reference',
          lastUpdated: 'Jan 28, 2032',
          readTime: 5
        },
        {
          id: 'endpoints',
          title: 'API Endpoints Reference',
          description: 'Complete reference for all available API endpoints',
          type: 'Reference',
          lastUpdated: 'Jan 26, 2032',
          readTime: 20
        }
      ],
      'troubleshooting': [
        {
          id: 'common-issues',
          title: 'Common Issues & Solutions',
          description: 'Quick solutions to frequently encountered problems',
          type: 'Guide',
          lastUpdated: 'Jan 30, 2032',
          readTime: 15
        },
        {
          id: 'performance',
          title: 'Performance Optimization',
          description: 'Tips to improve dashboard performance and load times',
          type: 'Guide',
          lastUpdated: 'Jan 27, 2032',
          readTime: 8
        }
      ]
    },
    
    // System status
    systemStatus: [
      { name: 'API Services', status: 'operational', statusText: 'Operational' },
      { name: 'Database', status: 'operational', statusText: 'Operational' },
      { name: 'File Storage', status: 'operational', statusText: 'Operational' },
      { name: 'Email Service', status: 'maintenance', statusText: 'Maintenance' },
      { name: 'Authentication', status: 'operational', statusText: 'Operational' }
    ],
    
    // Popular feature requests
    popularRequests: [
      {
        id: 1,
        title: 'Dark Mode for Mobile App',
        description: 'Add dark theme support to the mobile application',
        category: 'UI',
        votes: 247,
        status: 'In Development',
        voted: false
      },
      {
        id: 2,
        title: 'Advanced Filtering Options',
        description: 'More granular filtering capabilities for data tables',
        category: 'Analytics',
        votes: 189,
        status: 'Under Review',
        voted: true
      },
      {
        id: 3,
        title: 'Bulk Export Functionality',
        description: 'Export multiple datasets simultaneously',
        category: 'Reporting',
        votes: 156,
        status: 'Planned',
        voted: false
      },
      {
        id: 4,
        title: 'Real-time Notifications',
        description: 'Push notifications for important system events',
        category: 'Integration',
        votes: 134,
        status: 'Under Review',
        voted: false
      }
    ],
    
    init() {
      console.log('Help component initialized');
      this.filteredFAQ = [...this.faqData];
      this.loadUserPreferences();
    },
    
    // Navigation
    setActiveSection(section) {
      this.activeSection = section;
      if (section === 'documentation' && !this.selectedDocCategory) {
        this.selectedDocCategory = 'getting-started';
      }
    },
    
    // FAQ functionality
    toggleFAQ(index) {
      this.filteredFAQ[index].open = !this.filteredFAQ[index].open;
    },
    
    filterFAQ() {
      if (!this.faqSearch.trim()) {
        this.filteredFAQ = [...this.faqData];
        return;
      }
      
      const searchTerm = this.faqSearch.toLowerCase();
      this.filteredFAQ = this.faqData.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm) ||
        faq.answer.toLowerCase().includes(searchTerm)
      );
      
      // Close all FAQ items when searching
      this.filteredFAQ.forEach(faq => faq.open = false);
    },
    
    highlightText(text, searchTerm) {
      if (!searchTerm) return text;
      
      const regex = new RegExp(`(${searchTerm})`, 'gi');
      return text.replace(regex, '<span class="search-highlight">$1</span>');
    },
    
    // Documentation functionality
    selectDocCategory(categoryId) {
      this.selectedDocCategory = categoryId;
    },
    
    get selectedDocs() {
      return this.documentationData[this.selectedDocCategory] || [];
    },
    
    openDoc(docId) {
      this.showNotification(`Opening documentation: ${docId}`, 'info');
      // In a real app, this would open the documentation page
    },
    
    openArticle(articleId) {
      this.showNotification(`Opening article: ${articleId}`, 'info');
      // In a real app, this would open the specific article
    },
    
    // Video functionality
    playVideo(videoId) {
      this.showNotification(`Playing video: ${videoId}`, 'info');
      // In a real app, this would open a video player modal
    },
    
    // Support functionality
    startLiveChat() {
      this.showNotification('Connecting to live chat...', 'info');
      // In a real app, this would open the chat widget
    },
    
    openEmailForm() {
      this.showNotification('Opening email form...', 'info');
      // In a real app, this would open an email composition modal
    },
    
    showPhoneInfo() {
      alert('Support Phone: +1 (555) 123-HELP\\n\\nBusiness Hours:\\nMonday - Friday: 9 AM - 6 PM EST\\nWeekend: Emergency support only');
    },
    
    submitTicket() {
      if (!this.validateTicketForm()) return;
      
      this.submittingTicket = true;
      
      // Simulate API call
      setTimeout(() => {
        this.submittingTicket = false;
        this.showNotification('Support ticket submitted successfully! You will receive a confirmation email shortly.', 'success');
        this.resetTicketForm();
      }, 2000);
    },
    
    validateTicketForm() {
      const required = ['name', 'email', 'priority', 'category', 'subject', 'description'];
      const missing = required.filter(field => !this.supportTicket[field]);
      
      if (missing.length > 0) {
        this.showNotification('Please fill in all required fields', 'error');
        return false;
      }
      
      return true;
    },
    
    resetTicketForm() {
      this.supportTicket = {
        name: '',
        email: '',
        priority: '',
        category: '',
        subject: '',
        description: ''
      };
    },
    
    // Feature request functionality
    submitFeatureRequest() {
      if (!this.featureRequest.title || !this.featureRequest.category || !this.featureRequest.description) {
        this.showNotification('Please fill in all required fields', 'error');
        return;
      }
      
      // Add to popular requests (simulation)
      const newRequest = {
        id: this.popularRequests.length + 1,
        title: this.featureRequest.title,
        description: this.featureRequest.description,
        category: this.featureRequest.category,
        votes: 1,
        status: 'Under Review',
        voted: true
      };
      
      this.popularRequests.unshift(newRequest);
      this.showNotification('Feature request submitted successfully!', 'success');
      
      // Reset form
      this.featureRequest = {
        title: '',
        category: '',
        description: ''
      };
    },
    
    voteFeature(requestId) {
      const request = this.popularRequests.find(r => r.id === requestId);
      if (request && !request.voted) {
        request.votes++;
        request.voted = true;
        this.showNotification('Thank you for your vote!', 'success');
      }
    },
    
    // System status
    viewSystemStatus() {
      this.showNotification('Opening system status page...', 'info');
      // In a real app, this would open a detailed status page
    },
    
    // Utility functions
    downloadGuide() {
      this.showNotification('Downloading user guide...', 'info');
      // In a real app, this would trigger a PDF download
    },
    
    loadUserPreferences() {
      // Load user's preferred help section from localStorage
      const saved = localStorage.getItem('helpPreferences');
      if (saved) {
        try {
          const prefs = JSON.parse(saved);
          if (prefs.lastSection) {
            this.activeSection = prefs.lastSection;
          }
        } catch (error) {
          console.warn('Failed to load help preferences:', error);
        }
      }
    },
    
    saveUserPreferences() {
      const prefs = {
        lastSection: this.activeSection,
        savedAt: new Date().toISOString()
      };
      
      localStorage.setItem('helpPreferences', JSON.stringify(prefs));
    },
    
    // Notifications
    showNotification(message, type = 'info') {
      console.log(`[${type.toUpperCase()}] ${message}`);
      
      // Dispatch custom event for global notification system
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
      console.log('Searching help articles for:', this.query);
      // Clear results or populate with search results
      if (this.query.length > 2) {
        // Mock search results for help content
        this.results = [
          { title: 'Getting Started Guide', url: '#getting-started', type: 'Help' },
          { title: 'FAQ Section', url: '#faq', type: 'Help' },
          { title: 'Documentation', url: '#documentation', type: 'Help' },
          { title: 'Contact Support', url: '#contact', type: 'Help' }
        ].filter(item => 
          item.title.toLowerCase().includes(this.query.toLowerCase())
        );
        
        // Also search FAQ if on FAQ section
        const helpComponent = Alpine.$data(document.querySelector('[x-data="helpComponent"]'));
        if (helpComponent && helpComponent.activeSection === 'faq') {
          helpComponent.faqSearch = this.query;
          helpComponent.filterFAQ();
        }
      } else {
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