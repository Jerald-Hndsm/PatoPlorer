// components/InventoryPage.js
import React, { useState } from 'react';

function InventoryPage() {
  const [inventoryData, setInventoryData] = useState({
    itemName: '',
    quantity: '',
    supplier: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventoryData({ ...inventoryData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Inventory Data Submitted:', inventoryData);
    // Add functionality to save this data as needed
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Input Inventory Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Item Name</label>
          <input
            type="text"
            name="itemName"
            value={inventoryData.itemName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={inventoryData.quantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Supplier</label>
          <input
            type="text"
            name="supplier"
            value={inventoryData.supplier}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Submit Inventory Data
        </button>
      </form>
    </div>
  );
}

export default InventoryPage;
