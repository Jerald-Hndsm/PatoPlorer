import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const OrderDetails = () => {
    const location = useLocation();
    const { product } = location.state || {};
    
    // State to handle form input
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [quantity, setQuantity] = useState(1); // Default quantity
    const [orderPlaced, setOrderPlaced] = useState(false); // To track if the order has been placed

    // Handle Place Order
    const handlePlaceOrder = () => {
        setOrderPlaced(true); // Set the order as placed
    };

    // If no product is selected, return a message
    if (!product) {
        return <p>No product selected</p>;
    }

    return (
        <div className="p-8 mt-8 bg-gray-50">
            <h1 className="text-2xl mb-4 font-bold">Order Details</h1>
            
            {/* Product Info */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                <p className="text-gray-700 mb-2">Description: {product.description} (100 eggs per box)</p>
                <p className="text-blue-600 font-semibold mb-4">Php {product.price.toFixed(2)}</p>
            </div>

            {/* Order Form */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h2 className="text-lg font-bold mb-2">Fill Up Order Details</h2>
                <form>
                    <div className="mb-4">
                        <label className="block mb-1">Name:</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="border rounded-lg p-2 w-full"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Address:</label>
                        <input 
                            type="text" 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                            className="border rounded-lg p-2 w-full"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Contact Number:</label>
                        <input 
                            type="tel" 
                            value={contactNumber} 
                            onChange={(e) => setContactNumber(e.target.value)} 
                            className="border rounded-lg p-2 w-full"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Quantity (in boxes):</label>
                        <input 
                            type="number" 
                            value={quantity} 
                            onChange={(e) => setQuantity(Number(e.target.value))} // Ensure quantity is treated as a number
                            min="1" 
                            className="border rounded-lg p-2 w-full"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Payment Method:</label>
                        <input 
                            type="text" 
                            value="Cash on Delivery" 
                            readOnly 
                            className="border rounded-lg p-2 w-full bg-gray-200"
                        />
                    </div>
                    <button 
                        type="button" 
                        onClick={handlePlaceOrder} 
                        className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 w-full"
                    >
                        Place Order
                    </button>
                </form>
            </div>

            {/* Order Status Section */}
            {orderPlaced && (
                <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                    <h2 className="text-lg font-bold mb-2">Order Status</h2>
                    <p><strong>Product:</strong> {product.name}</p>
                    <p><strong>Description:</strong> {product.description} (100 eggs per box)</p>
                    <p><strong>Quantity:</strong> {quantity} box(es)</p>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Address:</strong> {address}</p>
                    <p><strong>Contact Number:</strong> {contactNumber}</p>
                    <p><strong>Payment Method:</strong> Cash on Delivery</p>
                </div>
            )}
        </div>
    );
};

export default OrderDetails;
