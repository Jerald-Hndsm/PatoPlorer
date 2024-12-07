import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { storage, db } from '../../firebase'; // Ensure the path to firebase.js is correct

const MarketManagement = () => {
    const [imageFile, setImageFile] = useState(null);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantityType, setQuantityType] = useState('Per Tray');
    const [dateUploaded, setDateUploaded] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [products, setProducts] = useState([]);
    const [editProductId, setEditProductId] = useState(null);

    // Fetch products from Firestore on component load
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const fetchedProducts = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // Handle image file selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            console.log('Selected file:', file);
        } else {
            alert('Please select a valid image file.');
        }
    };

    // Upload or Update product to Firebase Storage and Firestore
    const handleUpload = async () => {
        if (!productName || !productDescription || !price || !quantityType || !dateUploaded || (!imageFile && !editProductId)) {
            alert('Please fill out all fields.');
            return;
        }

        try {
            setIsUploading(true);

            let imageUrl = '';
            if (imageFile) {
                const imageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
                const snapshot = await uploadBytes(imageRef, imageFile);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            const productData = {
                name: productName,
                description: productDescription,
                price: parseFloat(price),
                quantityType,
                image: imageUrl || (products.find((product) => product.id === editProductId)?.image || ''),
                dateUploaded,
            };

            if (editProductId) {
                // Update existing product
                const productDocRef = doc(db, 'products', editProductId);
                await updateDoc(productDocRef, productData);

                const updatedProducts = products.map((product) =>
                    product.id === editProductId ? { id: editProductId, ...productData } : product
                );
                setProducts(updatedProducts);
                alert('Product updated successfully!');
            } else {
                // Add new product
                const docRef = await addDoc(collection(db, 'products'), productData);
                setProducts((prevProducts) => [...prevProducts, { id: docRef.id, ...productData }]);
                alert('Product uploaded successfully!');
            }

            // Reset inputs
            resetForm();
        } catch (error) {
            console.error('Error uploading product:', error);
            alert('Failed to save product. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    // Handle product deletion (including image deletion from Storage)
    const handleDelete = async (id) => {
        try {
            const productToDelete = products.find((product) => product.id === id);

            if (productToDelete && productToDelete.image) {
                // Extract the image path from the image URL
                const imagePath = decodeURIComponent(productToDelete.image.split('/o/')[1].split('?')[0]);
                const imageRef = ref(storage, imagePath);

                // Delete the image from Storage
                await deleteObject(imageRef);
                console.log('Image deleted from storage.');
            }

            // Delete the product document from Firestore
            const productDocRef = doc(db, 'products', id);
            await deleteDoc(productDocRef);

            const updatedProducts = products.filter((product) => product.id !== id);
            setProducts(updatedProducts);
            alert('Product deleted successfully!');
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product. Please try again.');
        }
    };

    // Reset form inputs
    const resetForm = () => {
        setProductName('');
        setProductDescription('');
        setPrice('');
        setQuantityType('Per Tray');
        setDateUploaded('');
        setImageFile(null);
        setEditProductId(null);
    };

    // Edit product
    const handleEdit = (product) => {
        setProductName(product.name);
        setProductDescription(product.description);
        setPrice(product.price);
        setQuantityType(product.quantityType);
        setDateUploaded(product.dateUploaded);
        setEditProductId(product.id);
    };

    return (
        <div className="p-8 mt-10 bg-blue-50 shadow-lg rounded-lg">
            <h1 className="text-lg mb-4 font-bold">Market Management</h1>

            {/* Product Upload/Edit Form */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border p-2 rounded w-full mb-4"
                />
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                />
                <textarea
                    placeholder="Product Description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                />
                <select
                    value={quantityType}
                    onChange={(e) => setQuantityType(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                >
                    <option value="Per Tray">Per Tray</option>
                    <option value="Per Box">Per Box</option>
                </select>
                <input
                    type="date"
                    value={dateUploaded}
                    onChange={(e) => setDateUploaded(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                />
                <button
                    onClick={handleUpload}
                    className="bg-blue-500 text-white p-2 rounded"
                    disabled={isUploading}
                >
                    {isUploading ? 'Uploading...' : editProductId ? 'Update Product' : 'Upload Product'}
                </button>
            </div>

            {/* Products Table */}
            <div className="mt-8">
                <h2 className="text-lg font-bold mb-4">Uploaded Products</h2>
                <table className="table-auto w-full bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Product Image</th>
                            <th className="px-4 py-2">Product Name</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Quantity Type</th>
                            <th className="px-4 py-2">Date Uploaded</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="text-center">
                                <td className="px-4 py-2">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                </td>
                                <td className="px-4 py-2">{product.name}</td>
                                <td className="px-4 py-2">{product.description}</td>
                                <td className="px-4 py-2">Php {product.price.toFixed(2)}</td>
                                <td className="px-4 py-2">{product.quantityType}</td>
                                <td className="px-4 py-2">{new Date(product.dateUploaded).toLocaleDateString()}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="bg-green-500 text-white p-2 rounded mr-2"
                                    >
                                        Edit Product
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="bg-red-500 text-white p-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MarketManagement;
