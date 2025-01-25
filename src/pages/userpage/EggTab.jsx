import React, { useState, useEffect } from 'react';
import { FaEgg, FaTrash } from "react-icons/fa6"; // Import icons
import { FaRegEdit } from "react-icons/fa";
import { userFirestore } from '../../firebase'; // Import the Firestore database
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

function EggTab() {
  const [inventory, setInventory] = useState({
    date: '',
    eggsCollected: '',
    housing: '',
    hatchingEggs: '',
    breeds: '',
    duckMortality: '',
    forecastedEggs: '',
  });

  const [inventoryList, setInventoryList] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track which entry is being edited

  const handleChange = (e) => {
    setInventory({
      ...inventory,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", inventory); // Debugging log

    // Check if the entry with the same date already exists
    const existingEntry = inventoryList.find(entry => entry.date === inventory.date && entry.id !== editingId);
    
    if (existingEntry) {
      alert("An entry for this date already exists. Please update the existing entry.");
      return; // Prevent adding a duplicate entry
    }

    try {
      if (editingId) {
        // Update existing entry
        const entryRef = doc(userFirestore, "inventory", editingId);
        await updateDoc(entryRef, inventory);
        setInventoryList(inventoryList.map(entry => (entry.id === editingId ? { ...entry, ...inventory } : entry)));
        setEditingId(null); // Reset editingId after saving
        console.log("Document updated with ID: ", editingId);
      } else {
        // Add the new entry to Firestore
        const docRef = await addDoc(collection(userFirestore, "inventory"), inventory);
        setInventoryList([...inventoryList, { id: docRef.id, ...inventory }]);
        console.log("Document written with ID: ", docRef.id);
      }

      // Reset the form
      setInventory({
        date: '',
        eggsCollected: '',
        housing: '',
        hatchingEggs: '',
        breeds: '',
        duckMortality: '',
        forecastedEggs: '',
      });
    } catch (error) {
      console.error("Error adding/updating document: ", error);
    }
  };

  // Fetch inventory data from Firestore
  const fetchInventory = async () => {
    try {
      const querySnapshot = await getDocs(collection(userFirestore, "inventory"));
      const fetchedInventory = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInventoryList(fetchedInventory);
    } catch (error) {
      console.error("Error fetching inventory: ", error);
    }
  };

  useEffect(() => {
    fetchInventory(); // Fetch inventory data when the component mounts
  }, []);

  const handleEdit = (entry) => {
    setInventory(entry);
    setEditingId(entry.id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this row?");
    if (confirmDelete) {
      try {
        await deleteDoc(doc(userFirestore, "inventory", id));
        setInventoryList(inventoryList.filter(entry => entry.id !== id));
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  return (
    <div className="p-8 mt-10 bg-blue-50 ml-2 shadow-lg rounded-lg transform transition-all duration-300 hover:shadow-xl flex flex-col w-full">
      <h1 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1">
        Egg Inventory Management <FaEgg className="ml-2" />
      </h1>

      {/* Input Functionalities Tile */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <label className="block mb-1">Date:</label>
              <input
                type="date"
                name="date"
                value={inventory.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-2">
              <label className="block mb-1">Eggs Collected:</label>
              <input
                type="number"
                name="eggsCollected"
                value={inventory.eggsCollected}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <label className="block mb-1">Housing:</label>
              <input
                type="text"
                name="housing"
                value={inventory.housing}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-2">
              <label className="block mb-1">Hatching Eggs:</label>
              <input
                type="number"
                name="hatchingEggs"
                value={inventory.hatchingEggs}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
              <label className="block mb-1">Breeds:</label>
              <input
                type="text"
                name="breeds"
                value={inventory.breeds}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="w-full md:w-1/2 px-2">
              <label className="block mb-1">Duck Mortality:</label>
              <input
                type="number"
                name="duckMortality"
                value={inventory.duckMortality}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full px-2">
              <label className="block mb-1">Forecasted Eggs:</label>
              <input
                type="number"
                name="forecastedEggs"
                value={inventory.forecastedEggs}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <div className="px-2">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              {editingId ? 'Save' : 'Add'}
            </button>
          </div>
        </form>
      </div>

      {/* Inventory Entries Tile */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Inventory Entries</h2>
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
            {inventoryList.map((entry) => (
              <tr key={entry.id}>
                <td className="border border-gray-300 p-2">{entry.date}</td>
                <td className="border border-gray-300 p-2">{entry.eggsCollected}</td>
                <td className="border border-gray-300 p-2">{entry.housing}</td>
                <td className="border border-gray-300 p-2">{entry.hatchingEggs}</td>
                <td className="border border-gray-300 p-2">{entry.breeds}</td>
                <td className="border border-gray-300 p-2">{entry.duckMortality}</td>
                <td className="border border-gray-300 p-2">{entry.forecastedEggs}</td>
                <td className="border border-gray-300 p-2 flex space-x-2">
                  <button onClick={() => handleEdit(entry)} className="text-blue-500">
                    <FaRegEdit />
                  </button>
                  <button onClick={() => handleDelete(entry.id)} className="text-red-500">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EggTab;