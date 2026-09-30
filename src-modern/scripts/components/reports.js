import Alpine from 'alpinejs';
import Swal from 'sweetalert2';
import zoomPlugin from 'chartjs-plugin-zoom';
import { createChart, areaGradient, cartesianScales, alpha, barValuesPlugin, sliceLabelsPlugin } from '../utils/charts.js';
import { categorical, accent, trackFill, surfacePanel, axisInk, onFillInk } from '../utils/chart-palette.js';
import { createSearchComponent } from '../utils/search-component.js';

document.addEventListener('alpine:init', () => {
  Alpine.data('reportsComponent', () => {
    // Chart instances live outside Alpine's reactive state (see analytics.js).
    const charts = {};

    return {
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
      this.initPeriodSelector();
      this.chartsInitialized = true;
    },

    buildDayLabels(count) {
      const today = new Date();
      return Array.from({ length: count }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - (count - 1 - i));
        return count <= 7
          ? d.toLocaleDateString('en-US', { weekday: 'short' })
          : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      });
    },

    generateRevenueTrendsData(count) {
      return {
        revenue: Array.from({ length: count }, () => Math.floor(Math.random() * 30000) + 25000),
        profit:  Array.from({ length: count }, () => Math.floor(Math.random() * 9000)  + 7000),
      };
    },

    initPeriodSelector() {
      const map = { revenue7d: 7, revenue30d: 30, revenue90d: 90 };
      document.querySelectorAll('input[name="revenuePeriod"]').forEach(input => {
        input.addEventListener('change', (e) => {
          const count = map[e.target.id];
          const chart = charts.revenueTrends;
          if (!count || !chart) return;
          const { revenue, profit } = this.generateRevenueTrendsData(count);
          chart.resetZoom('none');
          const resetButton = document.querySelector('[data-chart-reset-zoom="revenueTrends"]');
          if (resetButton) resetButton.disabled = true;
          chart.data.labels = this.buildDayLabels(count);
          chart.data.datasets[0].data = revenue;
          chart.data.datasets[1].data = profit;
          chart.update();
        });
      });
    },

    initRevenueTrendsChart() {
      const chartElement = document.getElementById('revenueTrendsChart');
      if (!chartElement) {
        console.warn('Revenue trends chart element not found');
        return;
      }

      const money = val => '$' + Number(val).toLocaleString();
      const series = (label, data, i) => ({
        label,
        data,
        borderColor: () => categorical(2)[i],
        backgroundColor: areaGradient(() => categorical(2)[i], 0.5, 0.1),
        pointBackgroundColor: () => categorical(2)[i],
        borderWidth: 3,
        fill: true
      });

      try {
        const resetButton = document.querySelector('[data-chart-reset-zoom="revenueTrends"]');
        const syncResetButton = ({ chart }) => {
          if (resetButton) resetButton.disabled = !chart.isZoomedOrPanned();
        };

        charts.revenueTrends = createChart(chartElement, {
          type: 'line',
          data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              series('Revenue', [28000, 32000, 35000, 41000, 38000, 45000, 52000], 0),
              series('Profit', [8400, 9600, 10500, 12300, 11400, 13500, 15600], 1)
            ]
          },
          options: {
            interaction: { mode: 'index', intersect: false },
            scales: cartesianScales({ format: money, title: 'Amount ($)', categoryTitle: 'Days of Week' }),
            plugins: {
              legend: { position: 'top' },
              tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${money(ctx.parsed.y)}` } },
              // Drag across the chart to zoom into a range, Shift+drag to pan,
              // Ctrl/⌘+wheel or pinch to zoom. "Reset zoom" appears once zoomed.
              zoom: {
                limits: { x: { minRange: 2 } },
                pan: { enabled: true, mode: 'x', modifierKey: 'shift', onPanComplete: syncResetButton },
                zoom: {
                  mode: 'x',
                  drag: { enabled: true, backgroundColor: alpha(accent(), 0.12), borderColor: alpha(accent(), 0.5), borderWidth: 1 },
                  wheel: { enabled: true, modifierKey: 'ctrl' },
                  pinch: { enabled: true },
                  onZoomComplete: syncResetButton
                }
              }
            }
          },
          plugins: [zoomPlugin]
        }, { height: 350 });

        resetButton?.addEventListener('click', () => {
          charts.revenueTrends?.resetZoom();
          resetButton.disabled = true;
        });
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

      try {
        charts.topProducts = createChart(chartElement, {
          type: 'doughnut',
          data: {
            labels: this.topProducts.map(product => product.name),
            datasets: [{
              label: 'Revenue',
              data: this.topProducts.map(product => product.revenue),
              backgroundColor: ctx => categorical(5)[ctx.dataIndex]
            }]
          },
          options: {
            cutout: '65%',
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: ctx => `${ctx.label}: $${ctx.parsed}k revenue` } },
              sliceLabels: { color: onFillInk() }
            }
          },
          plugins: [sliceLabelsPlugin]
        }, { height: 200 });
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

      try {
        charts.customerAcquisition = createChart(chartElement, {
          type: 'bar',
          data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
              label: 'New Customers',
              data: [23, 31, 45, 38, 52, 41, 67],
              backgroundColor: () => accent(),
              borderRadius: 4,
              categoryPercentage: 0.55
            }, {
              label: 'Returning Customers',
              data: [67, 58, 72, 83, 76, 89, 94],
              // The muted remainder of the stack — the track colour, as before.
              backgroundColor: () => trackFill(),
              borderRadius: 4,
              categoryPercentage: 0.55
            }]
          },
          options: {
            interaction: { mode: 'index', intersect: false },
            scales: cartesianScales({ stacked: true, title: 'Customers' }),
            plugins: {
              legend: { position: 'top' },
              // White on the accent segment, muted ink on the track-coloured one.
              barValues: { color: di => (di === 0 ? onFillInk() : axisInk()) }
            }
          },
          plugins: [barValuesPlugin]
        }, { height: 250 });
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

      try {
        charts.regionSales = createChart(chartElement, {
          type: 'radar',
          data: {
            labels: ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'],
            datasets: [{
              label: 'Sales',
              data: [44, 55, 41, 67, 22, 43],
              borderColor: () => accent(),
              backgroundColor: () => alpha(accent(), 0.2),
              fill: true,
              tension: 0,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: () => accent(),
              pointBorderColor: () => surfacePanel(),
              pointBorderWidth: 2
            }]
          },
          options: {
            scales: {
              r: {
                beginAtZero: true,
                ticks: { maxTicksLimit: 5, backdropColor: () => alpha(surfacePanel(), 0.8) },
                pointLabels: { font: { size: 11 } }
              }
            },
            plugins: { legend: { display: false } }
          }
        }, { height: 250 });
      } catch (error) {
        console.error('Error rendering region sales chart:', error);
      }
    },

    updateCharts() {
      // This would be called when filters change to update chart data
      console.log('Updating charts with new data...');
    }
    };
  });

  // Search component for header
  Alpine.data('searchComponent', createSearchComponent({ getResults: () => [] }));

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