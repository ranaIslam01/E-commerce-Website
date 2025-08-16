import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const CinematicHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const heroRef = useRef(null);
  const slideRefs = useRef([]);

  // Sophisticated hero slides with intentional asymmetry
  const heroSlides = useMemo(() => [
    {
      id: 1,
      title: "Redefine Your Style",
      subtitle: "Where Elegance Meets Innovation",
      description: "Experience fashion that transcends trends. Our curated collection speaks to those who dare to be different.",
      ctaText: "Discover Collection",
      ctaSecondary: "Watch Story",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=90",
      imageAlt: "Elegant fashion model in sophisticated attire",
      theme: "elegant",
      textPosition: "left",
      overlay: "gradient-dark"
    },
    {
      id: 2,
      title: "Innovation Unleashed", 
      subtitle: "Technology That Inspires",
      description: "From concept to creation, every product is engineered for those who demand excellence without compromise.",
      ctaText: "Explore Tech",
      ctaSecondary: "See Innovation",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200&q=90",
      imageAlt: "Cutting-edge technology and modern design",
      theme: "tech",
      textPosition: "right",
      overlay: "gradient-blue"
    },
    {
      id: 3,
      title: "Sustainable Future",
      subtitle: "Conscious Choices, Lasting Impact", 
      description: "Join the movement towards responsible luxury. Every purchase contributes to a better tomorrow.",
      ctaText: "Shop Sustainable",
      ctaSecondary: "Our Mission",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=90",
      imageAlt: "Sustainable and eco-friendly products",
      theme: "sustainable",
      textPosition: "center",
      overlay: "gradient-green"
    }
  ], []);

  const [progress, setProgress] = useState(0);
  const slideInterval = 8000; // 8 seconds per slide

  // Preload images for smooth transitions
  useEffect(() => {
    heroSlides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, [heroSlides]);

  const advanceSlide = useCallback(() => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setProgress(0);

    setTimeout(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
      setIsTransitioning(false);
    }, 600);
  }, [isTransitioning, heroSlides.length]);

  // Auto-advance slides with progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        advanceSlide();
      }
    }, slideInterval);

    return () => clearInterval(interval);
  }, [currentSlide, isTransitioning, advanceSlide, slideInterval]);

  // Progress bar animation
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / (slideInterval / 50));
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [currentSlide, slideInterval]);

  const goToSlide = (index) => {
    if (index === currentSlide || isTransitioning) return;
    
    setIsTransitioning(true);
    setProgress(0);
    
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 600);
  };

  const currentHero = heroSlides[currentSlide];

  return (
    <div className="hero-cinematic relative overflow-hidden" ref={heroRef}>
      {/* Background Layers with Parallax */}
      <div className="parallax-container absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            ref={el => slideRefs.current[index] = el}
            className={`hero-slide parallax-layer ${
              index === currentSlide ? 'active' : ''
            } ${isTransitioning && index === currentSlide ? 'exiting' : ''}`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          >
            {/* Sophisticated Overlay */}
            <div className={`absolute inset-0 ${slide.overlay} opacity-60`} />
            
            {/* Mask Reveal Elements */}
            <div className="mask-reveal absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
            </div>
          </div>
        ))}
      </div>

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/20 rotate-45 animate-float opacity-30" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 border border-white/15 rotate-12 animate-float opacity-20" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/10 rounded-full animate-float opacity-25" style={{animationDelay: '4s'}} />
      </div>

      {/* Main Content with Intentional Asymmetry */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container-responsive w-full">
          <div className={`grid lg:grid-cols-12 gap-12 items-center h-full min-h-[80vh] ${
            currentHero.textPosition === 'right' ? 'lg:grid-flow-col-dense' : ''
          }`}>
            
            {/* Content Section */}
            <div className={`
              ${currentHero.textPosition === 'center' ? 'lg:col-span-12 text-center' : 'lg:col-span-7'}
              ${currentHero.textPosition === 'right' ? 'lg:col-start-6' : ''}
              hero-content space-y-8
            `}>
              
              {/* Accent Label */}
              <div className="hierarchy-accent text-white/80 scroll-trigger">
                {currentHero.theme.toUpperCase()} COLLECTION
              </div>

              {/* Main Headline with Mask Reveal */}
              <div className="mask-reveal-diagonal">
                <h1 className="hierarchy-primary text-white mb-6">
                  {currentHero.title}
                </h1>
              </div>

              {/* Subtitle */}
              <h2 className="hierarchy-secondary text-white/90 mb-8 scroll-trigger max-w-2xl">
                {currentHero.subtitle}
              </h2>

              {/* Description with Breathing Room */}
              <p className="text-body-lg text-white/80 mb-12 scroll-trigger max-w-xl leading-relaxed">
                {currentHero.description}
              </p>

              {/* Sophisticated CTAs */}
              <div className="flex flex-col sm:flex-row gap-6 scroll-trigger">
                <Link to="/products">
                  <Button 
                    variant="primary" 
                    size="lg"
                    className="btn-vibe interactive-element min-w-[200px]"
                  >
                    {currentHero.ctaText}
                    <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                </Link>
                
                <button className="group flex items-center text-white hover:text-white/80 transition-all duration-300 interactive-element">
                  <div className="w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <span className="font-medium">{currentHero.ctaSecondary}</span>
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-8 pt-8 scroll-trigger">
                <div className="text-center">
                  <div className="hierarchy-secondary text-white">250K+</div>
                  <div className="text-sm text-white/60">Happy Customers</div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <div className="hierarchy-secondary text-white">4.9★</div>
                  <div className="text-sm text-white/60">Average Rating</div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <div className="hierarchy-secondary text-white">98%</div>
                  <div className="text-sm text-white/60">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Visual Element (if not center layout) */}
            {currentHero.textPosition !== 'center' && (
              <div className={`
                lg:col-span-5 
                ${currentHero.textPosition === 'right' ? 'lg:col-start-1' : ''}
                hidden lg:block
              `}>
                <div className="mask-reveal-circle">
                  <div className="relative">
                    {/* Floating product showcase or visual element */}
                    <div className="w-full h-96 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                      <div className="p-8 h-full flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">Innovation Showcase</h3>
                          <p className="text-white/70">Experience the future</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sophisticated Navigation */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex items-center gap-6">
          
          {/* Slide Indicators */}
          <div className="flex gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative w-12 h-1 rounded-full transition-all duration-500 ${
                  index === currentSlide 
                    ? 'bg-white' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentSlide && (
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3 ml-6">
            <button
              onClick={() => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 flex items-center justify-center interactive-element"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={advanceSlide}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 flex items-center justify-center interactive-element"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-30">
        <div className="flex flex-col items-center text-white/60 animate-bounce">
          <span className="text-sm mb-2 rotate-90 origin-center">Scroll</span>
          <svg className="w-4 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Performance Optimization: Preload next slide */}
      <link 
        rel="preload" 
        as="image" 
        href={heroSlides[(currentSlide + 1) % heroSlides.length].image}
      />
    </div>
  );
};

export default CinematicHero;
