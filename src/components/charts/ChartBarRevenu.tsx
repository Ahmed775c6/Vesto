import { onMount } from 'solid-js';
import { Chart, type ChartConfiguration, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

const ChartBarRevenu = () => {
  let chartRef: HTMLCanvasElement | undefined;

  onMount(() => {
    if (!chartRef) return;

    // Chart configuration
    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Revenue',
            data: [65000, 59000, 80000, 81000, 56000, 75000, 92000, 88000, 78000, 85000, 90000, 95000],
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 1,
            borderRadius: 2,
            borderSkipped: false,
          },
          {
            label: 'Expenses',
            data: [45000, 48000, 52000, 55000, 42000, 50000, 58000, 54000, 51000, 53000, 56000, 59000],
            backgroundColor: 'rgba(249, 101, 101, 0.2)',
            borderColor: 'rgb(245, 101, 101)',
            borderWidth: 1,
            borderRadius: 2,
            borderSkipped: false,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.2)',
            titleColor: 'rgb(248, 250, 252)',
            bodyColor: 'rgb(248, 250, 252)',
            borderColor: 'rgba(148, 163, 184, 0.3)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function(context) {
                return `${context.parsed.y.toLocaleString()} TND`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(148, 163, 184, 0.1)',
            },
            ticks: {
              color: 'rgb(148, 163, 184)',
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(148, 163, 184, 0.1)',
            },
            ticks: {
              color: 'rgb(148, 163, 184)',
              callback: function(value) {
                return `${Number(value).toLocaleString()}`;
              }
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index',
        }
      }
    };

    // Create the chart
    const chart = new Chart(chartRef, config);

    // Cleanup function
    return () => {
      chart.destroy();
    };
  });

  return (
    <div class="bg-white p-6 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl border border-slate-200/50 dark:border-slate-700/50">
      <div class="flex items-center justify-between mb-6 border-b-2 border-sky-500 ">
        <div>
          <h3 class="text-xl font-bold text-slate-800 dark:text-white">Revenu ChartBar</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">Monthly revenue & expenses (TND)</p>
        </div>
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
            <div class="text-sm dark:text-slate-400 text-slate-600">
              <span>Revenue</span>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-gradient-to-r from-pink-500 to-orange-600 rounded-full"></div>
            <div class="text-sm dark:text-slate-400 text-slate-600">
              <span>Expenses</span>
            </div>
          </div>
        </div>
      </div>
      <div class="h-80">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ChartBarRevenu;