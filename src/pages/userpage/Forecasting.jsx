    import React, { useState } from 'react';
    import Papa from 'papaparse';
    import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

    const Forecasting = () => {
        const [data, setData] = useState(() => {
            const savedData = localStorage.getItem('forecastingData');
            return savedData ? JSON.parse(savedData) : [];
        });

        const [error, setError] = useState('');

        // State for input parameters
        const [newEntry, setNewEntry] = useState({
            Date: '',
            Temperature: '',
            Weather: '',
            Breed: '',
            Housing: '',
            'Number of Ducks': '',
            Feeds: '',
            Nutrients: '',
            
        });

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
            localStorage.removeItem('forecastingData');
        };

        const handleInputChange = (e) => {
            setNewEntry({
                ...newEntry,
                [e.target.name]: e.target.value
            });
        };

        const handleAddEntry = () => {
            if (Object.values(newEntry).some((val) => val === '')) {
                setError('All fields must be filled');
                return;
            }

            setData([...data, newEntry]);
            setNewEntry({
                Date: '',
                Temperature: '',
                Weather: '',
                Breed: '',
                Housing: '',
                'Number of Ducks': '',
                Feeds: '',
                Nutrients: '',
                
            });
            setError('');
            localStorage.setItem('forecastingData', JSON.stringify([...data, newEntry]));
        };

        // Prepare data for the Line chart
        const chartData = data.map(entry => ({
            date: entry.date,
            eggs: parseInt(entry['number-eggs']) || 0, // Use number of eggs for Y-axis
        }));

        return (
            <div className="p-8 mt-8 bg-blue-50">
                <h2 className="text-2xl mb-4 font-sans font-bold">Data Upload</h2>

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

                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* Line Graph */}
                {data.length > 0 && (
                    <div className="border rounded-lg shadow-lg p-4 bg-white mb-4"> {/* Tile-like appearance */}
                        <h3 className="font-bold text-xl mb-2">Eggs Over Time</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="eggs" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {/* Data Table */}
                {data.length > 0 && (
                    <div className="flex">
                        <div className="w-full mb-4">
                            <h3 className="text-xl mb-1 font-sans font-semibold">Historical Data:</h3>
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
                        </div>
                    </div>
                )}

                {/* Form for Adding a New Entry */}
                {data.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-xl mb-2 font-sans font-semibold">Add New Entry:</h3>
                        <div className="grid grid-cols-2 gap-4 mb-2">
                            <input
                                type="date"
                                name="Date"
                                value={newEntry.Date}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded-lg"
                                placeholder="Date"
                            />
                            <input
                                    type="text"
                                    name="Temperature"
                                    value={newEntry.Temperature}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-2 rounded-lg"
                                    placeholder="Temperature"
                            />
                            <input
                                    type="text"
                                    name="Weather"
                                    value={newEntry.Weather}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-2 rounded-lg"
                                    placeholder="Weather"
                            />
                            <input
                                type="text"
                                name="Breed"
                                value={newEntry.Breed}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded-lg"
                                placeholder="Breed"
                            />
                            <input
                                type="text"
                                name="Housing"
                                value={newEntry.Housing}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded-lg"
                                placeholder="Housing"
                            />
                            <input
                                type="number"
                                name="Number of Ducks"
                                value={newEntry['Number of Ducks']}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded-lg"
                                placeholder="Number of Ducks"
                            />
                            <input
                                type="text"
                                name="Feeds"
                                value={newEntry.Feeds}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded-lg"
                                placeholder="Feeds"
                            />
                            <input
                                type="text"
                                name="Nutrients"
                                value={newEntry.Nutrients}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded-lg"
                                placeholder="Nutrients"
                            
                            />
                        </div>

                        <button
                            onClick={handleAddEntry}
                            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                        >
                            Add Entry
                        </button>
                    </div>
                )}

                {/* Remove Data Button */}
                {data.length > 0 && (
                    <div className="mt-2">
                        <button
                            onClick={handleRemoveData}
                            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                        >
                            Remove Data
                        </button>
                    </div>
                )}
            </div>
        );
    };

    export default Forecasting;
