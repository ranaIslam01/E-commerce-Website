import React from 'react';

const StarRating = ({ rating, numReviews, size = 'md', showCount = true, interactive = false }) => {
  const sizeClasses = {
    'sm': 'w-3 h-3',
    'md': 'w-4 h-4', 
    'lg': 'w-5 h-5',
    'xl': 'w-6 h-6'
  };

  const textSizeClasses = {
    'sm': 'text-xs',
    'md': 'text-sm',
    'lg': 'text-base',
    'xl': 'text-lg'
  };

  const renderStar = (filled, half = false) => (
    <svg 
      className={`${sizeClasses[size]} rating-star ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`} 
      fill={filled || half ? '#fbbf24' : '#e5e7eb'} 
      viewBox="0 0 20 20"
    >
      {half ? (
        <defs>
          <linearGradient id="half-star">
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#e5e7eb" />
          </linearGradient>
        </defs>
      ) : null}
      <path 
        fill={half ? 'url(#half-star)' : undefined}
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" 
      />
    </svg>
  );

  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(renderStar(true));
  }

  // Half star
  if (hasHalfStar) {
    stars.push(renderStar(false, true));
  }

  // Empty stars
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(renderStar(false));
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {stars.map((star, index) => (
          <span key={index}>{star}</span>
        ))}
      </div>
      {showCount && numReviews > 0 && (
        <span className={`${textSizeClasses[size]} text-gray-600 ml-1`}>
          ({numReviews})
        </span>
      )}
    </div>
  );
};

export default StarRating;
