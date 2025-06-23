import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6 mt-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              ShopReact is your go-to e-commerce store for high-quality products at unbeatable prices. 
              From electronics to fashion and more, we have something for everyone!
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-gray-400 hover:text-white transition">Shop</Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-gray-400 hover:text-white transition">Cart</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: support@shopreact.com</li>
              <li>Phone: (123) 456-7890</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-gray-400 text-xl">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-gray-400 text-xl">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-gray-400 text-xl">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-gray-400 text-xl">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-gray-700 mt-10 pt-4 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ShopReact. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
