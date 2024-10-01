import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import Chart from 'chart.js/auto';

// Register the zoom plugin
Chart.register(zoomPlugin);

const Forecasting = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('forecastingData');
    return savedData ? JSON.parse(savedData) : [];
  });

  const [targetColumn, setTargetColumn] = useState(() => {
    const savedTarget = localStorage.getItem('targetColumn');
    return savedTarget || 'Number of Eggs'; // Change to the default column name if necessary
  });

  const chartRef = useRef(null);
  const [error, setError] = useState('');

  // Chart data configuration
  const chartData = {
    labels: data.map(row => row.date),
    datasets: [
      {
        label: `Data from ${targetColumn}`,
        data: data.map(row => parseFloat(row[targetColumn]) || 0),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'Forecast',
        data: Array(data.length).fill(null), // Keep forecast data blank for now
        borderColor: 'orange',
        backgroundColor: 'rgba(255, 165, 0, 0.2)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  // Update chart data whenever data or target column changes
  useEffect(() => {
    if (data.length > 0) {
      chartRef.current?.update();
    }
  }, [data, targetColumn]);

  const handleFileUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          console.log("Uploaded Data Columns:", Object.keys(results.data[0])); // Log columns
          setData(results.data);
          setError('');
          localStorage.setItem('forecastingData', JSON.stringify(results.data));
        },
        error: () => {
          setError('Error parsing CSV file');
        },
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          console.log("Uploaded Data Columns:", Object.keys(results.data[0])); // Log columns
          setData(results.data);
          setError('');
          localStorage.setItem('forecastingData', JSON.stringify(results.data));
        },
        error: () => {
          setError('Error parsing CSV file');
        },
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveData = () => {
    setData([]);
    localStorage.removeItem('forecastingData');
  };

  const handleZoomIn = () => {
    if (chartRef.current) {
      chartRef.current.zoom(1.2);
    }
  };

  const handleZoomOut = () => {
    if (chartRef.current) {
      chartRef.current.zoom(0.8);
    }
  };

  // Function to handle target column change
  const handleTargetColumnChange = (e) => {
    const selectedColumn = e.target.value;
    setTargetColumn(selectedColumn);
    localStorage.setItem('targetColumn', selectedColumn);
  };

  return (
    <div className="p-8 mt-8">
      <h2 className="text-2xl mb-4">Forecasting</h2>

      {/* Chart on top */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-medium mb-4">Forecasting Graph</h3>

        <div className="h-96 mb-4 mr-20">
          <Line
            ref={chartRef}
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 12,
                  },
                },
                y: {
                  type: 'linear',
                  position: 'left',
                  ticks: {
                    callback: (value) => `${value}`,
                  },
                },
              },
              plugins: {
                zoom: {
                  pan: {
                    enabled: true,
                    mode: 'x',
                  },
                  zoom: {
                    enabled: true,
                    mode: 'x',
                    drag: true,
                  },
                },
              },
            }}
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleZoomIn}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Zoom In
          </button>
          <button
            onClick={handleZoomOut}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Zoom Out
          </button>
        </div>
      </div>

      {/* Target Column Selector */}
      <div className="mb-4">
        <label className="block mb-2">Select Target Column:</label>
        <select
          value={targetColumn}
          onChange={handleTargetColumnChange}
          className="border border-gray-300 p-2 rounded"
        >
          {data.length > 0 && Object.keys(data[0]).map((colKey) => (
            <option key={colKey} value={colKey}>
              {colKey}
            </option>
          ))}
        </select>
      </div>

      {data.length === 0 && (
        <div
          className="border-dashed border-4 border-gray-300 p-4 rounded-lg mb-4 cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="csv-upload"
          />
          <label htmlFor="csv-upload" className="flex flex-col items-center cursor-pointer">
            <span className="text-gray-600 mb-2">Drag and drop your CSV file here</span>
            <span className="text-blue-500">or click to upload</span>
          </label>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {data.length > 0 && (
        <>
          {/* Table to display data without editing */}
          <div className="mb-4">
            <h3 className="text-xl mb-2">Uploaded Data:</h3>
            <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-lg">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {data[0] && Object.keys(data[0]).map((key) => (
                      <th key={key} className="border border-gray-300 p-1 bg-gray-100 text-sm">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((value, idx) => (
                        <td key={idx} className="border border-gray-300 p-1">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button
            onClick={handleRemoveData}
            className="bg-red-500 text-white p-2 rounded"
          >
            Remove All Data
          </button>
        </>
      )}
    </div>
  );
};

export default Forecasting;
