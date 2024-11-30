import React, { useState } from 'react';
import { FaStore } from "react-icons/fa";

const MarketManagement = () => {
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        quantityType: 'Boxes',
        quantity: 1,
        image: null,
    });
    const [isImageValid, setIsImageValid] = useState(true);
    const [showUploadForm, setShowUploadForm] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const img = new Image();
            img.onload = () => {
                if (img.width === img.height) {
                    setIsImageValid(true);
                    setProduct({ ...product, image: URL.createObjectURL(file) });
                } else {
                    setIsImageValid(false);
                    alert('Image must have a 1x1 aspect ratio (square).');
                }
            };
            img.src = URL.createObjectURL(file);
        }
    };

    const handleSubmit = () => {
        if (!product.name || !product.description || !product.price || !product.quantity || !product.image) {
            alert('Please fill out all fields and upload an image.');
            return;
        }
        if (!isImageValid) {
            alert('Please ensure the image has a 1x1 aspect ratio.');
            return;
        }

        if (currentProduct) {
            // Edit existing product
            setProducts(
                products.map((p) =>
                    p.id === currentProduct.id ? { ...currentProduct, ...product } : p
                )
            );
            setCurrentProduct(null);
        } else {
            // Add new product
            setProducts([...products, { ...product, id: products.length + 1 }]);
        }

        alert('Product saved successfully!');

        // Clear the form and hide it
        setProduct({
            name: '',
            description: '',
            price: '',
            quantityType: 'Boxes',
            quantity: 1,
            image: null,
        });
        setShowUploadForm(false);
    };

    const handleEditClick = (product) => {
        setCurrentProduct(product);
        setProduct(product);
        setShowUploadForm(true);
    };

    const handleRemoveProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
        setCurrentProduct(null);
        setShowUploadForm(false);
    };

    const handleAddProduct = () => {
        setCurrentProduct(null);
        setProduct({
            name: '',
            description: '',
            price: '',
            quantityType: 'Boxes',
            quantity: 1,
            image: null,
        });
        setShowUploadForm(true);
    };

    return (
        <div className="p-8 mt-10 bg-blue-50 ml-2 shadow-lg rounded-lg transform transition-all duration-300 hover:shadow-xl flex flex-col w-full">
            <h1 className="text-lg mb-4 font-sans font-bold text-gray-800 flex items-center pt-1">
                Market Management <FaStore className="ml-2" />
                </h1> 

            {products.length === 0 && !showUploadForm ? (
                <div className="flex justify-center items-center h-40">
                    <button
                        onClick={() => setShowUploadForm(true)}
                        className="bg-blue-500 text-white p-8 rounded-lg text-lg"
                    >
                        Upload Product Now
                    </button>
                </div>
            ) : null}

            {showUploadForm && (
                <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={product.name}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full mb-2"
                    />
                    <textarea
                        name="description"
                        placeholder="Product Description"
                        value={product.description}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full mb-2"
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Product Price"
                        value={product.price}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full mb-2"
                    />
                    <div className="flex gap-4 items-center mb-2">
                        <select
                            name="quantityType"
                            value={product.quantityType}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full"
                        >
                            <option value="Boxes">Boxes</option>
                            <option value="Trays">Trays</option>
                        </select>
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            value={product.quantity}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="border p-2 rounded w-full mb-2"
                    />
                    {!isImageValid && (
                        <p className="text-red-500 text-sm">Image must have a 1x1 aspect ratio.</p>
                    )}
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white p-2 rounded mt-4"
                    >
                        {currentProduct ? 'Save Changes' : 'Upload Product'}
                    </button>
                    {currentProduct && (
                        <button
                            onClick={() => handleRemoveProduct(currentProduct.id)}
                            className="bg-red-500 text-white p-2 rounded mt-4 ml-2"
                        >
                            Remove Product
                        </button>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                        <p className="text-blue-600 font-semibold mb-4">
                            Php{parseFloat(product.price).toFixed(2)}
                        </p>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <p className="text-gray-800 font-bold">
                            Quantity: {product.quantity} {product.quantityType}
                        </p>
                        <button
                            onClick={() => handleEditClick(product)}
                            className="bg-green-500 text-white p-2 rounded mt-4"
                        >
                            Edit
                        </button>
                    </div>
                ))}
            </div>

            {products.length > 0 && !showUploadForm && (
                <button
                    onClick={handleAddProduct}
                    className="bg-green-500 text-white p-2 rounded mt-4"
                >
                    Add Product
                </button>
            )}
        </div>
    );
};

export default MarketManagement;
