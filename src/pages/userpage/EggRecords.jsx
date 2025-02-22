import React, { useEffect, useState } from 'react';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import { userFirestore } from '../../firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

function EggCollection() {
  // --- 1) State ---
  const [inventoryList, setInventoryList] = useState([]);

  // Track which entry is being edited
  const [editingId, setEditingId] = useState(null);

  // Fields for the row currently being edited
  const [editFields, setEditFields] = useState({
    date: '',
    eggsCollected: '',
    housing: '',
    hatchingEggs: '',
    breeds: '',
    duckMortality: '',
    forecastedEggs: '',
  });

  // Delete confirmation
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);

  // --- 2) Fetch inventory data ---
  const fetchInventory = async () => {
    try {
      const querySnapshot = await getDocs(collection(userFirestore, 'inventory'));
      const fetchedInventory = querySnapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));
      setInventoryList(fetchedInventory);
    } catch (error) {
      console.error('Error fetching inventory: ', error);
    }
  };

  useEffect(() => {
    fetchInventory(); // fetch the data on mount
  }, []);

  // --- 3) Enter edit mode for a row ---
  const handleEdit = (entry) => {
    setEditingId(entry.id);
    // Copy the fields into editFields
    setEditFields({
      date: entry.date,
      eggsCollected: entry.eggsCollected,
      housing: entry.housing,
      hatchingEggs: entry.hatchingEggs,
      breeds: entry.breeds,
      duckMortality: entry.duckMortality,
      forecastedEggs: entry.forecastedEggs,
    });
  };

  // --- 4) Track changes in row-based edit inputs ---
  const handleEditChange = (e) => {
    setEditFields({
      ...editFields,
      [e.target.name]: e.target.value,
    });
  };

  // --- 5) Save edited row to Firestore ---
  const handleSave = async (id) => {
    try {
      const entryRef = doc(userFirestore, 'inventory', id);
      // Update in Firestore
      await updateDoc(entryRef, {
        date: editFields.date,
        eggsCollected: editFields.eggsCollected,
        housing: editFields.housing,
        hatchingEggs: editFields.hatchingEggs,
        breeds: editFields.breeds,
        duckMortality: editFields.duckMortality,
        forecastedEggs: editFields.forecastedEggs,
      });

      // Update in local state
      setInventoryList(
        inventoryList.map((item) =>
          item.id === id ? { id, ...editFields } : item
        )
      );

      // Exit edit mode
      setEditingId(null);
    } catch (error) {
      console.error('Error saving document: ', error);
    }
  };

  // --- 6) Cancel row-based edit ---
  const handleCancel = () => {
    setEditingId(null);
    setEditFields({
      date: '',
      eggsCollected: '',
      housing: '',
      hatchingEggs: '',
      breeds: '',
      duckMortality: '',
      forecastedEggs: '',
    });
  };

  // --- 7) Handle delete with confirmation modal ---
  const handleDelete = (id) => {
    setEntryToDelete(id);
    setConfirmDelete(true);
  };

  const confirmDeleteEntry = async () => {
    try {
      await deleteDoc(doc(userFirestore, 'inventory', entryToDelete));
      setInventoryList(inventoryList.filter((entry) => entry.id !== entryToDelete));
      setConfirmDelete(false);
      setEntryToDelete(null);
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  // --- 8) Render the table ---
  return (
    <div className="p-8 mt-10 bg-blue-50 shadow-lg rounded-lg">
      <h2 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1">Inventory Entries</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Eggs Collected</th>
            <th className="border border-gray-300 p-2">Housing</th>
            <th className="border border-gray-300 p-2">Hatching Eggs</th>
            <th className="border border-gray-300 p-2">Breeds</th>
            <th className="border border-gray-300 p-2">Duck Mortality</th>
            <th className="border border-gray-300 p-2">Forecasted Eggs</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventoryList.map((entry) => {
            const isEditing = entry.id === editingId;

            return (
              <tr key={entry.id}>
                {/* DATE */}
                <td className="border border-gray-300 p-2">
                  {isEditing ? (
                    <input
                      type="date"
                      name="date"
                      value={editFields.date}
                      onChange={handleEditChange}
                      className="border border-gray-300 p-1 rounded w-full"
                    />
                  ) : (
                    entry.date
                  )}
                </td>
                {/* EGGS COLLECTED */}
                <td className="border border-gray-300 p-2">
                  {isEditing ? (
                    <input
                      type="number"
                      name="eggsCollected"
                      value={editFields.eggsCollected}
                      onChange={handleEditChange}
                      className="border border-gray-300 p-1 rounded w-full"
                    />
                  ) : (
                    entry.eggsCollected
                  )}
                </td>
                {/* HOUSING */}
                <td className="border border-gray-300 p-2">
                  {isEditing ? (
                    <input
                      type="text"
                      name="housing"
                      value={editFields.housing}
                      onChange={handleEditChange}
                      className="border border-gray-300 p-1 rounded w-full"
                    />
                  ) : (
                    entry.housing
                  )}
                </td>
                {/* HATCHING EGGS */}
                <td className="border border-gray-300 p-2">
                  {isEditing ? (
                    <input
                      type="number"
                      name="hatchingEggs"
                      value={editFields.hatchingEggs}
                      onChange={handleEditChange}
                      className="border border-gray-300 p-1 rounded w-full"
                    />
                  ) : (
                    entry.hatchingEggs
                  )}
                </td>
                {/* BREEDS */}
                <td className="border border-gray-300 p-2">
                  {isEditing ? (
                    <input
                      type="text"
                      name="breeds"
                      value={editFields.breeds}
                      onChange={handleEditChange}
                      className="border border-gray-300 p-1 rounded w-full"
                    />
                  ) : (
                    entry.breeds
                  )}
                </td>
                {/* DUCK MORTALITY */}
                <td className="border border-gray-300 p-2">
                  {isEditing ? (
                    <input
                      type="number"
                      name="duckMortality"
                      value={editFields.duckMortality}
                      onChange={handleEditChange}
                      className="border border-gray-300 p-1 rounded w-full"
                    />
                  ) : (
                    entry.duckMortality
                  )}
                </td>
                {/* FORECASTED EGGS */}
                <td className="border border-gray-300 p-2">
                  {isEditing ? (
                    <input
                      type="number"
                      name="forecastedEggs"
                      value={editFields.forecastedEggs}
                      onChange={handleEditChange}
                      className="border border-gray-300 p-1 rounded w-full"
                    />
                  ) : (
                    entry.forecastedEggs
                  )}
                </td>
                {/* ACTIONS */}
                <td className="border border-gray-300 p-2 flex space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => handleSave(entry.id)}
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-300 text-black p-2 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(entry)}
                        className="text-blue-500"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg mb-4">Are you sure you want to delete this entry?</h2>
            <div className="flex justify-between">
              <button
                onClick={confirmDeleteEntry}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="bg-gray-300 text-black p-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EggCollection;
