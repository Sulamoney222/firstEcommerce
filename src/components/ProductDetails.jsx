import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import products from '../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const { addItem } = useCart();

  // Find the product by ID
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="text-center text-red-500 mt-10">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div className="bg-white shadow rounded overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          <p className="text-lg text-gray-600 mb-4 font-semibold">$hhh{product.price.toFixed(2)}</p>
          <div className="flex items-center text-yellow-500 mb-4">
            <span >{'★'.repeat(Math.floor(product.rating))}</span>
            <span className="ml-2 text-sm text-yellow-400">({product.reviews} reviews)</span>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {product.description || 'No description available.'}
          </p>
        </div>

        {/* Add to Cart */}
        <div>
          <p className={`mb-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`w-full py-3 px-6 rounded-md text-white font-semibold ${
              product.stock > 0
                ? 'bg-green-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
