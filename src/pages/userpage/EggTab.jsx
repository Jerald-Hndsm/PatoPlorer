import React, { useState, useEffect } from 'react';
import { FaEgg } from 'react-icons/fa6'; // Import any icons you like
import { userFirestore } from '../../firebase'; 
import { collection, addDoc, getDocs } from 'firebase/firestore';

function EggTab() {
  // Form fields for adding a new entry
  const [inventory, setInventory] = useState({
    date: '',
    eggsCollected: '',
    housing: '',
    hatchingEggs: '',
    breeds: '',
    duckMortality: '',
    forecastedEggs: '',
  });

  // Only used here to check for existing dates. No table displayed in this component.
  const [inventoryList, setInventoryList] = useState([]);

  // 1) Handle form input changes
  const handleChange = (e) => {
    setInventory({
      ...inventory,
      [e.target.name]: e.target.value,
    });
  };

  // 2) Handle form submission (ADD a new entry)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', inventory); // Debugging log

    // Check if there's an existing entry with the same date
    const existingEntry = inventoryList.find(
      (entry) => entry.date === inventory.date
    );
    if (existingEntry) {
      alert('An entry for this date already exists. Please update it in EggCollection.');
      return;
    }

    try {
      // Add the new entry to Firestore
      const docRef = await addDoc(collection(userFirestore, 'inventory'), inventory);
      console.log('Document written with ID: ', docRef.id);

      // Optionally update local state if you want to keep track here
      setInventoryList([...inventoryList, { id: docRef.id, ...inventory }]);

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
      console.error('Error adding document: ', error);
    }
  };

  // 3) Fetch inventory data so we can check for duplicates
  const fetchInventory = async () => {
    try {
      const querySnapshot = await getDocs(collection(userFirestore, 'inventory'));
      const fetchedInventory = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInventoryList(fetchedInventory);
    } catch (error) {
      console.error('Error fetching inventory: ', error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="p-8 mt-10 bg-blue-50 shadow-lg rounded-lg">
      <h1 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1">
        Egg Inventory Management <FaEgg className="ml-2" />
      </h1>

      {/* Input Functionalities Tile - No table here, only the form for adding */}
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EggTab;
