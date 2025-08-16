import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const DarkModeToggle = ({ size = 'md', showLabel = false, className = '' }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const sizeClasses = {
    'sm': 'w-12 h-6',
    'md': 'w-14 h-7', 
    'lg': 'w-16 h-8'
  };

  const iconSizeClasses = {
    'sm': 'w-4 h-4',
    'md': 'w-5 h-5',
    'lg': 'w-6 h-6'
  };

  const textSizeClasses = {
    'sm': 'text-sm',
    'md': 'text-base',
    'lg': 'text-lg'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showLabel && (
        <span className={`${textSizeClasses[size]} font-medium text-gray-700 dark:text-gray-300`}>
          {isDarkMode ? 'Dark' : 'Light'} Mode
        </span>
      )}
      
      <button
        onClick={toggleDarkMode}
        className={`
          relative inline-flex items-center ${sizeClasses[size]} rounded-full 
          transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 
          ${isDarkMode 
            ? 'bg-primary-600 focus:ring-primary-500/20' 
            : 'bg-gray-300 focus:ring-gray-400/20'
          }
          hover:scale-105 active:scale-95
        `}
        role="switch"
        aria-checked={isDarkMode}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        {/* Toggle Background */}
        <span className="sr-only">Toggle dark mode</span>
        
        {/* Toggle Circle */}
        <span
          className={`
            inline-block ${size === 'sm' ? 'h-5 w-5' : size === 'md' ? 'h-6 w-6' : 'h-7 w-7'} 
            rounded-full bg-white shadow-lg transform transition-all duration-300 ease-in-out
            flex items-center justify-center
            ${isDarkMode 
              ? `translate-x-${size === 'sm' ? '6' : size === 'md' ? '7' : '8'}` 
              : 'translate-x-0.5'
            }
          `}
        >
          {/* Icon */}
          {isDarkMode ? (
            // Moon icon
            <svg className={`${iconSizeClasses[size]} text-primary-600`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            // Sun icon
            <svg className={`${iconSizeClasses[size]} text-yellow-500`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          )}
        </span>

        {/* Background Animation */}
        <div 
          className={`
            absolute inset-0 rounded-full transition-all duration-300
            ${isDarkMode 
              ? 'bg-gradient-to-r from-primary-400 to-primary-600' 
              : 'bg-gradient-to-r from-yellow-300 to-yellow-400'
            }
            opacity-0 hover:opacity-20
          `}
        />
      </button>

      {/* Tooltip */}
      <div className="relative group">
        <div 
          className={`
            absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
            px-2 py-1 text-xs text-white bg-gray-900 rounded-lg
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
            pointer-events-none whitespace-nowrap z-50
          `}
        >
          Switch to {isDarkMode ? 'light' : 'dark'} mode
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  );
};

export default DarkModeToggle;
