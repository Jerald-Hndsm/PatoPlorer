import React, { useState } from 'react';
import ProductDetail from './ProductDetail';

const MarketManagement = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'Organic Duck Eggs',
      price: 0.00,
      description: 'Fresh organic duck eggs from free-range ducks.',
      image: '/images/Duck Eggs.png',
    },
    {
      id: 2,
      name: 'Salted Duck Eggs',
      price: 0.00,
      description: 'Preserved salted duck eggs, perfect for a savory dish.',
      image: '/images/Salted Eggs.png',
    },
    // Add more products as needed
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleImageClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-2xl mb-4 font-bold">Marketplace</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg mb-4 cursor-pointer"
              onClick={() => handleImageClick(product)}
            />
            <h2 className="text-lg font-bold mb-2">{product.name}</h2>
            <p className="text-blue-600 font-semibold mb-4">
              Php {product.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default MarketManagement;
