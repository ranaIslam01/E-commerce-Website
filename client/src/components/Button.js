import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-gradient-primary text-white shadow-modern hover:shadow-modern-lg hover:-translate-y-1 focus:ring-primary-500 active:translate-y-0',
    secondary: 'bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:shadow-modern hover:-translate-y-0.5 focus:ring-primary-500',
    accent: 'bg-gradient-secondary text-white shadow-modern hover:shadow-modern-lg hover:-translate-y-1 focus:ring-secondary-500 active:translate-y-0',
    outline: 'bg-transparent border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-modern hover:shadow-modern-lg hover:-translate-y-1 focus:ring-red-500',
    success: 'bg-accent-500 text-white hover:bg-accent-600 shadow-modern hover:shadow-modern-lg hover:-translate-y-1 focus:ring-accent-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
    md: 'px-6 py-3 text-base rounded-xl gap-2',
    lg: 'px-8 py-4 text-lg rounded-xl gap-2.5',
    xl: 'px-10 py-5 text-xl rounded-2xl gap-3'
  };

  const widthClasses = fullWidth ? 'w-full' : '';
  
  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${widthClasses}
    ${className}
  `.trim();

  const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <button 
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {!loading && icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
};

export default Button;
