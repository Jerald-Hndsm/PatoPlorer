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

// Import XLSX for Excel export
import * as XLSX from 'xlsx';

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
      orderId: order.orderId || '',
      name: order.name || '',
      address: order.address || '',
      contact: order.contact || '',
      productDescription: order.productDescription || '',
      quantity: order.quantity || '',
      payment: order.payment || '',
      date: order.date || '',
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

  // 8) DOWNLOAD CSV
  const handleDownloadCSV = () => {
    if (orders.length === 0) {
      alert('No data to download!');
      return;
    }
    
    // CSV headers in the order you'd like columns displayed
    const headers = [
      'Order ID',
      'Name',
      'Address',
      'Contact',
      'Product Description',
      'Quantity',
      'Payment',
      'Date',
      'Status'
    ];

    // Start CSV content with a header row
    let csvContent = headers.join(',') + '\n';

    // Build rows from each order
    orders.forEach((order) => {
      const row = [
        order.orderId || '',
        order.name || '',
        order.address || '',
        order.contact || '',
        order.productDescription || '',
        order.quantity || '',
        order.payment || '',
        order.date || '',
        order.status || 'Processing'
      ];
      csvContent += row.join(',') + '\n';
    });

    // Create a Blob from the CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Create a hidden link, click it to download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'orders_records.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 9) DOWNLOAD EXCEL (.xlsx)
  const handleDownloadExcel = () => {
    if (orders.length === 0) {
      alert('No data to download!');
      return;
    }

    // Create a 2D array with headers, then data
    const worksheetData = [
      [
        'Order ID',
        'Name',
        'Address',
        'Contact',
        'Product Description',
        'Quantity',
        'Payment',
        'Date',
        'Status'
      ]
    ];

    orders.forEach((order) => {
      worksheetData.push([
        order.orderId || '',
        order.name || '',
        order.address || '',
        order.contact || '',
        order.productDescription || '',
        order.quantity || '',
        order.payment || '',
        order.date || '',
        order.status || 'Processing'
      ]);
    });

    // Convert array to worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'OrdersRecords');

    // Write the workbook to a buffer
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    // Convert buffer to a Blob
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    // Create a link and force download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'orders_records.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 10) Render
  return (
    <div className="p-8 mt-10 bg-blue-50 shadow-lg rounded-lg">
      <h2 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1">
        Orders List
      </h2>

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

      {/* Download Buttons BELOW the table */}
      <div className="mt-4">
        <button
          onClick={handleDownloadCSV}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition duration-200"
        >
          Download CSV
        </button>
        <button
          onClick={handleDownloadExcel}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-200"
        >
          Download Excel
        </button>
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
