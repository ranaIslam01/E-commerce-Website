import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../context/Store';
import StarRating from './StarRating';
import Price from './Price';
import Button from './Button';

const ProductCard = ({ product }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const isInCart = cart.cartItems.some(item => item._id === product._id);
  
  const addToCartHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToCart(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.qty + 1 : 1;
    
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, qty: quantity },
    });
    
    setIsAddingToCart(false);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  const getBadges = () => {
    const badges = [];
    
    // Calculate if product is on sale
    const originalPrice = product.originalPrice || product.price * 1.2;
    if (originalPrice > product.price) {
      const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);
      badges.push({ text: `-${discount}%`, color: 'bg-gradient-secondary', position: 'top-left' });
    }
    
    // New product badge
    const isNew = new Date(product.createdAt || Date.now()) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    if (isNew) {
      badges.push({ text: 'NEW', color: 'bg-gradient-primary', position: 'top-right' });
    }
    
    // Low stock badge
    if (product.countInStock && product.countInStock < 5) {
      badges.push({ text: `Only ${product.countInStock} left`, color: 'bg-red-500', position: 'bottom-right' });
    }
    
    return badges;
  };

  const badges = getBadges();

  return (
    <div className="group relative">
      <div className="card-product group bg-white rounded-2xl overflow-hidden shadow-modern hover:shadow-modern-xl transition-all duration-500">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {/* Skeleton loader */}
          {!isImageLoaded && (
            <div className="absolute inset-0 skeleton animate-pulse"></div>
          )}
          
          {/* Product Image */}
          <Link to={`/product/${product._id}`}>
            <img 
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              src={product.image} 
              alt={product.name}
              onLoad={() => setIsImageLoaded(true)}
              loading="lazy"
            />
          </Link>

          {/* Badges */}
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`absolute ${
                badge.position === 'top-left' ? 'top-3 left-3' :
                badge.position === 'top-right' ? 'top-3 right-3' :
                badge.position === 'bottom-left' ? 'bottom-3 left-3' :
                'bottom-3 right-3'
              } ${badge.color} text-white text-xs font-bold px-2 py-1 rounded-lg shadow-modern animate-scale-in z-10`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {badge.text}
            </div>
          ))}

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-20 ${
              isWishlisted 
                ? 'bg-red-500 text-white shadow-modern' 
                : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-red-50 hover:text-red-500'
            } ${badges.some(b => b.position === 'top-right') ? 'top-12' : ''}`}
          >
            <svg className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="absolute bottom-4 left-4 right-4 space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <button
                onClick={handleQuickView}
                className="w-full bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-xl font-medium hover:bg-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Quick View
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          {/* Category */}
          {product.category && (
            <span className="inline-block text-xs text-primary-600 font-semibold uppercase tracking-wide mb-2">
              {product.category}
            </span>
          )}

          {/* Product Name */}
          <Link to={`/product/${product._id}`}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors duration-300">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="mb-3">
            <StarRating 
              rating={product.rating || 4.5} 
              numReviews={product.numReviews || 0}
              size="sm"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <Price 
              price={product.price}
              originalPrice={product.originalPrice}
              size="md"
            />
          </div>

          {/* Stock Status */}
          <div className="mb-4">
            {product.countInStock > 0 ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">In Stock</span>
                {product.countInStock < 10 && (
                  <span className="text-xs text-gray-500">({product.countInStock} left)</span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-red-600 font-medium">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="space-y-2">
            {product.countInStock > 0 ? (
              <Button
                onClick={addToCartHandler}
                variant={isInCart ? "accent" : "primary"}
                size="md"
                fullWidth
                loading={isAddingToCart}
                className="group"
              >
                {isAddingToCart ? (
                  'Adding...'
                ) : isInCart ? (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    In Cart
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </Button>
            ) : (
              <Button variant="outline" size="md" fullWidth disabled>
                Out of Stock
              </Button>
            )}
          </div>
        </div>

        {/* Hover Effects */}
        <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-primary-200 transition-all duration-300 pointer-events-none"></div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-modern-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="relative p-6">
              <button
                onClick={() => setShowQuickView(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h2>
                  <StarRating rating={product.rating || 4.5} numReviews={product.numReviews || 0} />
                  <div className="mt-4">
                    <Price price={product.price} originalPrice={product.originalPrice} size="lg" />
                  </div>
                  <p className="text-gray-600 mt-4 mb-6">
                    {product.description || 'Premium quality product with exceptional features and design.'}
                  </p>
                  <div className="space-y-3">
                    <Button onClick={addToCartHandler} variant="primary" size="lg" fullWidth>
                      Add to Cart
                    </Button>
                    <Link to={`/product/${product._id}`}>
                      <Button variant="secondary" size="lg" fullWidth>
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
