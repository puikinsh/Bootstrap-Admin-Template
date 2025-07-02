// ==========================================================================
// Dashboard Manager - Advanced data visualization and components
// ==========================================================================

import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  LineController,
  BarController,
  DoughnutController,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import ApexCharts from 'apexcharts';

// Register Chart.js components and controllers
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  LineController,
  BarController,
  DoughnutController,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export class DashboardManager {
  constructor() {
    this.charts = new Map();
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
    console.log('🚀 Advanced Dashboard Manager initialized');
    
    // Load sample data
    await this.loadDashboardData();
    
    // Initialize charts
    this.initRevenueChart();
    this.initUserGrowthChart();
    this.initOrderStatusChart();
    this.initStorageChart();
    this.initSalesByLocationChart();
    this.populateRecentOrders();
    
    // Initialize real-time updates
    this.startRealTimeUpdates();
    
    // Initialize interactive elements
    this.initInteractiveElements();
  }

  async loadDashboardData() {
    // Simulate API call with realistic data
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
    return Array.from({length: 5}, (_, i) => ({
        id: `#${Math.floor(Math.random() * 9000) + 1000}`,
        customer: customers[Math.floor(Math.random() * customers.length)],
        amount: `$${(Math.random() * 500 + 50).toFixed(2)}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        date: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 7).toLocaleDateString()
    }));
  }

  generateSalesByLocation() {
    return [
        { "name": "United States", "value": 2822},
        { "name": "Canada", "value": 1432},
        { "name": "United Kingdom", "value": 980},
        { "name": "Australia", "value": 780},
        { "name": "Germany", "value": 650},
        { "name": "Brazil", "value": 450},
        { "name": "India", "value": 1800},
        { "name": "China", "value": 2100},
        { "name": "Japan", "value": 850},
        { "name": "Russia", "value": 550}
    ]
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
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.data.revenue.map(item => item.month),
        datasets: [
          {
            label: 'Revenue',
            data: this.data.revenue.map(item => item.revenue),
            borderColor: 'rgb(99, 102, 241)',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: 'rgb(99, 102, 241)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          },
          {
            label: 'Profit',
            data: this.data.revenue.map(item => item.profit),
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: 'rgb(16, 185, 129)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 20
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            border: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            border: {
              display: false
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        }
      }
    });

    this.charts.set('revenue', chart);
  }

  initUserGrowthChart() {
    const ctx = document.getElementById('userGrowthChart');
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.data.users.slice(-7).map(item => `Day ${item.day}`),
        datasets: [
          {
            label: 'New Users',
            data: this.data.users.slice(-7).map(item => item.newUsers),
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
            borderColor: 'rgb(99, 102, 241)',
            borderWidth: 1,
            borderRadius: 6,
            borderSkipped: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }
        }
      }
    });

    this.charts.set('userGrowth', chart);
  }

  initOrderStatusChart() {
    const ctx = document.getElementById('orderStatusChart');
    if (!ctx) return;

    const chart = new Chart(ctx, {
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
          backgroundColor: [
            'rgba(16, 185, 129, 0.8)',
            'rgba(99, 102, 241, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)'
          ],
          borderWidth: 0,
          cutout: '60%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true
            }
          }
        }
      }
    });

    this.charts.set('orderStatus', chart);
  }

  initStorageChart() {
    const options = {
      chart: {
        height: 280,
        type: "radialBar",
      },
      series: [76],
      colors: ["#20E647"],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "70%",
            background: "#293450"
          },
          track: {
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 4,
              opacity: 0.15
            }
          },
          dataLabels: {
            name: {
              offsetY: -10,
              color: "#fff",
              fontSize: "13px"
            },
            value: {
              color: "#fff",
              fontSize: "30px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          gradientToColors: ["#87D4F9"],
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Used Space"]
    };

    const chart = new ApexCharts(document.querySelector("#storageStatusChart"), options);
    chart.render();
    this.charts.set('storage', chart);
  }

  initSalesByLocationChart() {
      const options = {
          series: [{
              name: 'Sales',
              data: this.data.salesByLocation.map(c => ({ x: c.name, y: c.value }))
          }],
          chart: {
              type: 'treemap',
              height: 350
          },
          dataLabels: {
              enabled: true,
              style: {
                  fontSize: '12px',
              },
              formatter: function(text, op) {
                  return [text, op.value]
              },
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
          responsive: [{
              breakpoint: 768,
              options: {
                  chart: {
                      height: 300
                  },
                  dataLabels: {
                      style: {
                          fontSize: '10px'
                      }
                  }
              }
          }]
      };

      const chart = new ApexCharts(document.querySelector("#salesByLocationChart"), options);
      chart.render();
      this.charts.set('salesByLocation', chart);
  }

  populateRecentOrders() {
      const tableBody = document.getElementById('recent-orders-table');
      if (!tableBody) return;

      tableBody.innerHTML = this.data.recentOrders.map(order => `
          <tr>
              <td><strong>${order.id}</strong></td>
              <td>${order.customer}</td>
              <td>${order.amount}</td>
              <td><span class="badge ${order.status.class}">${order.status.text}</span></td>
              <td>${order.date}</td>
          </tr>
      `).join('');
  }

  startRealTimeUpdates() {
    // Update charts every 30 seconds with new data
    setInterval(() => {
      this.updateChartsWithRealTimeData();
    }, 30000);
  }

  updateChartsWithRealTimeData() {
    // Update revenue chart
    const revenueChart = this.charts.get('revenue');
    if (revenueChart) {
      const newRevenue = Math.floor(Math.random() * 50000) + 10000;
      const newProfit = Math.floor(Math.random() * 20000) + 5000;
      
      revenueChart.data.datasets[0].data.push(newRevenue);
      revenueChart.data.datasets[1].data.push(newProfit);
      
      if (revenueChart.data.datasets[0].data.length > 12) {
        revenueChart.data.datasets[0].data.shift();
        revenueChart.data.datasets[1].data.shift();
        revenueChart.data.labels.shift();
      }
      
      revenueChart.update('none');
    }

    // Update stats cards
    this.updateStatsCards();
  }

  updateStatsCards() {
    // Animate stats card values
    const statsElements = document.querySelectorAll('[data-stat-value]');
    statsElements.forEach(element => {
      const currentValue = parseInt(element.textContent.replace(/[^0-9]/g, ''));
      const newValue = currentValue + Math.floor(Math.random() * 10) - 5;
      
      if (newValue > 0) {
        this.animateNumber(element, currentValue, newValue);
      }
    });
  }

  animateNumber(element, start, end) {
    const duration = 1000;
    const steps = 30;
    const stepValue = (end - start) / steps;
    let current = start;
    let step = 0;

    const timer = setInterval(() => {
      current += stepValue;
      step++;
      
      const formatted = Math.floor(current).toLocaleString();
      element.textContent = element.textContent.replace(/[\d,]+/, formatted);
      
      if (step >= steps) {
        clearInterval(timer);
        const finalFormatted = end.toLocaleString();
        element.textContent = element.textContent.replace(/[\d,]+/, finalFormatted);
      }
    }, duration / steps);
  }

  initInteractiveElements() {
    // Chart period switcher
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-chart-period]')) {
        const period = e.target.dataset.chartPeriod;
        this.updateChartPeriod(period);
        
        // Update active state
        document.querySelectorAll('[data-chart-period]').forEach(btn => {
          btn.classList.remove('active');
        });
        e.target.classList.add('active');
      }
    });

    // Export functionality
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-export-chart]')) {
        const chartName = e.target.dataset.exportChart;
        this.exportChart(chartName);
      }
    });
  }

  updateChartPeriod(period) {
    // Regenerate data based on period
    switch (period) {
      case '7d':
        this.loadWeeklyData();
        break;
      case '30d':
        this.loadMonthlyData();
        break;
      case '90d':
        this.loadQuarterlyData();
        break;
      case '1y':
        this.loadYearlyData();
        break;
    }
  }

  loadWeeklyData() {
    // Update charts with weekly data
    console.log('Loading weekly data...');
  }

  loadMonthlyData() {
    // Update charts with monthly data
    console.log('Loading monthly data...');
  }

  loadQuarterlyData() {
    // Update charts with quarterly data
    console.log('Loading quarterly data...');
  }

  loadYearlyData() {
    // Update charts with yearly data
    console.log('Loading yearly data...');
  }

  exportChart(chartName) {
    const chart = this.charts.get(chartName);
    if (chart) {
      const url = chart.toBase64Image();
      const link = document.createElement('a');
      link.download = `${chartName}-chart.png`;
      link.href = url;
      link.click();
    }
  }

  destroy() {
    this.charts.forEach(chart => chart.destroy());
    this.charts.clear();
  }
} 