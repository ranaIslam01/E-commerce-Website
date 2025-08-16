import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import StarRating from './StarRating';
import Price from './Price';
import Button from './Button';

const SophisticatedProductGrid = ({ products, layout = 'asymmetric' }) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const gridRef = useRef(null);

  // Intersection observer for staggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.stagger-item');
      items.forEach((item) => observer.observe(item));
    }

    return () => observer.disconnect();
  }, [products]);

  const getGridItemClass = (index, layout) => {
    if (layout === 'asymmetric') {
      // Intentional asymmetry pattern
      if (index === 0) return 'lg:col-span-6 lg:row-span-2 featured-large';
      if (index === 1 || index === 2) return 'lg:col-span-3 featured-medium';
      if (index === 3) return 'lg:col-span-4 lg:row-span-1';
      if (index === 4) return 'lg:col-span-2 lg:row-span-1';
      return 'lg:col-span-3 standard';
    }
    return 'standard';
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const handleAddToCart = (product, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Trigger sophisticated add to cart animation
    const productElement = event.currentTarget.closest('.product-card-vibe');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (productElement && cartIcon && window.ScrollAnimationController) {
      window.ScrollAnimationController.animateAddToCart(productElement, cartIcon);
    }
  };

  return (
    <>
      {/* Main Product Grid */}
      <div 
        ref={gridRef}
        className={`stagger-container product-grid ${
          layout === 'asymmetric' 
            ? 'asymmetric-grid grid-cols-1 lg:grid-cols-6 auto-rows-fr' 
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'
        }`}
      >
        {products.map((product, index) => (
          <ProductCardVibe
            key={product._id}
            product={product}
            index={index}
            layout={layout}
            isHovered={hoveredProduct === product._id}
            onHover={setHoveredProduct}
            onQuickView={handleQuickView}
            onAddToCart={handleAddToCart}
            className={`stagger-item ${getGridItemClass(index, layout)}`}
          />
        ))}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct} 
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
};

const ProductCardVibe = ({ 
  product, 
  index, 
  layout, 
  isHovered, 
  onHover, 
  onQuickView, 
  onAddToCart, 
  className 
}) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const isFeatured = className.includes('featured-large');
  const isMediumFeatured = className.includes('featured-medium');

  return (
    <div 
      className={`product-card-vibe group relative ${className} cursor-pointer`}
      ref={cardRef}
      onMouseEnter={() => onHover(product._id)}
      onMouseLeave={() => {
        onHover(null);
        setIsFlipped(false);
      }}
      onClick={() => onQuickView(product)}
    >
      {/* Card Container with Sophisticated Effects */}
      <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-modern hover:shadow-modern-xl transition-all duration-700 interactive-element">
        
        {/* Image Container with Mask Reveal */}
        <div className={`relative overflow-hidden ${
          isFeatured ? 'h-96 lg:h-full' : isMediumFeatured ? 'h-80' : 'h-64'
        }`}>
          
          {/* Image Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton-vibe bg-gray-200 dark:bg-gray-700" />
          )}

          {/* Main Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />

          {/* Hover Overlay with Mask Reveal */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

          {/* Product Badges */}
          <div className="absolute top-4 left-4 space-y-2 z-10">
            {product.isNew && (
              <span className="badge-modern bg-gradient-primary text-white px-3 py-1 rounded-full text-xs font-bold animate-scale-in">
                NEW
              </span>
            )}
            {product.discount && (
              <span className="badge-modern bg-gradient-secondary text-white px-3 py-1 rounded-full text-xs font-bold animate-scale-in">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full transition-all duration-300 z-20 interactive-element ${
              isInWishlist(product._id)
                ? 'bg-red-500 text-white shadow-modern'
                : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
            aria-label={`${isInWishlist(product._id) ? 'Remove from' : 'Add to'} wishlist`}
          >
            <svg className="w-5 h-5" fill={isInWishlist(product._id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Quick Action Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/20 backdrop-blur-sm">
            <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              
              {/* Quick View */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onQuickView(product);
                }}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 hover:bg-white hover:scale-110 transition-all duration-300 interactive-element"
                aria-label="Quick view"
              >
                <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>

              {/* Add to Cart */}
              {product.countInStock > 0 && (
                <button
                  onClick={(e) => onAddToCart(product, e)}
                  className="w-12 h-12 bg-gradient-primary rounded-full text-white hover:scale-110 transition-all duration-300 interactive-element add-to-cart-trigger"
                  aria-label="Add to cart"
                >
                  <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* 360° Indicator for Featured Products */}
          {isFeatured && (
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-500">
              360° View Available
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className={`p-6 ${isFeatured ? 'space-y-4' : 'space-y-3'}`}>
          
          {/* Category */}
          {product.category && (
            <span className="hierarchy-accent text-primary-600">
              {product.category}
            </span>
          )}

          {/* Product Name */}
          <Link to={`/product/${product._id}`}>
            <h3 className={`font-semibold text-gray-900 dark:text-white hover:text-primary-600 transition-colors line-clamp-2 ${
              isFeatured ? 'text-xl' : 'text-lg'
            }`}>
              {product.name}
            </h3>
          </Link>

          {/* Rating for Featured Products */}
          {(isFeatured || isMediumFeatured) && (
            <div className="flex items-center gap-3">
              <StarRating rating={product.rating || 4.5} numReviews={product.numReviews || 0} size="sm" />
              {product.numReviews > 0 && (
                <span className="text-sm text-gray-500">({product.numReviews})</span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <Price 
              price={product.price}
              originalPrice={product.originalPrice}
              size={isFeatured ? 'lg' : 'md'}
            />
            
            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                product.countInStock > 0 ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className={`text-xs font-medium ${
                product.countInStock > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Description for Featured Products */}
          {isFeatured && product.description && (
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Quick Add for Non-Featured */}
          {!isFeatured && !isMediumFeatured && product.countInStock > 0 && (
            <Button
              onClick={(e) => onAddToCart(product, e)}
              variant="outline"
              size="sm"
              fullWidth
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 interactive-element"
            >
              Quick Add
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </Button>
          )}
        </div>

        {/* Sophisticated Hover Border */}
        <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-primary-200 dark:group-hover:ring-primary-600/30 transition-all duration-500 pointer-events-none" />
      </div>
    </div>
  );
};

const QuickViewModal = ({ product, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-modern-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quick View</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* 360° Viewer Placeholder */}
            <div className="flex items-center justify-center p-4 bg-gradient-primary rounded-xl text-white">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="font-medium">360° View</span>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <span className="hierarchy-accent text-primary-600">{product.category}</span>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>
              <StarRating rating={product.rating || 4.5} numReviews={product.numReviews || 0} />
            </div>

            <Price price={product.price} originalPrice={product.originalPrice} size="xl" />

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description || 'Premium quality product with exceptional features and design.'}
            </p>

            {/* Actions */}
            <div className="space-y-4">
              <Button variant="primary" size="lg" fullWidth className="btn-vibe">
                Add to Cart
              </Button>
              <Link to={`/product/${product._id}`}>
                <Button variant="secondary" size="lg" fullWidth>
                  View Full Details
                </Button>
              </Link>
            </div>

            {/* Product Features */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Product Features</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Premium Quality Materials
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Free Shipping & Returns
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  1 Year Warranty
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SophisticatedProductGrid;
