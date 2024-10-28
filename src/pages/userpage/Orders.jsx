import React, { useState } from 'react';
import { FaClipboardList } from "react-icons/fa6";

const Orders = () => {
    // State for storing orders
    const [orders, setOrders] = useState([]);
    
    // State for the new order input fields
    const [newOrder, setNewOrder] = useState({
        orderId: '',
        name: '',
        address: '',
        contactNumber: '',
        productDescription: '',
        quantity: '',
        payment: '',
        status: 'Processing', // Default status
    });

    // State to track the order being edited
    const [editingIndex, setEditingIndex] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrder({
            ...newOrder,
            [name]: value,
        });
    };

    const handleAddOrUpdateOrder = () => {
        // Check if all fields are filled
        if (Object.values(newOrder).some(val => val === '')) {
            alert('All fields must be filled!');
            return;
        }

        if (editingIndex !== null) {
            // Update existing order
            const updatedOrders = [...orders];
            updatedOrders[editingIndex] = newOrder;
            setOrders(updatedOrders);
            setEditingIndex(null); // Reset editing index
        } else {
            // Add new order to the orders state
            setOrders([...orders, newOrder]);
        }

        // Reset newOrder state only if not editing
        if (editingIndex === null) {
            setNewOrder({
                orderId: '',
                name: '',
                address: '',
                contactNumber: '',
                productDescription: '',
                quantity: '',
                payment: '',
                status: 'Processing', // Reset to default status
            });
        }
    };

    const handleEditOrder = (index) => {
        setNewOrder(orders[index]);
        setEditingIndex(index);
    };

    return (
        <div className="p-8 mt-8 bg-blue-50 ml-2 shadow-lg rounded-lg transform transition-all duration-300 hover:shadow-xl flex flex-col w-full">
            <h1 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1">Orders <FaClipboardList className="ml-2" /> 
            </h1>

            {/* Tile for adding or editing an order */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-lg mb-2">{editingIndex !== null ? 'Edit Order' : 'Add New Order'}:</h2>
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
                        name="contactNumber"
                        value={newOrder.contactNumber}
                        onChange={handleInputChange}
                        placeholder="Contact Number"
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
                    <select
                        name="status"
                        value={newOrder.status}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded-lg"
                    >
                                                <option value="Successful">Successful</option>
                    </select>
                </div>

                <button
                    onClick={handleAddOrUpdateOrder}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                >
                    {editingIndex !== null ? 'Update Order' : 'Add Order'}
                </button>
            </div>

            {/* Tile for Orders Table */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg mb-4">Orders List:</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-collapse border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-2">Order ID</th>
                                <th className="border border-gray-300 p-2">Name</th>
                                <th className="border border-gray-300 p-2">Address</th>
                                <th className="border border-gray-300 p-2">Contact Number</th>
                                <th className="border border-gray-300 p-2">Product Description</th>
                                <th className="border border-gray-300 p-2">Quantity</th>
                                <th className="border border-gray-300 p-2">Payment</th>
                                <th className="border border-gray-300 p-2">Order Status</th>
                                <th className="border border-gray-300 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="text-center border border-gray-300 p-2">
                                        No orders available.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order, index) => (
                                    <tr key={index} className="bg-white">
                                        <td className="border border-gray-300 p-2">{order.orderId}</td>
                                        <td className="border border-gray-300 p-2">{order.name}</td>
                                        <td className="border border-gray-300 p-2">{order.address}</td>
                                        <td className="border border-gray-300 p-2">{order.contactNumber}</td>
                                        <td className="border border-gray-300 p-2">{order.productDescription}</td>
                                        <td className="border border-gray-300 p-2">{order.quantity}</td>
                                        <td className="border border-gray-300 p-2">{order.payment}</td>
                                        <td className="border border-gray-300 p-2">{order.status}</td>
                                        <td className="border border-gray-300 p-2">
                                            <button
                                                onClick={() => handleEditOrder(index)}
                                                className="bg-yellow-500 text-white p-1 rounded-lg hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;