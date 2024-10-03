import React, { useState } from 'react';

const Consumption = () => {
  const [flockData, setFlockData] = useState({
    totalBirds: 0,
    ageDistribution: [],
    mortalityRate: 0,
    healthChecks: [],
    vaccinationSchedule: [],
    breedingHistory: [],
    feedSchedule: [],
  });

  // Handler for updating flock data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFlockData({ ...flockData, [name]: value });
  };

  const handleAddHealthCheck = (check) => {
    setFlockData((prevData) => ({
      ...prevData,
      healthChecks: [...prevData.healthChecks, check],
    }));
  };

  const handleAddVaccination = (vaccination) => {
    setFlockData((prevData) => ({
      ...prevData,
      vaccinationSchedule: [...prevData.vaccinationSchedule, vaccination],
    }));
  };

  const handleAddBreedingRecord = (record) => {
    setFlockData((prevData) => ({
      ...prevData,
      breedingHistory: [...prevData.breedingHistory, record],
    }));
  };

  const handleAddFeedRecord = (feed) => {
    setFlockData((prevData) => ({
      ...prevData,
      feedSchedule: [...prevData.feedSchedule, feed],
    }));
  };

  return (
    <div className="p-8 mt-8">
      <h2 className="text-2xl mb-4">Flock Management</h2>

      <div className="mb-6">
        <h3 className="text-lg font-medium">Flock Overview</h3>
        <div className="flex mb-4">
          <div className="mr-4">
            <label>Total Number of Birds:</label>
            <input
              type="number"
              name="totalBirds"
              value={flockData.totalBirds}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label>Mortality Rate (%):</label>
            <input
              type="number"
              name="mortalityRate"
              value={flockData.mortalityRate}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
        </div>
        <div className="mb-4">
          <label>Age Distribution:</label>
          <textarea
            name="ageDistribution"
            value={flockData.ageDistribution.join(', ')}
            onChange={(e) => handleInputChange({ target: { name: 'ageDistribution', value: e.target.value.split(',') } })}
            className="border border-gray-300 p-2 rounded"
            placeholder="Enter ages separated by commas"
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium">Health and Vaccination Records</h3>
        {/* Health Checks Input */}
        <button onClick={() => handleAddHealthCheck("Health check record")} className="bg-blue-500 text-white p-2 rounded mr-2">
          Add Health Check
        </button>
        <ul>
          {flockData.healthChecks.map((check, index) => (
            <li key={index}>{check}</li>
          ))}
        </ul>
        
        {/* Vaccination Schedule Input */}
        <button onClick={() => handleAddVaccination("Vaccination record")} className="bg-blue-500 text-white p-2 rounded mr-2">
          Add Vaccination
        </button>
        <ul>
          {flockData.vaccinationSchedule.map((vaccination, index) => (
            <li key={index}>{vaccination}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium">Breeding Records</h3>
        <button onClick={() => handleAddBreedingRecord("Breeding record")} className="bg-blue-500 text-white p-2 rounded mr-2">
          Add Breeding Record
        </button>
        <ul>
          {flockData.breedingHistory.map((record, index) => (
            <li key={index}>{record}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium">Feed Schedule</h3>
        <button onClick={() => handleAddFeedRecord("Feed record")} className="bg-blue-500 text-white p-2 rounded mr-2">
          Add Feed Record
        </button>
        <ul>
          {flockData.feedSchedule.map((feed, index) => (
            <li key={index}>{feed}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Consumption;
