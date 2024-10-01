import React, { useState } from 'react';

const ProductInventory = () => {
  // Initial state for the inventory items
  const [inventory, setInventory] = useState([
    {
      itemNo: '001',
      type: 'Feed',
      description: 'Chicken feed - 50kg',
      cost: 25,
      stockQuantity: 100,
      productStatus: 'Available',
    },
    {
      itemNo: '002',
      type: 'Vitamin',
      description: 'Vitamin A supplement',
      cost: 10,
      stockQuantity: 50,
      productStatus: 'Low Stock',
    },
  ]);

  // State for new inventory item form
  const [newItem, setNewItem] = useState({
    itemNo: '',
    type: '',
    description: '',
    cost: '',
    stockQuantity: '',
    productStatus: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  // Add new inventory item
  const addInventory = () => {
    setInventory([...inventory, newItem]);
    setNewItem({
      itemNo: '',
      type: '',
      description: '',
      cost: '',
      stockQuantity: '',
      productStatus: '',
    });
  };

  // Remove an inventory item
  const removeInventory = (itemNo) => {
    setInventory(inventory.filter((item) => item.itemNo !== itemNo));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Product Inventory</h2>

      {/* Inventory Table */}
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Item No.</th>
            <th className="border border-gray-400 p-2">Type</th>
            <th className="border border-gray-400 p-2">Description</th>
            <th className="border border-gray-400 p-2">Cost Per Item</th>
            <th className="border border-gray-400 p-2">Stock Quantity</th>
            <th className="border border-gray-400 p-2">Product Status</th>
            <th className="border border-gray-400 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.itemNo}>
              <td className="border border-gray-400 p-2">{item.itemNo}</td>
              <td className="border border-gray-400 p-2">{item.type}</td>
              <td className="border border-gray-400 p-2">{item.description}</td>
              <td className="border border-gray-400 p-2">${item.cost}</td>
              <td className="border border-gray-400 p-2">{item.stockQuantity}</td>
              <td className="border border-gray-400 p-2">{item.productStatus}</td>
              <td className="border border-gray-400 p-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => removeInventory(item.itemNo)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Inventory Form */}
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Add New Inventory</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="itemNo"
            placeholder="Item No."
            value={newItem.itemNo}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="text"
            name="type"
            placeholder="Type"
            value={newItem.type}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newItem.description}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="number"
            name="cost"
            placeholder="Cost Per Item"
            value={newItem.cost}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            value={newItem.stockQuantity}
            onChange={handleChange}
            className="border p-2"
          />
          <input
            type="text"
            name="productStatus"
            placeholder="Product Status"
            value={newItem.productStatus}
            onChange={handleChange}
            className="border p-2"
          />
        </div>
        <button
          onClick={addInventory}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Add Inventory
        </button>
      </div>
    </div>
  );
};

export default ProductInventory;
