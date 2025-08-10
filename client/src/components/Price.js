import React from 'react';

const Price = ({ 
  price, 
  originalPrice, 
  currency = '$', 
  size = 'md',
  showCurrency = true,
  discount = null,
  className = ''
}) => {
  const sizeClasses = {
    'sm': 'text-lg',
    'md': 'text-2xl', 
    'lg': 'text-3xl',
    'xl': 'text-4xl'
  };

  const originalSizeClasses = {
    'sm': 'text-sm',
    'md': 'text-base',
    'lg': 'text-lg', 
    'xl': 'text-xl'
  };

  const discountSizeClasses = {
    'sm': 'text-xs px-1.5 py-0.5',
    'md': 'text-sm px-2 py-1',
    'lg': 'text-base px-2.5 py-1',
    'xl': 'text-lg px-3 py-1.5'
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const calculateDiscount = () => {
    if (originalPrice && price < originalPrice) {
      return Math.round(((originalPrice - price) / originalPrice) * 100);
    }
    return discount;
  };

  const discountPercentage = calculateDiscount();

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-baseline gap-2">
        <span className={`price-display font-bold ${sizeClasses[size]} text-primary-600`}>
          {showCurrency && currency}{formatPrice(price)}
        </span>
        {originalPrice && originalPrice > price && (
          <span className={`${originalSizeClasses[size]} text-gray-500 line-through font-medium`}>
            {showCurrency && currency}{formatPrice(originalPrice)}
          </span>
        )}
      </div>
      
      {discountPercentage && discountPercentage > 0 && (
        <span className={`badge-modern ${discountSizeClasses[size]} bg-gradient-secondary text-white rounded-full font-semibold`}>
          -{discountPercentage}%
        </span>
      )}
    </div>
  );
};

export default Price;
