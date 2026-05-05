import Alpine from 'alpinejs';
import { REALTIME_FAST_POLL_MS } from '../utils/constants.js';

document.addEventListener('alpine:init', () => {
  Alpine.data('analyticsComponent', () => ({
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
    
    // Chart instances
    charts: {},
    
    // Traffic sources data
    trafficSources: [
        { name: 'Organic Search', percentage: 42.3, visitors: 19314, color: '#007bff' },
        { name: 'Direct', percentage: 31.8, visitors: 14519, color: '#28a745' },
        { name: 'Social Media', percentage: 16.4, visitors: 7490, color: '#fd7e14' },
        { name: 'Referral', percentage: 9.5, visitors: 4349, color: '#e74c3c' }
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
    _resizeHandler: null,

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
        if (!this.charts.revenue) return;
        const { revenue, profit } = this.generateRevenueSeries(count);
        this.charts.revenue.updateOptions({
            xaxis: { categories: this.buildLabels(count, unit) },
            series: [
                { name: 'Revenue', data: revenue },
                { name: 'Profit',  data: profit  },
            ],
        });
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
        if (this._resizeHandler) {
            window.removeEventListener('resize', this._resizeHandler);
            this._resizeHandler = null;
        }
        this.clearExistingCharts();
    },
    
    // Clear existing charts to prevent duplicates
    clearExistingCharts() {
        Object.keys(this.charts).forEach(chartKey => {
            if (this.charts[chartKey] && this.charts[chartKey].destroy) {
                this.charts[chartKey].destroy();
            }
        });
        this.charts = {};
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
        const revenueOptions = {
            series: [{
                name: 'Revenue',
                data: [8200, 9100, 7800, 10200, 11500, 9800, 12400, 11200, 10800, 13200, 12100, 14200, 13800, 15100]
            }, {
                name: 'Profit',
                data: [3100, 3800, 2900, 4200, 4800, 3900, 5200, 4600, 4200, 5800, 5100, 6200, 5900, 6800]
            }],
            chart: {
                height: 350,
                width: '100%',
                type: 'area',
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                },
                sparkline: {
                    enabled: false
                },
                redrawOnParentResize: true,
                redrawOnWindowResize: true
            },
            responsive: [{
                breakpoint: 1200,
                options: {
                    chart: {
                        height: 300
                    },
                    legend: {
                        position: 'bottom',
                        horizontalAlign: 'center'
                    }
                }
            }, {
                breakpoint: 768,
                options: {
                    chart: {
                        height: 250
                    },
                    xaxis: {
                        labels: {
                            rotate: -45,
                            rotateAlways: true
                        }
                    }
                }
            }],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            colors: ['#007bff', '#28a745'],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.4,
                    opacityTo: 0.1,
                    stops: [0, 90, 100]
                }
            },
            xaxis: {
                categories: ['Jan 1', 'Jan 3', 'Jan 5', 'Jan 7', 'Jan 9', 'Jan 11', 'Jan 13', 'Jan 15', 'Jan 17', 'Jan 19', 'Jan 21', 'Jan 23', 'Jan 25', 'Jan 27'],
                labels: {
                    style: {
                        fontSize: '12px',
                        colors: '#6c757d'
                    }
                }
            },
            yaxis: {
                labels: {
                    formatter: function (val) {
                        return '$' + (val / 1000).toFixed(0) + 'K';
                    },
                    style: {
                        fontSize: '12px',
                        colors: '#6c757d'
                    }
                }
            },
            grid: {
                borderColor: '#e9ecef',
                strokeDashArray: 3
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                fontSize: '12px'
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return '$' + val.toLocaleString();
                    }
                }
            }
        };

        const chartElement = document.querySelector("#revenueChart");
        if (chartElement) {
            // Clear any existing chart instance
            if (this.charts.revenue) {
                this.charts.revenue.destroy();
            }

            this.charts.revenue = new ApexCharts(chartElement, revenueOptions);
            this.charts.revenue.render();

            // Handle window resize (one handler total, replaceable)
            if (this._resizeHandler) {
                window.removeEventListener('resize', this._resizeHandler);
            }
            this._resizeHandler = () => {
                if (this.charts.revenue) {
                    this.charts.revenue.updateOptions({ chart: { width: '100%' } });
                }
            };
            window.addEventListener('resize', this._resizeHandler);
        }
    },
    
    // Traffic sources pie chart
    initTrafficSourcesChart() {
        const trafficOptions = {
            series: this.trafficSources.map(source => source.percentage),
            chart: {
                width: '100%',
                height: 200,
                type: 'donut'
            },
            labels: this.trafficSources.map(source => source.name),
            colors: this.trafficSources.map(source => source.color),
            plotOptions: {
                pie: {
                    donut: {
                        size: '60%'
                    }
                }
            },
            legend: {
                show: false
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                y: {
                    formatter: function (val, { seriesIndex }) {
                        const source = this.trafficSources[seriesIndex];
                        return `${val.toFixed(1)}% (${source.visitors.toLocaleString()} visitors)`;
                    }.bind(this)
                }
            }
        };
        
        this.charts.trafficSources = new ApexCharts(document.querySelector("#trafficSourcesChart"), trafficOptions);
        this.charts.trafficSources.render();
    },
    
    // User behavior funnel chart
    initBehaviorChart() {
        const behaviorOptions = {
            series: [{
                name: 'Users',
                data: [45672, 32148, 18934, 12567, 8234, 4512]
            }],
            chart: {
                type: 'bar',
                height: 300,
                width: '100%',
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    distributed: true,
                    barHeight: '60%'
                }
            },
            colors: ['#007bff', '#0056b3', '#004085', '#003066', '#002752', '#001e3d'],
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val.toLocaleString();
                },
                style: {
                    colors: ['#fff']
                }
            },
            xaxis: {
                categories: ['Page Views', 'Unique Visitors', 'Engaged Users', 'Add to Cart', 'Checkout Started', 'Purchase'],
                labels: {
                    formatter: function (val) {
                        return (val / 1000).toFixed(0) + 'K';
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            grid: {
                show: false
            },
            legend: {
                show: false
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val.toLocaleString();
                    }
                }
            }
        };
        
        const behaviorEl = document.querySelector("#behaviorChart");
        this.charts.behavior = new ApexCharts(behaviorEl, behaviorOptions);
        this.charts.behavior.render();

        if (behaviorEl && 'ResizeObserver' in window) {
          let raf = 0;
          new ResizeObserver(() => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
              this.charts.behavior?.updateOptions({ chart: { width: '100%' } }, false, false);
            });
          }).observe(behaviorEl);
        }
    },
    
    // Real time visitors chart
    initRealTimeChart() {
        const realTimeOptions = {
            series: [{
                name: 'Users',
                data: this.generateRealTimeData(30, 1200, 1300)
            }],
            chart: {
                height: 150,
                width: '100%',
                type: 'line',
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 1000
                    }
                },
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            colors: ['#fd7e14'],
            markers: {
                size: 0
            },
            xaxis: {
                type: 'datetime',
                range: 30000,
                labels: {
                    show: false
                },
                axisBorder: {
                    show: false
                }
            },
            yaxis: {
                min: 1000,
                max: 1500,
                labels: {
                    show: false
                }
            },
            grid: {
                show: false
            },
            legend: {
                show: false
            }
        };
        
        this.charts.realTime = new ApexCharts(document.querySelector("#realTimeChart"), realTimeOptions);
        this.charts.realTime.render();
    },

    // Browser usage chart
    initBrowserChart() {
        const browserOptions = {
            series: [58.6, 22.3, 8.1, 5.4, 5.6],
            chart: {
                type: 'polarArea',
                height: 350,
                width: '100%'
            },
            labels: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Other'],
            stroke: {
                colors: ['#fff']
            },
            fill: {
                opacity: 0.85
            },
            legend: {
                position: 'bottom'
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        };

        this.charts.browser = new ApexCharts(document.querySelector("#browserChart"), browserOptions);
        this.charts.browser.render();
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
        if (this.charts.realTime) {
            const x = new Date().getTime();
            const y = Math.floor(Math.random() * (1300 - 1200 + 1)) + 1200;
            
            const series = this.charts.realTime.w.config.series[0].data.slice();
            series.push([x, y]);
            series.shift();
            
            this.charts.realTime.updateSeries([{ data: series }]);
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
  }));
}); 