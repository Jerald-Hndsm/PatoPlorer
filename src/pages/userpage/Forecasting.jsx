import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaPlus, FaMinus } from 'react-icons/fa'; // Importing icons for zoom in and zoom out
import { FcComboChart } from "react-icons/fc"; // Importing chart icon

const Forecasting = () => {
    const [zoomLevel, setZoomLevel] = useState(1); // State to manage zoom level
    const [timeFrame, setTimeFrame] = useState('daily'); // State to manage time frame

    // State for info tiles
    const [housing, setHousing] = useState('Indoor');
    const [numberOfDucks, setNumberOfDucks] = useState(150);
    const [feeds, setFeeds] = useState('Avialis');
    const [nutrients, setNutrients] = useState('Revotech');

    // State for input fields
    const [inputHousing, setInputHousing] = useState('');
    const [inputNumberOfDucks, setInputNumberOfDucks] = useState('');
    const [inputFeeds, setInputFeeds] = useState('');
    const [inputNutrients, setInputNutrients] = useState('');

    // Placeholder for dynamic data
    const data = [
        { date: '2023-01-01', eggs: 10 },
        { date: '2023-01-02', eggs: 50 },
        { date: '2023-01-03', eggs: 90 },
        // Add more data points as needed
    ]; // Sample data for demonstration

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.1, 2)); // Max zoom level of 2
    };

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 0.1, 1)); // Min zoom level of 1
    };

    const handleTimeFrameChange = (frame) => {
        setTimeFrame(frame);
        // Logic to filter or adjust data based on the selected time frame
        console.log(`Time frame changed to: ${frame}`);
    };

    const handleUpdate = () => {
        // Update the info tiles with the input values
        setHousing(inputHousing);
        setNumberOfDucks(inputNumberOfDucks);
        setFeeds(inputFeeds);
        setNutrients(inputNutrients);
    };

    return (
        <div className="p-8 mt-10 bg-blue-50 ml-2 shadow-lg rounded-lg transform transition-all duration-300 hover:shadow-xl flex flex-col w-full">
            <h2 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1">
                Forecasting <FcComboChart className="ml-2" />
            </h2>
            
            <div className="flex flex-row space-x-4">
                {/* Line Graph Tile */}
                <div className="flex-1 border rounded-lg shadow-lg p-4 bg-blue-50 mb-4 hover:shadow-xl transition-shadow duration-300 relative">
                    <h3 className="font-bold text-base mb-2 text-gray-800">Egg Production Forecast</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="eggs" stroke="#358FDE" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="flex items-center mt-4 space-x-1">
                        <span className="text-gray-800 font-bold text-base">Zoom:</span>
                        <button 
                            onClick={handleZoomOut} 
                            className="ml-2 bg-transparent text-blue-900 p-1 rounded-full hover:bg-red-100 transition duration-200 text-sm"
                        >
                            <FaMinus />
                        </button>
                        <button 
                            onClick={handleZoomIn} 
                            className="bg-transparent text-blue-900 p-1 rounded-full hover:bg-green-100 transition duration-200 text-sm"
                        >
                            <FaPlus />
                        </button>
                    </div>
                    <div className="flex justify-end mt-4 absolute bottom-4 right-4 space-x-2 pt-12">
                        <span className="text-gray-800 font-bold text-base">View:</span>
                        <button 
                            onClick={() => handleTimeFrameChange('daily')} 
                            className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 transition duration-200 shadow-md text-sm"
                        >
                            Daily
                        </button>
                        <button 
                            onClick={() => handleTimeFrameChange('monthly')} 
                            className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 transition duration-200 shadow-md text-sm"
                        >
                            Monthly
                        </button>
                        <button 
                            onClick={() => handleTimeFrameChange('yearly')} 
                            className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 transition duration-200 shadow-md text-sm"
                        >
                            Yearly
                        </button>
                    </div>
                </div>

                {/* Info Tiles Section */}
                <div className="flex flex-col justify-between ml-4">
                    <div className="grid grid-cols-2 gap-4 pt-11">
                        <div className="border rounded-lg p-4 bg-blue-200 shadow-md">
                            <h4 className="font-bold text-gray-800">Temperature</h4>
                            <p className="text-gray-600">20°C</p>
                        </div>
                        <div className="border rounded-lg p-4 bg-blue-200 shadow-md">
                            <h4 className="font-bold text-gray-800">Weather</h4>
                            <p className="text-gray-600">Sunny</p>
                        </div>
                        <div className="border rounded-lg p-4 bg-blue-200 shadow-md">
                            <h4 className="font-bold text-gray-800">Housing</h4>
                            <p className="text-gray-600">{housing}</p>
                        </div>
                        <div className="border rounded-lg p-4 bg-blue-200 shadow-md">
                            <h4 className="font-bold text-gray-800">Number of Ducks</h4>
                            <p className="text-gray-600">{numberOfDucks}</p>
                        </div>
                        <div className="border rounded-lg p-4 bg-blue-200 shadow-md">
                            <h4 className="font-bold text-gray-800">Feeds</h4>
                            <p className="text-gray-600">{feeds}</p>
                        </div>
                        <div className="border rounded-lg p-4 bg-blue-200 shadow-md">
                            <h4 className="font-bold text-gray-800">Nutrients</h4>
                            <p className="text-gray-600">{nutrients}</p>
                        </div>
                    </div>
                    <div className="border rounded-lg p-4 bg-blue-400 shadow-m">
                            <h4 className="font-bold text-gray-50">Egg Forecast Today</h4>
                            <p className="text-white">99.9%</p>
                        </div>
                </div>
            </div>

            {/* Input Fields for Parameters in a 2 by 4 Grid Below the Graph */}
            <div className="border rounded-lg p-4 bg-white shadow-md -mt-2 w-full">
                <h3 className="font-bold text-base mb-2 text-gray-800">Update Parameters</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Housing:</label>
                        <input 
                            type="text" 
                            value={inputHousing} 
                            onChange={(e) => setInputHousing(e.target.value)} 
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Number of Ducks:</label>
                        <input 
                            type="number" 
                            value={inputNumberOfDucks} 
                            onChange={(e) => setInputNumberOfDucks(e.target.value)} 
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Feeds:</label>
                        <input 
                            type="text" 
                            value={inputFeeds} 
                            onChange={(e) => setInputFeeds(e.target.value)} 
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Nutrients:</label>
                        <input 
                            type="text" 
                            value={inputNutrients} 
                            onChange={(e) => setInputNutrients(e.target.value)} 
                            className="border rounded p-2 w-full"
                        />
                    </div>
                </div>
                <button 
                    onClick={handleUpdate} 
                    className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 shadow-md"
                >
                    Update
                </button>
            </div>
        </div>
    );
};

export default Forecasting;
