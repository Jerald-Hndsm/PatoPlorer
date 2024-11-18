import React, { useState } from 'react';

const ProductDetail = ({ product, onClose }) => {
  // Assume the product has a 'stock' property indicating available quantity
  const maxQuantity = product.stock || 10; // Default to 10 if 'stock' is not provided

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value);
  };

  const handleBuyNow = () => {
    // Implement buy now functionality
    alert(`Purchased ${quantity} box(es) of ${product.name}`);
  };

  // Generate quantity options based on available stock
  const quantityOptions = [];
  for (let i = 1; i <= maxQuantity; i++) {
    quantityOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg max-w-sm"
            />
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 md:pl-6 mt-4 md:mt-0">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl text-blue-600 font-semibold mb-4">
              Php {product.price.toFixed(2)} <span className="text-gray-700">/ Per Box</span>
            </p>

            {/* Selection Tile */}
            <div className="border p-4 rounded-lg mb-4">
              <p className="font-bold mb-2">Box of Organic Eggs</p>
              <div className="flex items-center">
                <label htmlFor="quantity" className="mr-2 font-semibold">
                  Quantity:
                </label>
                <select
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="border p-2 rounded w-24"
                >
                  {quantityOptions}
                </select>
              </div>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
            >
              Buy Now
            </button>

            {/* About This Item */}
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">About this Item</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
