import React, { useState, useEffect, useContext } from 'react';
import { Store } from '../context/Store';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from './ProductCard';
import Button from './Button';

const Recommendations = ({ currentProduct = null, type = 'general' }) => {
  const { state } = useContext(Store);
  const { wishlistItems } = useWishlist();
  const { cart, userInfo } = state;

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock recommendation engine - in real app, this would be AI-powered
  const generateRecommendations = () => {
    // Mock products for recommendations
    const mockProducts = [
      {
        _id: 'rec1',
        name: 'Premium Wireless Headphones',
        price: 199.99,
        originalPrice: 249.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
        rating: 4.8,
        numReviews: 324,
        category: 'Electronics',
        countInStock: 15
      },
      {
        _id: 'rec2',
        name: 'Smart Watch Series 8',
        price: 399.99,
        originalPrice: 449.99,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80',
        rating: 4.7,
        numReviews: 567,
        category: 'Electronics',
        countInStock: 8
      },
      {
        _id: 'rec3',
        name: 'Designer Running Shoes',
        price: 129.99,
        originalPrice: 179.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
        rating: 4.6,
        numReviews: 892,
        category: 'Fashion',
        countInStock: 23
      },
      {
        _id: 'rec4',
        name: 'Laptop Stand Pro',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80',
        rating: 4.5,
        numReviews: 156,
        category: 'Electronics',
        countInStock: 12
      },
      {
        _id: 'rec5',
        name: 'Organic Coffee Blend',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80',
        rating: 4.9,
        numReviews: 234,
        category: 'Food',
        countInStock: 45
      },
      {
        _id: 'rec6',
        name: 'Minimalist Desk Lamp',
        price: 79.99,
        originalPrice: 99.99,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        rating: 4.4,
        numReviews: 78,
        category: 'Home',
        countInStock: 18
      }
    ];

    let filteredProducts = [...mockProducts];

    // Filter based on recommendation type
    switch (type) {
      case 'similar':
        if (currentProduct) {
          filteredProducts = mockProducts.filter(p => 
            p.category === currentProduct.category && p._id !== currentProduct._id
          );
        }
        break;
      case 'frequently_bought':
        // Simulate frequently bought together logic
        filteredProducts = mockProducts.slice(0, 3);
        break;
      case 'recently_viewed':
        // Simulate recently viewed products
        const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        filteredProducts = mockProducts.filter(p => 
          recentlyViewed.includes(p._id)
        ).slice(0, 4);
        break;
      case 'trending':
        // Simulate trending products
        filteredProducts = mockProducts.sort((a, b) => b.numReviews - a.numReviews).slice(0, 6);
        break;
      default:
        // Personalized recommendations based on user behavior
        if (userInfo) {
          // Simulate personalization based on cart and wishlist
          const userCategories = [
            ...cart.cartItems.map(item => item.category),
            ...wishlistItems.map(item => item.category)
          ];
          
          if (userCategories.length > 0) {
            const preferredCategories = [...new Set(userCategories)];
            filteredProducts = mockProducts.filter(p => 
              preferredCategories.includes(p.category)
            );
          }
        }
    }

    return filteredProducts.slice(0, 6);
  };

  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const recs = generateRecommendations();
      setRecommendations(recs);
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, currentProduct, cart.cartItems, wishlistItems, userInfo]);

  const getSectionTitle = () => {
    switch (type) {
      case 'similar':
        return 'Similar Products';
      case 'frequently_bought':
        return 'Frequently Bought Together';
      case 'recently_viewed':
        return 'Recently Viewed';
      case 'trending':
        return 'Trending Now';
      default:
        return userInfo ? `Recommended for ${userInfo.name}` : 'Recommended Products';
    }
  };

  const getSectionDescription = () => {
    switch (type) {
      case 'similar':
        return 'Products similar to what you\'re viewing';
      case 'frequently_bought':
        return 'Customers who bought this item also bought';
      case 'recently_viewed':
        return 'Continue where you left off';
      case 'trending':
        return 'What\'s popular right now';
      default:
        return 'Handpicked just for you based on your preferences';
    }
  };

  if (loading) {
    return (
      <div className="py-16">
        <div className="container-responsive">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-96"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 aspect-square rounded-2xl mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-heading-xl text-gray-900 font-serif mb-4">
            {getSectionTitle()}
          </h2>
          <p className="text-body-lg text-gray-600 max-w-2xl mx-auto">
            {getSectionDescription()}
          </p>
        </div>

        {/* AI Insight Badge */}
        {userInfo && type === 'general' && (
          <div className="flex justify-center mb-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary text-white rounded-full text-sm font-medium shadow-modern">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              AI-Powered Recommendations
            </div>
          </div>
        )}

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((product, index) => (
            <div 
              key={product._id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View More Button */}
        {type === 'general' && (
          <div className="text-center mt-12 animate-slide-up">
            <Button variant="secondary" size="lg">
              Discover More Products
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
        )}

        {/* Personalization Settings */}
        {userInfo && type === 'general' && (
          <div className="mt-16 p-8 bg-white rounded-3xl shadow-modern animate-slide-up">
            <div className="text-center">
              <h3 className="text-heading-md text-gray-900 mb-4">Improve Your Recommendations</h3>
              <p className="text-body-md text-gray-600 mb-6 max-w-2xl mx-auto">
                Help us personalize your shopping experience by telling us about your preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Customize Preferences
                </Button>
                <Button variant="ghost">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  How It Works
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Recommendations;
