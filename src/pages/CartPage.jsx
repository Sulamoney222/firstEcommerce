import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Cart from '../components/Cart';

const CartPage = () => {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id) => {
    removeItem(id);
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/auth', { state: { from: '/checkout' } });
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
        <p className="text-lg text-gray-500">Looks like you haven't added any items to your cart yet.</p>
        <Link to="/" className="mt-4 text-blue-600 hover:underline text-lg">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg space-y-4">
          {cart.items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 border-b border-gray-300">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                </div>

                <div className="flex-1">
                  <Link to={`/product/${item.id}`} className="text-lg font-semibold text-gray-800 hover:text-blue-500">
                    {item.name}
                  </Link>
                  <div className="text-gray-500">${item.price.toFixed(2)}</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button 
                  className="px-3 py-1 bg-gray-300 rounded-md text-lg hover:bg-gray-400 disabled:bg-gray-200" 
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="text-lg">{item.quantity}</span>
                <button 
                  className="px-3 py-1 bg-gray-300 rounded-md text-lg hover:bg-gray-400"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</div>

              <button 
                className="text-red-500 text-2xl hover:text-red-700"
                onClick={() => handleRemoveItem(item.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
          
          <div className="flex justify-between text-lg text-gray-700">
            <span>Subtotal ({cart.totalItems} items):</span>
            <span>${cart.totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-lg text-gray-700">
            <span>Shipping:</span>
            <span>$0.00</span>
          </div>

          <div className="flex justify-between text-lg text-gray-700">
            <span>Tax:</span>
            <span>${(cart.totalPrice * 0.08).toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-xl font-semibold text-gray-800">
            <span>Total:</span>
            <span>${(cart.totalPrice + (cart.totalPrice * 0.08)).toFixed(2)}</span>
          </div>

          <button 
            className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-700 transition"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>

          <div className="flex justify-between items-center">
            <button 
              className="text-sm text-red-500 hover:underline"
              onClick={clearCart}
            >
              Clear Cart
            </button>
            <Link to="/" className="text-sm text-blue-500 hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
