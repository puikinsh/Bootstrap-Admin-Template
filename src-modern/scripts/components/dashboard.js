// ==========================================================================
// Dashboard Manager - Advanced data visualization and components
// ==========================================================================

import { createChart, areaGradient, cartesianScales, centerTextPlugin } from '../utils/charts.js';
import { categorical, accent, STATUS, SEQUENTIAL_BLUE, trackFill, surfacePanel, onFillInk } from '../utils/chart-palette.js';
import {
  REALTIME_DASHBOARD_POLL_MS,
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

    const money = value => '$' + Number(value).toLocaleString();
    const chart = createChart(el, {
      type: 'line',
      data: {
        labels: this.data.revenue.map(item => item.month),
        datasets: [
          {
            label: 'Revenue',
            data: this.data.revenue.map(item => item.revenue),
            borderColor: () => categorical(2)[0],
            backgroundColor: areaGradient(() => categorical(2)[0]),
            pointBackgroundColor: () => categorical(2)[0],
            fill: true
          },
          {
            label: 'Profit',
            data: this.data.revenue.map(item => item.profit),
            borderColor: () => categorical(2)[1],
            backgroundColor: areaGradient(() => categorical(2)[1]),
            pointBackgroundColor: () => categorical(2)[1],
            fill: true
          }
        ]
      },
      options: {
        interaction: { mode: 'index', intersect: false },
        scales: cartesianScales({ format: money }),
        plugins: {
          legend: { position: 'top' },
          tooltip: { callbacks: { label: ctx => `${ctx.dataset.label}: ${money(ctx.parsed.y)}` } }
        }
      }
    }, { height: 320 });
    this.charts.set('revenue', chart);
  }

  initUserGrowthChart() {
    const el = document.getElementById('userGrowthChart');
    if (!el) return;

    const recent = this.data.users.slice(-7);
    const chart = createChart(el, {
      type: 'bar',
      data: {
        labels: recent.map(item => `Day ${item.day}`),
        datasets: [{
          label: 'New Users',
          data: recent.map(item => item.newUsers),
          backgroundColor: () => accent(),
          categoryPercentage: 0.6
        }]
      },
      options: {
        scales: cartesianScales(),
        plugins: { legend: { display: false } }
      }
    }, { height: 280 });
    this.charts.set('userGrowth', chart);
  }

  initOrderStatusChart() {
    const el = document.getElementById('orderStatusChart');
    if (!el) return;

    // Reserved status colours — these four slices are states, not series.
    const colours = [STATUS.success, STATUS.info, STATUS.warning, STATUS.danger];
    const chart = createChart(el, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Processing', 'Pending', 'Cancelled'],
        datasets: [{
          data: [
            this.data.orders.completed,
            this.data.orders.processing,
            this.data.orders.pending,
            this.data.orders.cancelled
          ],
          backgroundColor: colours
        }]
      },
      options: {
        cutout: '60%',
        plugins: { legend: { position: 'bottom' } }
      }
    }, { height: 280 });
    this.charts.set('orderStatus', chart);
  }

  initStorageChart() {
    const el = document.querySelector('#storageStatusChart');
    if (!el) return;

    // Progress ring: the used share in the accent, the remainder as the track.
    const used = 76;
    const chart = createChart(el, {
      type: 'doughnut',
      data: {
        labels: ['Used Space', 'Free Space'],
        datasets: [{
          data: [used, 100 - used],
          backgroundColor: ctx => (ctx.dataIndex === 0 ? accent() : trackFill()),
          hoverBackgroundColor: ctx => (ctx.dataIndex === 0 ? accent() : trackFill()),
          borderWidth: 0,
          borderRadius: [{ outerStart: 12, outerEnd: 12, innerStart: 12, innerEnd: 12 }, 0]
        }]
      },
      options: {
        cutout: '78%',
        layout: { padding: 24 },
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed}%` } },
          centerText: { label: 'Used Space', value: `${used}%` }
        }
      },
      plugins: [centerTextPlugin]
    }, { height: 280 });
    this.charts.set('storage', chart);
  }

  initSalesByLocationChart() {
    const chartElement = document.querySelector('#salesByLocationChart');
    if (!chartElement) return;

    // Magnitude, so one hue stepped light -> dark. The old ranges were three
    // unrelated hues (sage, olive, slate-blue) for what is a single measure — a
    // reader could not tell bigger from smaller.
    const shade = value => (value > 2000 ? SEQUENTIAL_BLUE[5] : value > 1000 ? SEQUENTIAL_BLUE[3] : SEQUENTIAL_BLUE[1]);
    const chart = createChart(chartElement, {
      type: 'treemap',
      data: {
        datasets: [{
          label: 'Sales',
          tree: this.data.salesByLocation,
          key: 'value',
          labels: {
            display: true,
            align: 'center',
            position: 'middle',
            // Light cells take the darkest step as ink; white would wash out.
            color: ctx => (ctx.raw && ctx.raw.v <= 1000 ? SEQUENTIAL_BLUE[5] : onFillInk()),
            font: [{ weight: '600', size: 12 }, { size: 12 }],
            formatter: ctx => [ctx.raw._data.name, Number(ctx.raw.v).toLocaleString()]
          },
          backgroundColor: ctx => (ctx.type === 'data' ? shade(ctx.raw.v) : 'transparent'),
          borderColor: () => surfacePanel(),
          borderWidth: 2,
          borderRadius: 4,
          spacing: 0
        }]
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: items => items[0]?.raw?._data?.name ?? '',
              label: ctx => `Sales: ${Number(ctx.raw.v).toLocaleString()}`
            }
          }
        }
      }
    }, { height: 350, responsiveHeight: [[768, 300]] });
    this.charts.set('salesByLocation', chart);
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

      this.setRevenueData(revenueChart);
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
    this.setRevenueData(chart);
  }

  setRevenueData(chart) {
    chart.data.labels = this.data.revenue.map(d => d.month);
    chart.data.datasets[0].data = this.data.revenue.map(d => d.revenue);
    chart.data.datasets[1].data = this.data.revenue.map(d => d.profit);
    chart.update();
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
    if (!chart) return;
    const link = document.createElement('a');
    link.download = `${chartName}-chart.png`;
    link.href = chart.toBase64Image();
    link.click();
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
