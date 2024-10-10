import React from 'react';
import { useNavigate } from 'react-router-dom';

const Marketplace = () => {
    // Sample product data
    const products = [
        {
            id: 1,
            name: 'Organic Duck Eggs',
            price: 8.99,
            description: 'Fresh organic duck eggs from free-range ducks.',
            image: '/images/Duck Eggs.png', // Placeholder image URL
        },
        {
            id: 2,
            name: 'Salted Duck Eggs',
            price: 6.99,
            description: 'Preserved salted duck eggs, perfect for a savory dish.',
            image: '/images/Salted Eggs.png', // Placeholder image URL
        },
        {
            id: 3,
            name: 'Hatchling Eggs',
            price: 12.99,
            description: 'Eggs for hatching your own ducklings at home.',
            image: 'https://via.placeholder.com/150', // Placeholder image URL
        },
        {
            id: 4,
            name: 'Balut',
            price: 2.99,
            description: 'A fertilized developing egg embryo, boiled and eaten from the shell.',
            image: '/images/Balut.png', // Placeholder image URL
        },
    ];

    const navigate = useNavigate(); // Hook for navigation

    // Redirect to order details page with product details
    const handleRedirectToOrder = (product) => {
        navigate('/pages/orderdetails', { state: { product } });
    };

    return (
        <div className="p-8 bg-gray-50">
            {/* Back Button */}
            <button 
                onClick={() => navigate(-1)} 
                className="mb-4 bg-gray-300 text-black p-2 rounded hover:bg-gray-400"
            >
                Back
            </button>

            <h1 className="text-2xl mb-4 font-bold">Marketplace</h1>

            {/* Product List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div 
                        key={product.id} 
                        className="bg-white p-4 rounded-lg shadow-md cursor-pointer" 
                        onClick={() => handleRedirectToOrder(product)}
                    >
                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                        <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                        <p className="text-gray-700 mb-2">{product.description}</p>
                        <p className="text-blue-600 font-semibold mb-4">Php{product.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marketplace;