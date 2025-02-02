import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Forecasting = () => {
  // Numeric fields
  const [inputData, setInputData] = useState({
    "Temperature": '',
    "No. of Ducks": '',
    "Kg of feeds / day": '',
    "Nutrients in mL / day": '',
  });

  // Categorical or extra fields
  const [extraInputs, setExtraInputs] = useState({
    "Date": '',
    "Weather": '',
    "Breed": '',
    "Housing": '',
    "Feed Type": '',
    "Nutrients": '',
  });

  const [predictedEggs, setPredictedEggs] = useState(null);
  const [error, setError] = useState(null);

  // Default suggestion now comes solely from the API.
  // Expecting an array of suggestions from the API.
  const [suggestion, setSuggestion] = useState("No Recommendation For Production.");

  const [showAlert, setShowAlert] = useState(false);
  const [showBreedWarning, setShowBreedWarning] = useState(false);
  const [showHousingWarning, setShowHousingWarning] = useState(false);

  // Numeric input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: Number(value) || 0,
    }));
  };

  // Extra input handler (weather, breed, etc.)
  const handleExtraChange = (e) => {
    const { name, value } = e.target;
    setExtraInputs((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Warnings for Breed and Housing
    if (name === 'Breed') {
      if (
        value !== '' &&
        value.toLowerCase() !== 'mixed' &&
        value.toLowerCase() !== 'layer a' &&
        value.toLowerCase() !== 'layer b'
      ) {
        setShowBreedWarning(true);
      } else {
        setShowBreedWarning(false);
      }
    }
    if (name === 'Housing') {
      if (
        value !== '' &&
        value.toLowerCase() !== 'indoor' &&
        value.toLowerCase() !== 'outdoor'
      ) {
        setShowHousingWarning(true);
      } else {
        setShowHousingWarning(false);
      }
    }
  };

  // Check if numeric fields are filled
  const areInputsFilled = () => {
    return Object.values(inputData).every((value) => value !== '' && value !== 0);
  };

  // Combine numeric + categorical fields for the POST
  const handleUpdate = async () => {
    if (!areInputsFilled()) {
      setShowAlert(true);
      return;
    }

    const requestData = {
      ...inputData,
      "Weather": extraInputs["Weather"],
      "Breed": extraInputs["Breed"],
      "Housing": extraInputs["Housing"],
      "Feed Type": extraInputs["Feed Type"],
      "Nutrients": extraInputs["Nutrients"],
    };
    console.log("📤 Sending Data to Backend:", requestData);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage.error}`);
      }

      const data = await response.json();
      console.log("✅ API response:", data);
      setPredictedEggs(data.predicted_eggs);
      setError(null);

      // Set the suggestion state with the array returned from the API.
      if (data.suggestions) {
        setSuggestion(data.suggestions);
      }
    } catch (error) {
      console.error("❌ Error fetching prediction:", error);
      setError(error.message);
    }
  };

  // Blank Chart Data & Options (empty for now)
  const chartData = {
    labels: [],
    datasets: [
      {
        label: 'Egg Production Trend',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="p-8 mt-10 bg-blue-50 ml-2 shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl flex flex-col w-full">
      <h2 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1">
        Forecasting Page
      </h2>

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-600 font-bold text-lg">
              You need to fill all numeric inputs!
            </p>
            <button
              onClick={() => setShowAlert(false)}
              className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 shadow-md"
            >
              Proceed
            </button>
          </div>
        </div>
      )}

      <div className={`flex w-full ${showAlert ? 'pointer-events-none opacity-50' : ''}`}>
        <div className="flex flex-col w-11/12 p-4 border rounded-lg bg-white shadow-md">
          <h3 className="font-bold text-base mb-2 text-gray-800">Parameters Input</h3>
          <div className="flex flex-col space-y-4">
            {/* Extra Fields */}
            {Object.keys(extraInputs).map((key, index) => (
              <div key={index} className="relative">
                <label className="block text-gray-700 capitalize">{key}:</label>
                {key === "Date" ? (
                  <input
                    type="date"
                    name={key}
                    value={extraInputs[key]}
                    onChange={handleExtraChange}
                    className="border rounded p-2 w-full"
                  />
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={extraInputs[key]}
                    onChange={handleExtraChange}
                    className="border rounded p-2 w-full"
                    placeholder={`Enter ${key}`}
                  />
                )}
                {key === 'Breed' && showBreedWarning && (
                  <div className="absolute top-0 right-0 mt-[-6px] bg-yellow-200 text-yellow-800 text-sm p-1 rounded-lg shadow-md w-72 whitespace-nowrap">
                    Model trained on "Mixed", "Layer A", or "Layer B" only.
                  </div>
                )}
                {key === 'Housing' && showHousingWarning && (
                  <div className="absolute top-0 left-20 mt-[-6px] bg-yellow-200 text-yellow-800 text-sm p-1 rounded-lg shadow-md w-96 whitespace-nowrap">
                    Model trained on "indoor" or "outdoor" only.
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col space-y-4 mt-4">
            {/* Numeric Fields */}
            {Object.keys(inputData).map((key, index) => (
              <div key={index}>
                <label className="block text-gray-700 capitalize">{key}:</label>
                <input
                  type="number"
                  name={key}
                  value={inputData[key]}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                  placeholder={`Enter ${key}`}
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleUpdate}
            className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 shadow-md"
          >
            Enter
          </button>
        </div>

        <div className="flex flex-col w-full space-y-4 ml-4">
          <div className="border rounded-lg p-4 bg-white shadow-md h-2/6">
            <h3 className="font-bold text-base mb-2 text-gray-800">Recommendation</h3>
            {Array.isArray(suggestion) ? (
              <ul className="list-disc pl-5 text-gray-600">
                {suggestion.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">{suggestion}</p>
            )}
          </div>
          <div className="border rounded-lg p-4 bg-white shadow-md h-40">
            <h3 className="font-bold text-base mb-2 text-gray-800">Forecasted Eggs</h3>
            <div className="text-gray-600 text-xl font-bold">
              {predictedEggs !== null
                ? predictedEggs
                : "No Forecast yet, please fill the input."}
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          {/* Blank Line Chart */}
          <div className="border rounded-lg p-4 bg-white shadow-md mt-4">
            <h3 className="font-bold text-base mb-2 text-gray-800">Daily Egg Forecast</h3>
            <div className="h-64">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecasting;
