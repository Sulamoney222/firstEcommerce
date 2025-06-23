import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Aos from 'aos';
import 'aos/dist/aos.css'

const ProductCard = ({ product }) => {

  useEffect(()=>{
      Aos.init({once:true, duration:3000})
  },[])

  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, 1);
    // Optionally, trigger a toast notification
  };

  return (
    <div data-aos='zoom-in-up' 
    className="bg-white shadow-xl shadow-gray-400rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-w-4 aspect-h-3 bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-4 bg-stone-200 ">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
          <div className="mt-2 text-gray-600 flex items-center justify-between">
            <span className="text-blue-600 font-bold">${product.price.toFixed(2)}</span>
            <div className="text-sm text-yellow-500 flex items-center space-x-1">
              <span>{'★'.repeat(Math.floor(product.rating))}</span>
              <span className="text-gray-500">({product.reviews})</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4 mt-auto">
        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`w-full mt-2 py-2 px-4 rounded-md text-white text-sm font-medium ${
            product.stock > 0
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
