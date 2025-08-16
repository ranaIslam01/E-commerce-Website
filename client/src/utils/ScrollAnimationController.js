/**
 * Project Vibe - Sophisticated Scroll Animation Controller
 * Choreographed storytelling through scroll-triggered animations
 */

class ScrollAnimationController {
  constructor() {
    this.observers = new Map();
    this.elements = new Set();
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.init();
  }

  init() {
    // Create intersection observers for different animation types
    this.createObserver('scroll-trigger', {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    });

    this.createObserver('stagger-container', {
      threshold: 0.05,
      rootMargin: '0px 0px -5% 0px'
    });

    this.createObserver('mask-reveal', {
      threshold: 0.2,
      rootMargin: '0px 0px -15% 0px'
    });

    this.createObserver('parallax-trigger', {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: '0px'
    });

    // Start observing existing elements
    this.observeExistingElements();
    
    // Set up scroll-based parallax
    if (!this.isReducedMotion) {
      this.setupParallax();
    }
  }

  createObserver(className, options) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (this.isReducedMotion) {
          entry.target.classList.add('is-visible');
          return;
        }

        if (entry.isIntersecting) {
          this.handleIntersection(entry.target, className);
        }
      });
    }, options);

    this.observers.set(className, observer);
  }

  handleIntersection(element, className) {
    switch (className) {
      case 'scroll-trigger':
        this.triggerScrollAnimation(element);
        break;
      case 'stagger-container':
        this.triggerStaggeredAnimation(element);
        break;
      case 'mask-reveal':
        this.triggerMaskReveal(element);
        break;
      case 'parallax-trigger':
        this.updateParallaxElement(element);
        break;
      default:
        break;
    }
  }

  triggerScrollAnimation(element) {
    // Add a small delay for more natural feel
    setTimeout(() => {
      element.classList.add('is-visible');
    }, 50);

    // Unobserve after animation to improve performance
    setTimeout(() => {
      this.observers.get('scroll-trigger')?.unobserve(element);
    }, 1000);
  }

  triggerStaggeredAnimation(element) {
    element.classList.add('is-visible');
    
    // Optional: Add special effects for specific stagger containers
    if (element.classList.contains('product-grid')) {
      this.enhanceProductGridAnimation(element);
    }

    // Unobserve after stagger animation completes
    setTimeout(() => {
      this.observers.get('stagger-container')?.unobserve(element);
    }, 1500);
  }

  triggerMaskReveal(element) {
    element.classList.add('is-visible');
    
    // Add sound effect trigger (if audio is enabled)
    this.triggerAudioFeedback('reveal');

    setTimeout(() => {
      this.observers.get('mask-reveal')?.unobserve(element);
    }, 1200);
  }

  enhanceProductGridAnimation(gridElement) {
    const items = gridElement.querySelectorAll('.stagger-item');
    
    items.forEach((item, index) => {
      // Add subtle rotation for visual interest
      setTimeout(() => {
        if (!this.isReducedMotion) {
          item.style.transform += ' rotateY(0deg)';
          item.style.transition += ', transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
      }, index * 100);
    });
  }

  setupParallax() {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-layer');

      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        
        // Use transform3d for better performance
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // Method to observe new elements added to DOM
  observeElement(element) {
    if (this.elements.has(element)) return;

    this.elements.add(element);

    // Check which observers should watch this element
    this.observers.forEach((observer, className) => {
      if (element.classList.contains(className)) {
        observer.observe(element);
      }
    });
  }

  observeExistingElements() {
    this.observers.forEach((observer, className) => {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach(element => {
        observer.observe(element);
        this.elements.add(element);
      });
    });
  }

  // Utility methods for enhanced interactions
  triggerAudioFeedback(type) {
    // Placeholder for audio feedback system
    if (window.AudioContext && !this.isReducedMotion) {
      // Could implement subtle audio cues here
      console.log(`Audio feedback: ${type}`);
    }
  }

  // Add to cart animation
  animateAddToCart(productElement, cartElement) {
    if (this.isReducedMotion) return;

    const productRect = productElement.getBoundingClientRect();
    const cartRect = cartElement.getBoundingClientRect();
    
    // Create flying element
    const flyingElement = document.createElement('div');
    flyingElement.className = 'cart-fly-animation';
    flyingElement.style.left = `${productRect.left + productRect.width / 2}px`;
    flyingElement.style.top = `${productRect.top + productRect.height / 2}px`;
    
    // Add product image if available
    const productImg = productElement.querySelector('img');
    if (productImg) {
      flyingElement.style.backgroundImage = `url(${productImg.src})`;
      flyingElement.style.backgroundSize = 'cover';
      flyingElement.style.backgroundPosition = 'center';
    }

    document.body.appendChild(flyingElement);

    // Animate to cart
    const deltaX = cartRect.left - productRect.left;
    const deltaY = cartRect.top - productRect.top;

    flyingElement.style.setProperty('--target-x', `${deltaX}px`);
    flyingElement.style.setProperty('--target-y', `${deltaY}px`);

    // Custom CSS animation with calculated path
    flyingElement.style.animation = `
      flyToCart 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
      flyPath 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards
    `;

    // Remove element after animation
    setTimeout(() => {
      flyingElement.remove();
    }, 800);

    // Cart bounce effect
    cartElement.style.animation = 'cartBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    setTimeout(() => {
      cartElement.style.animation = '';
    }, 600);
  }

  // Cinematic page transitions
  transitionToPage(targetUrl, triggerElement) {
    if (this.isReducedMotion) {
      window.location.href = targetUrl;
      return;
    }

    // Create overlay for smooth transition
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--gradient-hero);
      z-index: 9999;
      clip-path: circle(0% at 50% 50%);
      transition: clip-path 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;

    document.body.appendChild(overlay);

    // Expand overlay
    requestAnimationFrame(() => {
      overlay.style.clipPath = 'circle(150% at 50% 50%)';
    });

    // Navigate after transition
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 400);
  }

  // Cleanup method
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.elements.clear();
  }
}

// CSS animations that work with the controller
const additionalCSS = `
@keyframes flyPath {
  0% {
    transform: translate(0, 0) scale(1) rotate(0deg);
  }
  50% {
    transform: translate(calc(var(--target-x) * 0.5), calc(var(--target-y) * 0.3 - 50px)) scale(0.8) rotate(180deg);
  }
  100% {
    transform: translate(var(--target-x), var(--target-y)) scale(0.3) rotate(360deg);
  }
}

@keyframes cartBounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
`;

// Add the additional CSS to the document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = additionalCSS;
  document.head.appendChild(style);
}

export default ScrollAnimationController;
