import Alpine from 'alpinejs';

document.addEventListener('alpine:init', () => {
  Alpine.data('productTable', () => ({
    products: [],
    filteredProducts: [],
    selectedProducts: [],
    currentPage: 1,
    itemsPerPage: 10,
    searchQuery: '',
    categoryFilter: '',
    stockFilter: '',
    sortField: 'name',
    sortDirection: 'asc',
    isLoading: false,
    chartsInitialized: false,

    // Statistics
    stats: {
      total: 0,
      inStock: 0,
      lowStock: 0,
      totalValue: 0
    },

    categoryStats: [],

    init() {
      this.loadSampleData();
      this.filterProducts();
      this.calculateStats();
      
      // Delay chart initialization to ensure DOM is fully ready
      setTimeout(() => {
        this.initCharts();
      }, 500);
    },

    loadSampleData() {
      this.products = [
        {
          id: 1,
          name: 'iPhone 14 Pro',
          sku: 'IPHONE14-PRO-128',
          category: 'electronics',
          price: 999.99,
          stock: 45,
          status: 'published',
          created: '2024-01-15',
          image: '/assets/images/product-placeholder.svg',
          description: 'Latest iPhone with advanced camera system'
        },
        {
          id: 2,
          name: 'MacBook Air M2',
          sku: 'MBA-M2-256',
          category: 'electronics',
          price: 1199.99,
          stock: 23,
          status: 'published',
          created: '2024-01-20',
          image: '/assets/images/product-placeholder.svg',
          description: 'Lightweight laptop with M2 chip'
        },
        {
          id: 3,
          name: 'Cotton T-Shirt',
          sku: 'TSHIRT-COT-M',
          category: 'clothing',
          price: 24.99,
          stock: 156,
          status: 'published',
          created: '2024-02-01',
          image: '/assets/images/product-placeholder.svg',
          description: '100% organic cotton t-shirt'
        },
        {
          id: 4,
          name: 'JavaScript Guide',
          sku: 'BOOK-JS-2024',
          category: 'books',
          price: 39.99,
          stock: 8,
          status: 'published',
          created: '2024-02-10',
          image: '/assets/images/product-placeholder.svg',
          description: 'Complete JavaScript programming guide'
        },
        {
          id: 5,
          name: 'Garden Tool Set',
          sku: 'GARDEN-TOOLS-SET',
          category: 'home',
          price: 89.99,
          stock: 0,
          status: 'published',
          created: '2024-02-15',
          image: '/assets/images/product-placeholder.svg',
          description: 'Professional garden tool kit'
        },
        {
          id: 6,
          name: 'Wireless Headphones',
          sku: 'HEADPHONES-WL-BT',
          category: 'electronics',
          price: 149.99,
          stock: 67,
          status: 'published',
          created: '2024-02-20',
          image: '/assets/images/product-placeholder.svg',
          description: 'Noise-cancelling wireless headphones'
        },
        {
          id: 7,
          name: 'Denim Jeans',
          sku: 'JEANS-DENIM-32',
          category: 'clothing',
          price: 79.99,
          stock: 34,
          status: 'draft',
          created: '2024-02-25',
          image: '/assets/images/product-placeholder.svg',
          description: 'Classic fit denim jeans'
        },
        {
          id: 8,
          name: 'Python Cookbook',
          sku: 'BOOK-PY-COOK',
          category: 'books',
          price: 44.99,
          stock: 15,
          status: 'published',
          created: '2024-03-01',
          image: '/assets/images/product-placeholder.svg',
          description: 'Advanced Python programming techniques'
        },
        {
          id: 9,
          name: 'Smart Home Hub',
          sku: 'SMARTHUB-V2',
          category: 'electronics',
          price: 199.99,
          stock: 12,
          status: 'published',
          created: '2024-03-05',
          image: '/assets/images/product-placeholder.svg',
          description: 'Central hub for smart home devices'
        },
        {
          id: 10,
          name: 'Kitchen Knife Set',
          sku: 'KITCHEN-KNIVES-PRO',
          category: 'home',
          price: 129.99,
          stock: 28,
          status: 'pending',
          created: '2024-03-10',
          image: '/assets/images/product-placeholder.svg',
          description: 'Professional chef knife collection'
        },
        {
          id: 11,
          name: 'Samsung Galaxy S24',
          sku: 'GALAXY-S24-256',
          category: 'electronics',
          price: 899.99,
          stock: 67,
          status: 'published',
          created: '2024-03-12',
          image: '/assets/images/product-placeholder.svg',
          description: 'Latest Samsung flagship smartphone'
        },
        {
          id: 12,
          name: 'Yoga Mat Premium',
          sku: 'YOGA-MAT-PREM',
          category: 'home',
          price: 49.99,
          stock: 156,
          status: 'published',
          created: '2024-03-14',
          image: '/assets/images/product-placeholder.svg',
          description: 'Non-slip premium yoga mat'
        },
        {
          id: 13,
          name: 'React Handbook',
          sku: 'BOOK-REACT-2024',
          category: 'books',
          price: 54.99,
          stock: 23,
          status: 'published',
          created: '2024-03-16',
          image: '/assets/images/product-placeholder.svg',
          description: 'Complete React development guide'
        },
        {
          id: 14,
          name: 'Winter Jacket',
          sku: 'JACKET-WINTER-L',
          category: 'clothing',
          price: 189.99,
          stock: 12,
          status: 'published',
          created: '2024-03-18',
          image: '/assets/images/product-placeholder.svg',
          description: 'Waterproof winter jacket'
        },
        {
          id: 15,
          name: 'Gaming Mouse RGB',
          sku: 'MOUSE-GAMING-RGB',
          category: 'electronics',
          price: 79.99,
          stock: 89,
          status: 'published',
          created: '2024-03-20',
          image: '/assets/images/product-placeholder.svg',
          description: 'High-precision gaming mouse'
        },
        {
          id: 16,
          name: 'Coffee Maker Deluxe',
          sku: 'COFFEE-MAKER-DLX',
          category: 'home',
          price: 249.99,
          stock: 34,
          status: 'published',
          created: '2024-03-22',
          image: '/assets/images/product-placeholder.svg',
          description: 'Programmable drip coffee maker'
        },
        {
          id: 17,
          name: 'Node.js Complete Guide',
          sku: 'BOOK-NODEJS-COMP',
          category: 'books',
          price: 59.99,
          stock: 18,
          status: 'published',
          created: '2024-03-24',
          image: '/assets/images/product-placeholder.svg',
          description: 'Master Node.js development'
        },
        {
          id: 18,
          name: 'Running Shoes',
          sku: 'SHOES-RUN-42',
          category: 'clothing',
          price: 129.99,
          stock: 0,
          status: 'published',
          created: '2024-03-26',
          image: '/assets/images/product-placeholder.svg',
          description: 'Lightweight running shoes'
        },
        {
          id: 19,
          name: 'Tablet Pro 12.9"',
          sku: 'TABLET-PRO-129',
          category: 'electronics',
          price: 1099.99,
          stock: 15,
          status: 'published',
          created: '2024-03-28',
          image: '/assets/images/product-placeholder.svg',
          description: 'Professional tablet with stylus'
        },
        {
          id: 20,
          name: 'Garden Planter Set',
          sku: 'PLANTER-SET-3PC',
          category: 'home',
          price: 89.99,
          stock: 45,
          status: 'published',
          created: '2024-03-30',
          image: '/assets/images/product-placeholder.svg',
          description: 'Set of 3 ceramic planters'
        },
        {
          id: 21,
          name: 'Docker Deep Dive',
          sku: 'BOOK-DOCKER-DD',
          category: 'books',
          price: 49.99,
          stock: 31,
          status: 'published',
          created: '2024-04-01',
          image: '/assets/images/product-placeholder.svg',
          description: 'Container technology mastery'
        },
        {
          id: 22,
          name: 'Casual Polo Shirt',
          sku: 'POLO-CASUAL-M',
          category: 'clothing',
          price: 39.99,
          stock: 78,
          status: 'published',
          created: '2024-04-03',
          image: '/assets/images/product-placeholder.svg',
          description: 'Premium cotton polo shirt'
        },
        {
          id: 23,
          name: 'Mechanical Keyboard',
          sku: 'KEYBOARD-MECH-TKL',
          category: 'electronics',
          price: 159.99,
          stock: 24,
          status: 'published',
          created: '2024-04-05',
          image: '/assets/images/product-placeholder.svg',
          description: 'Tenkeyless mechanical keyboard'
        },
        {
          id: 24,
          name: 'Desk Organizer',
          sku: 'DESK-ORG-BAMBOO',
          category: 'home',
          price: 34.99,
          stock: 62,
          status: 'published',
          created: '2024-04-07',
          image: '/assets/images/product-placeholder.svg',
          description: 'Bamboo desk organizer'
        },
        {
          id: 25,
          name: 'AI & Machine Learning',
          sku: 'BOOK-AI-ML-2024',
          category: 'books',
          price: 79.99,
          stock: 14,
          status: 'published',
          created: '2024-04-09',
          image: '/assets/images/product-placeholder.svg',
          description: 'Introduction to AI and ML'
        }
      ];
    },

    calculateStats() {
      this.stats.total = this.products.length;
      this.stats.inStock = this.products.filter(p => p.stock > 20).length;
      this.stats.lowStock = this.products.filter(p => p.stock > 0 && p.stock <= 20).length;
      this.stats.totalValue = this.products.reduce((sum, p) => sum + (p.price * p.stock), 0);

      // Calculate category distribution
      const categories = {};
      this.products.forEach(product => {
        categories[product.category] = (categories[product.category] || 0) + 1;
      });

      this.categoryStats = Object.entries(categories).map(([name, count]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        count,
        percentage: Math.round((count / this.products.length) * 100),
        color: this.getCategoryColor(name)
      }));
    },

    getCategoryColor(category) {
      const colors = {
        electronics: '#6366f1',
        clothing: '#8b5cf6',
        books: '#06b6d4',
        home: '#10b981'
      };
      return colors[category] || '#6b7280';
    },

    filterProducts() {
      this.filteredProducts = this.products.filter(product => {
        const matchesSearch = !this.searchQuery || 
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.sku.toLowerCase().includes(this.searchQuery.toLowerCase());
        
        const matchesCategory = !this.categoryFilter || product.category === this.categoryFilter;
        
        const matchesStock = !this.stockFilter || 
          (this.stockFilter === 'in-stock' && product.stock > 20) ||
          (this.stockFilter === 'low-stock' && product.stock > 0 && product.stock <= 20) ||
          (this.stockFilter === 'out-of-stock' && product.stock === 0);

        return matchesSearch && matchesCategory && matchesStock;
      });

      this.sortProducts();
      this.currentPage = 1;
    },

    sortProducts() {
      this.filteredProducts.sort((a, b) => {
        let aVal = a[this.sortField];
        let bVal = b[this.sortField];

        if (this.sortField === 'price' || this.sortField === 'stock') {
          aVal = parseFloat(aVal);
          bVal = parseFloat(bVal);
        } else if (this.sortField === 'created') {
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
      this.filterProducts();
    },

    toggleAll(checked) {
      if (checked) {
        this.selectedProducts = this.paginatedProducts.map(p => p.id);
      } else {
        this.selectedProducts = [];
      }
    },

    bulkAction(action) {
      if (this.selectedProducts.length === 0) return;

      const selectedProductObjects = this.products.filter(p => 
        this.selectedProducts.includes(p.id)
      );

      switch (action) {
        case 'publish':
          selectedProductObjects.forEach(product => {
            product.status = 'published';
          });
          this.showNotification('Products published successfully!', 'success');
          break;
        case 'unpublish':
          selectedProductObjects.forEach(product => {
            product.status = 'draft';
          });
          this.showNotification('Products unpublished successfully!', 'info');
          break;
        case 'delete':
          if (confirm(`Are you sure you want to delete ${this.selectedProducts.length} product(s)?`)) {
            this.products = this.products.filter(p => 
              !this.selectedProducts.includes(p.id)
            );
            this.filterProducts();
            this.calculateStats();
            this.showNotification('Products deleted successfully!', 'success');
          }
          break;
      }

      this.selectedProducts = [];
    },

    editProduct(product) {
      console.log('Edit product:', product);
      this.showNotification('Edit functionality would open here', 'info');
    },

    viewProduct(product) {
      console.log('View product:', product);
      this.showNotification('Product details would open here', 'info');
    },

    duplicateProduct(product) {
      const newProduct = {
        ...product,
        id: Math.max(...this.products.map(p => p.id)) + 1,
        name: product.name + ' (Copy)',
        sku: product.sku + '-COPY',
        status: 'draft',
        created: new Date().toISOString().split('T')[0]
      };
      this.products.unshift(newProduct);
      this.filterProducts();
      this.calculateStats();
      this.showNotification('Product duplicated successfully!', 'success');
    },

    deleteProduct(product) {
      if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
        this.products = this.products.filter(p => p.id !== product.id);
        this.filterProducts();
        this.calculateStats();
        this.showNotification('Product deleted successfully!', 'success');
      }
    },

    exportProducts() {
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Name,SKU,Category,Price,Stock,Status,Created\n" +
        this.filteredProducts.map(p => 
          `"${p.name}","${p.sku}","${p.category}","${p.price}","${p.stock}","${p.status}","${p.created}"`
        ).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "products.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      this.showNotification('Products exported successfully!', 'success');
    },

    showNotification(message, type = 'info') {
      // Integration with SweetAlert2 or browser notification
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
      
      this.initSalesChart();
      this.initCategoryChart();
      this.chartsInitialized = true;
    },

    initSalesChart() {
      const salesChart = document.getElementById('salesChart');
      if (!salesChart) {
        console.warn('Sales chart element not found');
        return;
      }

      // Clear any existing chart content
      salesChart.innerHTML = '';

      try {

      // Sample sales data
      const salesData = {
        series: [{
          name: 'Sales',
          data: [65, 78, 85, 92, 88, 95, 102]
        }],
        chart: {
          type: 'area',
          height: 300,
          toolbar: { show: false }
        },
        colors: ['#6366f1'],
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
        yaxis: {
          title: {
            text: 'Sales ($1000s)'
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$" + val + "k"
            }
          }
        }
      };

        const chart = new ApexCharts(salesChart, salesData);
        chart.render();
      } catch (error) {
        console.error('Error rendering sales chart:', error);
      }
    },

    initCategoryChart() {
      const categoryChart = document.getElementById('categoryChart');
      if (!categoryChart) {
        console.warn('Category chart element not found');
        return;
      }

      // Clear any existing chart content
      categoryChart.innerHTML = '';

      try {

      const chartData = {
        series: this.categoryStats.map(cat => cat.count),
        chart: {
          type: 'donut',
          height: 200
        },
        labels: this.categoryStats.map(cat => cat.name),
        colors: this.categoryStats.map(cat => cat.color),
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
              return val + " products"
            }
          }
        }
      };

        const chart = new ApexCharts(categoryChart, chartData);
        chart.render();
      } catch (error) {
        console.error('Error rendering category chart:', error);
      }
    },

    get paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },

    get totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
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

  // Product form component for modals
  Alpine.data('productForm', () => ({
    form: {
      name: '',
      sku: '',
      category: '',
      price: '',
      stock: '',
      description: '',
      status: 'draft'
    },

    saveProduct() {
      // Validation
      if (!this.form.name || !this.form.sku || !this.form.category || 
          !this.form.price || !this.form.stock || !this.form.status) {
        alert('Please fill in all required fields');
        return;
      }

      console.log('Saving product:', this.form);
      
      // In a real app, this would make an API call
      // For now, just show success message
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Product Saved!',
          text: 'The product has been saved successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        alert('Product saved successfully!');
      }

      // Reset form
      this.form = {
        name: '',
        sku: '',
        category: '',
        price: '',
        stock: '',
        description: '',
        status: 'draft'
      };
    }
  }));

  // Search component for header
  Alpine.data('searchComponent', () => ({
    query: '',
    
    search() {
      console.log('Searching for:', this.query);
      // Implement search functionality
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