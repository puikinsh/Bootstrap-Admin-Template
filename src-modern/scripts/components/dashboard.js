// ==========================================================================
// Dashboard Manager - Advanced data visualization and components
// ==========================================================================

import ApexCharts from 'apexcharts';
import {
  REALTIME_DASHBOARD_POLL_MS,
  CHART_RESIZE_DEBOUNCE_MS,
  STAT_ANIMATION_DURATION_MS,
  STAT_ANIMATION_STEPS,
} from '../utils/constants.js';

export class DashboardManager {
  constructor() {
    this.charts = new Map();
    this.intervals = new Set();
    this.timeouts = new Set();
    this.cleanupFns = [];
    this.currentPeriod = { count: 12, unit: 'month' };
    this.data = {
      revenue: [],
      users: [],
      orders: [],
      performance: [],
      recentOrders: [],
      salesByLocation: []
    };
    this.init();
  }

  async init() {
    await this.loadDashboardData();

    this.initRevenueChart();
    this.initUserGrowthChart();
    this.initOrderStatusChart();
    this.initStorageChart();
    this.initSalesByLocationChart();
    this.populateRecentOrders();

    this.startRealTimeUpdates();
    this.initInteractiveElements();
  }

  async loadDashboardData() {
    this.data.revenue = this.generateRevenueData();
    this.data.users = this.generateUserData();
    this.data.orders = this.generateOrderData();
    this.data.performance = this.generatePerformanceData();
    this.data.recentOrders = this.generateRecentOrders();
    this.data.salesByLocation = this.generateSalesByLocation();
  }

  generateRevenueData() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => ({
      month,
      revenue: Math.floor(Math.random() * 50000) + 10000,
      profit: Math.floor(Math.random() * 20000) + 5000
    }));
  }

  generateUserData() {
    const days = Array.from({length: 30}, (_, i) => i + 1);
    return days.map(day => ({
      day,
      newUsers: Math.floor(Math.random() * 100) + 20,
      activeUsers: Math.floor(Math.random() * 500) + 200
    }));
  }

  generateOrderData() {
    return {
      completed: 1245,
      pending: 87,
      cancelled: 23,
      processing: 156
    };
  }

  generateRecentOrders() {
    const customers = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'Bob Brown'];
    const statuses = [
        { text: 'Completed', class: 'bg-success' },
        { text: 'Pending', class: 'bg-warning' },
        { text: 'Shipped', class: 'bg-info' },
        { text: 'Cancelled', class: 'bg-danger' }
    ];
    return Array.from({length: 5}, () => ({
        id: `#${Math.floor(Math.random() * 9000) + 1000}`,
        customer: customers[Math.floor(Math.random() * customers.length)],
        amount: `$${(Math.random() * 500 + 50).toFixed(2)}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        date: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 7).toLocaleDateString()
    }));
  }

  generateSalesByLocation() {
    return [
        { name: 'United States', value: 2822 },
        { name: 'Canada', value: 1432 },
        { name: 'United Kingdom', value: 980 },
        { name: 'Australia', value: 780 },
        { name: 'Germany', value: 650 },
        { name: 'Brazil', value: 450 },
        { name: 'India', value: 1800 },
        { name: 'China', value: 2100 },
        { name: 'Japan', value: 850 },
        { name: 'Russia', value: 550 }
    ];
  }

  generatePerformanceData() {
    const hours = Array.from({length: 24}, (_, i) => i);
    return hours.map(hour => ({
      hour: `${hour.toString().padStart(2, '0')}:00`,
      responseTime: Math.random() * 2 + 0.5,
      requests: Math.floor(Math.random() * 1000) + 100
    }));
  }

  initRevenueChart() {
    const el = document.getElementById('revenueChart');
    if (!el) return;

    const options = {
      chart: {
        type: 'area',
        height: 320,
        width: '100%',
        toolbar: { show: false },
        zoom: { enabled: false }
      },
      series: [
        { name: 'Revenue', data: this.data.revenue.map(item => item.revenue) },
        { name: 'Profit', data: this.data.revenue.map(item => item.profit) }
      ],
      xaxis: {
        categories: this.data.revenue.map(item => item.month),
        axisBorder: { show: false }
      },
      yaxis: {
        labels: {
          formatter: value => '$' + value.toLocaleString()
        }
      },
      colors: ['#6366f1', '#10b981'],
      stroke: { curve: 'smooth', width: 2 },
      fill: {
        type: 'gradient',
        gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.05 }
      },
      dataLabels: { enabled: false },
      legend: { position: 'top' },
      tooltip: {
        y: { formatter: value => '$' + value.toLocaleString() }
      },
      grid: { borderColor: 'rgba(0,0,0,0.08)', strokeDashArray: 4 }
    };

    const chart = new ApexCharts(el, options);
    chart.render();
    this.charts.set('revenue', chart);

    if ('ResizeObserver' in window) {
      let raf = 0;
      const ro = new ResizeObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          chart.updateOptions({ chart: { width: '100%' } }, false, false);
        });
      });
      ro.observe(el);
      this.cleanupFns.push(() => {
        cancelAnimationFrame(raf);
        ro.disconnect();
      });
    }
  }

  initUserGrowthChart() {
    const el = document.getElementById('userGrowthChart');
    if (!el) return;

    const recent = this.data.users.slice(-7);
    const options = {
      chart: { type: 'bar', height: 280, width: '100%', toolbar: { show: false } },
      series: [{ name: 'New Users', data: recent.map(item => item.newUsers) }],
      xaxis: {
        categories: recent.map(item => `Day ${item.day}`),
        axisBorder: { show: false }
      },
      colors: ['#6366f1'],
      plotOptions: { bar: { borderRadius: 6, columnWidth: '55%' } },
      dataLabels: { enabled: false },
      grid: { borderColor: 'rgba(0,0,0,0.08)', strokeDashArray: 4 }
    };

    const chart = new ApexCharts(el, options);
    chart.render();
    this.charts.set('userGrowth', chart);

    if ('ResizeObserver' in window) {
      let raf = 0;
      const ro = new ResizeObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          chart.updateOptions({ chart: { width: '100%' } }, false, false);
        });
      });
      ro.observe(el);
      this.cleanupFns.push(() => {
        cancelAnimationFrame(raf);
        ro.disconnect();
      });
    }
  }

  initOrderStatusChart() {
    const el = document.getElementById('orderStatusChart');
    if (!el) return;

    const options = {
      chart: { type: 'donut', height: 280, width: '100%' },
      series: [
        this.data.orders.completed,
        this.data.orders.processing,
        this.data.orders.pending,
        this.data.orders.cancelled
      ],
      labels: ['Completed', 'Processing', 'Pending', 'Cancelled'],
      colors: ['#10b981', '#6366f1', '#f59e0b', '#ef4444'],
      legend: { position: 'bottom' },
      dataLabels: { enabled: false },
      plotOptions: { pie: { donut: { size: '60%' } } }
    };

    const chart = new ApexCharts(el, options);
    chart.render();
    this.charts.set('orderStatus', chart);
  }

  initStorageChart() {
    const el = document.querySelector('#storageStatusChart');
    if (!el) return;

    const options = {
      chart: { height: 280, width: '100%', type: 'radialBar' },
      series: [76],
      colors: ['#20E647'],
      plotOptions: {
        radialBar: {
          hollow: { margin: 0, size: '70%', background: '#293450' },
          track: { dropShadow: { enabled: true, top: 2, left: 0, blur: 4, opacity: 0.15 } },
          dataLabels: {
            name: { offsetY: -10, color: '#fff', fontSize: '13px' },
            value: { color: '#fff', fontSize: '30px', show: true }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: { shade: 'dark', type: 'vertical', gradientToColors: ['#87D4F9'], stops: [0, 100] }
      },
      stroke: { lineCap: 'round' },
      labels: ['Used Space']
    };

    const chart = new ApexCharts(el, options);
    chart.render();
    this.charts.set('storage', chart);
  }

  initSalesByLocationChart() {
    const chartElement = document.querySelector('#salesByLocationChart');
    if (!chartElement) return;

    const options = {
      series: [{
        name: 'Sales',
        data: this.data.salesByLocation.map(c => ({ x: c.name, y: c.value }))
      }],
      chart: {
        type: 'treemap',
        height: 350,
        width: '100%',
        toolbar: {
          show: true,
          tools: { download: true, selection: false, zoom: false, zoomin: false, zoomout: false, pan: false, reset: false }
        },
        events: {
          mounted: (chart) => { chart.windowResizeHandler(); }
        }
      },
      dataLabels: {
        enabled: true,
        style: { fontSize: '12px' },
        formatter: (text, op) => [text, op.value],
        offsetY: -4
      },
      plotOptions: {
        treemap: {
          enableShades: true,
          shadeIntensity: 0.5,
          reverseNegativeShade: true,
          colorScale: {
            ranges: [
              { from: 0, to: 1000, color: '#CDD7B6' },
              { from: 1001, to: 2000, color: '#A4B494' },
              { from: 2001, to: 3000, color: '#52708E' }
            ]
          }
        }
      },
      responsive: [
        { breakpoint: 1200, options: { chart: { height: 350 }, dataLabels: { style: { fontSize: '11px' } } } },
        { breakpoint: 768, options: { chart: { height: 300 }, dataLabels: { style: { fontSize: '10px' } } } }
      ]
    };

    const chart = new ApexCharts(chartElement, options);
    chart.render();
    this.charts.set('salesByLocation', chart);

    const onResize = () => {
      if (!this.charts.has('salesByLocation')) return;
      const t = setTimeout(() => {
        chart.updateOptions({ chart: { width: '100%' } }, false, true);
        this.timeouts.delete(t);
      }, CHART_RESIZE_DEBOUNCE_MS);
      this.timeouts.add(t);
    };
    window.addEventListener('resize', onResize);
    this.cleanupFns.push(() => window.removeEventListener('resize', onResize));
  }

  populateRecentOrders() {
    const tableBody = document.getElementById('recent-orders-table');
    if (!tableBody) return;

    tableBody.replaceChildren();
    for (const order of this.data.recentOrders) {
      const tr = document.createElement('tr');

      const idCell = document.createElement('td');
      const strong = document.createElement('strong');
      strong.textContent = order.id;
      idCell.appendChild(strong);

      const customerCell = document.createElement('td');
      customerCell.textContent = order.customer;

      const amountCell = document.createElement('td');
      amountCell.textContent = order.amount;

      const statusCell = document.createElement('td');
      const badge = document.createElement('span');
      badge.className = `badge ${order.status.class}`;
      badge.textContent = order.status.text;
      statusCell.appendChild(badge);

      const dateCell = document.createElement('td');
      dateCell.textContent = order.date;

      tr.append(idCell, customerCell, amountCell, statusCell, dateCell);
      tableBody.appendChild(tr);
    }
  }

  startRealTimeUpdates() {
    const id = setInterval(() => this.updateChartsWithRealTimeData(), REALTIME_DASHBOARD_POLL_MS);
    this.intervals.add(id);
  }

  updateChartsWithRealTimeData() {
    const revenueChart = this.charts.get('revenue');
    if (revenueChart) {
      const { count, unit } = this.currentPeriod;
      const labels = this.buildPeriodLabels(count, unit);
      const nextLabel = labels[labels.length - 1];
      this.data.revenue.push({
        month: nextLabel,
        revenue: Math.floor(Math.random() * 50000) + 10000,
        profit: Math.floor(Math.random() * 20000) + 5000,
      });
      while (this.data.revenue.length > count) this.data.revenue.shift();

      // Re-label all points so the x-axis stays accurate as data scrolls
      this.data.revenue.forEach((d, i) => { d.month = labels[i]; });

      revenueChart.updateOptions({
        xaxis: { categories: this.data.revenue.map(d => d.month) },
        series: [
          { name: 'Revenue', data: this.data.revenue.map(d => d.revenue) },
          { name: 'Profit',  data: this.data.revenue.map(d => d.profit)  },
        ],
      });
    }

    this.updateStatsCards();
  }

  updateStatsCards() {
    const statsElements = document.querySelectorAll('[data-stat-value]');
    statsElements.forEach(element => {
      const currentValue = parseInt(element.textContent.replace(/[^0-9]/g, ''));
      const newValue = currentValue + Math.floor(Math.random() * 10) - 5;
      if (newValue > 0) this.animateNumber(element, currentValue, newValue);
    });
  }

  animateNumber(element, start, end) {
    const stepValue = (end - start) / STAT_ANIMATION_STEPS;
    let current = start;
    let step = 0;

    const timer = setInterval(() => {
      current += stepValue;
      step++;

      const formatted = Math.floor(current).toLocaleString();
      element.textContent = element.textContent.replace(/[\d,]+/, formatted);

      if (step >= STAT_ANIMATION_STEPS) {
        clearInterval(timer);
        this.intervals.delete(timer);
        element.textContent = element.textContent.replace(/[\d,]+/, end.toLocaleString());
      }
    }, STAT_ANIMATION_DURATION_MS / STAT_ANIMATION_STEPS);
    this.intervals.add(timer);
  }

  initInteractiveElements() {
    const onPeriodClick = (e) => {
      if (e.target.matches('[data-chart-period]')) {
        const period = e.target.dataset.chartPeriod;
        this.updateChartPeriod(period);
        document.querySelectorAll('[data-chart-period]').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
      }
    };
    const onExportClick = (e) => {
      if (e.target.matches('[data-export-chart]')) {
        const chartName = e.target.dataset.exportChart;
        this.exportChart(chartName);
      }
    };

    document.addEventListener('click', onPeriodClick);
    document.addEventListener('click', onExportClick);
    this.cleanupFns.push(() => document.removeEventListener('click', onPeriodClick));
    this.cleanupFns.push(() => document.removeEventListener('click', onExportClick));
  }

  updateChartPeriod(period) {
    const config = {
      '7d':  { count: 7,  unit: 'day' },
      '30d': { count: 30, unit: 'day' },
      '90d': { count: 90, unit: 'day' },
      '1y':  { count: 12, unit: 'month' },
    }[period];
    if (!config) return;

    this.currentPeriod = config;
    const { count, unit } = config;
    const labels = this.buildPeriodLabels(count, unit);
    this.data.revenue = labels.map(label => ({
      month: label,
      revenue: Math.floor(Math.random() * 50000) + 10000,
      profit: Math.floor(Math.random() * 20000) + 5000,
    }));

    const chart = this.charts.get('revenue');
    if (!chart) return;
    chart.updateOptions({
      xaxis: { categories: this.data.revenue.map(d => d.month) },
      series: [
        { name: 'Revenue', data: this.data.revenue.map(d => d.revenue) },
        { name: 'Profit',  data: this.data.revenue.map(d => d.profit)  },
      ],
    });
  }

  buildPeriodLabels(count, unit) {
    const today = new Date();
    if (unit === 'day') {
      return Array.from({ length: count }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - (count - 1 - i));
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      });
    }
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return Array.from({ length: count }, (_, i) => {
      const d = new Date(today.getFullYear(), today.getMonth() - (count - 1 - i), 1);
      return months[d.getMonth()];
    });
  }

  exportChart(chartName) {
    const chart = this.charts.get(chartName);
    if (chart && typeof chart.dataURI === 'function') {
      chart.dataURI().then(({ imgURI }) => {
        const link = document.createElement('a');
        link.download = `${chartName}-chart.png`;
        link.href = imgURI;
        link.click();
      });
    }
  }

  destroy() {
    this.intervals.forEach(id => clearInterval(id));
    this.intervals.clear();
    this.timeouts.forEach(id => clearTimeout(id));
    this.timeouts.clear();
    this.cleanupFns.forEach(fn => fn());
    this.cleanupFns = [];
    this.charts.forEach(chart => chart.destroy());
    this.charts.clear();
  }
}
