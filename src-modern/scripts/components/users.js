// ==========================================================================
// User Management Components - Advanced Data Table Operations
// ==========================================================================

// Enhanced User Table Component
export class UserTableManager {
  constructor(options = {}) {
    this.users = [];
    this.filteredUsers = [];
    this.selectedUsers = [];
    this.currentPage = 1;
    this.itemsPerPage = options.itemsPerPage || 10;
    this.searchQuery = '';
    this.statusFilter = '';
    this.roleFilter = '';
    this.sortField = 'name';
    this.sortDirection = 'asc';
    this.isLoading = false;
    
    this.callbacks = {
      onUserEdit: options.onUserEdit || null,
      onUserDelete: options.onUserDelete || null,
      onBulkAction: options.onBulkAction || null
    };
    
    this.init();
  }

  init() {
    this.loadSampleData();
    this.filterUsers();
  }

  loadSampleData() {
    this.users = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        status: 'active',
        lastActive: '2 minutes ago',
        joinDate: '2023-01-15',
        avatar: '/assets/images/avatar-placeholder.svg',
        phone: '+1 (555) 123-4567',
        department: 'Engineering'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'user',
        status: 'active',
        lastActive: '1 hour ago',
        joinDate: '2023-02-20',
        avatar: '/assets/images/avatar-placeholder.svg',
        phone: '+1 (555) 987-6543',
        department: 'Marketing'
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike@example.com',
        role: 'moderator',
        status: 'pending',
        lastActive: '1 day ago',
        joinDate: '2023-03-10',
        avatar: '/assets/images/avatar-placeholder.svg',
        phone: '+1 (555) 456-7890',
        department: 'Support'
      },
      {
        id: 4,
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        role: 'user',
        status: 'active',
        lastActive: '5 minutes ago',
        joinDate: '2023-04-05',
        avatar: '/assets/images/avatar-placeholder.svg',
        phone: '+1 (555) 321-0987',
        department: 'Sales'
      },
      {
        id: 5,
        name: 'Bob Brown',
        email: 'bob@example.com',
        role: 'user',
        status: 'inactive',
        lastActive: '1 week ago',
        joinDate: '2023-01-30',
        avatar: '/assets/images/avatar-placeholder.svg',
        phone: '+1 (555) 654-3210',
        department: 'HR'
      },
      {
        id: 6,
        name: 'Alice Davis',
        email: 'alice@example.com',
        role: 'admin',
        status: 'active',
        lastActive: '30 minutes ago',
        joinDate: '2022-12-01',
        avatar: '/assets/images/avatar-placeholder.svg',
        phone: '+1 (555) 789-0123',
        department: 'Engineering'
      },
      {
        id: 7,
        name: 'Tom Miller',
        email: 'tom@example.com',
        role: 'user',
        status: 'active',
        lastActive: '3 hours ago',
        joinDate: '2023-05-15',
        avatar: '/assets/images/avatar-placeholder.svg',
        phone: '+1 (555) 147-2580',
        department: 'Design'
      },
      {
        id: 8,
        name: 'Lisa Garcia',
        email: 'lisa@example.com',
        role: 'moderator',
        status: 'active',
        lastActive: '1 hour ago',
        joinDate: '2023-03-25',
        avatar: '/assets/images/avatar-placeholder.svg',
        phone: '+1 (555) 369-1470',
        department: 'Support'
      }
    ];
  }

  // Filtering and Search
  filterUsers() {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = this.searchQuery === '' || 
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.department.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesStatus = this.statusFilter === '' || user.status === this.statusFilter;
      const matchesRole = this.roleFilter === '' || user.role === this.roleFilter;
      
      return matchesSearch && matchesStatus && matchesRole;
    });
    
    this.sortUsers();
    this.currentPage = 1;
  }

  // Sorting
  sortBy(field) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.sortUsers();
  }

  sortUsers() {
    this.filteredUsers.sort((a, b) => {
      let aVal = a[this.sortField];
      let bVal = b[this.sortField];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (this.sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }

  // Pagination
  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredUsers.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  get visiblePages() {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    
    for (let i = Math.max(2, this.currentPage - delta);
         i <= Math.min(this.totalPages - 1, this.currentPage + delta);
         i++) {
      range.push(i);
    }
    
    if (this.currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }
    
    rangeWithDots.push(...range);
    
    if (this.currentPage + delta < this.totalPages - 1) {
      rangeWithDots.push('...', this.totalPages);
    } else if (this.totalPages > 1) {
      rangeWithDots.push(this.totalPages);
    }
    
    return rangeWithDots.filter((v, i, a) => a.indexOf(v) === i && v <= this.totalPages);
  }

  goToPage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Selection Management
  toggleAll(checked) {
    if (checked) {
      this.selectedUsers = this.paginatedUsers.map(user => user.id);
    } else {
      this.selectedUsers = [];
    }
  }

  toggleUser(userId, checked) {
    if (checked) {
      if (!this.selectedUsers.includes(userId)) {
        this.selectedUsers.push(userId);
      }
    } else {
      this.selectedUsers = this.selectedUsers.filter(id => id !== userId);
    }
  }

  // CRUD Operations
  async createUser(userData) {
    this.isLoading = true;
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: Math.max(...this.users.map(u => u.id)) + 1,
        ...userData,
        lastActive: 'Just now',
        joinDate: new Date().toISOString().split('T')[0],
        avatar: '/assets/images/avatar-placeholder.svg'
      };
      
      this.users.push(newUser);
      this.filterUsers();
      return newUser;
    } finally {
      this.isLoading = false;
    }
  }

  async updateUser(userId, userData) {
    this.isLoading = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const userIndex = this.users.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
        this.users[userIndex] = { ...this.users[userIndex], ...userData };
        this.filterUsers();
        return this.users[userIndex];
      }
      throw new Error('User not found');
    } finally {
      this.isLoading = false;
    }
  }

  async deleteUser(userId) {
    this.isLoading = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.users = this.users.filter(u => u.id !== userId);
      this.selectedUsers = this.selectedUsers.filter(id => id !== userId);
      this.filterUsers();
      return true;
    } finally {
      this.isLoading = false;
    }
  }

  // Bulk Operations
  async bulkAction(action) {
    if (this.selectedUsers.length === 0) return;
    
    this.isLoading = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      switch (action) {
        case 'activate':
          this.users.forEach(user => {
            if (this.selectedUsers.includes(user.id)) {
              user.status = 'active';
            }
          });
          break;
        case 'deactivate':
          this.users.forEach(user => {
            if (this.selectedUsers.includes(user.id)) {
              user.status = 'inactive';
            }
          });
          break;
        case 'delete':
          this.users = this.users.filter(user => !this.selectedUsers.includes(user.id));
          break;
      }
      
      this.selectedUsers = [];
      this.filterUsers();
      
      if (this.callbacks.onBulkAction) {
        this.callbacks.onBulkAction(action, this.selectedUsers.length);
      }
    } finally {
      this.isLoading = false;
    }
  }

  // Data Export
  exportToCSV() {
    const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Department', 'Phone', 'Join Date', 'Last Active'];
    const rows = this.filteredUsers.map(user => [
      user.id,
      user.name,
      user.email,
      user.role,
      user.status,
      user.department,
      user.phone,
      user.joinDate,
      user.lastActive
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // Statistics
  get stats() {
    const total = this.users.length;
    const active = this.users.filter(u => u.status === 'active').length;
    const inactive = this.users.filter(u => u.status === 'inactive').length;
    const pending = this.users.filter(u => u.status === 'pending').length;
    
    const thisMonth = new Date();
    thisMonth.setMonth(thisMonth.getMonth() - 1);
    const newThisMonth = this.users.filter(u => new Date(u.joinDate) > thisMonth).length;
    
    return {
      total,
      active,
      inactive,
      pending,
      newThisMonth,
      activePercentage: total > 0 ? Math.round((active / total) * 100) : 0
    };
  }
}

// Alpine.js Components for User Management
export const userComponents = {
  // Enhanced User Table Component
  userTable: () => ({
    manager: null,
    searchQuery: '',
    statusFilter: '',
    roleFilter: '',
    selectedUsers: [],
    isLoading: false,

    init() {
      this.manager = new UserTableManager({
        itemsPerPage: 8,
        onUserEdit: (user) => this.editUser(user),
        onUserDelete: (user) => this.deleteUser(user),
        onBulkAction: (action, count) => this.showBulkResult(action, count)
      });
      
      // Watch for filter changes
      this.$watch('searchQuery', (value) => {
        this.manager.searchQuery = value;
        this.manager.filterUsers();
      });
      
      this.$watch('statusFilter', (value) => {
        this.manager.statusFilter = value;
        this.manager.filterUsers();
      });
      
      this.$watch('roleFilter', (value) => {
        this.manager.roleFilter = value;
        this.manager.filterUsers();
      });
    },

    get users() {
      return this.manager.paginatedUsers;
    },

    get totalUsers() {
      return this.manager.filteredUsers.length;
    },

    get totalPages() {
      return this.manager.totalPages;
    },

    get currentPage() {
      return this.manager.currentPage;
    },

    get visiblePages() {
      return this.manager.visiblePages;
    },

    get sortField() {
      return this.manager.sortField;
    },

    get sortDirection() {
      return this.manager.sortDirection;
    },

    get stats() {
      return this.manager.stats;
    },

    sortBy(field) {
      this.manager.sortBy(field);
    },

    goToPage(page) {
      this.manager.goToPage(page);
    },

    toggleAll(checked) {
      this.manager.toggleAll(checked);
      this.selectedUsers = [...this.manager.selectedUsers];
    },

    toggleUser(userId, checked) {
      this.manager.toggleUser(userId, checked);
      this.selectedUsers = [...this.manager.selectedUsers];
    },

    async bulkAction(action) {
      if (this.selectedUsers.length === 0) {
        alert('Please select users first');
        return;
      }
      
      const actionNames = {
        activate: 'activate',
        deactivate: 'deactivate',
        delete: 'delete'
      };
      
      if (action === 'delete' && !confirm(`Are you sure you want to delete ${this.selectedUsers.length} user(s)?`)) {
        return;
      }
      
      this.isLoading = true;
      await this.manager.bulkAction(action);
      this.selectedUsers = [];
      this.isLoading = false;
    },

    editUser(user) {
      // Trigger modal or navigation to edit form
      alert(`Edit user: ${user.name}`);
    },

    async deleteUser(user) {
      if (confirm(`Are you sure you want to delete ${user.name}?`)) {
        this.isLoading = true;
        await this.manager.deleteUser(user.id);
        this.isLoading = false;
      }
    },

    viewUser(user) {
      alert(`View user profile: ${user.name}`);
    },

    exportUsers() {
      this.manager.exportToCSV();
    },

    showBulkResult(action, count) {
      const actions = {
        activate: 'activated',
        deactivate: 'deactivated',
        delete: 'deleted'
      };
      alert(`Successfully ${actions[action]} ${count} user(s)`);
    }
  }),

  // User Form Component
  userForm: () => ({
    form: {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      status: 'active',
      phone: '',
      department: ''
    },
    
    isSubmitting: false,
    editingUser: null,

    init() {
      // Listen for edit events
      window.addEventListener('edit-user', (event) => {
        this.editUser(event.detail.user);
      });
    },

    editUser(user) {
      this.editingUser = user;
      this.form = {
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ').slice(1).join(' '),
        email: user.email,
        role: user.role,
        status: user.status,
        phone: user.phone || '',
        department: user.department || ''
      };
    },

    resetForm() {
      this.form = {
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        status: 'active',
        phone: '',
        department: ''
      };
      this.editingUser = null;
    },

    async saveUser() {
      this.isSubmitting = true;
      
      try {
        const userData = {
          name: `${this.form.firstName} ${this.form.lastName}`,
          email: this.form.email,
          role: this.form.role,
          status: this.form.status,
          phone: this.form.phone,
          department: this.form.department
        };

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (this.editingUser) {
          alert(`User ${userData.name} updated successfully!`);
        } else {
          alert(`User ${userData.name} created successfully!`);
        }
        
        this.resetForm();
        
        // Close modal if using Bootstrap modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('userModal'));
        if (modal) {
          modal.hide();
        }
        
      } catch (error) {
        alert('Error saving user: ' + error.message);
      } finally {
        this.isSubmitting = false;
      }
    },

    get isValid() {
      return this.form.firstName && 
             this.form.lastName && 
             this.form.email && 
             this.form.role && 
             this.form.status;
    }
  })
};

// Export individual components
export default {
  UserTableManager,
  userComponents
}; 