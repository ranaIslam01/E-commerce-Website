import React, { useEffect, useReducer, useState, useRef } from 'react';
import axios from 'axios';
import CinematicHero from '../components/CinematicHero';
import SophisticatedProductGrid from '../components/SophisticatedProductGrid';
import Recommendations from '../components/Recommendations';
import AdvancedFilter from '../components/AdvancedFilter';
import Button from '../components/Button';
import ScrollAnimationController from '../utils/ScrollAnimationController';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, ...action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProjectVibeHomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured');
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get('minPrice') || '',
    max: searchParams.get('maxPrice') || ''
  });
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [viewMode, setViewMode] = useState('asymmetric'); // asymmetric, grid, list
  const scrollControllerRef = useRef(null);
  const limit = 12;

  const [{ loading, error, products, pages, total }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
    pages: 1,
    total: 0,
  });

  // Initialize sophisticated scroll animations
  useEffect(() => {
    scrollControllerRef.current = new ScrollAnimationController();
    window.ScrollAnimationController = scrollControllerRef.current;

    return () => {
      if (scrollControllerRef.current) {
        scrollControllerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const queryParams = new URLSearchParams({
          keyword,
          category,
          page: page.toString(),
          limit: limit.toString(),
          sort: sortBy,
          ...(priceRange.min && { minPrice: priceRange.min }),
          ...(priceRange.max && { maxPrice: priceRange.max }),
        });

        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL || ''}/api/products?${queryParams}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchProducts();
  }, [keyword, category, page, sortBy, priceRange]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    updateURL({ page: newPage });
    // Smooth scroll to top with sophisticated animation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (newCategory) => {
    setPage(1);
    updateURL({ category: newCategory, page: 1 });
  };

  const handleSortChange = (newSort) => {
    setPage(1);
    setSortBy(newSort);
    updateURL({ sort: newSort, page: 1 });
  };

  const handlePriceFilter = () => {
    setPage(1);
    updateURL({ 
      minPrice: priceRange.min || undefined, 
      maxPrice: priceRange.max || undefined, 
      page: 1 
    });
  };

  const clearFilters = () => {
    setPage(1);
    setSortBy('featured');
    setPriceRange({ min: '', max: '' });
    navigate('/');
  };

  const updateURL = (params) => {
    const newParams = new URLSearchParams(location.search);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== '' && value !== 1) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    navigate({ search: newParams.toString() });
  };

  const hasFilters = keyword || category || priceRange.min || priceRange.max || sortBy !== 'featured';

  const categories = [
    { name: 'All', value: '', icon: '🛍️', color: 'from-gray-400 to-gray-600' },
    { name: 'Electronics', value: 'electronics', icon: '📱', color: 'from-blue-400 to-blue-600' },
    { name: 'Fashion', value: 'fashion', icon: '👕', color: 'from-pink-400 to-pink-600' },
    { name: 'Home & Garden', value: 'home', icon: '🏠', color: 'from-green-400 to-green-600' },
    { name: 'Sports', value: 'sports', icon: '⚽', color: 'from-orange-400 to-orange-600' },
    { name: 'Books', value: 'books', icon: '📚', color: 'from-purple-400 to-purple-600' },
    { name: 'Beauty', value: 'beauty', icon: '💄', color: 'from-rose-400 to-rose-600' },
  ];

  const sortOptions = [
    { name: 'Featured', value: 'featured', icon: '⭐' },
    { name: 'Price: Low to High', value: 'price_asc', icon: '📈' },
    { name: 'Price: High to Low', value: 'price_desc', icon: '📉' },
    { name: 'Newest First', value: 'newest', icon: '🆕' },
    { name: 'Best Rating', value: 'rating', icon: '👑' },
    { name: 'Most Popular', value: 'popular', icon: '🔥' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Cinematic Hero Section - Only show when no search/filters */}
      {!hasFilters && <CinematicHero />}

      {/* Intentional Asymmetry Content Container */}
      <div className={`container-responsive ${hasFilters ? 'py-24' : 'py-16'}`}>
        
        {/* Sophisticated Search Results Header */}
        {keyword && (
          <div className="mb-12 scroll-trigger">
            <div className="text-center mb-8">
              <h1 className="hierarchy-primary text-gray-900 dark:text-white mb-4">
                Search Results
              </h1>
              <p className="text-body-lg text-gray-600 dark:text-gray-400 mb-2">
                Found <span className="font-semibold text-primary-600">{total}</span> results for
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-2xl shadow-modern">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="font-semibold">"{keyword}"</span>
              </div>
            </div>
          </div>
        )}

        {/* Sophisticated Category Filter Pills */}
        <div className="mb-12 scroll-trigger">
          <div className="text-center mb-8">
            <h2 className="hierarchy-secondary text-gray-900 dark:text-white mb-2">
              Explore Categories
            </h2>
            <p className="text-body-md text-gray-600 dark:text-gray-400">
              Discover curated collections tailored to your lifestyle
            </p>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {categories.map((cat, index) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`stagger-item whitespace-nowrap group relative overflow-hidden ${
                    category === cat.value ? 'active' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`px-6 py-4 rounded-2xl transition-all duration-500 ${
                    category === cat.value
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-modern-lg scale-105`
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-modern group-hover:scale-105'
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="font-semibold">{cat.name}</span>
                    </div>
                    
                    {/* Sophisticated hover effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${cat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl`} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Control Panel */}
        <div className="mb-12 scroll-trigger">
          <div className="asymmetric-grid items-center gap-6">
            
            {/* Filters Section */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Primary Controls */}
              <div className="flex flex-col lg:flex-row gap-6">
                
                {/* Sort Selection */}
                <div className="glass-effect p-6 rounded-2xl shadow-modern">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                    Sort by
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSortChange(option.value)}
                        className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          sortBy === option.value
                            ? 'bg-gradient-primary text-white shadow-modern'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-50 hover:text-primary-700'
                        }`}
                      >
                        <span className="mr-2">{option.icon}</span>
                        {option.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="glass-effect p-6 rounded-2xl shadow-modern">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Price Range
                  </h3>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      className="input-modern flex-1"
                    />
                    <div className="w-4 h-px bg-gray-300 dark:bg-gray-600" />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      className="input-modern flex-1"
                    />
                    <Button variant="primary" size="sm" onClick={handlePriceFilter}>
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* View Controls */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Advanced Filters Button */}
              <Button 
                variant="outline" 
                onClick={() => setShowAdvancedFilter(true)}
                className="w-full interactive-element"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                }
              >
                Advanced Filters
              </Button>

              {/* View Mode Toggle */}
              <div className="flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
                {[
                  { mode: 'asymmetric', icon: '⬜', label: 'Asymmetric' },
                  { mode: 'grid', icon: '⊞', label: 'Grid' },
                  { mode: 'list', icon: '☰', label: 'List' }
                ].map((view) => (
                  <button
                    key={view.mode}
                    onClick={() => setViewMode(view.mode)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      viewMode === view.mode
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                    title={view.label}
                  >
                    <span className="text-lg">{view.icon}</span>
                  </button>
                ))}
              </div>

              {/* Clear Filters */}
              {hasFilters && (
                <Button variant="ghost" onClick={clearFilters} className="w-full" size="sm">
                  Clear All Filters
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Sophisticated Product Display */}
        {loading ? (
          <div className="stagger-container">
            <div className="asymmetric-grid">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="stagger-item">
                  <div className="card-modern h-80 skeleton-vibe" />
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-16 scroll-trigger">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="hierarchy-secondary text-gray-900 dark:text-white mb-4">Something went wrong</h3>
              <p className="text-body-md text-gray-600 dark:text-gray-400 mb-8">{error}</p>
              <Button variant="primary" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </div>
        ) : products && products.length > 0 ? (
          <>
            {/* Results Summary */}
            <div className="flex justify-between items-center mb-8 scroll-trigger">
              <div className="flex items-center gap-4">
                <p className="text-body-md text-gray-600 dark:text-gray-400">
                  Showing <span className="font-semibold text-gray-900 dark:text-white">{(page - 1) * limit + 1} - {Math.min(page * limit, total)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{total}</span> products
                </p>
                {hasFilters && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">Filtered</span>
                  </div>
                )}
              </div>
            </div>

            {/* Sophisticated Product Grid */}
            <div className="mb-16">
              <SophisticatedProductGrid products={products} layout={viewMode} />
            </div>

            {/* Elegant Pagination */}
            {pages > 1 && (
              <div className="flex justify-center scroll-trigger">
                <div className="glass-effect p-6 rounded-2xl shadow-modern">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page <= 1}
                      className="interactive-element"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </Button>

                    <div className="flex gap-1 mx-4">
                      {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                        let pageNum;
                        if (pages <= 5) {
                          pageNum = i + 1;
                        } else if (page <= 3) {
                          pageNum = i + 1;
                        } else if (page >= pages - 2) {
                          pageNum = pages - 4 + i;
                        } else {
                          pageNum = page - 2 + i;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-12 h-12 rounded-xl font-semibold transition-all duration-300 interactive-element ${
                              pageNum === page
                                ? 'bg-gradient-primary text-white shadow-modern'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 hover:text-primary-600 shadow-sm'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page >= pages}
                      className="interactive-element"
                    >
                      Next
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 scroll-trigger">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="hierarchy-secondary text-gray-900 dark:text-white mb-4">No products found</h3>
              <p className="text-body-md text-gray-600 dark:text-gray-400 mb-8">
                {keyword 
                  ? `No products match your search for "${keyword}"`
                  : "No products available at the moment"
                }
              </p>
              {hasFilters ? (
                <Button variant="primary" onClick={clearFilters}>
                  Clear Filters
                </Button>
              ) : (
                <Link to="/">
                  <Button variant="primary">
                    Browse All Products
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* AI-Powered Recommendations - Only show when no search/filters */}
        {!hasFilters && products && products.length > 0 && (
          <div className="mt-24">
            <Recommendations type="general" />
          </div>
        )}
      </div>

      {/* Advanced Filter Modal */}
      {showAdvancedFilter && (
        <AdvancedFilter
          currentFilters={{
            category,
            sort: sortBy,
            minPrice: priceRange.min,
            maxPrice: priceRange.max
          }}
          onFilterChange={(newFilters) => {
            const params = new URLSearchParams();
            if (newFilters.category) params.set('category', newFilters.category);
            if (newFilters.sort && newFilters.sort !== 'featured') params.set('sort', newFilters.sort);
            if (newFilters.minPrice) params.set('minPrice', newFilters.minPrice);
            if (newFilters.maxPrice) params.set('maxPrice', newFilters.maxPrice);
            if (keyword) params.set('keyword', keyword);
            
            navigate({ search: params.toString() });
            
            setSortBy(newFilters.sort || 'featured');
            setPriceRange({
              min: newFilters.minPrice || '',
              max: newFilters.maxPrice || ''
            });
            setPage(1);
          }}
          onClose={() => setShowAdvancedFilter(false)}
        />
      )}
    </div>
  );
};

export default ProjectVibeHomePage;
