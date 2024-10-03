import React, { useState } from 'react';
import Papa from 'papaparse';
import * as tf from '@tensorflow/tfjs'; // Import TensorFlow.js for linear regression
import { Line } from 'react-chartjs-2'; // Import Line chart from react-chartjs-2
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend, CategoryScale } from 'chart.js'; // Import necessary components

ChartJS.register(LinearScale, PointElement, LineElement, Filler, Tooltip, Legend, CategoryScale); // Register scales and components

const Forecasting = () => {
    const [data, setData] = useState(() => {
        const savedData = localStorage.getItem('forecastingData');
        return savedData ? JSON.parse(savedData) : [];
    });

    const [forecastHorizon, setForecastHorizon] = useState(1);
    const [forecastResults, setForecastResults] = useState([]);
    const [error, setError] = useState('');
    const [targetColumn, setTargetColumn] = useState('number-eggs'); // Set default target column
    const [modelTrained, setModelTrained] = useState(false);
    const [model, setModel] = useState(null); // Store the model

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (results) => {
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
        setForecastResults([]); // Clear forecast results when removing data
        setModelTrained(false);
        setModel(null);
        localStorage.removeItem('forecastingData');
    };

    const handleTrainModel = async () => {
        if (data.length === 0) {
            setError('No data available for training');
            return;
        }

        // Extract target data
        const targetData = data.map(row => parseFloat(row[targetColumn])).filter(value => !isNaN(value));
        console.log("Target Data: ", targetData); // Debugging line

        if (targetData.length < 2) {
            setError('Insufficient valid data for training');
            return;
        }

        // Prepare training data
        const xsTrain = tf.tensor1d(targetData.map((_, index) => index)); // X values (days)
        const ysTrain = tf.tensor1d(targetData); // Y values (target column)

        // Build the model
        const newModel = tf.sequential();
        newModel.add(tf.layers.dense({ units: 1, inputShape: [1] }));
        newModel.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

        // Train the model
        const history = await newModel.fit(xsTrain, ysTrain, { epochs: 100 });
        console.log("Training History: ", history); // Debugging line

        setModel(newModel);
        setModelTrained(true);
        setError('Model trained successfully');
    };

    const handleForecasting = async () => {
        if (data.length === 0) {
            setError('No data available for forecasting');
            return;
        }

        if (!modelTrained) {
            setError('Model must be trained before forecasting');
            return;
        }

        // Extract target data
        const targetData = data.map(row => parseFloat(row[targetColumn])).filter(value => !isNaN(value));
        console.log("Target Data: ", targetData); // Debugging line

        if (targetData.length < 2) {
            setError('Insufficient valid data for forecasting');
            return;
        }

        const inputData = tf.tensor2d([[targetData.length]]); // Adjust input shape for prediction
        console.log("Input Tensor Shape: ", inputData.shape); // Debugging line

        const forecastedValues = [];
        for (let i = 0; i < Math.min(forecastHorizon, 3); i++) { // Limit to a maximum of 3 days
            const predictedValue = model.predict(inputData);
            const value = predictedValue.dataSync()[0];
            console.log("Predicted Value: ", value); // Debugging line
            forecastedValues.push(value);
            inputData.dataSync()[0] += 1; // Increment input for next prediction
        }

        setForecastResults(forecastedValues);
    };

    const getLabels = () => {
        return data.map(row => row['Date']); // Adjust this according to your date column name
    };

    const getHistoricalData = () => {
        return data.map(row => parseFloat(row[targetColumn])).filter(value => !isNaN(value));
    };

    const historicalData = getHistoricalData();
    const labels = getLabels();
    
    const chartData = {
        labels: [...labels, ...Array.from({ length: Math.min(forecastHorizon, 3) }, (_, i) => `Forecast Day ${i + 1}`)],
        datasets: [
            {
                label: 'Historical Values',
                data: historicalData,
                borderColor: 'blue',
                fill: false,
                pointRadius: 0, // Hide points to make the chart look continuous
            },
            {
                label: 'Forecast Values',
                data: [...Array(historicalData.length).fill(null), ...forecastResults],
                borderColor: 'red',
                fill: false,
                pointRadius: 1, // Hide points for forecast data
                borderDash: [5, 0], // Dashed line for forecast
            },
        ],
    };

    const options = {
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time (Historical and Forecasted)',
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Egg Count',
                },
            },
        },
    };

    const handleRemoveForecast = () => {
        setForecastResults([]);
    };

    return (
        <div className="p-8 mt-8 bg-blue-50">
  <h2 className="text-2xl mb-4 font-sans font-bold">Forecasting</h2>

  {/* CSV Upload or Drag & Drop */}
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

  {error && <p className="text-green-500 mb-4">{error}</p>}

  {/* Data Table and Chart */}
  {data.length > 0 && (
    <>
      <div className="flex mb-4">
        {/* Data Table */}
        <div className="w-2/3 pr-4">
          <h3 className="text-xl mb-1 font-sans font-semibold">Uploaded Data:</h3>
          <div className="max-h-96 overflow-y-auto border relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            <table className="w-full border-collapse text-sm text-left rtl:text-right text-gray-500 dark:text-slate-700">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key} scope="col" className="px-1 py-3">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, idx) => (
                      <td key={idx} className="px-1 py-3">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Remove Data Button placed below the table */}
          <div className="mt-2">
            <button
              onClick={handleRemoveData}
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
            >
              Remove Data
            </button>
          </div>
        </div>

        {/* Train Model and Forecasting */}
        <div className="w-1/3">
          {/* Train Model */}
          <div className="mb-4">
            <h3 className="text-xl mb-2 font-semibold font-sans">Train Model:</h3>
            <div className="flex items-center mb-2">
              <label className="mr-2">Target Column:</label>
              <input
                type="text"
                value={targetColumn}
                onChange={(e) => setTargetColumn(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg w-60"
                placeholder="Enter target column name"
              />
              <button
                onClick={handleTrainModel}
                className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
              >
                Train Model
              </button>
            </div>
          </div>

          {/* Forecasting */}
          <h3 className="text-xl mb-2">Forecasting:</h3>
          <label className="block mb-2">Forecast Horizon (1-3 days):</label>
          <input
            type="number"
            min="1"
            max="3"
            value={forecastHorizon}
            onChange={(e) => setForecastHorizon(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded-lg w-20"
          />
          <button
            onClick={handleForecasting}
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Forecast
          </button>
          <button
            onClick={handleRemoveForecast}
            className="ml-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
          >
            Remove Forecast
          </button>

          {/* Display forecast values */}
          {forecastResults.length > 0 && (
            <div className="mt-4">
              <h4 className="text-lg">Forecast Values:</h4>
              <ul>
                {forecastResults.map((value, index) => (
                  <li key={index}>
                    Day {index + 1}: {value.toFixed(2)} eggs
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Graph */}
      {forecastResults.length > 0 && (
        <div className="w-full mb-4">
          <Line data={chartData} options={options} />
        </div>
      )}
    </>
  )}
</div>

      

    );
};

export default Forecasting;
