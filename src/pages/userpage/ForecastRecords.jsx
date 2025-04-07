import React, { useState, useEffect } from 'react';
import { adminFirestore } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import * as XLSX from 'xlsx';
import { Trash2 } from 'lucide-react';

const ForecastRecords = () => {
  const [forecastRecords, setForecastRecords] = useState([]);
  const [deleteRecordId, setDeleteRecordId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    fetchForecastRecords();
  }, []);

  const fetchForecastRecords = async () => {
    try {
      const snapshot = await getDocs(collection(adminFirestore, 'forecasts'));
      setForecastRecords(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error('Error fetching records:', err);
    }
  };

  const handleDelete = id => {
    setDeleteRecordId(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(adminFirestore, 'forecasts', deleteRecordId));
      setForecastRecords(prev => prev.filter(r => r.id !== deleteRecordId));
      setShowDeletePopup(false);
    } catch (err) {
      console.error('Error deleting record:', err);
    }
  };

  const handleDownloadCSV = () => {
    if (!forecastRecords.length) return alert('No data to download!');
    const headers = ['Date','Weather','Breed','Housing','Feed Type','Nutrients','Temperature','Number of Ducks','Feed (kg)','Nutrients (ml)','Eggs Forecasted'];
    let csv = headers.join(',') + '\n';
    forecastRecords.forEach(r => {
      csv += [
        r.inputData.Date, r.inputData.Weather, r.inputData.Breed, r.inputData.Housing,
        r.inputData['Feed Type'], r.inputData.Nutrients, r.inputData.Temperature,
        r.inputData['Number of Ducks'], r.inputData['Kg of feeds / day'],
        r.inputData['Nutrients in mL / day'], r.predictedEggs
      ].join(',') + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'forecast_records.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadExcel = () => {
    if (!forecastRecords.length) return alert('No data to download!');
    const data = [[
      'Date','Weather','Breed','Housing','Feed Type','Nutrients','Temperature','Number of Ducks','Feed (kg)','Nutrients (ml)','Eggs Forecasted'
    ]];
    forecastRecords.forEach(r => data.push([
      r.inputData.Date, r.inputData.Weather, r.inputData.Breed, r.inputData.Housing,
      r.inputData['Feed Type'], r.inputData.Nutrients, r.inputData.Temperature,
      r.inputData['Number of Ducks'], r.inputData['Kg of feeds / day'],
      r.inputData['Nutrients in mL / day'], r.predictedEggs
    ]));
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Forecasts');
    const buf = XLSX.write(wb, { bookType:'xlsx', type:'array' });
    const blob = new Blob([buf], { type:'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'forecast_records.xlsx'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 bg-blue-50 min-h-screen mt-10">
      <h2 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1 mt-10">Forecast Records</h2>
      <div className="overflow-auto max-h-[60vh] border rounded-lg mt-5">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-sky-800 sticky top-0">
            <tr>
              {['Date','Weather','Breed','Housing','Feed Type','Nutrients','Temperature','Number of Ducks','Feed (kg)','Nutrients (ml)','Eggs Forecasted','Action'].map(h => (
                <th key={h} className="px-4 py-2 text-left text-sm font-medium text-white">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {forecastRecords.length ? forecastRecords.map(r => (
              <tr key={r.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 text-sm text-gray-900 w-28">{r.inputData.Date}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{r.inputData.Weather}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{r.inputData.Breed}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{r.inputData.Housing}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{r.inputData['Feed Type']}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{r.inputData.Nutrients}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{r.inputData.Temperature}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{r.inputData['Number of Ducks']}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{r.inputData['Kg of feeds / day']}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{r.inputData['Nutrients in mL / day']}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{r.predictedEggs}</td>
                <td className="px-4 py-2 flex justify-center">
                  <Trash2 onClick={() => handleDelete(r.id)} size={18} className="text-red-500 hover:text-red-700 cursor-pointer transition" />
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={12} className="px-4 py-6 text-center text-gray-500">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex space-x-3">
        <button onClick={handleDownloadCSV} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
          Download CSV
        </button>
        <button onClick={handleDownloadExcel} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Download Excel
        </button>
      </div>

      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4 text-lg font-semibold text-gray-700">
              Are you sure you want to delete this record? This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                Yes, Delete
              </button>
              <button onClick={() => setShowDeletePopup(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition">
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
