import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { adminFirestore, adminStorage } from '../../firebase'; // Adjust path as needed

const MarketManagement = () => {
  // ----------------- STATE FOR NEW PRODUCT -----------------
  const [imageFile, setImageFile] = useState(null);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantityType, setQuantityType] = useState('Per Tray');
  const [dateUploaded, setDateUploaded] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // ----------------- HANDLE IMAGE FILE -----------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      console.log('Selected file:', file);
    } else {
      alert('Please select a valid image file.');
    }
  };

  // ----------------- UPLOAD NEW PRODUCT -----------------
  const handleUpload = async () => {
    if (
      !productName ||
      !productDescription ||
      !price ||
      !quantityType ||
      !dateUploaded ||
      !imageFile
    ) {
      alert('Please fill out all fields and select an image.');
      return;
    }

    try {
      setIsUploading(true);

      // 1) Upload image to Firebase Storage
      const imageRef = ref(adminStorage, `products/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(snapshot.ref);

      // 2) Add product document to Firestore
      const productData = {
        name: productName,
        description: productDescription,
        price: parseFloat(price),
        quantityType,
        image: imageUrl,
        dateUploaded,
      };

      await addDoc(collection(adminFirestore, 'products'), productData);

      alert('Product uploaded successfully!');
      resetForm();
    } catch (error) {
      console.error('Error uploading product:', error);
      alert('Failed to save product. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // ----------------- RESET FORM -----------------
  const resetForm = () => {
    setImageFile(null);
    setProductName('');
    setProductDescription('');
    setPrice('');
    setQuantityType('Per Tray');
    setDateUploaded('');
  };

  // ----------------- RENDER -----------------
  return (
    <div className="p-8 mt-10 bg-blue-50 shadow-lg rounded-lg">
      <h1 className="text-lg mb-4 font-bold">Market Management</h1>

      {/* PRODUCT UPLOAD FORM (for new products only) */}
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
          {isUploading ? 'Uploading...' : 'Upload Product'}
        </button>
      </div>
    </div>
  );
};

export default MarketManagement;
