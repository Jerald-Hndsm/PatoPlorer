import React, { useState, useEffect } from 'react';
import { FaClipboardList, FaEdit, FaTrash } from "react-icons/fa";
import { userFirestore } from '../../firebase'; // Make sure to import your Firestore configuration
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({
        orderId: '',
        name: '',
        address: '',
        contactNumber: '',
        productDescription: '',
        quantity: '',
        payment: '',
        date: '',
        status: 'Processing',
    });
    const [editingIndex, setEditingIndex] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [confirmEdit, setConfirmEdit] = useState(false); // State for edit confirmation
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [orderToEdit, setOrderToEdit] = useState(null); // Track which order is being edited

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(userFirestore, 'orders'), (snapshot) => {
            const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOrders(ordersData);
        });
        return () => unsubscribe();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrder({
            ...newOrder,
            [name]: value,
        });
    };

    const handleAddOrUpdateOrder = async () => {
        if (Object.values(newOrder).some(val => val === '')) {
            alert('All fields must be filled!');
            return;
        }

        if (editingIndex !== null) {
            // Show edit confirmation modal
            setOrderToEdit(orders[editingIndex]);
            setConfirmEdit(true);
        } else {
            // Add new order to Firestore
            await addDoc(collection(userFirestore, 'orders'), newOrder);
            resetForm();
        }
    };

    const handleEditOrder = (index) => {
        setNewOrder(orders[index]);
        setEditingIndex(index);
    };

    const confirmEditOrder = async () => {
        const orderRef = doc(userFirestore, 'orders', orderToEdit.id);
        await updateDoc(orderRef, newOrder);
        resetForm();
        setConfirmEdit(false);
    };

    const handleDeleteOrder = async (id) => {
        await deleteDoc(doc(userFirestore, 'orders', id));
        setConfirmDelete(false);
        setOrderToDelete(null);
    };

    const confirmDeleteOrder = (id) => {
        setOrderToDelete(id);
        setConfirmDelete(true);
    };

    const resetForm = () => {
        setNewOrder({
            orderId: '',
            name: '',
            address: '',
            contactNumber: '',
            productDescription: '',
            quantity: '',
            payment: '',
            date: '',
            status: 'Processing',
        });
        setEditingIndex(null);
    };

    return (
        <div className="p-8 mt-10 bg-blue-50 shadow-lg rounded-lg">
            <h1 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1">Orders <FaClipboardList className="ml-2" /></h1>

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
                    <input
                        type="date"
                        name="date"
                        value={newOrder.date}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 rounded-lg"
                    />
                </div>

                <button
                    onClick={handleAddOrUpdateOrder}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                >
                    {editingIndex !== null ? 'Update Order' : 'Add Order'}
                </button>
            </div>

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
                                <th className="border border-gray-300 p-2">Date</th>
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
                                    <tr key={order.id} className="bg-white">
                                        <td className="border border-gray-300 p-2">{order.orderId}</td>
                                        <td className="border border-gray-300 p-2">{order.name}</td>
                                        <td className="border border-gray-300 p-2">{order.address}</td>
                                        <td className="border border-gray-300 p-2">{order.contactNumber}</td>
                                        <td className="border border-gray-300 p-2">{order.productDescription}</td>
                                        <td className="border border-gray-300 p-2">{order.quantity}</td>
                                        <td className="border border-gray-300 p-2">{order.payment}</td>
                                        <td className="border border-gray-300 p-2">{order.date}</td>
                                        <td className="border border-gray-300 p-2 flex space-x-2">
                                            <button
                                                onClick={() => handleEditOrder(index)}
                                                className="bg-yellow-500 text-white p-1 rounded-lg hover:bg-yellow-600"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => confirmDeleteOrder(order.id)}
                                                className="bg-red-500 text-white p-1 rounded-lg hover:bg-red-600"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {confirmDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg mb-4">Are you sure you want to delete this order?</h2>
                        <div className="flex justify-between">
                            <button
                                onClick={() => handleDeleteOrder(orderToDelete)}
                                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setConfirmDelete(false)}
                                className="bg-gray-300 text-black p-2 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {confirmEdit && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg mb-4">Are you sure you want to edit this order?</h2>
                        <div className="flex justify-between">
                            <button
                                onClick={confirmEditOrder}
                                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                            >
                                Confirm Edit
                            </button>
                            <button
                                onClick={() => setConfirmEdit(false)}
                                className="bg-gray-300 text-black p-2 rounded-lg hover:bg-gray-400"
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

export default Orders;