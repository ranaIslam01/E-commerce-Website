import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { Store } from '../context/Store';
import Button from '../components/Button';
import StarRating from '../components/StarRating';
import Price from '../components/Price';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = (product) => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.qty + 1 : 1;
    
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, qty: quantity },
    });
  };

  const moveAllToCart = () => {
    wishlistItems.forEach(item => {
      if (item.countInStock > 0) {
        addToCartHandler(item);
      }
    });
    clearWishlist();
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container-responsive py-16">
        <div className="max-w-md mx-auto text-center animate-slide-up">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-heading-xl text-gray-900 mb-4 font-serif">Your Wishlist is Empty</h2>
          <p className="text-body-lg text-gray-600 mb-8">
            Discover amazing products and save your favorites here for later.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">
              Start Shopping
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-responsive py-8">
      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-heading-xl text-gray-900 font-serif mb-2">My Wishlist</h1>
            <p className="text-body-lg text-gray-600">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved for later
            </p>
          </div>
          
          <div className="flex gap-3">
            {wishlistItems.length > 0 && (
              <>
                <Button variant="secondary" onClick={moveAllToCart}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Move All to Cart
                </Button>
                <Button variant="ghost" onClick={clearWishlist}>
                  Clear Wishlist
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="space-y-6">
        {wishlistItems.map((item, index) => (
          <div 
            key={item._id}
            className="bg-white rounded-2xl shadow-modern p-6 hover:shadow-modern-lg transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <Link to={`/product/${item._id}`}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full md:w-48 h-48 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Link to={`/product/${item._id}`}>
                      <h3 className="text-heading-md text-gray-900 hover:text-primary-600 transition-colors mb-2">
                        {item.name}
                      </h3>
                    </Link>
                    
                    {/* Category */}
                    {item.category && (
                      <span className="inline-block text-xs text-primary-600 font-semibold uppercase tracking-wide mb-2">
                        {item.category}
                      </span>
                    )}
                    
                    {/* Rating */}
                    <div className="mb-3">
                      <StarRating 
                        rating={item.rating || 4.5} 
                        numReviews={item.numReviews || 0}
                        size="sm"
                      />
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(item)}
                    className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <Price 
                    price={item.price}
                    originalPrice={item.originalPrice}
                    size="md"
                  />
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  {item.countInStock > 0 ? (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600 font-medium">In Stock</span>
                      {item.countInStock < 10 && (
                        <span className="text-xs text-gray-500">({item.countInStock} left)</span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-red-600 font-medium">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {item.countInStock > 0 ? (
                    <Button
                      onClick={() => {
                        addToCartHandler(item);
                        removeFromWishlist(item);
                      }}
                      variant="primary"
                      className="flex-1 sm:flex-none"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Cart
                    </Button>
                  ) : (
                    <Button variant="outline" disabled className="flex-1 sm:flex-none">
                      Out of Stock
                    </Button>
                  )}
                  
                  <Link to={`/product/${item._id}`}>
                    <Button variant="secondary" className="w-full sm:w-auto">
                      View Details
                    </Button>
                  </Link>
                </div>

                {/* Added Date */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Added on {new Date(item.addedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div className="mt-16 animate-slide-up">
        <div className="text-center mb-8">
          <h2 className="text-heading-lg text-gray-900 font-serif mb-4">You Might Also Like</h2>
          <p className="text-body-md text-gray-600">Discover more products based on your interests</p>
        </div>
        
        <div className="text-center">
          <Link to="/">
            <Button variant="secondary" size="lg">
              Explore More Products
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
