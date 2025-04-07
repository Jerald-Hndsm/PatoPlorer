import React, { useState, useEffect } from 'react';
import { adminFirestore } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { MdOutlineRecommend } from "react-icons/md";
import { LiaEggSolid } from "react-icons/lia";
import { LuLineChart } from 'react-icons/lu';
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
    "Number of Ducks": '',
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
  const [suggestion, setSuggestion] = useState([]);
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
    handleProceed();
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
      setSuggestion(data.suggestions || []);
      setError(null);

      await addDoc(collection(adminFirestore, "forecasts"), {
        inputData: requestData,
        predictedEggs: data.predicted_eggs,
        timestamp: new Date()
      });

      fetchForecastHistory();
      setInputData({
        "Temperature": '',
        "Number of Ducks": '',
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

  const chartData = {
    labels: forecastHistory.map(entry => entry.date),
    datasets: [
      {
        label: 'Forecasted Eggs',
        data: forecastHistory.map(entry => entry.predictedEggs),
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
    <div className="p-8 bg-blue-50 min-h-screen mt-10">
      <h2 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1 mt-10">Forecasting Page</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
        {/* Input form */}
        <div className="col-span-1 lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Input Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(extraInputs).map((key, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-gray-700 capitalize mb-1">{key}</label>
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
            {Object.keys(inputData).map((key, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-gray-700 capitalize mb-1">{key}</label>
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
            className="mt-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Enter
          </button>
        </div>

        {/* Recommendation & Forecast Result */}
        <div className="col-span-1 flex flex-col space-y-6">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                <MdOutlineRecommend className="mr-2 text-blue-600" /> Recommendation
              </h4>

            </div>
            <div className="flex-1 overflow-auto">
              {suggestion.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {suggestion.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No Recommendation For Production.</p>
              )}
            </div>
            <div className="text-center mt-4">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                <LiaEggSolid className="mr-2 text-yellow-500" /> Eggs Forecast Today
              </h4>
              <p className="text-xl font-bold text-sky-950 mt-3">
                {predictedEggs !== null ? predictedEggs : "No Forecast yet, please fill the input."}
              </p>
              {error && <p className="text-red-500 mt-1">{error}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Chart section below */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h4 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
          <LuLineChart className="mr-2 text-green-600" /> Daily Egg Forecast
        </h4>
        <div className="h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Forecasting;