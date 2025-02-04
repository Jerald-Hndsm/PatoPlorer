import React, { useState, useEffect } from "react";
import { adminFirestore, adminStorage, userFirestore } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState({
    orderId: Math.floor(Math.random() * 1000000), // Auto-generate Order ID
    name: "",
    address: "",
    contact: "",
    productDescription: "",
    quantity: 1,
    quantityType: "Per Tray",
    payment: "Cash on Delivery",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(adminFirestore, "products"));
      const fetchedProducts = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const productData = doc.data();
          if (!productData.image) return null;

          const imageRef = ref(adminStorage, productData.image);
          const imageUrl = await getDownloadURL(imageRef);

          return {
            id: doc.id,
            name: productData.name,
            price: `Php ${parseFloat(productData.price).toFixed(2)}`,
            imageUrl: imageUrl,
            description: productData.description,
            quantity: productData.quantity,
            quantityType: productData.quantityType,
          };
        })
      );

      setProducts(fetchedProducts.filter((p) => p !== null));
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    }
    setLoading(false);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowOrderForm(false);
    setOrderData({
      ...orderData,
      productDescription: product.name,
    });
  };

  const handleBuyClick = () => {
    setShowOrderForm(true);
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(userFirestore, "orders"), orderData);
      alert("Order placed successfully!");
      setShowOrderForm(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("❌ Error saving order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="p-10 mt-14 bg-blue-50 ml-2 shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl flex flex-col w-full">
      {loading && <p className="text-center text-lg font-semibold">Loading products...</p>}

      {/* Product Grid */}
      {!selectedProduct && !showOrderForm && !loading && (
        <>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Marketplace</h1>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md mb-2 mt-14"
                  />
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-700">{product.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 text-center col-span-4">No products available.</p>
          )}
        </>
      )}

      {/* Product Details Page */}
      {selectedProduct && !showOrderForm && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto relative">
          {/* "X" button to close product details */}
          <button
            className="absolute top-2 left-2 bg-red-500 text-white rounded-full px-3 py-1"
            onClick={() => setSelectedProduct(null)}
          >
            X
          </button>
          <img
            src={selectedProduct.imageUrl}
            alt={selectedProduct.name}
            className="w-full h-60 object-cover rounded-md mb-4"
          />
          <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
          <p className="text-gray-700 mb-2">{selectedProduct.description}</p>
          <p className="text-xl font-semibold">{selectedProduct.price}</p>
          <p className="text-md font-semibold">{selectedProduct.quantity}</p>
          <p className="text-md font-semibold">{selectedProduct.quantityType}</p>
          <button
            className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition"
            onClick={handleBuyClick}
          >
            Buy
          </button>
        </div>
      )}

      {/* Order Form */}
      {showOrderForm && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mt-6">
          <h2 className="text-2xl font-bold mb-4">Order Form</h2>
          <form className="space-y-4" onSubmit={handleOrderSubmit}>
            <label className="block">Name:
              <input type="text" name="name" value={orderData.name} onChange={handleOrderChange} className="w-full p-2 border rounded mt-1" required/>
            </label>

            <label className="block">Address:
              <input type="text" name="address" value={orderData.address} onChange={handleOrderChange} className="w-full p-2 border rounded mt-1" required/>
            </label>

            <label className="block">Contact Number:
              <input type="text" name="contact" value={orderData.contact} onChange={handleOrderChange} className="w-full p-2 border rounded mt-1" required/>
            </label>

            <label className="block">Quantity:
              <div className="flex space-x-2">
                <input type="number" name="quantity" value={orderData.quantity} onChange={handleOrderChange} className="w-2/3 p-2 border rounded mt-1" required/>
                <select name="quantityType" value={orderData.quantityType} onChange={handleOrderChange} className="w-1/3 p-2 border rounded mt-1">
                  <option value="Per Tray">Per Tray</option>
                  <option value="Per Box">Per Box</option>
                </select>
              </div>
            </label>

            <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
              Proceed to Purchase
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
