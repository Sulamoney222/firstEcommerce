import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth', { state: { from: '/checkout' } });
    }
  }, [isAuthenticated, navigate]);
  
  // Redirect if cart is empty
  React.useEffect(() => {
    if (cart.items.length === 0) {
      navigate('/cart');
    }
  }, [cart.items.length, navigate]);
  
  const [formData, setFormData] = useState({
    firstName: user?.name.split(' ')[0] || '',
    lastName: user?.name.split(' ')[1] || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const validateStep1 = () => {
    const newErrors = {};
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode', 'country'];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Zip code validation
    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid zip code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep2 = () => {
    const newErrors = {};
    
    if (paymentMethod === 'credit') {
      if (!formData.cardName) newErrors.cardName = 'Name on card is required';
      
      if (!formData.cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid card number';
      }
      
      if (!formData.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      }
      
      if (!formData.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };
  
  const handlePreviousStep = () => {
    setStep(step - 1);
  };
  
  const handlePlaceOrder = () => {
    // In a real app, you would send the order to your backend
    // For this demo, we'll simulate a successful order
    
    // Generate a random order ID
    const randomOrderId = 'ORD-' + Math.random().toString(36).substring(2, 12).toUpperCase();
    setOrderId(randomOrderId);
    
    // Clear the cart
    clearCart();
    
    // Mark order as placed
    setOrderPlaced(true);
  };
  
  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <div className="bg-green-100 p-8 rounded-lg shadow-md w-96 text-center">
          <div className="text-green-600 text-4xl">✓</div>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Thank You for Your Order!</h1>
          <p className="text-gray-600">Your order has been placed successfully.</p>
          <div className="mt-4">
            <span className="text-lg">Order Number:</span>
            <strong className="text-xl">{orderId}</strong>
          </div>
          <p className="mt-2 text-gray-600">We have sent a confirmation email to <strong>{formData.email}</strong></p>
          <button 
            className="mt-6 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Checkout</h1>
      
      <div className="flex justify-between mb-6">
        <div className={`text-center flex-1 ${step >= 1 ? 'text-green-500' : 'text-gray-400'}`}>
          <div className="text-lg">1</div>
          <p className="text-sm">Shipping</p>
        </div>
        <div className="flex items-center justify-center space-x-2 flex-1">
          <div className={`h-1 w-full ${step >= 2 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          <div className={`text-center ${step >= 2 ? 'text-green-500' : 'text-gray-400'}`}>
            <div className="text-lg">2</div>
            <p className="text-sm">Payment</p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2 flex-1">
          <div className={`h-1 w-full ${step >= 3 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          <div className={`text-center ${step >= 3 ? 'text-green-500' : 'text-gray-400'}`}>
            <div className="text-lg">3</div>
            <p className="text-sm">Review</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="space-y-6">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-lg text-gray-700"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-lg text-gray-700"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-lg text-gray-700"
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-lg text-gray-700"
                />
                {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-lg text-gray-700"
                  />
                  {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-lg text-gray-700"
                  />
                  {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-lg text-gray-700"
                  />
                  {errors.zipCode && <p className="text-red-500 text-xs">{errors.zipCode}</p>}
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-lg text-gray-700"
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                  {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}
                </div>
              </div>
              
              <div className="mt-4 text-right">
                <button 
                  className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition"
                  onClick={handleNextStep}
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">Payment Information</h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="credit"
                    name="paymentMethod"
                    value="credit"
                    checked={paymentMethod === 'credit'}
                    onChange={() => setPaymentMethod('credit')}
                    className="mr-2"
                  />
                  <label htmlFor="credit" className="text-sm font-medium text-gray-700">Credit Card</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="mr-2"
                  />
                  <label htmlFor="paypal" className="text-sm font-medium text-gray-700">PayPal</label>
                </div>
              </div>

              {paymentMethod === 'credit' && (
                <div>
                  <div className="mt-4">
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">Name on Card</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border rounded-lg text-gray-700"
                    />
                    {errors.cardName && <p className="text-red-500 text-xs">{errors.cardName}</p>}
                  </div>
                  
                  <div className="mt-4">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      className="mt-1 block w-full px-3 py-2 border rounded-lg text-gray-700"
                    />
                    {errors.cardNumber && <p className="text-red-500 text-xs">{errors.cardNumber}</p>}
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date (MM/YY)</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="mt-1 block w-full px-3 py-2 border rounded-lg text-gray-700"
                      />
                      {errors.expiryDate && <p className="text-red-500 text-xs">{errors.expiryDate}</p>}
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        className="mt-1 block w-full px-3 py-2 border rounded-lg text-gray-700"
                      />
                      {errors.cvv && <p className="text-red-500 text-xs">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 text-right">
                <button 
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition mr-4"
                  onClick={handlePreviousStep}
                >
                  Back
                </button>
                <button 
                  className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition"
                  onClick={handleNextStep}
                >
                  Continue to Review
                </button>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">Review Your Order</h2>
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Shipping Information</h3>
                <p>{formData.firstName} {formData.lastName}</p>
                <p>{formData.address}</p>
                <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                <p>{formData.country}</p>
                
                <h3 className="text-lg font-medium text-gray-700">Payment Information</h3>
                <p>{formData.cardName}</p>
                <p>{formData.cardNumber.replace(/\d(?=\d{4})/g, "•")}</p>
                
                <div className="mt-6 text-right">
                  <button 
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition mr-4"
                    onClick={handlePreviousStep}
                  >
                    Back
                  </button>
                  <button 
                    className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
