import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const HomePage = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique categories
  const categories = ['All', ...new Set(products.map(product => product.category))];

  // Filter products when category or search query changes
  useEffect(() => {
    let result = products;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(result);

    //AOS animation
    AOS.init({once:true, duration:2000})
  }, [selectedCategory, searchQuery]);

  //animations
  useGSAP(()=>{
      gsap.to('.first',{opacity:1, duration:2})
  },[])

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="first opacity-0 hero-section text-white text-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-900 to-black rounded-lg shadow-2xl">
  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
    Quality Products for Every Lifestyle
  </h1>
  <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto mb-8 text-gray-300">
    Explore a handpicked selection of premium goods tailored to meet your everyday needs.
    Whether you're shopping for tech, fashion, or home essentials — we've got you covered with quality, value, and style.
  </p>
  <img
    className="mx-auto w-full max-w-md sm:max-w-lg rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
    src="https://tse2.mm.bing.net/th?id=OIP.mLA4jktqRrEYmgjHodFuPgHaE8&pid=Api&P=0&h=180"
    alt="E-commerce promotional banner"
  />
</div>


      {/* Filters Section */}
      <div className="filters-section flex flex-col md:flex-row items-center justify-between mt-8">
        {/* Search Bar */}
        <div className="search-bar w-full md:w-1/3 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Filters */}
        <div className="category-filters flex flex-wrap gap-2 md:gap-4">
          {categories.map(category => (
            <button
            data-aos='flip-left'
              key={category}
              className={`category-btn px-4 py-2 rounded-lg text-sm font-medium focus:outline-none transition duration-300 ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-green-100 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="products-container border grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-products col-span-full text-center">
            <p className="text-lg text-gray-500">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
