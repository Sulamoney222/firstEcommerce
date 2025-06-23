import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi'; // FiMenu = ☰ , FiX = ×


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
      setSearchQuery('');
      setMobileMenuOpen(false); // Optional: Close menu on mobile search
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-stone-800 shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center transition-transform duration-300 hover:scale-105">
  <Link to="/" className="flex items-center gap-2">
    <img
      src="https://tse2.mm.bing.net/th?id=OIP.1exgp2wM5-UKtjZfUay2OwHaEW&pid=Api&P=0&h=180"
      alt="ShopReact Logo"
      className="h-10 w-auto object-contain"
    />
    <span className="hidden sm:inline-block text-xl font-bold text-gray-800">ShopItems</span>
  </Link>
</div>


        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 mx-4">
          <form onSubmit={handleSearch} className="w-full flex transition-all duration-300">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 rounded-r-md hover:bg-green-700 transition"
            >
              Search
            </button>
          </form>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-700 focus:outline-none transition-transform duration-300"
          aria-label="Toggle Menu"
        >
          <span className="material-icons text-3xl">{mobileMenuOpen ? <FiX/> : <FiMenu/>}</span>
        </button>

        {/* Cart & Auth */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/cart" className="relative hover:text-blue-600 transition">
            <span className="material-icons text-2xl">Carts</span>
            {cart.totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1 animate-ping">
                {cart.totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="relative group">
              <span className="cursor-pointer text-gray-800">Hi, {user.name}</span>
              <div className="absolute right-0 hidden group-hover:block bg-white border rounded shadow-md mt-2 py-2 w-32 transition-opacity duration-200 z-50">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/auth" className="text-blue-600 hover:underline transition">Login</Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 px-4 pb-4 overflow-hidden ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <form onSubmit={handleSearch} className="flex mb-4">
          <input
            type="text"
            className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        <nav className="space-y-2 text-gray-700">
          <Link to="/" className="block hover:text-blue-600 transition">Home</Link>
          <Link to="/products" className="block hover:text-blue-600 transition">Shop</Link>
          {isAuthenticated && (
            <Link to="/orders" className="block hover:text-blue-600 transition">My Orders</Link>
          )}
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="block hover:text-blue-600 transition">Profile</Link>
              <button onClick={logout} className="block text-left w-full hover:text-blue-600 transition">Logout</button>
            </>
          ) : (
            <Link to="/auth" className="block hover:text-blue-600 transition">Login</Link>
          )}
          <Link to="/cart" className="block hover:text-blue-600 transition">
            Cart ({cart.totalItems})
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
