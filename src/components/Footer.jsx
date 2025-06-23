import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <p className="text-sm">
              ShopReact is your go-to e-commerce store for high-quality products at unbeatable prices. We offer a wide range of items from electronics to fashion and everything in between!
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Useful Links</h3>
            <ul>
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-gray-400 hover:text-white">Shop</Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-gray-400 hover:text-white">Cart</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <ul>
              <li className="text-sm text-gray-400">Email: support@shopreact.com</li>
              <li className="text-sm text-gray-400">Phone: (123) 456-7890</li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-400 hover:text-white"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-400 hover:text-white"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-400 hover:text-white"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-400 hover:text-white"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ShopReact. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
