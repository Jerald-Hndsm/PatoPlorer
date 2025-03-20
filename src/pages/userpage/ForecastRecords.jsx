import React, { useState, useEffect } from 'react';
import { adminFirestore } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import * as XLSX from 'xlsx'; // For Excel export

const ForecastRecords = () => {
    const [forecastRecords, setForecastRecords] = useState([]);
    const [deleteRecordId, setDeleteRecordId] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    useEffect(() => {
        fetchForecastRecords();
    }, []);

    // Fetch records from Firestore
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

    // Trigger the delete popup
    const handleDelete = async (id) => {
        setDeleteRecordId(id);
        setShowDeletePopup(true);
    };

    // Confirm record deletion
    const confirmDelete = async () => {
        try {
            await deleteDoc(doc(adminFirestore, "forecasts", deleteRecordId));
            setForecastRecords(forecastRecords.filter(record => record.id !== deleteRecordId));
            setShowDeletePopup(false);
        } catch (error) {
            console.error("❌ Error deleting record:", error);
        }
    };

    // ----------------------------------------
    // 1) DOWNLOAD AS CSV
    // ----------------------------------------
    const handleDownloadCSV = () => {
        if (forecastRecords.length === 0) {
            alert('No data to download!');
            return;
        }

        // CSV header matches the table columns
        const headers = [
            'Date',
            'Weather',
            'Breed',
            'Housing',
            'Feed Type',
            'Nutrients',
            'Temperature',
            'Number of Ducks',
            'Kg of feeds / day',
            'Nutrients in mL / day',
            'Eggs Forecasted'
        ];

        // Convert headers to a comma-separated string
        let csvContent = headers.join(',') + '\n';

        // Build CSV rows
        forecastRecords.forEach((record) => {
            const row = [
                record.inputData.Date,
                record.inputData.Weather,
                record.inputData.Breed,
                record.inputData.Housing,
                record.inputData['Feed Type'],
                record.inputData.Nutrients,
                record.inputData.Temperature,
                record.inputData['Number of Ducks'],
                record.inputData['Kg of feeds / day'],
                record.inputData['Nutrients in mL / day'],
                record.predictedEggs
            ];
            csvContent += row.join(',') + '\n';
        });

        // Create a Blob from the CSV
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        // Create a link and click it to download
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'forecast_records.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // ----------------------------------------
    // 2) DOWNLOAD AS EXCEL (.xlsx)
    // ----------------------------------------
    const handleDownloadExcel = () => {
        if (forecastRecords.length === 0) {
            alert('No data to download!');
            return;
        }

        // Create a 2D array: first row is headers, then data rows
        const worksheetData = [
            [
                'Date',
                'Weather',
                'Breed',
                'Housing',
                'Feed Type',
                'Nutrients',
                'Temperature',
                'Number of Ducks',
                'Kg of feeds / day',
                'Nutrients in mL / day',
                'Eggs Forecasted'
            ]
        ];

        // Push each forecast record as an array of values
        forecastRecords.forEach(record => {
            worksheetData.push([
                record.inputData.Date,
                record.inputData.Weather,
                record.inputData.Breed,
                record.inputData.Housing,
                record.inputData['Feed Type'],
                record.inputData.Nutrients,
                record.inputData.Temperature,
                record.inputData['Number of Ducks'],
                record.inputData['Kg of feeds / day'],
                record.inputData['Nutrients in mL / day'],
                record.predictedEggs
            ]);
        });

        // Convert the array of arrays to a worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        // Create a new workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'ForecastRecords');

        // Write the workbook to a buffer as XLSX
        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
        });

        // Convert buffer to a Blob and generate a link for download
        const blob = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'forecast_records.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-8 mt-10 bg-blue-50 shadow-lg rounded-lg">
            <h2 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1">
                Forecast Records
            </h2>

            {/* Forecast Records Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-collapse border-gray-300">
                    <thead>
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
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forecastRecords.length > 0 ? (
                            forecastRecords.map((record) => (
                                <tr key={record.id} className="bg-white border-b">
                                    <td className="border border-gray-300 p-1 rounded min-w-28">{record.inputData.Date}</td>
                                    <td className="border border-gray-300 p-1 rounded min-w-28">{record.inputData.Weather}</td>
                                    <td className="border border-gray-300 p-1 rounded min-w-28">{record.inputData.Breed}</td>
                                    <td className="border border-gray-300 p-1 rounded min-w-28">{record.inputData.Housing}</td>
                                    <td className="border border-gray-300 p-1 rounded w-full">{record.inputData["Feed Type"]}</td>
                                    <td className="border border-gray-300 p-1 rounded w-full">{record.inputData.Nutrients}</td>
                                    <td className="border border-gray-300 p-1 rounded w-full">{record.inputData.Temperature}</td>
                                    <td className="border border-gray-300 p-1 rounded w-full">{record.inputData["Number of Ducks"]}</td>
                                    <td className="border border-gray-300 p-1 rounded w-full">{record.inputData["Kg of feeds / day"]}</td>
                                    <td className="border border-gray-300 p-1 rounded w-full">{record.inputData["Nutrients in mL / day"]}</td>
                                    <td className="border border-gray-300 p-1 rounded w-full">{record.predictedEggs}</td>
                                    <td className="border border-gray-300 p-1 rounded w-full">
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

            {/* Download Buttons BELOW the table */}
            <div className="mt-4">
                <button
                    onClick={handleDownloadCSV}
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition duration-200"
                >
                    Download CSV
                </button>
                <button
                    onClick={handleDownloadExcel}
                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-200"
                >
                    Download Excel
                </button>
            </div>

            {/* Delete Confirmation Pop-up */}
            {showDeletePopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <p className="text-gray-600 font-bold text-lg">
                            Are you sure you want to delete this record? This action cannot be undone.
                        </p>
                        <div className="mt-4 flex justify-center space-x-4">
                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setShowDeletePopup(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                            >
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
