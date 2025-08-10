import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      id: 1,
      title: "Discover Your Style",
      subtitle: "Curated Collections for Modern Living",
      description: "Explore our handpicked selection of premium products designed to elevate your lifestyle. From fashion to home essentials, find everything you need to express your unique personality.",
      ctaText: "Shop Now",
      ctaLink: "/",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
      gradient: "from-primary-600 via-secondary-500 to-accent-500"
    },
    {
      id: 2,
      title: "Premium Quality",
      subtitle: "Crafted for Excellence",
      description: "Every product in our collection is carefully selected for its exceptional quality and timeless design. Experience the difference that attention to detail makes.",
      ctaText: "Explore Quality",
      ctaLink: "/",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      gradient: "from-secondary-600 via-primary-500 to-accent-600"
    },
    {
      id: 3,
      title: "Sustainable Future",
      subtitle: "Eco-Conscious Choices",
      description: "Join us in creating a better tomorrow with our sustainable product line. Beautiful design meets environmental responsibility in every purchase.",
      ctaText: "Go Green",
      ctaLink: "/",
      image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80",
      gradient: "from-accent-600 via-primary-500 to-secondary-500"
    }
  ];

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: "Free Shipping",
      description: "On orders over $100"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Quality Guaranteed",
      description: "Premium products only"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: "Secure Payment",
      description: "100% safe checkout"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "24/7 Support",
      description: "Always here to help"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const currentHero = heroSlides[currentSlide];

  return (
    <div className="relative">
      {/* Main Hero Section */}
      <section className="relative min-h-[80vh] lg:min-h-[90vh] overflow-hidden">
        {/* Background with gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentHero.gradient} transition-all duration-1000`}>
          <div className="absolute inset-0 bg-black/20"></div>
          {/* Animated background patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full animate-float"></div>
            <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-white rounded-full animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-white rounded-full animate-float" style={{animationDelay: '4s'}}></div>
          </div>
        </div>

        <div className="relative z-10 container-responsive h-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh] lg:min-h-[90vh] py-16 lg:py-24">
            {/* Content */}
            <div className="text-center lg:text-left animate-slide-up">
              <h1 className="text-display-lg lg:text-display-xl font-serif text-white mb-6 leading-tight">
                {currentHero.title}
              </h1>
              <h2 className="text-heading-lg text-white/90 mb-6 font-light">
                {currentHero.subtitle}
              </h2>
              <p className="text-body-lg text-white/80 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {currentHero.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to={currentHero.ctaLink}>
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 border-0 shadow-modern-lg"
                  >
                    {currentHero.ctaText}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="lg"
                  className="text-white border-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-3xl transform rotate-6 scale-105"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-modern-xl">
                  <img 
                    src={currentHero.image}
                    alt={currentHero.title}
                    className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-modern-lg"
                  />
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 bg-secondary-500 text-white px-4 py-2 rounded-xl shadow-modern animate-glow">
                    <span className="text-sm font-semibold">New Collection</span>
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-accent-500 text-white px-4 py-2 rounded-xl shadow-modern animate-glow" style={{animationDelay: '1s'}}>
                    <span className="text-sm font-semibold">Limited Time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white shadow-modern' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <button 
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-responsive">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center group animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-modern">
                  {feature.icon}
                </div>
                <h3 className="text-heading-md font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-body-md text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-heading-xl text-white mb-4 font-serif">
              Stay in the Loop
            </h2>
            <p className="text-body-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Be the first to know about new collections, exclusive offers, and style inspiration delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-xl border-0 bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <Button 
                variant="secondary"
                className="bg-white text-primary-600 hover:bg-gray-100 border-0 whitespace-nowrap"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
