import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { cart } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">ShopReact</Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 mx-4">
          <form onSubmit={handleSearch} className="w-full flex">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700">
              Search
            </button>
          </form>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMobileMenu} className="md:hidden text-gray-700">
          <span className="material-icons text-3xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>

        {/* Cart & Auth */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <span className="material-icons text-2xl">shopping_cart</span>
            {cart.totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cart.totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="relative group">
              <span className="cursor-pointer">Hi, {user.name}</span>
              <div className="absolute hidden group-hover:block bg-white border rounded shadow-md mt-2 py-2 w-32">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/auth" className="text-blue-600 hover:underline">Login</Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSearch} className="flex mb-4">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700">
              Search
            </button>
          </form>

          <nav className="space-y-2">
            <Link to="/" className="block text-gray-700">Home</Link>
            <Link to="/products" className="block text-gray-700">Shop</Link>
            {isAuthenticated && <Link to="/orders" className="block text-gray-700">My Orders</Link>}
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="block text-gray-700">Profile</Link>
                <button onClick={logout} className="block text-left text-gray-700 w-full">Logout</button>
              </>
            ) : (
              <Link to="/auth" className="block text-gray-700">Login</Link>
            )}
            <Link to="/cart" className="block text-gray-700">
              Cart ({cart.totalItems})
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
