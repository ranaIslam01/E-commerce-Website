import React, { createContext, useContext, useReducer } from 'react';

const WishlistContext = createContext();

const initialState = {
  wishlistItems: JSON.parse(localStorage.getItem('wishlistItems')) || []
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      const newItem = action.payload;
      const existingItem = state.wishlistItems.find(item => item._id === newItem._id);
      
      if (existingItem) {
        return state; // Item already in wishlist
      }
      
      const updatedWishlist = [...state.wishlistItems, { ...newItem, addedAt: Date.now() }];
      localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
      
      return {
        ...state,
        wishlistItems: updatedWishlist
      };

    case 'REMOVE_FROM_WISHLIST':
      const filteredWishlist = state.wishlistItems.filter(item => item._id !== action.payload._id);
      localStorage.setItem('wishlistItems', JSON.stringify(filteredWishlist));
      
      return {
        ...state,
        wishlistItems: filteredWishlist
      };

    case 'CLEAR_WISHLIST':
      localStorage.removeItem('wishlistItems');
      return {
        ...state,
        wishlistItems: []
      };

    case 'TOGGLE_WISHLIST':
      const productToToggle = action.payload;
      const isInWishlist = state.wishlistItems.find(item => item._id === productToToggle._id);
      
      if (isInWishlist) {
        // Remove from wishlist
        const filteredItems = state.wishlistItems.filter(item => item._id !== productToToggle._id);
        localStorage.setItem('wishlistItems', JSON.stringify(filteredItems));
        return {
          ...state,
          wishlistItems: filteredItems
        };
      } else {
        // Add to wishlist
        const newWishlist = [...state.wishlistItems, { ...productToToggle, addedAt: Date.now() }];
        localStorage.setItem('wishlistItems', JSON.stringify(newWishlist));
        return {
          ...state,
          wishlistItems: newWishlist
        };
      }

    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  const addToWishlist = (product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  const removeFromWishlist = (product) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product });
  };

  const toggleWishlist = (product) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (productId) => {
    return state.wishlistItems.some(item => item._id === productId);
  };

  const value = {
    wishlistItems: state.wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    isInWishlist,
    wishlistCount: state.wishlistItems.length
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
