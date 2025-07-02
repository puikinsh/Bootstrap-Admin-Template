import Alpine from 'alpinejs';

document.addEventListener('alpine:init', () => {
  Alpine.data('userTable', () => ({
    users: [],
    filteredUsers: [],
    selectedUsers: [],
    currentPage: 1,
    itemsPerPage: 10,
    searchQuery: '',
    statusFilter: '',
    roleFilter: '',
    sortField: 'name',
    sortDirection: 'asc',
    isLoading: false,

    init() {
      this.loadSampleData();
      this.filterUsers();
      this.$nextTick(() => {
        this.initCharts();
      });
    },

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
    },

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
    },

    // Sorting
    sortBy(field) {
        if (this.sortField === field) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
        this.sortField = field;
        this.sortDirection = 'asc';
        }
        this.sortUsers();
    },

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
    },

    // Pagination
    get paginatedUsers() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredUsers.slice(start, end);
    },

    get totalPages() {
        return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    },

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
    },

    goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        }
    },

    // Selection Management
    toggleAll(checked) {
        if (checked) {
            this.selectedUsers = this.paginatedUsers.map(user => user.id);
        } else {
            this.selectedUsers = [];
        }
    },

    toggleUser(userId, event) {
        if (event.target.checked) {
            if (!this.selectedUsers.includes(userId)) {
                this.selectedUsers.push(userId);
            }
        } else {
            this.selectedUsers = this.selectedUsers.filter(id => id !== userId);
        }
    },

    // CRUD Operations
    createUser(userData) {
        const newUser = {
            id: this.users.length + 1,
            name: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            role: userData.role,
            status: userData.status,
            phone: userData.phone,
            lastActive: 'Just now',
            joinDate: new Date().toISOString().split('T')[0],
            avatar: '/assets/images/avatar-placeholder.svg',
            department: 'New'
        };
        this.users.push(newUser);
        this.filterUsers();
    },

    editUser(user) {
        // Open edit modal with user data
        const userForm = Alpine.$data(document.querySelector('[x-data="userForm"]'));
        if (userForm) {
            const nameParts = user.name.split(' ');
            userForm.form.firstName = nameParts[0] || '';
            userForm.form.lastName = nameParts.slice(1).join(' ') || '';
            userForm.form.email = user.email;
            userForm.form.role = user.role;
            userForm.form.status = user.status;
            userForm.form.phone = user.phone;
            userForm.editingUserId = user.id;
        }
    },

    viewUser(user) {
        // Navigate to user profile or show user details
        console.log('Viewing user:', user);
        // In a real app, this would navigate to user profile page
    },

    deleteUser(user) {
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            this.users = this.users.filter(u => u.id !== user.id);
            this.filterUsers();
        }
    },

    // Bulk Operations
    bulkAction(action) {
        if (this.selectedUsers.length === 0) {
            alert('Please select users first');
            return;
        }

        const selectedUserObjects = this.users.filter(u => this.selectedUsers.includes(u.id));
        
        switch (action) {
            case 'activate':
                selectedUserObjects.forEach(user => user.status = 'active');
                break;
            case 'deactivate':
                selectedUserObjects.forEach(user => user.status = 'inactive');
                break;
            case 'delete':
                if (confirm(`Are you sure you want to delete ${this.selectedUsers.length} users?`)) {
                    this.users = this.users.filter(u => !this.selectedUsers.includes(u.id));
                }
                break;
        }
        
        this.selectedUsers = [];
        this.filterUsers();
    },

    // Export and Reporting
    exportUsers() {
        const csvContent = this.generateCSV(this.filteredUsers);
        this.downloadCSV(csvContent, 'users-export.csv');
    },

    generateCSV(users) {
        const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Department', 'Phone', 'Join Date', 'Last Active'];
        const rows = users.map(user => [
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
        
        return [headers, ...rows].map(row => row.join(',')).join('\n');
    },

    downloadCSV(content, filename) {
        const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    sendBulkInvites() {
        if (this.selectedUsers.length === 0) {
            alert('Please select users to send invites to');
            return;
        }
        
        // Simulate sending invites
        alert(`Sent invites to ${this.selectedUsers.length} users`);
        this.selectedUsers = [];
    },

    generateReport() {
        // Generate and download user report
        const reportData = {
            generatedAt: new Date().toISOString(),
            totalUsers: this.users.length,
            stats: this.stats,
            departmentBreakdown: this.departmentStats,
            recentActivity: this.recentActivities
        };
        
        const jsonContent = JSON.stringify(reportData, null, 2);
        this.downloadCSV(jsonContent, 'user-report.json');
    },
    
    get stats() {
        const active = this.users.filter(u => u.status === 'active').length;
        const pending = this.users.filter(u => u.status === 'pending').length;
        const inactive = this.users.filter(u => u.status === 'inactive').length;
        const thisMonth = new Date();
        const newThisMonth = this.users.filter(u => {
            const joinDate = new Date(u.joinDate);
            return joinDate.getMonth() === thisMonth.getMonth() && 
                   joinDate.getFullYear() === thisMonth.getFullYear();
        }).length;
        
        return {
            total: this.users.length,
            active,
            pending,
            inactive,
            newThisMonth,
            activePercentage: this.users.length > 0 ? (active / this.users.length) * 100 : 0,
            pendingPercentage: this.users.length > 0 ? (pending / this.users.length) * 100 : 0,
            inactivePercentage: this.users.length > 0 ? (inactive / this.users.length) * 100 : 0,
        };
    },

    get departmentStats() {
        const counts = this.users.reduce((acc, user) => {
            acc[user.department] = (acc[user.department] || 0) + 1;
            return acc;
        }, {});
        
        const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
        
        return Object.entries(counts).map(([name, count], index) => ({
            name,
            count,
            percentage: this.users.length > 0 ? Math.round((count / this.users.length) * 100) : 0,
            color: colors[index % colors.length]
        }));
    },

    get recentActivities() {
        return [
            { 
                id: 1,
                user: 'John Doe', 
                action: 'logged in', 
                time: '2 minutes ago', 
                type: 'login',
                icon: 'bi-box-arrow-in-right',
                details: 'User logged in from Chrome on Windows'
            },
            { 
                id: 2,
                user: 'Jane Smith', 
                action: 'updated profile', 
                time: '1 hour ago', 
                type: 'update',
                icon: 'bi-person-gear',
                details: 'Updated contact information and preferences'
            },
            { 
                id: 3,
                user: 'Mike Johnson', 
                action: 'created account', 
                time: '1 day ago', 
                type: 'create',
                icon: 'bi-person-plus',
                details: 'New user account created and activated'
            },
            { 
                id: 4,
                user: 'Sarah Wilson', 
                action: 'changed password', 
                time: '2 days ago', 
                type: 'security',
                icon: 'bi-shield-lock',
                details: 'Password changed for security reasons'
            },
            { 
                id: 5,
                user: 'Bob Brown', 
                action: 'logged out', 
                time: '1 week ago', 
                type: 'logout',
                icon: 'bi-box-arrow-right',
                details: 'User logged out from all devices'
            }
        ];
    },

    get systemAlerts() {
        return [
            { 
                id: 1, 
                title: 'User Registration Alert',
                message: 'New user registrations require approval', 
                type: 'warning', 
                time: '5 minutes ago' 
            },
            { 
                id: 2, 
                title: 'Backup Complete',
                message: 'System backup completed successfully', 
                type: 'success', 
                time: '1 hour ago' 
            },
            { 
                id: 3, 
                title: 'Maintenance Notice',
                message: 'Database maintenance scheduled for tonight', 
                type: 'info', 
                time: '2 hours ago' 
            }
        ];
    },
    
    initCharts() {
        // Active Users Chart
        const activeUserChartEl = document.querySelector('#activeUserChart');
        if (activeUserChartEl && !activeUserChartEl.hasAttribute('data-chart-initialized')) {
            activeUserChartEl.setAttribute('data-chart-initialized', 'true');
            const activeUserOptions = {
                series: [{
                    name: 'Active Users',
                    data: [65, 70, 80, 85, 90, 95, 88]
                }],
                chart: {
                    type: 'line',
                    height: 50,
                    sparkline: { enabled: true }
                },
                stroke: { curve: 'smooth', width: 2 },
                colors: ['#10b981']
            };
            new ApexCharts(activeUserChartEl, activeUserOptions).render();
        }

        // User Growth Chart
        const userGrowthChartEl = document.querySelector('#userGrowthChart');
        if (userGrowthChartEl && !userGrowthChartEl.hasAttribute('data-chart-initialized')) {
            userGrowthChartEl.setAttribute('data-chart-initialized', 'true');
            const userGrowthOptions = {
                series: [{
                    name: 'New Users',
                    data: [5, 8, 12, 15, 10, 18, 22]
                }],
                chart: {
                    type: 'bar',
                    height: 250,
                    width: '100%',
                    toolbar: { show: false },
                    parentHeightOffset: 0,
                    offsetX: 0,
                    offsetY: 0,
                    zoom: {
                        enabled: false
                    },
                    selection: {
                        enabled: false
                    }
                },
                responsive: [{
                    breakpoint: 768,
                    options: {
                        chart: {
                            height: 200
                        }
                    }
                }],
                colors: ['#6366f1'],
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                        columnWidth: '50%',
                        barHeight: '70%',
                        distributed: false
                    }
                },
                xaxis: {
                    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                    labels: {
                        style: {
                            fontSize: '12px',
                            colors: '#64748b'
                        }
                    }
                },
                yaxis: { 
                    show: false 
                },
                grid: { 
                    show: false 
                },
                dataLabels: {
                    enabled: false
                },
                tooltip: {
                    theme: 'light'
                }
            };
            new ApexCharts(userGrowthChartEl, userGrowthOptions).render();
        }

        // Role Distribution Chart
        const roleDistributionChartEl = document.querySelector('#roleDistributionChart');
        if (roleDistributionChartEl && !roleDistributionChartEl.hasAttribute('data-chart-initialized')) {
            roleDistributionChartEl.setAttribute('data-chart-initialized', 'true');
            const roleCounts = this.users.reduce((acc, user) => {
                acc[user.role] = (acc[user.role] || 0) + 1;
                return acc;
            }, {});
            
            const roleDistributionOptions = {
                series: Object.values(roleCounts),
                chart: {
                    type: 'donut',
                    height: 140
                },
                labels: Object.keys(roleCounts),
                colors: ['#6366f1', '#10b981', '#f59e0b', '#ef4444'],
                legend: { 
                    show: false
                },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '70%'
                        }
                    }
                },
                dataLabels: {
                    enabled: false
                },
                tooltip: {
                    theme: 'light'
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: { width: 200 }
                    }
                }]
            };
            new ApexCharts(roleDistributionChartEl, roleDistributionOptions).render();
        }
    }
  }));

  // Search Component for header search
  Alpine.data('searchComponent', () => ({
    query: '',
    results: [],
    isLoading: false,
    
    async search() {
      if (this.query.length < 2) {
        this.results = [];
        return;
      }
      
      this.isLoading = true;
      
      // Simulate API search
      await new Promise(resolve => setTimeout(resolve, 300));
      
      this.results = [
        { title: 'Dashboard', url: '/', type: 'page' },
        { title: 'Users', url: '/users.html', type: 'page' },
        { title: 'Settings', url: '/settings.html', type: 'page' },
        { title: 'Analytics', url: '/analytics.html', type: 'page' },
        { title: 'Security', url: '/security.html', type: 'page' },
        { title: 'Help', url: '/help.html', type: 'page' }
      ].filter(item => 
        item.title.toLowerCase().includes(this.query.toLowerCase())
      );
      
      // Also filter the user table if it exists on this page
      const userTable = Alpine.$data(document.querySelector('[x-data="userTable"]'));
      if (userTable) {
        userTable.searchQuery = this.query;
        userTable.filterUsers();
      }
      
      this.isLoading = false;
    }
  }));

  // Theme Switch Component
  Alpine.data('themeSwitch', () => ({
    currentTheme: 'light',
    
    init() {
      // Get theme from localStorage or default to light
      this.currentTheme = localStorage.getItem('theme') || 'light';
      this.applyTheme();
    },
    
    toggle() {
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      this.applyTheme();
      localStorage.setItem('theme', this.currentTheme);
    },
    
    applyTheme() {
      document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
    }
  }));

  // User Form Component for modal
  Alpine.data('userForm', () => ({
    form: {
      firstName: '',
      lastName: '',
      email: '',
      role: 'user',
      status: 'active',
      phone: ''
    },
    editingUserId: null,
    
    init() {
      this.resetForm();
    },
    
    resetForm() {
      this.form = {
        firstName: '',
        lastName: '',
        email: '',
        role: 'user',
        status: 'active',
        phone: ''
      };
      this.editingUserId = null;
    },
    
    saveUser() {
      // Validate form
      if (!this.form.firstName || !this.form.lastName || !this.form.email) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Get the user table component
      const userTable = Alpine.$data(document.querySelector('[x-data="userTable"]'));
      if (!userTable) return;
      
      if (this.editingUserId) {
        // Update existing user
        const user = userTable.users.find(u => u.id === this.editingUserId);
        if (user) {
          user.name = `${this.form.firstName} ${this.form.lastName}`;
          user.email = this.form.email;
          user.role = this.form.role;
          user.status = this.form.status;
          user.phone = this.form.phone;
          userTable.filterUsers();
        }
      } else {
        // Create new user
        userTable.createUser(this.form);
      }
      
      // Close modal and reset form
      const modal = document.querySelector('#userModal');
      if (modal) {
        const bsModal = bootstrap.Modal.getInstance(modal);
        if (bsModal) bsModal.hide();
      }
      
      this.resetForm();
    }
  }));
}); 