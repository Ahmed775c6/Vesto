import { onMount } from 'solid-js';
import { Chart, type ChartConfiguration } from 'chart.js/auto';

const data = [
    {
        name: "Electronics",
        value: 43,
        color: "bg-sky-700",
        chartColor: '#0369a1', // sky-700
    },
    {
        name: "Clothes",
        value: 27,
        color: "bg-pink-700",
        chartColor: '#be185d', // pink-700
    },
    {
        name: "Books",
        value: 17,
        color: "bg-orange-700",
        chartColor: '#c2410c', // orange-700
    },
    {
        name: "Others",
        value: 3,
        color: "bg-teal-700",
        chartColor: '#0f766e', // teal-700
    }
];

const CategoryChart = () => {
    let chartRef: HTMLCanvasElement | undefined;

    onMount(() => {
        if (!chartRef) return;

        const chartData = {
            labels: data.map(item => item.name),
            datasets: [
                {
                    data: data.map(item => item.value),
                    backgroundColor: data.map(item => item.chartColor),
                    borderColor: 'transparent',
                    borderWidth: 0,
                    hoverOffset: 8,
                },
            ],
        };

        const config: ChartConfiguration = {
            type: 'pie',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        titleColor: '#f1f5f9',
                        bodyColor: '#cbd5e1',
                        borderColor: '#334155',
                        borderWidth: 1,
                        cornerRadius: 6,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                return `${label}: ${value}%`;
                            }
                        }
                    },
                },
            
            },
        };

        const chart = new Chart(chartRef, config);

        // Cleanup function
        return () => {
            chart.destroy();
        };
    });

    const renderDataItems = () => {
        const items = [];
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            items.push(
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span class="text-sm text-slate-600 dark:text-slate-400">{item.name}</span>
                    </div>
                    <span class="text-sm font-medium text-slate-800 dark:text-slate-200">{item.value}%</span>
                </div>
            );
        }
        return items;
    };

    return (
        <div class="bg-white dark:bg-slate-900 backdrop-blur-xl rounded-b-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
            <div class="mb-6">
                <h3 class="text-lg font-bold text-slate-800 dark:text-white">Sales By Category</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">Production Distribution</p>
            </div>

            <div class="h-48 relative">
                <canvas ref={chartRef}></canvas>
            </div>

            <div class="space-y-3 mt-6">
                {renderDataItems()}
            </div>
        </div>
    );
};

export default CategoryChart;