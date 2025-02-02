import React from 'react';
import { MdDashboard } from "react-icons/md";
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const MainDashboard = () => {
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Chart Title' },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'rgba(75, 75, 75, 1)',
                    font: { size: 12 }
                },
                grid: { color: 'rgba(200, 200, 200, 0.3)' }
            },
            x: {
                ticks: {
                    color: 'rgba(75, 75, 75, 1)',
                    font: { size: 12 }
                },
                grid: { color: 'rgba(200, 200, 200, 0.3)' }
            }
        }
    };

    const eggsProducedData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Eggs Produced',
                data: [800, 900, 1000, 950],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const ordersData = {
        labels: ['Organic Duck Eggs', 'Salted Eggs', 'Hatchling Eggs', 'Balut'],
        datasets: [
            {
                label: 'Orders',
                data: [20, 15, 10, 5],
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
            },
        ],
    };

    const salesData = {
        labels: ['Organic Duck Eggs', 'Salted Eggs', 'Hatchling Eggs', 'Balut'],
        datasets: [
            {
                label: 'Sales',
                data: [1200, 800, 600, 300],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
        ],
    };

    const eggForecastData = {
        labels: ['Today', 'Tomorrow', 'Day After Tomorrow'],
        datasets: [
            {
                label: 'Egg Forecast',
                data: [100, 120, 110],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <div className="p-8 mt-10 bg-blue-50 shadow-lg rounded-lg">
            <h1 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1">
                Dashboard <MdDashboard className="ml-2" />
            </h1>

            <div className="flex justify-between mb-15 space-x-2">
                <div className="bg-blue-200 p-16 rounded-lg shadow-md flex-1 flex flex-col relative">
                    <h2 className="text-lg font-bold absolute top-2 left-2">Eggs Produced</h2>
                    <p className="text-xl absolute bottom-2 right-2">900 Eggs</p>
                </div>
                <div className="bg-green-200 p-16 rounded-lg shadow-md flex-1 flex flex-col relative">
                    <h2 className="text-lg font-bold absolute top-2 left-2">Orders</h2>
                    <p className="text-xl absolute bottom-2 right-2">50 Orders</p>
                </div>
                <div className="bg-purple-200 p-16 rounded-lg shadow-md flex-1 flex flex-col relative">
                    <h2 className="text-lg font-bold absolute top-2 left-2">Sales</h2>
                    <p className="text-xl absolute bottom-2 right-2">$3000</p>
                </div>
                <div className="bg-yellow-200 p-16 rounded-lg shadow-md flex-1 flex flex-col relative">
                    <h2 className="text-lg font-bold absolute top-2 left-2">Egg Forecast Today</h2>
                    <p className="text-xl absolute bottom-2 right-2">100 Eggs</p>
                </div>
            </div>

            <div className="flex flex-wrap justify-between mb-4 space-x-2">
                <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-[48%] m-2" style={{ maxHeight: '400px', overflow: 'hidden' }}>
                    <h2 className="text-lg font-bold mb-2">Eggs Produced Line Chart</h2>
                    <Line data={eggsProducedData} options={chartOptions} />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-[48%] m-2" style={{ maxHeight: '400px', overflow: 'hidden' }}>
                    <h2 className="text-lg font-bold mb-2">Orders Bar Graph</h2>
                    <Bar data={ordersData} options={chartOptions} />
                </div>
            </div>

            <div className="flex flex-wrap justify-between mb-4 space-x-2">
                <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-[48%] m-2" style={{ maxHeight: '400px', overflow: 'hidden' }}>
                    <h2 className="text-lg font-bold mb-2">Sales Horizontal Bar Chart</h2>
                    <Bar data={salesData} options={{ ...chartOptions, indexAxis: 'y' }} />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-[48%] m-2" style={{ maxHeight: '400px', overflow: 'hidden' }}>
                    <h2 className="text-lg font-bold mb-2">Egg Forecast Line Chart</h2>
                    <Line data={eggForecastData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default MainDashboard;
