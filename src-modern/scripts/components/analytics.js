import Alpine from 'alpinejs';
import { createChart, areaGradient, cartesianScales, barValuesPlugin, alpha } from '../utils/charts.js';
import { categorical, gridLine, onFillInk, SEQUENTIAL_BLUE } from '../utils/chart-palette.js';
import { REALTIME_FAST_POLL_MS } from '../utils/constants.js';

const formatClock = (ms) => new Date(ms).toLocaleTimeString('en-US', { hour12: false });

document.addEventListener('alpine:init', () => {
  Alpine.data('analyticsComponent', () => {
    // Chart instances live outside Alpine's reactive state: wrapping a Chart.js
    // instance in a reactive proxy makes every internal read tracked, which
    // stalls updates and can overflow the stack.
    const charts = {};

    return {
    // Core data
    metrics: {
        revenue: 124592,
        visitors: 45672,
        conversionRate: 3.45,
        bounceRate: 24.8
    },
    
    // Real-time data
    realTimeUsers: 1247,
    pageViews: 8452,
    sessions: 2931,
    
    // Traffic sources data
    trafficSources: [
        { name: 'Organic Search', percentage: 42.3, visitors: 19314, color: categorical(3)[0] },
        { name: 'Direct', percentage: 31.8, visitors: 14519, color: categorical(3)[1] },
        { name: 'Social Media', percentage: 16.4, visitors: 7490, color: categorical(3)[2] },
        { name: 'Referral', percentage: 9.5, visitors: 4349, color: categorical(4)[3] }
    ],
    
    // Top pages data
    topPages: [
        { path: '/dashboard', title: 'Main Dashboard', views: 12847, uniqueViews: 8921, avgTime: '4m 32s', bounceRate: 22.1, conversion: 8.4 },
        { path: '/analytics', title: 'Analytics Page', views: 9234, uniqueViews: 7156, avgTime: '6m 18s', bounceRate: 18.7, conversion: 12.3 },
        { path: '/products', title: 'Product Catalog', views: 7892, uniqueViews: 5467, avgTime: '3m 45s', bounceRate: 45.2, conversion: 6.7 },
        { path: '/checkout', title: 'Checkout Process', views: 4567, uniqueViews: 3891, avgTime: '2m 23s', bounceRate: 15.6, conversion: 67.8 },
        { path: '/contact', title: 'Contact Form', views: 3421, uniqueViews: 2876, avgTime: '1m 54s', bounceRate: 68.4, conversion: 3.2 }
    ],
    
    // Geographic data
    geographicData: [
        { name: 'United States', code: 'US', percentage: 38.2, visitors: 17446 },
        { name: 'United Kingdom', code: 'GB', percentage: 22.7, visitors: 10367 },
        { name: 'Canada', code: 'CA', percentage: 15.8, visitors: 7215 },
        { name: 'Germany', code: 'DE', percentage: 12.4, visitors: 5663 },
        { name: 'Australia', code: 'AU', percentage: 10.9, visitors: 4981 }
    ],
    
    // Device data
    deviceData: [
        { type: 'Desktop', percentage: 68.4, users: 31247, icon: 'laptop', color: 'primary' },
        { type: 'Mobile', percentage: 24.8, users: 11327, icon: 'phone', color: 'success' },
        { type: 'Tablet', percentage: 6.8, users: 3098, icon: 'tablet', color: 'warning' }
    ],
    
    // Cleanup tracking
    _intervals: new Set(),

    // Initialize component
    init() {
        this.$nextTick(() => {
            this.initCharts();
            this.startRealTimeUpdates();
            this.initPeriodSelectors();
        });
        const onHide = () => this.destroy();
        window.addEventListener('pagehide', onHide, { once: true });
    },

    // Build x-axis labels for `count` periods of `unit` ('day', 'week', or 'month')
    buildLabels(count, unit) {
        const today = new Date();
        if (unit === 'day') {
            return Array.from({ length: count }, (_, i) => {
                const d = new Date(today);
                d.setDate(d.getDate() - (count - 1 - i));
                return count <= 7
                    ? d.toLocaleDateString('en-US', { weekday: 'short' })
                    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            });
        }
        if (unit === 'week') {
            return Array.from({ length: count }, (_, i) => `Wk ${i + 1}`);
        }
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return Array.from({ length: count }, (_, i) => {
            const d = new Date(today.getFullYear(), today.getMonth() - (count - 1 - i), 1);
            return months[d.getMonth()];
        });
    },

    // Generate revenue + profit series of `count` points
    generateRevenueSeries(count) {
        return {
            revenue: Array.from({ length: count }, () => Math.floor(Math.random() * 8000) + 7000),
            profit:  Array.from({ length: count }, () => Math.floor(Math.random() * 4000) + 2500),
        };
    },

    // Update revenue chart for a given period count + unit ('day' or 'month')
    applyRevenuePeriod(count, unit) {
        const chart = charts.revenue;
        if (!chart) return;
        const { revenue, profit } = this.generateRevenueSeries(count);
        chart.data.labels = this.buildLabels(count, unit);
        chart.data.datasets[0].data = revenue;
        chart.data.datasets[1].data = profit;
        chart.update();
    },

    // Wire up the page-level dateRange (Today / 7D / 30D / 90D) and the
    // per-chart revenueView (Daily / Weekly / Monthly) selectors.
    initPeriodSelectors() {
        const dateRangeMap = { today: 1, week: 7, month: 30, quarter: 90 };
        document.querySelectorAll('input[name="dateRange"]').forEach(input => {
            input.addEventListener('change', (e) => {
                const count = dateRangeMap[e.target.id];
                if (count) this.applyRevenuePeriod(count, 'day');
            });
        });

        const revenueViewMap = {
            'revenue-daily':   { count: 30, unit: 'day'   },
            'revenue-weekly':  { count: 12, unit: 'week'  },
            'revenue-monthly': { count: 12, unit: 'month' },
        };
        document.querySelectorAll('input[name="revenueView"]').forEach(input => {
            input.addEventListener('change', (e) => {
                const cfg = revenueViewMap[e.target.id];
                if (cfg) this.applyRevenuePeriod(cfg.count, cfg.unit);
            });
        });
    },

    destroy() {
        this._intervals.forEach(id => clearInterval(id));
        this._intervals.clear();
        this.clearExistingCharts();
    },
    
    // Clear existing charts to prevent duplicates
    clearExistingCharts() {
        Object.keys(charts).forEach(chartKey => {
            charts[chartKey]?.destroy();
            delete charts[chartKey];
        });
    },
    
    // Initialize all charts
    initCharts() {
        this.clearExistingCharts();
        
        this.initRevenueChart();
        this.initTrafficSourcesChart();
        this.initBehaviorChart();
        this.initRealTimeChart();
        this.initBrowserChart();
    },
    
    // Revenue analytics chart
    initRevenueChart() {
        const chartElement = document.querySelector("#revenueChart");
        if (!chartElement) return;

        const labels = ['Jan 1', 'Jan 3', 'Jan 5', 'Jan 7', 'Jan 9', 'Jan 11', 'Jan 13', 'Jan 15', 'Jan 17', 'Jan 19', 'Jan 21', 'Jan 23', 'Jan 25', 'Jan 27'];
        const series = (label, data, i) => ({
            label,
            data,
            borderColor: () => categorical(2)[i],
            backgroundColor: areaGradient(() => categorical(2)[i], 0.4, 0.05),
            pointBackgroundColor: () => categorical(2)[i],
            fill: true
        });

        charts.revenue = createChart(chartElement, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    series('Revenue', [8200, 9100, 7800, 10200, 11500, 9800, 12400, 11200, 10800, 13200, 12100, 14200, 13800, 15100], 0),
                    series('Profit', [3100, 3800, 2900, 4200, 4800, 3900, 5200, 4600, 4200, 5800, 5100, 6200, 5900, 6800], 1)
                ]
            },
            options: {
                interaction: { mode: 'index', intersect: false },
                scales: cartesianScales({ format: val => '$' + (val / 1000).toFixed(0) + 'K' }),
                plugins: {
                    legend: { position: 'top', align: 'end' },
                    tooltip: {
                        callbacks: { label: ctx => `${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString()}` }
                    }
                }
            }
        }, { height: 350, responsiveHeight: [[1200, 300], [768, 250]] });
    },
    
    // Traffic sources doughnut chart
    initTrafficSourcesChart() {
        const sources = this.trafficSources;
        charts.trafficSources = createChart(document.querySelector("#trafficSourcesChart"), {
            type: 'doughnut',
            data: {
                labels: sources.map(source => source.name),
                datasets: [{
                    label: 'Traffic',
                    data: sources.map(source => source.percentage),
                    // Resolved per draw, so the sequence follows the colour mode.
                    backgroundColor: ctx => categorical(sources.length)[ctx.dataIndex]
                }]
            },
            options: {
                cutout: '60%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: ctx => {
                                const source = sources[ctx.dataIndex];
                                return `${ctx.parsed.toFixed(1)}% (${source.visitors.toLocaleString()} visitors)`;
                            }
                        }
                    }
                }
            }
        }, { height: 200 });
    },
    
    // User behavior funnel chart
    initBehaviorChart() {
        charts.behavior = createChart(document.querySelector("#behaviorChart"), {
            type: 'bar',
            data: {
                labels: ['Page Views', 'Unique Visitors', 'Engaged Users', 'Add to Cart', 'Checkout Started', 'Purchase'],
                datasets: [{
                    label: 'Users',
                    data: [45672, 32148, 18934, 12567, 8234, 4512],
                    // One measure at varying magnitude — a single-hue ramp, darkest first.
                    backgroundColor: [...SEQUENTIAL_BLUE].reverse(),
                    borderRadius: 4,
                    categoryPercentage: 0.7,
                    barPercentage: 0.9
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: { display: false },
                        ticks: { callback: val => (val / 1000).toFixed(0) + 'K' }
                    },
                    y: { grid: { display: false } }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { label: ctx => ctx.parsed.x.toLocaleString() } },
                    barValues: { color: onFillInk() }
                }
            },
            plugins: [barValuesPlugin]
        }, { height: 300 });
    },
    
    // Real time visitors chart
    initRealTimeChart() {
        const points = this.generateRealTimeData(30, 1200, 1300);
        charts.realTime = createChart(document.querySelector("#realTimeChart"), {
            type: 'line',
            data: {
                labels: points.map(([x]) => formatClock(x)),
                datasets: [{
                    label: 'Users',
                    data: points.map(([, y]) => y),
                    borderColor: () => categorical(3)[2],
                    pointBackgroundColor: () => categorical(3)[2]
                }]
            },
            options: {
                interaction: { mode: 'index', intersect: false },
                scales: {
                    x: { display: false },
                    y: { display: false, min: 1000, max: 1500 }
                },
                plugins: { legend: { display: false } }
            }
        }, { height: 150 });
    },

    // Browser usage chart
    initBrowserChart() {
        charts.browser = createChart(document.querySelector("#browserChart"), {
            type: 'polarArea',
            data: {
                labels: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Other'],
                datasets: [{
                    label: 'Share',
                    data: [58.6, 22.3, 8.1, 5.4, 5.6],
                    backgroundColor: ctx => alpha(categorical(5)[ctx.dataIndex], 0.85)
                }]
            },
            options: {
                scales: {
                    r: {
                        grid: { color: () => gridLine() },
                        angleLines: { display: true, color: () => gridLine() },
                        ticks: { display: false }
                    }
                },
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed.r}%` } }
                }
            }
        }, { height: 350 });
    },
    
    // Generate data for real-time chart
    generateRealTimeData(count, min, max) {
        let i = 0;
        const series = [];
        const time = new Date().getTime();
        while (i < count) {
            const x = time - (count - 1 - i) * 1000;
            const y = Math.floor(Math.random() * (max - min + 1)) + min;
            series.push([x, y]);
            i++;
        }
        return series;
    },
    
    // Start real time updates
    startRealTimeUpdates() {
        const id = setInterval(() => {
            this.updateRealTimeData();
            this.updateRealTimeMetrics();
        }, REALTIME_FAST_POLL_MS);
        this._intervals.add(id);
    },
    
    // Update real time chart data
    updateRealTimeData() {
        const chart = charts.realTime;
        if (chart) {
            const x = new Date().getTime();
            const y = Math.floor(Math.random() * (1300 - 1200 + 1)) + 1200;

            chart.data.labels.push(formatClock(x));
            chart.data.labels.shift();
            chart.data.datasets[0].data.push(y);
            chart.data.datasets[0].data.shift();
            chart.update('none');
        }
    },
    
    // Update real time metrics
    updateRealTimeMetrics() {
        this.realTimeUsers += Math.floor(Math.random() * 21) - 10;
        this.pageViews += Math.floor(Math.random() * 5) + 1;
        if (Math.random() > 0.95) {
            this.sessions += 1;
        }
    },
    
    // Formatters
    formatCurrency(value) {
        return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },
    
    formatNumber(value) {
        return value.toLocaleString();
    },
    
    formatPercentage(value) {
        return value.toFixed(2) + '%';
    },

    // Export data function
    exportData() {
        const dataToExport = {
            metrics: this.metrics,
            trafficSources: this.trafficSources,
            topPages: this.topPages,
            geographicData: this.geographicData,
            deviceData: this.deviceData
        };
        
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
        const a = document.createElement('a');
        a.setAttribute("href", dataStr);
        a.setAttribute("download", "analytics_export.json");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
    }
    };
  });
});
