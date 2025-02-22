import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import {
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import { adminFirestore, adminStorage } from '../../firebase';

const MarketProducts = () => {
  // 1) State
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  // Fields for whichever product we're editing
  const [editFields, setEditFields] = useState({
    name: '',
    description: '',
    price: '',
    quantityType: '',
    dateUploaded: '',
    image: '', // old image URL
  });

  // Temporarily store a new file while editing
  const [newImageFile, setNewImageFile] = useState(null);

  // 2) Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(adminFirestore, 'products'));
        const fetchedProducts = querySnapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // 3) Enter edit mode
  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditFields({
      name: product.name,
      description: product.description,
      price: product.price,
      quantityType: product.quantityType,
      dateUploaded: product.dateUploaded,
      image: product.image || '',
    });
    // Reset any previously chosen file
    setNewImageFile(null);
  };

  // 4) Handle changes in text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // When a new image is selected while editing
  const handleNewImageChange = (e) => {
    const file = e.target.files[0];
    setNewImageFile(file || null);
  };

  // 5) Cancel edit
  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditFields({
      name: '',
      description: '',
      price: '',
      quantityType: '',
      dateUploaded: '',
      image: '',
    });
    setNewImageFile(null);
  };

  // 6) Save (update) changes, including changing the image
  const handleSaveEdit = async (id) => {
    try {
      // Build the updated data from edited fields
      let updatedData = {
        name: editFields.name,
        description: editFields.description,
        price: parseFloat(editFields.price) || 0,
        quantityType: editFields.quantityType,
        dateUploaded: editFields.dateUploaded,
        // We'll handle `image` next
      };

      // If a new image file has been chosen
      if (newImageFile) {
        // (a) Delete the old image if it exists
        if (editFields.image) {
          const oldImagePath = decodeURIComponent(
            editFields.image.split('/o/')[1].split('?')[0]
          );
          const oldImageRef = ref(adminStorage, oldImagePath);
          await deleteObject(oldImageRef);
          console.log('Old image deleted from storage.');
        }

        // (b) Upload the new image
        const newImageRef = ref(
          adminStorage,
          `products/${Date.now()}_${newImageFile.name}`
        );
        const snapshot = await uploadBytes(newImageRef, newImageFile);
        const newImageUrl = await getDownloadURL(snapshot.ref);

        // (c) Set the new URL in updatedData
        updatedData.image = newImageUrl;
      } else {
        // If no new image, keep the existing one
        updatedData.image = editFields.image;
      }

      // Update doc in Firestore
      const productDocRef = doc(adminFirestore, 'products', id);
      await updateDoc(productDocRef, updatedData);

      // Update local array
      const newProducts = products.map((prod) =>
        prod.id === id ? { ...prod, ...updatedData } : prod
      );
      setProducts(newProducts);

      // Exit edit mode
      handleCancelEdit();
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error saving edited product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  // 7) Deletion
  const handleDelete = async (id) => {
    try {
      const productToDelete = products.find((product) => product.id === id);
      if (productToDelete && productToDelete.image) {
        const imagePath = decodeURIComponent(
          productToDelete.image.split('/o/')[1].split('?')[0]
        );
        const imageRef = ref(adminStorage, imagePath);
        await deleteObject(imageRef);
        console.log('Image deleted from storage.');
      }
      await deleteDoc(doc(adminFirestore, 'products', id));
      setProducts(products.filter((product) => product.id !== id));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  // 8) Render table
  return (
    <div className="p-8 mt-10 bg-blue-50 shadow-lg rounded-lg">
      <h2 className="text-lg mb-4 font-bold">Uploaded Products</h2>
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
          {products.map((product) => {
            const isEditing = editingProductId === product.id;
            return (
              <tr key={product.id} className="text-center">
                {/* PRODUCT IMAGE CELL */}
                <td className="px-4 py-2">
                  {isEditing ? (
                    <>
                      {/* Show old image preview (if any) */}
                      {editFields.image ? (
                        <img
                          src={editFields.image}
                          alt="Current"
                          className="w-20 h-20 object-cover rounded mb-2"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                      {/* File input for a new image */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleNewImageChange}
                        className="border p-1 rounded w-full"
                      />
                    </>
                  ) : product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>

                {/* NAME */}
                <td className="px-4 py-2">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editFields.name}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    product.name
                  )}
                </td>

                {/* DESCRIPTION */}
                <td className="px-4 py-2">
                  {isEditing ? (
                    <textarea
                      name="description"
                      value={editFields.description}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    product.description
                  )}
                </td>

                {/* PRICE */}
                <td className="px-4 py-2">
                  {isEditing ? (
                    <input
                      type="number"
                      name="price"
                      value={editFields.price}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    `Php ${product.price.toFixed(2)}`
                  )}
                </td>

                {/* QUANTITY TYPE */}
                <td className="px-4 py-2">
                  {isEditing ? (
                    <select
                      name="quantityType"
                      value={editFields.quantityType}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    >
                      <option value="Per Tray">Per Tray</option>
                      <option value="Per Box">Per Box</option>
                    </select>
                  ) : (
                    product.quantityType
                  )}
                </td>

                {/* DATE UPLOADED */}
                <td className="px-4 py-2">
                  {isEditing ? (
                    <input
                      type="date"
                      name="dateUploaded"
                      value={editFields.dateUploaded}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    new Date(product.dateUploaded).toLocaleDateString()
                  )}
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => handleSaveEdit(product.id)}
                        className="bg-blue-500 text-white p-1 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-400 text-white p-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-green-500 text-white p-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 text-white p-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MarketProducts;
