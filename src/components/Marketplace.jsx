import React, { useState } from 'react';

const MarketManagement = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Organic Duck Eggs',
            price: 8.99,
            description: 'Fresh organic duck eggs from free-range ducks.',
            image: '/images/Duck Eggs.png',
        },
        {
            id: 2,
            name: 'Salted Duck Eggs',
            price: 6.99,
            description: 'Preserved salted duck eggs, perfect for a savory dish.',
            image: '/images/Salted Eggs.png',
        },
        // Add more products as needed
    ]);

    const [currentProduct, setCurrentProduct] = useState(null);

    const handleEditClick = (product) => {
        setCurrentProduct(product);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct({ ...currentProduct, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCurrentProduct({ ...currentProduct, image: URL.createObjectURL(file) });
        }
    };

    const handleSaveChanges = () => {
        setProducts(products.map((prod) =>
            prod.id === currentProduct.id ? currentProduct : prod
        ));
        setCurrentProduct(null);
    };

    return (
        <div className="p-8 bg-gray-50">
            <h1 className="text-2xl mb-4 font-bold">Market Management</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                        <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                        <p className="text-blue-600 font-semibold mb-4">Php{product.price.toFixed(2)}</p>
                        <button onClick={() => handleEditClick(product)} className="bg-blue-500 text-white p-2 rounded">
                            Edit
                        </button>
                    </div>
                ))}
            </div>

            {currentProduct && (
                <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
                    <h2 className="text-lg font-bold mb-4">Edit Product</h2>
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={currentProduct.name}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full mb-2"
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={currentProduct.price}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full mb-2"
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        className="border p-2 rounded w-full mb-4"
                    />
                    <button onClick={handleSaveChanges} className="bg-green-500 text-white p-2 rounded mr-2">
                        Save Changes
                    </button>
                    <button onClick={() => setCurrentProduct(null)} className="bg-gray-500 text-white p-2 rounded">
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default MarketManagement;
