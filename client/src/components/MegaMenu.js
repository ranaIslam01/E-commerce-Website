import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MegaMenu = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState('electronics');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory] = useState(['iPhone', 'Gaming Laptop', 'Wireless Headphones', 'Smart Watch']);
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Sophisticated category structure
  const categories = {
    electronics: {
      name: 'Electronics',
      icon: '📱',
      featured: {
        title: 'Latest Tech',
        subtitle: 'Innovation at its finest',
        image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&q=80',
        link: '/electronics/featured'
      },
      sections: [
        {
          title: 'Mobile & Tablets',
          links: [
            { name: 'Smartphones', href: '/electronics/smartphones', hot: true },
            { name: 'Tablets', href: '/electronics/tablets' },
            { name: 'Smartwatches', href: '/electronics/smartwatches', new: true },
            { name: 'Accessories', href: '/electronics/mobile-accessories' }
          ]
        },
        {
          title: 'Computers',
          links: [
            { name: 'Laptops', href: '/electronics/laptops' },
            { name: 'Desktops', href: '/electronics/desktops' },
            { name: 'Gaming PCs', href: '/electronics/gaming-pcs', hot: true },
            { name: 'Components', href: '/electronics/components' }
          ]
        },
        {
          title: 'Audio & Video',
          links: [
            { name: 'Headphones', href: '/electronics/headphones' },
            { name: 'Speakers', href: '/electronics/speakers' },
            { name: 'Cameras', href: '/electronics/cameras' },
            { name: 'TVs', href: '/electronics/tvs' }
          ]
        }
      ]
    },
    fashion: {
      name: 'Fashion',
      icon: '👕',
      featured: {
        title: 'Spring Collection',
        subtitle: 'Fresh styles for the season',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80',
        link: '/fashion/spring-collection'
      },
      sections: [
        {
          title: "Women's",
          links: [
            { name: 'Dresses', href: '/fashion/womens/dresses' },
            { name: 'Tops & Blouses', href: '/fashion/womens/tops' },
            { name: 'Bottoms', href: '/fashion/womens/bottoms' },
            { name: 'Outerwear', href: '/fashion/womens/outerwear' }
          ]
        },
        {
          title: "Men's",
          links: [
            { name: 'Shirts', href: '/fashion/mens/shirts' },
            { name: 'Pants', href: '/fashion/mens/pants' },
            { name: 'Suits', href: '/fashion/mens/suits', trending: true },
            { name: 'Casual Wear', href: '/fashion/mens/casual' }
          ]
        },
        {
          title: 'Accessories',
          links: [
            { name: 'Bags', href: '/fashion/accessories/bags' },
            { name: 'Jewelry', href: '/fashion/accessories/jewelry' },
            { name: 'Watches', href: '/fashion/accessories/watches' },
            { name: 'Shoes', href: '/fashion/accessories/shoes' }
          ]
        }
      ]
    },
    home: {
      name: 'Home & Living',
      icon: '🏠',
      featured: {
        title: 'Smart Home',
        subtitle: 'Connected living solutions',
        image: 'https://images.unsplash.com/photo-1558618666-fcde92c9c181?w=400&q=80',
        link: '/home/smart-home'
      },
      sections: [
        {
          title: 'Furniture',
          links: [
            { name: 'Sofas & Chairs', href: '/home/furniture/seating' },
            { name: 'Tables', href: '/home/furniture/tables' },
            { name: 'Bedroom', href: '/home/furniture/bedroom' },
            { name: 'Storage', href: '/home/furniture/storage' }
          ]
        },
        {
          title: 'Decor',
          links: [
            { name: 'Lighting', href: '/home/decor/lighting' },
            { name: 'Wall Art', href: '/home/decor/wall-art' },
            { name: 'Plants', href: '/home/decor/plants', trending: true },
            { name: 'Textiles', href: '/home/decor/textiles' }
          ]
        },
        {
          title: 'Kitchen',
          links: [
            { name: 'Appliances', href: '/home/kitchen/appliances' },
            { name: 'Cookware', href: '/home/kitchen/cookware' },
            { name: 'Dining', href: '/home/kitchen/dining' },
            { name: 'Storage', href: '/home/kitchen/storage' }
          ]
        }
      ]
    }
  };

  // NLP-powered search simulation
  const nlpSearch = useCallback(async (query) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Mock NLP processing and results
    const mockResults = [
      {
        type: 'product',
        id: 1,
        name: `${query} Pro Max`,
        category: 'Electronics',
        price: '$999',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&q=80',
        relevance: 0.95
      },
      {
        type: 'product',
        id: 2,
        name: `Premium ${query}`,
        category: 'Electronics',
        price: '$799',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80',
        relevance: 0.88
      },
      {
        type: 'category',
        name: `${query} Collection`,
        count: 24,
        href: `/search?q=${encodeURIComponent(query)}`
      },
      {
        type: 'suggestion',
        text: `Best ${query} deals`,
        href: `/deals?category=${encodeURIComponent(query)}`
      }
    ];

    setSearchResults(mockResults);
    setIsSearching(false);
  }, []);

  // Debounced search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      nlpSearch(searchQuery);
    }, 200);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, nlpSearch]);

  // Handle clicks outside menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Focus search on open
  useEffect(() => {
    if (isOpen && searchRef.current) {
      setTimeout(() => searchRef.current.focus(), 100);
    }
  }, [isOpen]);

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div 
        ref={menuRef}
        className="absolute top-20 left-0 right-0 bg-white dark:bg-gray-900 shadow-modern-xl border-t border-gray-200 dark:border-gray-700 animate-slide-up"
      >
        {/* Search Section */}
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="container-responsive py-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                What are you looking for?
              </h2>
              
              {/* Advanced Search Bar */}
              <div className="relative">
                <div className="relative">
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search with natural language... (e.g., 'wireless headphones under $200')"
                    className="w-full pl-12 pr-16 py-4 text-lg rounded-2xl border-0 bg-white dark:bg-gray-700 shadow-modern text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary-500/20"
                  />
                  
                  {/* Search Icon */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  {/* Loading/Voice Search */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    {isSearching && (
                      <div className="loading-elegant" />
                    )}
                    <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Search Results Dropdown */}
                {searchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-modern-xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto z-10">
                    {searchResults.length > 0 ? (
                      <div className="p-4">
                        {searchResults.map((result, index) => (
                          <div
                            key={index}
                            onClick={() => result.type === 'product' ? navigate(`/product/${result.id}`) : navigate(result.href)}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                          >
                            {result.type === 'product' ? (
                              <>
                                <img src={result.image} alt={result.name} className="w-12 h-12 rounded-lg object-cover" />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 dark:text-white">{result.name}</h4>
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span>{result.category}</span>
                                    <span>•</span>
                                    <span className="font-semibold text-primary-600">{result.price}</span>
                                  </div>
                                </div>
                                <div className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                                  {Math.round(result.relevance * 100)}% match
                                </div>
                              </>
                            ) : result.type === 'category' ? (
                              <>
                                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                  </svg>
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 dark:text-white">{result.name}</h4>
                                  <p className="text-sm text-gray-500">{result.count} products</p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                                  <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                  </svg>
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 dark:text-white">{result.text}</h4>
                                  <p className="text-sm text-gray-500">Suggested search</p>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : searchQuery && !isSearching ? (
                      <div className="p-8 text-center">
                        <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-500">No results found for "{searchQuery}"</p>
                        <button
                          onClick={() => handleSearch(searchQuery)}
                          className="mt-2 text-primary-600 hover:text-primary-700 font-medium"
                        >
                          Search anyway
                        </button>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              {/* Search History */}
              {!searchQuery && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Recent Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {searchHistory.map((term, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchQuery(term)}
                        className="px-4 py-2 bg-white dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 hover:text-primary-700 transition-colors border border-gray-200 dark:border-gray-600"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="container-responsive py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Category Navigation */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
              <nav className="space-y-2">
                {Object.entries(categories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      activeCategory === key
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                    <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </nav>
            </div>

            {/* Category Content */}
            <div className="lg:col-span-3">
              {categories[activeCategory] && (
                <div className="grid md:grid-cols-4 gap-8">
                  
                  {/* Featured Section */}
                  <div className="md:col-span-1">
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-primary p-6 text-white mask-reveal">
                      <div className="relative z-10">
                        <h4 className="text-lg font-semibold mb-2">{categories[activeCategory].featured.title}</h4>
                        <p className="text-white/80 text-sm mb-4">{categories[activeCategory].featured.subtitle}</p>
                        <Link
                          to={categories[activeCategory].featured.link}
                          className="inline-flex items-center text-sm font-medium hover:underline"
                          onClick={onClose}
                        >
                          Explore
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                      <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `url(${categories[activeCategory].featured.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                    </div>
                  </div>

                  {/* Category Sections */}
                  <div className="md:col-span-3 grid md:grid-cols-3 gap-8">
                    {categories[activeCategory].sections.map((section, index) => (
                      <div key={index} className="stagger-item scroll-trigger">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{section.title}</h4>
                        <ul className="space-y-3">
                          {section.links.map((link, linkIndex) => (
                            <li key={linkIndex}>
                              <Link
                                to={link.href}
                                onClick={onClose}
                                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                              >
                                <span>{link.name}</span>
                                {link.hot && (
                                  <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">HOT</span>
                                )}
                                {link.new && (
                                  <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-bold">NEW</span>
                                )}
                                {link.trending && (
                                  <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full font-bold">TRENDING</span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="grid md:grid-cols-4 gap-6">
              <Link
                to="/deals"
                onClick={onClose}
                className="flex items-center gap-3 p-4 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 transition-colors group"
              >
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 dark:text-red-300">Special Deals</h4>
                  <p className="text-sm text-red-600 dark:text-red-400">Up to 70% off</p>
                </div>
              </Link>

              <Link
                to="/new-arrivals"
                onClick={onClose}
                className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">New Arrivals</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Latest products</p>
                </div>
              </Link>

              <Link
                to="/trending"
                onClick={onClose}
                className="flex items-center gap-3 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 transition-colors group"
              >
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">Trending</h4>
                  <p className="text-sm text-purple-600 dark:text-purple-400">What's popular</p>
                </div>
              </Link>

              <Link
                to="/gift-cards"
                onClick={onClose}
                className="flex items-center gap-3 p-4 rounded-xl bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 transition-colors group"
              >
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 0v1m0 0V9a2 2 0 11-2 0V8a2 2 0 11-2 0v1m2-1V6a2 2 0 112 0v1m0 0V9a2 2 0 11-2 0V8a2 2 0 11-2 0" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-300">Gift Cards</h4>
                  <p className="text-sm text-green-600 dark:text-green-400">Perfect gifts</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center z-10"
          aria-label="Close menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MegaMenu;
