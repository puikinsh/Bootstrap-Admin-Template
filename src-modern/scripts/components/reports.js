import Alpine from 'alpinejs';

document.addEventListener('alpine:init', () => {
  Alpine.data('reportsComponent', () => ({
    // Filter settings
    dateRange: '30d',
    reportType: 'overview',
    exportFormat: 'pdf',
    
    // Data
    recentReports: [],
    topProducts: [],
    chartsInitialized: false,

    // KPI Data
    kpis: {
      revenue: 125750,
      revenueChange: 12.5,
      orders: 1247,
      ordersChange: 8.3,
      customers: 892,
      customersChange: 15.2,
      conversionRate: 3.4,
      conversionChange: -0.2
    },

    init() {
      this.loadSampleData();
      
      // Delay chart initialization to ensure DOM is fully ready
      setTimeout(() => {
        this.initCharts();
      }, 500);
    },

    loadSampleData() {
      this.recentReports = [
        {
          id: 'RPT-001',
          name: 'Monthly Sales Report',
          type: 'Sales',
          dateRange: 'Dec 1-31, 2024',
          generated: '2025-01-02',
          status: 'ready'
        },
        {
          id: 'RPT-002',
          name: 'Customer Analytics',
          type: 'Customer',
          dateRange: 'Q4 2024',
          generated: '2025-01-01',
          status: 'ready'
        },
        {
          id: 'RPT-003',
          name: 'Inventory Summary',
          type: 'Inventory',
          dateRange: 'Dec 2024',
          generated: '2024-12-31',
          status: 'ready'
        },
        {
          id: 'RPT-004',
          name: 'Financial Overview',
          type: 'Financial',
          dateRange: 'Jan 1-15, 2025',
          generated: '2025-01-16',
          status: 'generating'
        },
        {
          id: 'RPT-005',
          name: 'Product Performance',
          type: 'Product',
          dateRange: 'Last 90 days',
          generated: '2024-12-28',
          status: 'failed'
        }
      ];

      this.topProducts = [
        { name: 'iPhone 14 Pro', revenue: 45, units: '156 sold' },
        { name: 'MacBook Air M2', revenue: 38, units: '89 sold' },
        { name: 'Samsung Galaxy S24', revenue: 29, units: '134 sold' },
        { name: 'Tablet Pro 12.9"', revenue: 22, units: '67 sold' },
        { name: 'Wireless Headphones', revenue: 18, units: '245 sold' }
      ];
    },

    updateDateRange() {
      console.log('Date range updated to:', this.dateRange);
      this.refreshData();
    },

    updateReportType() {
      console.log('Report type updated to:', this.reportType);
      this.refreshData();
    },

    applyFilters() {
      console.log('Applying filters:', {
        dateRange: this.dateRange,
        reportType: this.reportType,
        exportFormat: this.exportFormat
      });
      this.refreshData();
      this.showNotification('Filters applied successfully!', 'success');
    },

    refreshData() {
      // Simulate data refresh based on filters
      this.kpis.revenue = Math.floor(Math.random() * 50000) + 100000;
      this.kpis.orders = Math.floor(Math.random() * 500) + 1000;
      this.kpis.customers = Math.floor(Math.random() * 200) + 800;
      
      // Refresh charts if they exist
      if (this.chartsInitialized) {
        this.updateCharts();
      }
    },

    scheduleReport() {
      this.showNotification('Report scheduling would open here', 'info');
    },

    generateReport() {
      this.showNotification('New report generation would start here', 'info');
    },

    exportData() {
      const fileName = `report_${this.reportType}_${Date.now()}.${this.exportFormat}`;
      this.showNotification(`Exporting data as ${fileName}...`, 'success');
    },

    refreshReports() {
      this.showNotification('Reports refreshed!', 'success');
    },

    downloadReport(report) {
      console.log('Downloading report:', report);
      this.showNotification(`Downloading ${report.name}...`, 'success');
    },

    shareReport(report) {
      console.log('Sharing report:', report);
      this.showNotification('Share functionality would open here', 'info');
    },

    duplicateReport(report) {
      const newReport = {
        ...report,
        id: `RPT-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        name: `${report.name} (Copy)`,
        generated: new Date().toISOString().split('T')[0],
        status: 'ready'
      };
      this.recentReports.unshift(newReport);
      this.showNotification('Report duplicated successfully!', 'success');
    },

    deleteReport(report) {
      if (confirm(`Are you sure you want to delete "${report.name}"?`)) {
        this.recentReports = this.recentReports.filter(r => r.id !== report.id);
        this.showNotification('Report deleted successfully!', 'success');
      }
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
      
      this.initRevenueTrendsChart();
      this.initTopProductsChart();
      this.initCustomerAcquisitionChart();
      this.initRegionSalesChart();
      this.chartsInitialized = true;
    },

    initRevenueTrendsChart() {
      const chartElement = document.getElementById('revenueTrendsChart');
      if (!chartElement) {
        console.warn('Revenue trends chart element not found');
        return;
      }

      // Clear any existing chart content
      chartElement.innerHTML = '';

      try {
        const chartData = {
          series: [{
            name: 'Revenue',
            data: [28000, 32000, 35000, 41000, 38000, 45000, 52000]
          }, {
            name: 'Profit',
            data: [8400, 9600, 10500, 12300, 11400, 13500, 15600]
          }],
          chart: {
            type: 'area',
            height: 350,
            toolbar: {
              show: true,
              tools: {
                download: true,
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true
              }
            }
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
            width: 3
          },
          xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            title: {
              text: 'Days of Week'
            }
          },
          yaxis: {
            title: {
              text: 'Amount ($)'
            },
            labels: {
              formatter: function (val) {
                return "$" + val.toLocaleString()
              }
            }
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return "$" + val.toLocaleString()
              }
            }
          },
          legend: {
            position: 'top'
          }
        };

        const chart = new ApexCharts(chartElement, chartData);
        chart.render();
      } catch (error) {
        console.error('Error rendering revenue trends chart:', error);
      }
    },

    initTopProductsChart() {
      const chartElement = document.getElementById('topProductsChart');
      if (!chartElement) {
        console.warn('Top products chart element not found');
        return;
      }

      // Clear any existing chart content
      chartElement.innerHTML = '';

      try {
        const chartData = {
          series: this.topProducts.map(product => product.revenue),
          chart: {
            type: 'donut',
            height: 200
          },
          labels: this.topProducts.map(product => product.name),
          colors: ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'],
          plotOptions: {
            pie: {
              donut: {
                size: '65%'
              }
            }
          },
          legend: {
            show: false
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return "$" + val + "k revenue"
              }
            }
          }
        };

        const chart = new ApexCharts(chartElement, chartData);
        chart.render();
      } catch (error) {
        console.error('Error rendering top products chart:', error);
      }
    },

    initCustomerAcquisitionChart() {
      const chartElement = document.getElementById('customerAcquisitionChart');
      if (!chartElement) {
        console.warn('Customer acquisition chart element not found');
        return;
      }

      // Clear any existing chart content
      chartElement.innerHTML = '';

      try {
        const chartData = {
          series: [{
            name: 'New Customers',
            data: [23, 31, 45, 38, 52, 41, 67]
          }, {
            name: 'Returning Customers',
            data: [67, 58, 72, 83, 76, 89, 94]
          }],
          chart: {
            type: 'bar',
            height: 250,
            stacked: true
          },
          colors: ['#6366f1', '#e5e7eb'],
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              borderRadius: 4
            }
          },
          xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yaxis: {
            title: {
              text: 'Customers'
            }
          },
          legend: {
            position: 'top'
          }
        };

        const chart = new ApexCharts(chartElement, chartData);
        chart.render();
      } catch (error) {
        console.error('Error rendering customer acquisition chart:', error);
      }
    },

    initRegionSalesChart() {
      const chartElement = document.getElementById('regionSalesChart');
      if (!chartElement) {
        console.warn('Region sales chart element not found');
        return;
      }

      // Clear any existing chart content
      chartElement.innerHTML = '';

      try {
        const chartData = {
          series: [{
            name: 'Sales',
            data: [44, 55, 41, 67, 22, 43]
          }],
          chart: {
            type: 'radar',
            height: 250
          },
          colors: ['#6366f1'],
          xaxis: {
            categories: ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania']
          },
          yaxis: {
            tickAmount: 4
          },
          markers: {
            size: 4,
            colors: ['#6366f1'],
            strokeColor: '#fff',
            strokeWidth: 2
          }
        };

        const chart = new ApexCharts(chartElement, chartData);
        chart.render();
      } catch (error) {
        console.error('Error rendering region sales chart:', error);
      }
    },

    updateCharts() {
      // This would be called when filters change to update chart data
      console.log('Updating charts with new data...');
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