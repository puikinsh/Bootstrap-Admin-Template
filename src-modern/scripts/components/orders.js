import Alpine from 'alpinejs';

document.addEventListener('alpine:init', () => {
  Alpine.data('orderTable', () => ({
    orders: [],
    filteredOrders: [],
    selectedOrders: [],
    currentPage: 1,
    itemsPerPage: 10,
    searchQuery: '',
    statusFilter: '',
    dateFilter: '',
    sortField: 'orderNumber',
    sortDirection: 'desc',
    isLoading: false,
    chartsInitialized: false,

    // Statistics
    stats: {
      total: 0,
      pending: 0,
      shipped: 0,
      revenue: 0
    },

    statusStats: [],

    init() {
      this.loadSampleData();
      this.filterOrders();
      this.calculateStats();
      
      // Delay chart initialization to ensure DOM is fully ready
      setTimeout(() => {
        this.initCharts();
      }, 500);
    },

    loadSampleData() {
      this.orders = [
        {
          id: 1,
          orderNumber: 'ORD-2025-001',
          customer: {
            name: 'John Smith',
            email: 'john@example.com',
            avatar: '/assets/images/avatar-placeholder.svg'
          },
          items: [
            { name: 'iPhone 14 Pro', quantity: 1, price: 999.99 }
          ],
          itemCount: 1,
          total: 999.99,
          status: 'pending',
          orderDate: '2025-01-15',
          shippingAddress: '123 Main St, City, State 12345'
        },
        {
          id: 2,
          orderNumber: 'ORD-2025-002',
          customer: {
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            avatar: '/assets/images/avatar-placeholder.svg'
          },
          items: [
            { name: 'MacBook Air M2', quantity: 1, price: 1199.99 },
            { name: 'Wireless Mouse', quantity: 1, price: 49.99 }
          ],
          itemCount: 2,
          total: 1249.98,
          status: 'processing',
          orderDate: '2025-01-14',
          shippingAddress: '456 Oak Ave, City, State 67890'
        },
        {
          id: 3,
          orderNumber: 'ORD-2025-003',
          customer: {
            name: 'Mike Davis',
            email: 'mike@example.com',
            avatar: '/assets/images/avatar-placeholder.svg'
          },
          items: [
            { name: 'Cotton T-Shirt', quantity: 3, price: 24.99 }
          ],
          itemCount: 3,
          total: 74.97,
          status: 'shipped',
          orderDate: '2025-01-13',
          shippingAddress: '789 Pine St, City, State 54321'
        },
        {
          id: 4,
          orderNumber: 'ORD-2025-004',
          customer: {
            name: 'Emily Brown',
            email: 'emily@example.com',
            avatar: '/assets/images/avatar-placeholder.svg'
          },
          items: [
            { name: 'JavaScript Guide', quantity: 1, price: 39.99 },
            { name: 'Python Cookbook', quantity: 1, price: 44.99 }
          ],
          itemCount: 2,
          total: 84.98,
          status: 'delivered',
          orderDate: '2025-01-12',
          shippingAddress: '321 Elm St, City, State 13579'
        },
        {
          id: 5,
          orderNumber: 'ORD-2025-005',
          customer: {
            name: 'David Wilson',
            email: 'david@example.com',
            avatar: '/assets/images/avatar-placeholder.svg'
          },
          items: [
            { name: 'Wireless Headphones', quantity: 1, price: 149.99 }
          ],
          itemCount: 1,
          total: 149.99,
          status: 'cancelled',
          orderDate: '2025-01-11',
          shippingAddress: '654 Maple Dr, City, State 24680'
        },
        {
          id: 6,
          orderNumber: 'ORD-2025-006',
          customer: {
            name: 'Lisa Anderson',
            email: 'lisa@example.com',
            avatar: '/assets/images/avatar-placeholder.svg'
          },
          items: [
            { name: 'Smart Home Hub', quantity: 1, price: 199.99 },
            { name: 'Smart Bulbs', quantity: 4, price: 19.99 }
          ],
          itemCount: 5,
          total: 279.95,
          status: 'processing',
          orderDate: '2025-01-10',
          shippingAddress: '987 Cedar Ln, City, State 97531'
        },
        {
          id: 7,
          orderNumber: 'ORD-2025-007',
          customer: {
            name: 'Robert Martinez',
            email: 'robert@example.com',
            avatar: '/assets/images/avatar-placeholder.svg'
          },
          items: [
            { name: 'Samsung Galaxy S24', quantity: 1, price: 899.99 }
          ],
          itemCount: 1,
          total: 899.99,
          status: 'pending',
          orderDate: '2025-01-09',
          shippingAddress: '456 Valley Rd, City, State 11223'
        },
        {
          id: 8,
          orderNumber: 'ORD-2025-008',
          customer: {
            name: 'Jennifer Taylor',
            email: 'jennifer@example.com',
            avatar: '/assets/images/avatar-placeholder.svg'
          },
          items: [
            { name: 'Yoga Mat Premium', quantity: 2, price: 49.99 },
            { name: 'Winter Jacket', quantity: 1, price: 189.99 }
          ],
          itemCount: 3,
          total: 289.97,
          status: 'shipped',
          orderDate: '2025-01-08',
          shippingAddress: '789 Mountain View Dr, City, State 44556'
        },
        {
          id: 9,
          orderNumber: 'ORD-2025-009',
          customer: {
            name: 'Christopher Lee',
            email: 'chris@example.com',
            avatar: '/assets/images/avatar-placeholder.svg'
          },
          items: [
            { name: 'React Handbook', quantity: 1, price: 54.99 },
            { name: 'Node.js Complete Guide', quantity: 1, price: 59.99 },
            { name: 'Docker Deep Dive', quantity: 1, price: 49.99 }
          ],
          itemCount: 3,
          total: 164.97,
          status: 'delivered',
          orderDate: '2025-01-07',
          shippingAddress: '123 Tech Street, City, State 77889'
        },
        {
          id: 10,
          orderNumber: 'ORD-2025-010',
          customer: {
            name: 'Amanda Clark',
            email: 'amanda@example.com',
            avatar: '/assets/images/avatar-placeholder.svg'
          },
          items: [
            { name: 'Gaming Mouse RGB', quantity: 1, price: 79.99 },
            { name: 'Mechanical Keyboard', quantity: 1, price: 159.99 }
          ],
          itemCount: 2,
          total: 239.98,
          status: 'processing',
          orderDate: '2025-01-06',
          shippingAddress: '321 Gaming Ave, City, State 99001'
        },
        {
          id: 11,
          orderNumber: 'ORD-2025-011',
          customer: {
            name: 'Daniel Rodriguez',
            email: 'daniel@example.com',
            avatar: '/assets/images/avatar-placeholder.svg'
          },
          items: [
            { name: 'Coffee Maker Deluxe', quantity: 1, price: 249.99 }
          ],
          itemCount: 1,
          total: 249.99,
          status: 'pending',
          orderDate: '2025-01-05',
          shippingAddress: '654 Coffee St, City, State 33445'
        },
        {
          id: 12,
          orderNumber: 'ORD-2025-012',
          customer: {
            name: 'Michelle White',
            email: 'michelle@example.com',
            avatar: '/assets/images/avatar-placeholder.svg'
          },
          items: [
            { name: 'Running Shoes', quantity: 1, price: 129.99 },
            { name: 'Casual Polo Shirt', quantity: 2, price: 39.99 }
          ],
          itemCount: 3,
          total: 209.97,
          status: 'shipped',
          orderDate: '2025-01-04',
          shippingAddress: '987 Sports Blvd, City, State 55667'
        },
        {
          id: 13,
          orderNumber: 'ORD-2025-013',
          customer: {
            name: 'Kevin Thompson',
            email: 'kevin@example.com',
            avatar: '/assets/images/avatar-placeholder.svg'
          },
          items: [
            { name: 'Tablet Pro 12.9"', quantity: 1, price: 1099.99 }
          ],
          itemCount: 1,
          total: 1099.99,
          status: 'delivered',
          orderDate: '2025-01-03',
          shippingAddress: '147 Tech Plaza, City, State 88990'
        },
        {
          id: 14,
          orderNumber: 'ORD-2025-014',
          customer: {
            name: 'Rachel Garcia',
            email: 'rachel@example.com',
            avatar: '/assets/images/avatar-placeholder.svg'
          },
          items: [
            { name: 'Garden Planter Set', quantity: 1, price: 89.99 },
            { name: 'Desk Organizer', quantity: 2, price: 34.99 }
          ],
          itemCount: 3,
          total: 159.97,
          status: 'processing',
          orderDate: '2025-01-02',
          shippingAddress: '258 Garden Way, City, State 22334'
        },
        {
          id: 15,
          orderNumber: 'ORD-2025-015',
          customer: {
            name: 'Steven Hall',
            email: 'steven@example.com',
            avatar: '/assets/images/avatar-placeholder.svg'
          },
          items: [
            { name: 'AI & Machine Learning', quantity: 1, price: 79.99 }
          ],
          itemCount: 1,
          total: 79.99,
          status: 'pending',
          orderDate: '2025-01-01',
          shippingAddress: '369 Learning Lane, City, State 66778'
        },
        {
          id: 16,
          orderNumber: 'ORD-2024-050',
          customer: {
            name: 'Nicole Allen',
            email: 'nicole@example.com',
            avatar: '/assets/images/avatar-placeholder.svg'
          },
          items: [
            { name: 'Wireless Headphones', quantity: 2, price: 149.99 }
          ],
          itemCount: 2,
          total: 299.98,
          status: 'delivered',
          orderDate: '2024-12-30',
          shippingAddress: '741 Audio Street, City, State 99887'
        },
        {
          id: 17,
          orderNumber: 'ORD-2024-049',
          customer: {
            name: 'Anthony Young',
            email: 'anthony@example.com',
            avatar: '/assets/images/avatar-placeholder.svg'
          },
          items: [
            { name: 'Cotton T-Shirt', quantity: 5, price: 24.99 }
          ],
          itemCount: 5,
          total: 124.95,
          status: 'shipped',
          orderDate: '2024-12-29',
          shippingAddress: '852 Fashion Ave, City, State 11229'
        },
        {
          id: 18,
          orderNumber: 'ORD-2024-048',
          customer: {
            name: 'Patricia King',
            email: 'patricia@example.com',
            avatar: '/assets/images/avatar-placeholder.svg'
          },
          items: [
            { name: 'Kitchen Knife Set', quantity: 1, price: 129.99 },
            { name: 'Coffee Maker Deluxe', quantity: 1, price: 249.99 }
          ],
          itemCount: 2,
          total: 379.98,
          status: 'processing',
          orderDate: '2024-12-28',
          shippingAddress: '963 Kitchen Rd, City, State 44556'
        },
        {
          id: 19,
          orderNumber: 'ORD-2024-047',
          customer: {
            name: 'Joshua Wright',
            email: 'joshua@example.com',
            avatar: '/assets/images/avatar-placeholder.svg'
          },
          items: [
            { name: 'Smart Home Hub', quantity: 1, price: 199.99 },
            { name: 'Gaming Mouse RGB', quantity: 1, price: 79.99 }
          ],
          itemCount: 2,
          total: 279.98,
          status: 'cancelled',
          orderDate: '2024-12-27',
          shippingAddress: '147 Smart Home Dr, City, State 77889'
        },
        {
          id: 20,
          orderNumber: 'ORD-2024-046',
          customer: {
            name: 'Laura Lopez',
            email: 'laura@example.com',
            avatar: '/assets/images/avatar-placeholder.svg'
          },
          items: [
            { name: 'MacBook Air M2', quantity: 1, price: 1199.99 }
          ],
          itemCount: 1,
          total: 1199.99,
          status: 'delivered',
          orderDate: '2024-12-26',
          shippingAddress: '456 Tech Center, City, State 33221'
        }
      ];
    },

    calculateStats() {
      this.stats.total = this.orders.length;
      this.stats.pending = this.orders.filter(o => o.status === 'pending').length;
      this.stats.shipped = this.orders.filter(o => o.status === 'shipped').length;
      this.stats.revenue = this.orders
        .filter(o => o.status !== 'cancelled')
        .reduce((sum, o) => sum + o.total, 0);

      // Calculate status distribution
      const statuses = {};
      this.orders.forEach(order => {
        statuses[order.status] = (statuses[order.status] || 0) + 1;
      });

      this.statusStats = Object.entries(statuses).map(([name, count]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        count,
        percentage: Math.round((count / this.orders.length) * 100),
        color: this.getStatusColor(name)
      }));
    },

    getStatusColor(status) {
      const colors = {
        pending: '#ffc107',
        processing: '#0d6efd',
        shipped: '#17a2b8',
        delivered: '#28a745',
        cancelled: '#dc3545'
      };
      return colors[status] || '#6c757d';
    },

    filterOrders() {
      this.filteredOrders = this.orders.filter(order => {
        const matchesSearch = !this.searchQuery || 
          order.orderNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          order.customer.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          order.customer.email.toLowerCase().includes(this.searchQuery.toLowerCase());
        
        const matchesStatus = !this.statusFilter || order.status === this.statusFilter;
        
        const matchesDate = !this.dateFilter || this.matchesDateFilter(order.orderDate);

        return matchesSearch && matchesStatus && matchesDate;
      });

      this.sortOrders();
      this.currentPage = 1;
    },

    matchesDateFilter(orderDate) {
      const today = new Date();
      const orderDateObj = new Date(orderDate);
      
      switch (this.dateFilter) {
        case 'today':
          return orderDateObj.toDateString() === today.toDateString();
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          return orderDateObj >= weekAgo;
        case 'month':
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          return orderDateObj >= monthAgo;
        default:
          return true;
      }
    },

    sortOrders() {
      this.filteredOrders.sort((a, b) => {
        let aVal = a[this.sortField];
        let bVal = b[this.sortField];

        if (this.sortField === 'total') {
          aVal = parseFloat(aVal);
          bVal = parseFloat(bVal);
        } else if (this.sortField === 'orderDate') {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        } else {
          aVal = aVal.toString().toLowerCase();
          bVal = bVal.toString().toLowerCase();
        }

        if (this.sortDirection === 'asc') {
          return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        } else {
          return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
        }
      });
    },

    sortBy(field) {
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortField = field;
        this.sortDirection = 'asc';
      }
      this.filterOrders();
    },

    toggleAll(checked) {
      if (checked) {
        this.selectedOrders = this.paginatedOrders.map(o => o.id);
      } else {
        this.selectedOrders = [];
      }
    },

    bulkAction(action) {
      if (this.selectedOrders.length === 0) return;

      const selectedOrderObjects = this.orders.filter(o => 
        this.selectedOrders.includes(o.id)
      );

      switch (action) {
        case 'processing':
          selectedOrderObjects.forEach(order => {
            if (order.status === 'pending') {
              order.status = 'processing';
            }
          });
          this.showNotification('Orders marked as processing!', 'success');
          break;
        case 'shipped':
          selectedOrderObjects.forEach(order => {
            if (order.status === 'processing') {
              order.status = 'shipped';
            }
          });
          this.showNotification('Orders marked as shipped!', 'success');
          break;
        case 'delivered':
          selectedOrderObjects.forEach(order => {
            if (order.status === 'shipped') {
              order.status = 'delivered';
            }
          });
          this.showNotification('Orders marked as delivered!', 'success');
          break;
      }

      this.selectedOrders = [];
      this.calculateStats();
    },

    viewOrder(order) {
      console.log('View order:', order);
      this.showNotification('Order details would open here', 'info');
    },

    trackOrder(order) {
      console.log('Track order:', order);
      this.showNotification('Order tracking would open here', 'info');
    },

    printInvoice(order) {
      console.log('Print invoice for order:', order);
      this.showNotification('Invoice would be generated and printed', 'info');
    },

    cancelOrder(order) {
      if (confirm(`Are you sure you want to cancel order ${order.orderNumber}?`)) {
        order.status = 'cancelled';
        this.calculateStats();
        this.showNotification('Order cancelled successfully!', 'success');
      }
    },

    exportOrders() {
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Order Number,Customer,Email,Items,Total,Status,Date\n" +
        this.filteredOrders.map(o => 
          `"${o.orderNumber}","${o.customer.name}","${o.customer.email}","${o.itemCount}","${o.total}","${o.status}","${o.orderDate}"`
        ).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "orders.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      this.showNotification('Orders exported successfully!', 'success');
    },

    showNotification(message, type = 'info') {
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: message,
          icon: type === 'success' ? 'success' : type === 'error' ? 'error' : 'info',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
      } else {
        alert(message);
      }
    },

    initCharts() {
      // Prevent multiple chart initializations
      if (this.chartsInitialized) return;
      
      this.initOrderTrendsChart();
      this.initStatusChart();
      this.chartsInitialized = true;
    },

    initOrderTrendsChart() {
      const chartElement = document.getElementById('orderTrendsChart');
      if (!chartElement) {
        console.warn('Order trends chart element not found');
        return;
      }

      // Clear any existing chart content
      chartElement.innerHTML = '';

      try {
        const trendsData = {
          series: [{
            name: 'Orders',
            data: [12, 19, 15, 27, 24, 32, 28]
          }, {
            name: 'Revenue',
            data: [1200, 1900, 1500, 2700, 2400, 3200, 2800]
          }],
          chart: {
            type: 'area',
            height: 300,
            toolbar: { show: false }
          },
          colors: ['#6366f1', '#10b981'],
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.3,
            }
          },
          stroke: {
            curve: 'smooth',
            width: 2
          },
          xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yaxis: [{
            title: {
              text: 'Orders'
            }
          }, {
            opposite: true,
            title: {
              text: 'Revenue ($)'
            }
          }],
          tooltip: {
            y: [{
              formatter: function (val) {
                return val + " orders"
              }
            }, {
              formatter: function (val) {
                return "$" + val
              }
            }]
          }
        };

        const chart = new ApexCharts(chartElement, trendsData);
        chart.render();
      } catch (error) {
        console.error('Error rendering order trends chart:', error);
      }
    },

    initStatusChart() {
      const chartElement = document.getElementById('statusChart');
      if (!chartElement) {
        console.warn('Status chart element not found');
        return;
      }

      // Clear any existing chart content
      chartElement.innerHTML = '';

      try {
        const chartData = {
          series: this.statusStats.map(stat => stat.count),
          chart: {
            type: 'donut',
            height: 200
          },
          labels: this.statusStats.map(stat => stat.name),
          colors: this.statusStats.map(stat => stat.color),
          plotOptions: {
            pie: {
              donut: {
                size: '70%'
              }
            }
          },
          legend: {
            show: false
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + " orders"
              }
            }
          }
        };

        const chart = new ApexCharts(chartElement, chartData);
        chart.render();
      } catch (error) {
        console.error('Error rendering status chart:', error);
      }
    },

    get paginatedOrders() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredOrders.slice(start, end);
    },

    get totalPages() {
      return Math.ceil(this.filteredOrders.length / this.itemsPerPage);
    },

    get visiblePages() {
      if (this.totalPages <= 1) return [1];
      
      const pages = [];
      const delta = 2;
      
      // Always show first page
      pages.push(1);
      
      if (this.totalPages <= 7) {
        // If total pages is small, show all
        for (let i = 2; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Complex pagination logic
        if (this.currentPage <= 4) {
          // Near the beginning
          for (let i = 2; i <= 5; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(this.totalPages);
        } else if (this.currentPage >= this.totalPages - 3) {
          // Near the end
          pages.push('...');
          for (let i = this.totalPages - 4; i <= this.totalPages; i++) {
            pages.push(i);
          }
        } else {
          // In the middle
          pages.push('...');
          for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(this.totalPages);
        }
      }
      
      return pages;
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
  }));

  // Search component for header
  Alpine.data('searchComponent', () => ({
    query: '',
    results: [],
    
    search() {
      console.log('Searching for:', this.query);
      this.results = [];
    }
  }));

  // Theme switch component
  Alpine.data('themeSwitch', () => ({
    currentTheme: 'light',

    init() {
      this.currentTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
    },

    toggle() {
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-bs-theme', this.currentTheme);
      localStorage.setItem('theme', this.currentTheme);
    }
  }));
});