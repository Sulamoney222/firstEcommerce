import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeItem, updateQuantity } = useCart();

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeItem(productId);
  };

  if (cart.totalItems === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
        <p className="mt-4 text-lg">Start adding some products to your cart!</p>
        <Link
          to="/"
          className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      <div className="bg-white p-6 rounded shadow">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Product</th>
                <th className="py-2 text-left">Price</th>
                <th className="py-2 text-left">Quantity</th>
                <th className="py-2 text-left">Total</th>
                <th className="py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-4 flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover mr-4"
                    />
                    <span>{item.name}</span>
                  </td>
                  <td className="py-4">${item.price.toFixed(2)}</td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <button
                        className="px-3 py-1 bg-gray-200 text-sm rounded-l"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="w-12 text-center border border-gray-300"
                      />
                      <button
                        className="px-3 py-1 bg-gray-200 text-sm rounded-r"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="py-4">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="text-lg font-semibold">
            <span>Total Items: {cart.totalItems}</span>
            <br />
            <span className="text-xl font-bold">Total Price: ${cart.totalPrice.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
