import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CartPage = () => {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 600,      // animation duration
      easing: 'ease-in-out',
      once: true,         // animation only once
      mirror: false,      // do not repeat animation on scroll up
    });
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => removeItem(id);

  const handleCheckout = () => {
    isAuthenticated
      ? navigate('/checkout')
      : navigate('/auth', { state: { from: '/checkout' } });
  };

  if (cart.items.length === 0) {
    return (
      <div
        data-aos="fade-up"
        className="flex flex-col items-center justify-center min-h-screen text-center px-4 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
        <p className="text-lg text-gray-500">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link to="/" className="mt-4 text-blue-600 hover:underline text-lg">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1
        data-aos="fade-down"
        className="text-3xl font-semibold text-gray-800 mb-6 text-center md:text-left"
      >
        Your Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div
          data-aos="fade-right"
          className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow space-y-4"
        >
          {cart.items.map((item, idx) => (
            <div
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={idx * 100} // stagger animation
              className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 border-b border-gray-300 pb-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div>
                  <Link
                    to={`/product/${item.id}`}
                    className="block text-lg font-semibold text-gray-800 hover:text-blue-500"
                  >
                    {item.name}
                  </Link>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="text-lg">{item.quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div className="text-lg font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button
                className="text-red-500 text-2xl hover:text-red-700"
                onClick={() => handleRemoveItem(item.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div
          data-aos="fade-left"
          className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>

          <div className="flex justify-between text-gray-700 text-lg">
            <span>Subtotal ({cart.totalItems} items):</span>
            <span>${cart.totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-700 text-lg">
            <span>Shipping:</span>
            <span>$0.00</span>
          </div>

          <div className="flex justify-between text-gray-700 text-lg">
            <span>Tax:</span>
            <span>${(cart.totalPrice * 0.08).toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-xl font-semibold text-gray-800 border-t pt-4">
            <span>Total:</span>
            <span>
              ${(cart.totalPrice + cart.totalPrice * 0.08).toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-700 transition"
          >
            Proceed to Checkout
          </button>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={clearCart}
              className="text-sm text-red-500 hover:underline"
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
