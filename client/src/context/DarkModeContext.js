import React, { createContext, useContext, useReducer, useEffect } from 'react';

const DarkModeContext = createContext();

const initialState = {
  isDarkMode: localStorage.getItem('darkMode') === 'true' || 
              (localStorage.getItem('darkMode') === null && 
               window.matchMedia && 
               window.matchMedia('(prefers-color-scheme: dark)').matches)
};

const darkModeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      const newMode = !state.isDarkMode;
      localStorage.setItem('darkMode', newMode.toString());
      return {
        ...state,
        isDarkMode: newMode
      };
    
    case 'SET_DARK_MODE':
      localStorage.setItem('darkMode', action.payload.toString());
      return {
        ...state,
        isDarkMode: action.payload
      };
    
    case 'SET_SYSTEM_PREFERENCE':
      if (localStorage.getItem('darkMode') === null) {
        return {
          ...state,
          isDarkMode: action.payload
        };
      }
      return state;
    
    default:
      return state;
  }
};

export const DarkModeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(darkModeReducer, initialState);

  useEffect(() => {
    // Apply dark mode class to document
    if (state.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', state.isDarkMode ? '#0a0a0b' : '#ffffff');
    }
  }, [state.isDarkMode]);

  useEffect(() => {
    // Listen for system color scheme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      dispatch({ type: 'SET_SYSTEM_PREFERENCE', payload: e.matches });
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  const setDarkMode = (isDark) => {
    dispatch({ type: 'SET_DARK_MODE', payload: isDark });
  };

  const value = {
    isDarkMode: state.isDarkMode,
    toggleDarkMode,
    setDarkMode
  };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};
