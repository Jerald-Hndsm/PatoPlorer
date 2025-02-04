  import React, { useState, useEffect } from 'react';
  import { adminFirestore } from '../../firebase';
  import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
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
    const [inputData, setInputData] = useState({
      "Temperature": '',
      "No. of Ducks": '',
      "Kg of feeds / day": '',
      "Nutrients in mL / day": '',
    });

    const [extraInputs, setExtraInputs] = useState({
      "Date": '',
      "Weather": '',
      "Breed": '',
      "Housing": '',
      "Feed Type": '',
      "Nutrients": '',
    });

    const [predictedEggs, setPredictedEggs] = useState(null);
    const [suggestion, setSuggestion] = useState("No Recommendation For Production.");
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [forecastHistory, setForecastHistory] = useState([]);

    useEffect(() => {
      fetchForecastHistory();
    }, []);

    const fetchForecastHistory = async () => {
      try {
        const querySnapshot = await getDocs(collection(adminFirestore, "forecasts"));
        const forecastData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          date: doc.data().inputData.Date,
          predictedEggs: doc.data().predictedEggs,
        }));
        setForecastHistory(forecastData);
      } catch (error) {
        console.error("Error fetching forecasts: ", error);
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setInputData(prevData => ({
        ...prevData,
        [name]: Number(value) || 0,
      }));
    };

    const handleExtraChange = (e) => {
      const { name, value } = e.target;
      setExtraInputs(prevData => ({
        ...prevData,
        [name]: value,
      }));
    };

    const areInputsFilled = () => {
      return Object.values(inputData).every(value => value !== '' && value !== 0);
    };

    const handleUpdate = () => {
      if (!areInputsFilled()) {
        setShowAlert(true);
        return;
      }
      setShowConfirmation(true);
    };

    const handleProceed = async () => {
      const requestData = { ...inputData, ...extraInputs };

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
        setPredictedEggs(data.predicted_eggs);
        setSuggestion(data.suggestions || "No specific recommendation.");
        setError(null);

        await addDoc(collection(adminFirestore, "forecasts"), {
          inputData: requestData,
          predictedEggs: data.predicted_eggs,
          timestamp: new Date()
        });

        fetchForecastHistory();
        setInputData({
          "Temperature": '',
          "No. of Ducks": '',
          "Kg of feeds / day": '',
          "Nutrients in mL / day": '',
        });
        setExtraInputs({
          "Date": '',
          "Weather": '',
          "Breed": '',
          "Housing": '',
          "Feed Type": '',
          "Nutrients": '',
        });
      } catch (error) {
        console.error("❌ Error fetching prediction:", error);
        setError(error.message);
      } finally {
        setShowConfirmation(false);
      }
    };

    const handleDelete = async (id) => {
      try {
        await deleteDoc(doc(adminFirestore, "forecasts", id));
        fetchForecastHistory();
      } catch (error) {
        console.error("Error deleting forecast: ", error);
      }
    };

    // Chart Data
    const chartData = {
      labels: forecastHistory.map(entry => entry.date), // Dates as X-axis
      datasets: [
        {
          label: 'Forecasted Eggs',
          data: forecastHistory.map(entry => entry.predictedEggs), // Forecasted Eggs as Y-axis
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 1600,
        },
      },
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
              <button onClick={() => setShowAlert(false)} className="mt-4 bg-blue-500 text-white p-2 rounded">
                Proceed
              </button>
            </div>
          </div>
        )}

        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-gray-600 font-bold text-lg">
                Are you sure about your input? If yes, press Proceed. If not, kindly double check.
              </p>
              <button onClick={handleProceed} className="mt-4 bg-blue-500 text-white p-2 rounded">
                Proceed
              </button>
              <button onClick={() => setShowConfirmation(false)} className="mt-4 bg-red-500 text-white p-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className={`flex w-full ${showAlert || showConfirmation ? 'pointer-events-none opacity-50' : ''}`}>
          <div className="flex flex-col w-11/12 p-4 border rounded-lg bg-white shadow-md">
            <h3 className="font-bold text-base mb-2 text-gray-800">Parameters Input</h3>
            <div className="flex flex-col space-y-4">
              {Object.keys(extraInputs).map((key, index) => (
                <div key={index} className="relative">
                  <label className="block text-gray-700 capitalize">{key}:</label>
                  <input
                    type={key === "Date" ? "date" : "text"}
                    name={key}
                    value={extraInputs[key]}
                    onChange={handleExtraChange}
                    className="border rounded p-2 w-full"
                    placeholder={`Enter ${key}`}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col space-y-4 mt-4">
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
            <button onClick={handleUpdate} className="mt-4 bg-blue-500 text-white p-2 rounded">
              Enter
            </button>
          </div>

          <div className="flex flex-col w-full space-y-4 ml-4">
            <div className="border rounded-lg p-4 bg-white shadow-md h-2/6">
              <h3 className="font-bold text-base mb-2 text-gray-800">Recommendation</h3>
              <p className="text-gray-600">{suggestion}</p>
            </div>
            <div className="border rounded-lg p-4 bg-white shadow-md h-40">
              <h3 className="font-bold text-base mb-2 text-gray-800">Forecasted Eggs</h3>
              <div className="text-gray-600 text-xl font-bold">
                {predictedEggs !== null ? predictedEggs : "No Forecast yet, please fill the input."}
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            {/* Line Chart Below Forecasted Eggs (Inside Div) */}
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