import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register forms
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Show password toggle
  
  const { login, register, isAuthenticated, error, clearError, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from || '/';
      navigate(from);
    }
  }, [isAuthenticated, navigate, location]);
  
  // Show backend errors
  useEffect(() => {
    if (error) {
      setFormError(error);
    }
  }, [error]);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleForm = () => {
    setIsLogin(!isLogin); // Switch between login and register forms
    clearError(); // Clear errors when switching forms
    setFormError('');
  };

  // Validate form input
  const validateForm = () => {
    if (!email || !password) {
      setFormError('All fields are required');
      return false;
    }
    
    if (!isLogin) {
      if (password !== confirmPassword) {
        setFormError('Passwords do not match');
        return false;
      }
      
      if (password.length < 6) {
        setFormError('Password must be at least 6 characters');
        return false;
      }
      
      if (!name) {
        setFormError('Name is required');
        return false;
      }
    }
    
    setFormError('');
    return true;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return; // Don't submit if form is invalid
    
    if (isLogin) {
      login(email, password); // Call login function from context
    } else {
      register(name, email, password); // Call register function from context
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">{isLogin ? 'Login' : 'Create Account'}</h1>
          <div className="mt-2">
            <span className="text-sm text-gray-600">
              {isLogin ? 'New to ShopReact?' : 'Already have an account?'}
            </span>
            <button 
              className="text-sm text-blue-500 font-semibold ml-1"
              onClick={toggleForm}
              disabled={loading}
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </div>
        </div>

        {formError && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field only visible in registration form */}
          {!isLogin && (
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm text-gray-600">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Email field */}
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password field */}
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gray-600"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Confirm password field (only in register form) */}
          {!isLogin && (
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Submit button */}
          <button 
            type="submit" 
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        {/* Forgot password link for login form */}
        {isLogin && (
          <div className="mt-4">
            <button className="text-sm text-blue-500 hover:underline">
              Forgot your password?
            </button>
          </div>
        )}

        {/* Benefits of creating an account */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">Benefits of Creating an Account</h2>
          <ul className="space-y-2 text-sm text-gray-600 mt-3">
            <li>Faster checkout process</li>
            <li>Save multiple shipping addresses</li>
            <li>Access to order history</li>
            <li>Track your orders easily</li>
            <li>Receive exclusive offers and promotions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
