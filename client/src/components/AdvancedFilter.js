import React, { useState } from 'react';
import Button from './Button';

const AdvancedFilter = ({ onFilterChange, currentFilters, onClose }) => {
  const [filters, setFilters] = useState({
    priceRange: { min: currentFilters.minPrice || '', max: currentFilters.maxPrice || '' },
    categories: currentFilters.category ? [currentFilters.category] : [],
    brands: currentFilters.brands || [],
    rating: currentFilters.rating || '',
    availability: currentFilters.availability || 'all',
    sortBy: currentFilters.sort || 'featured',
    ...currentFilters
  });

  const categories = [
    { id: 'electronics', name: 'Electronics', count: 156 },
    { id: 'fashion', name: 'Fashion', count: 243 },
    { id: 'home', name: 'Home & Garden', count: 89 },
    { id: 'sports', name: 'Sports & Outdoors', count: 127 },
    { id: 'books', name: 'Books', count: 67 },
    { id: 'beauty', name: 'Beauty & Personal Care', count: 134 },
    { id: 'toys', name: 'Toys & Games', count: 78 },
    { id: 'automotive', name: 'Automotive', count: 45 }
  ];

  const brands = [
    { id: 'apple', name: 'Apple', count: 42 },
    { id: 'samsung', name: 'Samsung', count: 38 },
    { id: 'nike', name: 'Nike', count: 67 },
    { id: 'adidas', name: 'Adidas', count: 54 },
    { id: 'sony', name: 'Sony', count: 29 },
    { id: 'lg', name: 'LG', count: 31 },
    { id: 'hp', name: 'HP', count: 23 },
    { id: 'dell', name: 'Dell', count: 19 }
  ];

  const ratings = [
    { value: '4', label: '4★ & Up', count: 234 },
    { value: '3', label: '3★ & Up', count: 456 },
    { value: '2', label: '2★ & Up', count: 567 },
    { value: '1', label: '1★ & Up', count: 634 }
  ];

  const handleFilterChange = (filterType, value) => {
    let newFilters = { ...filters };

    switch (filterType) {
      case 'category':
        if (newFilters.categories.includes(value)) {
          newFilters.categories = newFilters.categories.filter(c => c !== value);
        } else {
          newFilters.categories = [...newFilters.categories, value];
        }
        break;
      case 'brand':
        if (newFilters.brands.includes(value)) {
          newFilters.brands = newFilters.brands.filter(b => b !== value);
        } else {
          newFilters.brands = [...newFilters.brands, value];
        }
        break;
      case 'rating':
        newFilters.rating = newFilters.rating === value ? '' : value;
        break;
      case 'availability':
        newFilters.availability = value;
        break;
      case 'priceRange':
        newFilters.priceRange = value;
        break;
      case 'sortBy':
        newFilters.sortBy = value;
        break;
      default:
        newFilters[filterType] = value;
    }

    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    const formattedFilters = {
      category: filters.categories.length > 0 ? filters.categories[0] : '',
      brands: filters.brands,
      rating: filters.rating,
      availability: filters.availability,
      sort: filters.sortBy,
      minPrice: filters.priceRange.min,
      maxPrice: filters.priceRange.max
    };

    onFilterChange(formattedFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      priceRange: { min: '', max: '' },
      categories: [],
      brands: [],
      rating: '',
      availability: 'all',
      sortBy: 'featured'
    };
    setFilters(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.categories.length > 0) count++;
    if (filters.brands.length > 0) count++;
    if (filters.rating) count++;
    if (filters.availability !== 'all') count++;
    if (filters.priceRange.min || filters.priceRange.max) count++;
    return count;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-modern-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-heading-lg font-bold text-gray-900">Advanced Filters</h2>
              {getActiveFilterCount() > 0 && (
                <span className="text-sm text-primary-600 font-medium">
                  {getActiveFilterCount()} filter{getActiveFilterCount() > 1 ? 's' : ''} active
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Price Range */}
          <div>
            <h3 className="text-heading-md font-semibold text-gray-900 mb-4">Price Range</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-2">Min Price</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.priceRange.min}
                    onChange={(e) => handleFilterChange('priceRange', { ...filters.priceRange, min: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="text-gray-400 font-bold mt-6">-</div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-2">Max Price</label>
                  <input
                    type="number"
                    placeholder="1000"
                    value={filters.priceRange.max}
                    onChange={(e) => handleFilterChange('priceRange', { ...filters.priceRange, max: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {[{ min: '', max: 50, label: 'Under $50' }, { min: 50, max: 100, label: '$50-$100' }, { min: 100, max: 250, label: '$100-$250' }, { min: 250, max: '', label: 'Over $250' }].map((range, index) => (
                  <button
                    key={index}
                    onClick={() => handleFilterChange('priceRange', { min: range.min, max: range.max })}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-primary-50 hover:border-primary-300 transition-colors"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-heading-md font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.id)}
                    onChange={() => handleFilterChange('category', category.id)}
                    className="w-5 h-5 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                  />
                  <span className="flex-1 text-gray-700">{category.name}</span>
                  <span className="text-sm text-gray-500">({category.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="text-heading-md font-semibold text-gray-900 mb-4">Brands</h3>
            <div className="grid grid-cols-2 gap-3">
              {brands.map((brand) => (
                <label key={brand.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand.id)}
                    onChange={() => handleFilterChange('brand', brand.id)}
                    className="w-5 h-5 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                  />
                  <span className="flex-1 text-gray-700">{brand.name}</span>
                  <span className="text-sm text-gray-500">({brand.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="text-heading-md font-semibold text-gray-900 mb-4">Customer Rating</h3>
            <div className="space-y-2">
              {ratings.map((rating) => (
                <label key={rating.value} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="rating"
                    value={rating.value}
                    checked={filters.rating === rating.value}
                    onChange={() => handleFilterChange('rating', rating.value)}
                    className="w-5 h-5 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="flex-1 text-gray-700">{rating.label}</span>
                  <span className="text-sm text-gray-500">({rating.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-heading-md font-semibold text-gray-900 mb-4">Availability</h3>
            <div className="space-y-2">
              {[
                { value: 'all', label: 'All Products' },
                { value: 'in_stock', label: 'In Stock Only' },
                { value: 'on_sale', label: 'On Sale' },
                { value: 'new_arrivals', label: 'New Arrivals' }
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="availability"
                    value={option.value}
                    checked={filters.availability === option.value}
                    onChange={() => handleFilterChange('availability', option.value)}
                    className="w-5 h-5 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h3 className="text-heading-md font-semibold text-gray-900 mb-4">Sort By</h3>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value="featured">Featured</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="rating">Best Rating</option>
              <option value="popular">Most Popular</option>
              <option value="name_asc">Name: A to Z</option>
              <option value="name_desc">Name: Z to A</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-6 rounded-b-3xl">
          <div className="flex gap-4">
            <Button variant="ghost" onClick={handleClearFilters} className="flex-1">
              Clear All
            </Button>
            <Button variant="primary" onClick={handleApplyFilters} className="flex-1">
              Apply Filters ({getActiveFilterCount()})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilter;
