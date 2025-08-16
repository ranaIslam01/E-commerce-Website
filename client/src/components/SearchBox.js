import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBox = ({ onSearch, className = '' }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentSearches] = useState(['iPhone', 'Laptop', 'Headphones', 'Camera']);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 1) {
        setLoading(true);
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL || ''}/api/products/search-suggestions?q=${query}`
          );
          setSuggestions(data || []);
        } catch (error) {
          // Fallback suggestions if API fails
          setSuggestions([
            { _id: '1', name: `${query} - Product 1`, category: 'Electronics' },
            { _id: '2', name: `${query} - Product 2`, category: 'Fashion' },
            { _id: '3', name: `${query} - Product 3`, category: 'Home' }
          ]);
        }
        setLoading(false);
      } else {
        setSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query);
    }
  };

  const performSearch = (searchQuery) => {
    setShowSuggestions(false);
    if (onSearch) {
      onSearch();
    }
    navigate(`/?keyword=${encodeURIComponent(searchQuery)}`);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    performSearch(suggestion.name);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const highlightMatch = (text, searchTerm) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() ? 
        <span key={index} className="bg-primary-100 text-primary-800 font-semibold">{part}</span> : part
    );
  };

  return (
    <div ref={searchRef} className={`relative w-full max-w-2xl ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleInputFocus}
            placeholder="Search for products..."
            className="w-full pl-12 pr-16 py-3 rounded-2xl border-0 bg-white shadow-modern text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:shadow-modern-lg transition-all duration-300"
          />
          
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Loading/Clear Button */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {loading && (
              <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            )}
            {query && !loading && (
              <button
                type="button"
                onClick={clearSearch}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              type="submit"
              className="p-2 bg-gradient-primary text-white rounded-xl hover:shadow-modern transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-modern-xl border border-gray-100 z-50 max-h-96 overflow-y-auto"
        >
          {query.length === 0 && recentSearches.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Recent Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => performSearch(term)}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-primary-100 hover:text-primary-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.length > 0 && suggestions.length > 0 && (
            <div className="p-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                Products
              </h3>
              {suggestions.slice(0, 6).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-50 rounded-xl text-left transition-colors group"
                >
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-white text-sm font-semibold">
                    {suggestion.name?.charAt(0) || 'P'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {highlightMatch(suggestion.name || 'Product', query)}
                    </div>
                    {suggestion.category && (
                      <div className="text-xs text-gray-500">
                        in {suggestion.category}
                      </div>
                    )}
                  </div>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          )}

          {query.length > 0 && suggestions.length === 0 && !loading && (
            <div className="p-8 text-center">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 text-sm">No products found for "{query}"</p>
              <button
                onClick={handleSubmit}
                className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Search anyway
              </button>
            </div>
          )}

          {/* Quick Actions */}
          {query.length > 0 && (
            <div className="border-t border-gray-100 p-3">
              <div className="flex gap-2">
                <button
                  onClick={handleSubmit}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-xl hover:bg-primary-100 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search for "{query}"
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
