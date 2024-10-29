import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import { GiEggClutch } from "react-icons/gi";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

function EggTab() {
  const [inventory, setInventory] = useState({
    date: '',
    eggsCollected: '',
    housing: '',
    hatchingEggs: '',
    breeds: '',
    duckMortality: '',
    forecastedEggs: '',
  });

  const [inventoryList, setInventoryList] = useState([]);
  
  const handleChange = (e) => {
    setInventory({
      ...inventory,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInventoryList([...inventoryList, inventory]);
    setInventory({
      date: '',
      eggsCollected: '',
      housing: '',
      hatchingEggs: '',
      breeds: '',
      duckMortality: '',
      forecastedEggs: '',
    });
  };

  // Prepare data for the chart
  const chartData = {
    labels: inventoryList.map(entry => entry.date), // Dates as labels
    datasets: [
      {
        label: 'Eggs Collected',
        data: inventoryList.map(entry => Number(entry.eggsCollected)), // Eggs collected values
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Forecasted Eggs',
        data: inventoryList.map(entry => Number(entry.forecastedEggs)), // Forecasted eggs values
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="p-8 mt-10 bg-blue-50 ml-2 shadow-lg rounded-lg transform transition-all duration-300 hover:shadow-xl flex flex-col w-full">
      <h1 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1">Egg Inventory Management <GiEggClutch className="ml-2" />
      </h1>

      {/* Input Functionalities Tile */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <label className="block mb-1">Date:</label>
              <input
                type="date"
                name="date"
                value={inventory.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-2">
              <label className="block mb-1">Eggs Collected:</label>
              <input
                type="number"
                name="eggsCollected"
                value={inventory.eggsCollected}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <label className="block mb-1">Housing:</label>
              <input
                type="text"
                name="housing"
                value={inventory.housing}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-2">
              <label className="block mb-1">Hatching Eggs:</label>
              <input
                type="number"
                name="hatchingEggs"
                value={inventory.hatchingEggs}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
                />
              </div>
            </div>
  
            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label className="block mb-1">Breeds:</label>
                <input
                  type="text"
                  name="breeds"
                  value={inventory.breeds}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
  
              <div className="w-full md:w-1/2 px-2">
                <label className="block mb-1">Duck Mortality:</label>
                <input
                  type="number"
                  name="duckMortality"
                  value={inventory.duckMortality}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>
  
            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-full px-2">
                <label className="block mb-1">Forecasted Eggs:</label>
                <input
                  type="number"
                  name="forecastedEggs"
                  value={inventory.forecastedEggs}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>
  
            <div className="px-2">
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Submit
              </button>
            </div>
          </form>
        </div>
  
        {/* Inventory Entries Tile */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Inventory Entries</h2>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Date</th>
                <th className="border border-gray-300 p-2">Eggs Collected</th>
                <th className="border border-gray-300 p-2">Housing</th>
                <th className="border border-gray-300 p-2">Hatching Eggs</th>
                <th className="border border-gray-300 p-2">Breeds</th>
                <th className="border border-gray-300 p-2">Duck Mortality</th>
                <th className="border border-gray-300 p-2">Forecasted Eggs</th>
              </tr>
            </thead>
            <tbody>
              {inventoryList.map((entry, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{entry.date}</td>
                  <td className="border border-gray-300 p-2">{entry.eggsCollected}</td>
                  <td className="border border-gray-300 p-2">{entry.housing}</td>
                  <td className="border border-gray-300 p-2">{entry.hatchingEggs}</td>
                  <td className="border border-gray-300 p-2">{entry.breeds}</td>
                  <td className="border border-gray-300 p-2">{entry.duckMortality}</td>
                  <td className="border border-gray-300 p-2">{entry.forecastedEggs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        
  
        {/* Line graph to display collected and forecasted eggs */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Egg Collection and Forecast</h2>
          {inventoryList.length > 0 ? (
            <Line data={chartData} />
          ) : (
            <p>No data to display.</p>
          )}
        </div>
      </div>
      </div>
    );
  }
  
  export default EggTab;