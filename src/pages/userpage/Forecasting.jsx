import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { FaPlus, FaMinus } from 'react-icons/fa'; // Importing icons for zoom in and zoom out
import { FcComboChart } from 'react-icons/fc'; // Importing chart icon

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

  // Generate sample data
  const generateData = (frame) => {
    const data = [];
    const now = new Date();

    if (frame === 'daily') {
      // Generate hourly data for today
      for (let hour = 0; hour < 24; hour++) {
        data.push({
          time: `${hour}:00`,
          eggs: Math.floor(Math.random() * 10) + 1, // Random eggs between 1 and 10
        });
      }
    } else if (frame === 'monthly') {
      // Generate daily data for current month
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        data.push({
          date: `${now.getMonth() + 1}/${day}`,
          eggs: Math.floor(Math.random() * 100) + 20, // Random eggs between 20 and 120
        });
      }
    } else if (frame === 'yearly') {
      // Generate monthly data for current year
      for (let month = 0; month < 12; month++) {
        data.push({
          month: new Date(now.getFullYear(), month).toLocaleString('default', { month: 'short' }),
          eggs: Math.floor(Math.random() * 3000) + 500, // Random eggs between 500 and 3500
        });
      }
    }
    return data;
  };

  // Data to be displayed based on time frame
  const displayedData = useMemo(() => generateData(timeFrame), [timeFrame]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 5)); // Max zoom level of 5
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1)); // Min zoom level of 1
  };

  const handleTimeFrameChange = (frame) => {
    setTimeFrame(frame);
    setZoomLevel(1); // Reset zoom level when time frame changes
  };

  const handleUpdate = () => {
    // Update the info tiles with the input values
    if (inputHousing) setHousing(inputHousing);
    if (inputNumberOfDucks) setNumberOfDucks(inputNumberOfDucks);
    if (inputFeeds) setFeeds(inputFeeds);
    if (inputNutrients) setNutrients(inputNutrients);

    // Clear input fields
    setInputHousing('');
    setInputNumberOfDucks('');
    setInputFeeds('');
    setInputNutrients('');
  };

  // Adjusted data based on zoom level
  const zoomedData = useMemo(() => {
    const zoomedLength = Math.floor(displayedData.length / zoomLevel);
    return displayedData.slice(-zoomedLength);
  }, [zoomLevel, displayedData]);

  return (
    <div className="p-8 mt-10 bg-blue-50 ml-2 shadow-lg rounded-lg transform transition-all duration-300 hover:shadow-xl flex flex-col w-full">
      <h2 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1">
        Forecasting <FcComboChart className="ml-2" />
      </h2>

      <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-4">
        {/* Line Graph Tile */}
        <div className="flex-1 border rounded-lg shadow-lg p-4 bg-blue-50 mb-4 hover:shadow-xl transition-shadow duration-300 relative">
          <h3 className="font-bold text-base mb-2 text-gray-800">
            Egg Production Forecast
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={zoomedData}>
              <CartesianGrid strokeDasharray="3 3" />
              {timeFrame === 'daily' && (
                <XAxis dataKey="time" />
              )}
              {timeFrame === 'monthly' && (
                <XAxis dataKey="date" />
              )}
              {timeFrame === 'yearly' && (
                <XAxis dataKey="month" />
              )}
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="eggs"
                stroke="#358FDE"
                strokeWidth={3}
              />
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
              className={`${
                timeFrame === 'daily'
                  ? 'bg-blue-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white p-1 rounded transition duration-200 shadow-md text-sm`}
            >
              Daily
            </button>
            <button
              onClick={() => handleTimeFrameChange('monthly')}
              className={`${
                timeFrame === 'monthly'
                  ? 'bg-blue-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white p-1 rounded transition duration-200 shadow-md text-sm`}
            >
              Monthly
            </button>
            <button
              onClick={() => handleTimeFrameChange('yearly')}
              className={`${
                timeFrame === 'yearly'
                  ? 'bg-blue-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white p-1 rounded transition duration-200 shadow-md text-sm`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Info Tiles Section */}
        <div className="flex flex-col justify-between ml-0 lg:ml-4">
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
          <div className="border rounded-lg p-4 bg-blue-400 shadow-md mt-4">
            <h4 className="font-bold text-gray-50">Egg Forecast Today</h4>
            <p className="text-white">99.9%</p>
          </div>
        </div>
      </div>

      {/* Input Fields for Parameters */}
      <div className="border rounded-lg p-4 bg-white shadow-md mt-4 w-full">
        <h3 className="font-bold text-base mb-2 text-gray-800">
          Update Parameters
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Housing:</label>
            <input
              type="text"
              value={inputHousing}
              onChange={(e) => setInputHousing(e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="Enter housing type"
            />
          </div>
          <div>
            <label className="block text-gray-700">Number of Ducks:</label>
            <input
              type="number"
              value={inputNumberOfDucks}
              onChange={(e) => setInputNumberOfDucks(e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="Enter number of ducks"
            />
          </div>
          <div>
            <label className="block text-gray-700">Feeds:</label>
            <input
              type="text"
              value={inputFeeds}
              onChange={(e) => setInputFeeds(e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="Enter feed type"
            />
          </div>
          <div>
            <label className="block text-gray-700">Nutrients:</label>
            <input
              type="text"
              value={inputNutrients}
              onChange={(e) => setInputNutrients(e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="Enter nutrients"
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
