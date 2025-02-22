import React, { useState, useEffect } from 'react';
import { adminFirestore } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const ForecastRecords = () => {
    const [forecastRecords, setForecastRecords] = useState([]);
    const [deleteRecordId, setDeleteRecordId] = useState(null); // For confirmation pop-up
    const [showDeletePopup, setShowDeletePopup] = useState(false); // Show delete confirmation

    useEffect(() => {
        fetchForecastRecords();
    }, []);

    const fetchForecastRecords = async () => {
        try {
            const querySnapshot = await getDocs(collection(adminFirestore, "forecasts"));
            const records = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setForecastRecords(records);
        } catch (error) {
            console.error("❌ Error fetching forecast records:", error);
        }
    };

    const handleDelete = async (id) => {
        setDeleteRecordId(id);
        setShowDeletePopup(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteDoc(doc(adminFirestore, "forecasts", deleteRecordId));
            setForecastRecords(forecastRecords.filter(record => record.id !== deleteRecordId));
            setShowDeletePopup(false);
        } catch (error) {
            console.error("❌ Error deleting record:", error);
        }
    };

    return (
        <div className="p-8 mt-10 bg-blue-50 ml-2 shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl flex flex-col w-full">
            <h2 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1">
                Forecast Records
            </h2>

           

            {/* Forecast Records Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 shadow-md">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 p-2">Date</th>
                            <th className="border border-gray-300 p-2">Weather</th>
                            <th className="border border-gray-300 p-2">Breed</th>
                            <th className="border border-gray-300 p-2">Housing</th>
                            <th className="border border-gray-300 p-2">Feed Type</th>
                            <th className="border border-gray-300 p-2">Nutrients</th>
                            <th className="border border-gray-300 p-2">Temperature</th>
                            <th className="border border-gray-300 p-2">Number of Ducks</th>
                            <th className="border border-gray-300 p-2">Feed (kg)</th>
                            <th className="border border-gray-300 p-2">Nutrients (ml)</th>
                            <th className="border border-gray-300 p-2">Eggs Forecasted</th>
                            <th className="border border-gray-300 p-2">Action</th> {/* New Action Column */}
                        </tr>
                    </thead>
                    <tbody>
                        {forecastRecords.length > 0 ? (
                            forecastRecords.map((record) => (
                                <tr key={record.id} className="bg-white border-b">
                                    <td className="border border-gray-300 p-2">{record.inputData.Date}</td>
                                    <td className="border border-gray-300 p-2">{record.inputData.Weather}</td>
                                    <td className="border border-gray-300 p-2">{record.inputData.Breed}</td>
                                    <td className="border border-gray-300 p-2">{record.inputData.Housing}</td>
                                    <td className="border border-gray-300 p-2">{record.inputData["Feed Type"]}</td>
                                    <td className="border border-gray-300 p-2">{record.inputData.Nutrients}</td>
                                    <td className="border border-gray-300 p-2">{record.inputData.Temperature}</td>
                                    <td className="border border-gray-300 p-2">{record.inputData["Number of Ducks"]}</td>
                                    <td className="border border-gray-300 p-2">{record.inputData["Kg of feeds / day"]}</td>
                                    <td className="border border-gray-300 p-2">{record.inputData["Nutrients in mL / day"]}</td>
                                    <td className="border border-gray-300 p-2 font-bold">{record.predictedEggs}</td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <button
                                            onClick={() => handleDelete(record.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="12" className="text-center p-4 text-gray-600">
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Pop-up */}
            {showDeletePopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <p className="text-gray-600 font-bold text-lg">
                            Are you sure you want to delete this record? This action cannot be undone.
                        </p>
                        <div className="mt-4 flex justify-center space-x-4">
                            <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                                Yes, Delete
                            </button>
                            <button onClick={() => setShowDeletePopup(false)} className="bg-gray-400 text-white px-4 py-2 rounded">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForecastRecords;
