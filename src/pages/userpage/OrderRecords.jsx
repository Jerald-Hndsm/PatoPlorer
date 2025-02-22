import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { userFirestore } from '../../firebase'; 
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

const OrdersRecords = () => {
  // 1) State for all orders from Firestore
  const [orders, setOrders] = useState([]);

  // Track which order is in "edit" mode
  const [editingOrderId, setEditingOrderId] = useState(null);

  // Temporarily store the fields we’re editing
  const [editFields, setEditFields] = useState({
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

  // For delete confirmation
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  // 2) Listen to Firestore in real time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(userFirestore, 'orders'), (snapshot) => {
      const ordersData = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));
      setOrders(ordersData);
    });
    return () => unsubscribe();
  }, []);

  // 3) Enter edit mode for a row
  const handleEdit = (order) => {
    setEditingOrderId(order.id);
    setEditFields({
      orderId: order.orderId,
      name: order.name,
      address: order.address,
      contact: order.contact,
      productDescription: order.productDescription,
      quantity: order.quantity,
      payment: order.payment,
      date: order.date,
      status: order.status || 'Processing',
    });
  };

  // 4) Track changes in the edit fields
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 5) Save the edited row
  const handleSaveEdit = async (id) => {
    try {
      const orderRef = doc(userFirestore, 'orders', id);
      await updateDoc(orderRef, { ...editFields });
      // After saving, exit edit mode
      setEditingOrderId(null);
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  // 6) Cancel edit mode
  const handleCancelEdit = () => {
    setEditingOrderId(null);
    setEditFields({
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

  // 7) Deletion
  const confirmDeleteOrder = (id) => {
    setOrderToDelete(id);
    setConfirmDelete(true);
  };

  const handleDeleteOrder = async () => {
    try {
      await deleteDoc(doc(userFirestore, 'orders', orderToDelete));
      setConfirmDelete(false);
      setOrderToDelete(null);
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order. Please try again.');
    }
  };

  // 8) Render
  return (
    <div className="p-8 mt-10 bg-blue-50 shadow-lg rounded-lg">
      <h2 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1">Orders List</h2>
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
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center border border-gray-300 p-2">
                  No orders available.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const isEditing = order.id === editingOrderId;

                return (
                  <tr key={order.id} className="bg-white">
                    {/* ORDER ID */}
                    <td className="border border-gray-300 p-2">
                      {isEditing ? (
                        <input
                          type="text"
                          name="orderId"
                          value={editFields.orderId}
                          onChange={handleEditChange}
                          className="border border-gray-300 p-1 rounded-lg w-full"
                        />
                      ) : (
                        order.orderId
                      )}
                    </td>
                    {/* NAME */}
                    <td className="border border-gray-300 p-2">
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={editFields.name}
                          onChange={handleEditChange}
                          className="border border-gray-300 p-1 rounded-lg w-full"
                        />
                      ) : (
                        order.name
                      )}
                    </td>
                    {/* ADDRESS */}
                    <td className="border border-gray-300 p-2">
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={editFields.address}
                          onChange={handleEditChange}
                          className="border border-gray-300 p-1 rounded-lg w-full"
                        />
                      ) : (
                        order.address
                      )}
                    </td>
                    {/* CONTACT NUMBER */}
                    <td className="border border-gray-300 p-2">
                      {isEditing ? (
                        <input
                          type="text"
                          name="contact"
                          value={editFields.contact}
                          onChange={handleEditChange}
                          className="border border-gray-300 p-1 rounded-lg w-full"
                        />
                      ) : (
                        order.contact
                      )}
                    </td>
                    {/* PRODUCT DESCRIPTION */}
                    <td className="border border-gray-300 p-2">
                      {isEditing ? (
                        <input
                          type="text"
                          name="productDescription"
                          value={editFields.productDescription}
                          onChange={handleEditChange}
                          className="border border-gray-300 p-1 rounded-lg w-full"
                        />
                      ) : (
                        order.productDescription
                      )}
                    </td>
                    {/* QUANTITY */}
                    <td className="border border-gray-300 p-2">
                      {isEditing ? (
                        <input
                          type="number"
                          name="quantity"
                          value={editFields.quantity}
                          onChange={handleEditChange}
                          className="border border-gray-300 p-1 rounded-lg w-full"
                        />
                      ) : (
                        order.quantity
                      )}
                    </td>
                    {/* PAYMENT */}
                    <td className="border border-gray-300 p-2">
                      {isEditing ? (
                        <input
                          type="text"
                          name="payment"
                          value={editFields.payment}
                          onChange={handleEditChange}
                          className="border border-gray-300 p-1 rounded-lg w-full"
                        />
                      ) : (
                        order.payment
                      )}
                    </td>
                    {/* DATE */}
                    <td className="border border-gray-300 p-2">
                      {isEditing ? (
                        <input
                          type="date"
                          name="date"
                          value={editFields.date}
                          onChange={handleEditChange}
                          className="border border-gray-300 p-1 rounded-lg w-full"
                        />
                      ) : (
                        order.date
                      )}
                    </td>
                    {/* STATUS */}
                    <td className="border border-gray-300 p-2">
                      {isEditing ? (
                        <input
                          type="text"
                          name="status"
                          value={editFields.status}
                          onChange={handleEditChange}
                          className="border border-gray-300 p-1 rounded-lg w-full"
                        />
                      ) : (
                        order.status
                      )}
                    </td>
                    {/* ACTIONS */}
                    <td className="border border-gray-300 p-2 flex space-x-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSaveEdit(order.id)}
                            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-300 text-black p-2 rounded-lg hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(order)}
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
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg mb-4">Are you sure you want to delete this order?</h2>
            <div className="flex justify-between">
              <button
                onClick={handleDeleteOrder}
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
    </div>
  );
};

export default OrdersRecords;
