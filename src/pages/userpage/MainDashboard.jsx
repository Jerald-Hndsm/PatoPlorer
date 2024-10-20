import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register the components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const MainDashboard = () => {
    // Sample data for the graphs
    const forecastData = {
        labels: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'], // Dates
        datasets: [
            {
                label: 'Number of Eggs',
                data: [20, 30, 25, 35, 40], // Sample egg counts
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }
        ]
    };

    const salesData = {
        labels: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'], // Dates
        datasets: [
            {
                label: 'Sales',
                data: [150, 200, 180, 220, 300], // Sample sales amounts
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.1
            }
        ]
    };

    // Current date for display (assuming it's today's date)
    const currentDate = '2024-10-05'; 

    return (
        <div className="p-8 mt-8 bg-gray-50">
            <h1 className="text-3xl mb-4 font-bold">Main Dashboard</h1>
            
            {/* Info Tiles */}
            <div className="flex justify-around mb-9 flex-wrap">
                <div className="bg-blue-200 p-4 rounded-lg shadow-md w-1/4">
                    <h2 className="text-lg font-bold">Egg Forecast</h2>
                    <p className="text-xl">900 Eggs</p>
                </div>
                <div className="bg-green-200 p-4 rounded-lg shadow-md w-1/4">
                    <h2 className="text-lg font-bold">Orders Duration</h2>
                    <p className="text-xl">10 Days</p>
                </div>
                {/* New Date Tile */}
                <div className="bg-purple-200 p-4 rounded-lg shadow-md w-1/4">
                    <h2 className="text-lg font-bold">Date</h2>
                    <p className="text-xl">{currentDate}</p>
                </div>
            </div>

            {/* Graphs and Calendar */}
            <div className="flex flex-col md:flex-row justify-around">
                <div className="w-full md:w-1/2 mb-4 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-bold mb-2">Egg Forecast</h2>
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <Line data={forecastData} />
                    </div>
                </div>
                <div className="w-full md:w-1/2 mb-4 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-bold mb-2">Sales</h2>
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <Line data={salesData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainDashboard;