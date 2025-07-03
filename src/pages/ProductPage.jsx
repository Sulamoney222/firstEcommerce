import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import products from '../data/products';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProductDetails from '../components/ProductDetails';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
  AOS.init({
    duration: 800,
    once: true,
  });
}, []);
  
  // Find the product by ID
  const product = products.find(p => p.id === parseInt(id));
  
  // Handle case where product is not found
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Product Not Found</h2>
        <p className="text-lg text-gray-500 mb-6">The product you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    // Optional: Show a success message or navigate to cart
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  return (
   <div className="max-w-screen-xl mx-auto px-4 py-8" data-aos="fade-up">
  <div className="flex flex-col md:flex-row gap-8" data-aos="fade-up">
    
    {/* Product Image */}
    <div className="product-image-container w-full md:w-1/2" data-aos="zoom-in">
      <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
    </div>

    {/* Product Info */}
    <div className="product-info-container w-full md:w-1/2" data-aos="fade-left">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4">{product.name}</h1>

      {/* Product Meta */}
      <div className="product-meta mb-4" data-aos="fade-up">
        <div className="product-price text-xl font-semibold text-blue-600">${product.price.toFixed(2)}</div>
        <div className="product-rating text-sm text-gray-500 mt-1">
          <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
          <span className="rating-text ml-2">{product.rating} ({product.reviews} reviews)</span>
        </div>
      </div>

      {/* Stock Status */}
      <div className="product-stock mb-4" data-aos="fade-up">
        {product.stock > 0 ? (
          <span className="in-stock text-green-600">In Stock ({product.stock} available)</span>
        ) : (
          <span className="out-of-stock text-red-600">Out of Stock</span>
        )}
      </div>

      {/* Description */}
      <div className="product-description mb-6" data-aos="fade-up">
        <h3 className="text-xl font-semibold text-gray-800">Description</h3>
        <p className="text-gray-600 mt-2">{product.description}</p>
      </div>

      {/* Actions */}
      {product.stock > 0 && (
        <div className="product-actions flex items-center gap-4" data-aos="fade-up">
          <div className="quantity-selector">
            <label htmlFor="quantity" className="text-gray-700 mr-2">Quantity:</label>
            <input
              type="number"
              id="quantity"
              
              max={product.stock}
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            className="add-to-cart-btn px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      )}

      {/* Category */}
      <div className="product-category mt-6" data-aos="fade-up">
        <span className="font-semibold text-gray-800">Category: </span>
        <span className="text-gray-600">{product.category}</span>
      </div>
    </div>
  </div>

  {/* Related Products */}
  <div className="related-products mt-12" data-aos="fade-up">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">You might also like</h2>

    <div className="related-products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
        .map(relatedProduct => (
          <div
            key={relatedProduct.id}
            className="related-product-card cursor-pointer rounded-lg border border-gray-200 hover:shadow-lg transition duration-300"
            onClick={() => navigate(`/product/${relatedProduct.id}`)}
            data-aos="fade-up"
          >
            <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{relatedProduct.name}</h3>
              <span className="text-gray-600">${relatedProduct.price.toFixed(2)}</span>
            </div>
          </div>
        ))}
    </div>
  </div>
</div>
  )
};

export default ProductPage;
