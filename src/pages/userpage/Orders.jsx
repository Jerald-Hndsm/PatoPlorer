import React, { useState } from 'react';
import { FaClipboardList } from 'react-icons/fa';
import { collection, addDoc } from 'firebase/firestore';
import { userFirestore } from '../../firebase';

const Orders = () => {
  const [newOrder, setNewOrder] = useState({
    orderId: '',
    name: '',
    address: '',
    contact: '',
    productDescription: '',
    quantity: '',
    payment: '',
    date: '',
    status: 'Processing',
  });

  // Handle input changes for adding a new order
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add a new order to Firestore
  const handleAddOrder = async () => {
    // Simple validation: Check if any required fields are empty
    const hasEmptyField = Object.values(newOrder).some((val) => val === '');
    if (hasEmptyField) {
      alert('All fields must be filled!');
      return;
    }

    try {
      await addDoc(collection(userFirestore, 'orders'), newOrder);
      alert('Order added successfully!');
      resetForm();
    } catch (error) {
      console.error('Error adding order:', error);
      alert('Failed to add order. Please try again.');
    }
  };

  // Reset the form to defaults
  const resetForm = () => {
    setNewOrder({
      orderId: '',
      name: '',
      address: '',
      contact: '',
      productDescription: '',
      quantity: '',
      payment: '',
      date: '',
      status: 'Processing',
    });
  };

  return (
    <div className="p-8 mt-10 bg-blue-50 shadow-lg rounded-lg">
      <h1 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1">
        Orders <FaClipboardList className="ml-2" />
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-lg mb-2">Add New Order:</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="orderId"
            value={newOrder.orderId}
            onChange={handleInputChange}
            placeholder="Order ID"
            className="border border-gray-300 p-2 rounded-lg"
          />
          <input
            type="text"
            name="name"
            value={newOrder.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="border border-gray-300 p-2 rounded-lg"
          />
          <input
            type="text"
            name="address"
            value={newOrder.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="border border-gray-300 p-2 rounded-lg"
          />
          <input
            type="text"
            name="contact"
            value={newOrder.contact}
            onChange={handleInputChange}
            placeholder="Contact"
            className="border border-gray-300 p-2 rounded-lg"
          />
          <input
            type="text"
            name="productDescription"
            value={newOrder.productDescription}
            onChange={handleInputChange}
            placeholder="Product Description"
            className="border border-gray-300 p-2 rounded-lg"
          />
          <input
            type="number"
            name="quantity"
            value={newOrder.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            className="border border-gray-300 p-2 rounded-lg"
          />
          <input
            type="text"
            name="payment"
            value={newOrder.payment}
            onChange={handleInputChange}
            placeholder="Payment"
            className="border border-gray-300 p-2 rounded-lg"
          />
          <input
            type="date"
            name="date"
            value={newOrder.date}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>

        <button
          onClick={handleAddOrder}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Add Order
        </button>
      </div>
    </div>
  );
};

export default Orders;
