/**
 * Project Vibe - Performance Optimization for Core Web Vitals
 * Ensures lightning-fast load times while maintaining sophisticated animations
 */

class PerformanceOptimizer {
  constructor() {
    this.metrics = {
      LCP: null,
      FID: null,
      CLS: null
    };
    this.observers = new Map();
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.init();
  }

  init() {
    // Initialize Core Web Vitals monitoring
    this.initLCPObserver();
    this.initFIDObserver();
    this.initCLSObserver();
    
    // Optimize images
    this.initImageOptimization();
    
    // Optimize animations
    this.optimizeAnimations();
    
    // Resource hints
    this.addResourceHints();
    
    // Service Worker for caching
    this.initServiceWorker();
  }

  // Largest Contentful Paint optimization
  initLCPObserver() {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.LCP = lastEntry.startTime;
      
      // Optimize based on LCP
      if (this.metrics.LCP > 2500) {
        this.optimizeLCP();
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
    this.observers.set('lcp', observer);
  }

  // First Input Delay optimization
  initFIDObserver() {
    if (!('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        this.metrics.FID = entry.processingStart - entry.startTime;
        
        // Optimize based on FID
        if (this.metrics.FID > 100) {
          this.optimizeFID();
        }
      });
    });

    observer.observe({ entryTypes: ['first-input'] });
    this.observers.set('fid', observer);
  }

  // Cumulative Layout Shift optimization
  initCLSObserver() {
    if (!('PerformanceObserver' in window)) return;

    let clsValue = 0;
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.metrics.CLS = clsValue;
      
      // Optimize based on CLS
      if (this.metrics.CLS > 0.1) {
        this.optimizeCLS();
      }
    });

    observer.observe({ entryTypes: ['layout-shift'] });
    this.observers.set('cls', observer);
  }

  // LCP Optimization strategies
  optimizeLCP() {
    console.log('Optimizing LCP...');
    
    // Preload critical images
    this.preloadCriticalImages();
    
    // Optimize font loading
    this.optimizeFontLoading();
    
    // Reduce render-blocking resources
    this.reducerRenderBlocking();
  }

  // FID Optimization strategies
  optimizeFID() {
    console.log('Optimizing FID...');
    
    // Break up long tasks
    this.breakupLongTasks();
    
    // Optimize third-party code
    this.optimizeThirdParty();
    
    // Use web workers for heavy computations
    this.useWebWorkers();
  }

  // CLS Optimization strategies
  optimizeCLS() {
    console.log('Optimizing CLS...');
    
    // Set image dimensions
    this.setImageDimensions();
    
    // Reserve space for dynamic content
    this.reserveSpaceForContent();
    
    // Optimize font loading
    this.optimizeFontLoading();
  }

  // Image optimization
  initImageOptimization() {
    // Lazy loading with Intersection Observer
    const images = document.querySelectorAll('img[data-src]');
    
    if (!images.length) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          this.loadImage(img);
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    images.forEach(img => imageObserver.observe(img));
  }

  loadImage(img) {
    return new Promise((resolve, reject) => {
      const imageUrl = img.dataset.src;
      
      // Create optimized image with WebP fallback
      const picture = document.createElement('picture');
      
      // WebP source
      const webpSource = document.createElement('source');
      webpSource.srcset = this.convertToWebP(imageUrl);
      webpSource.type = 'image/webp';
      
      // Fallback
      const fallbackImg = document.createElement('img');
      fallbackImg.src = imageUrl;
      fallbackImg.alt = img.alt;
      fallbackImg.className = img.className;
      
      // Add loading states
      fallbackImg.onload = () => {
        img.classList.add('loaded');
        resolve();
      };
      
      fallbackImg.onerror = reject;
      
      picture.appendChild(webpSource);
      picture.appendChild(fallbackImg);
      
      img.parentNode.replaceChild(picture, img);
    });
  }

  convertToWebP(url) {
    // Simulate WebP conversion (in real app, this would be handled by CDN)
    return url.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }

  // Animation optimization
  optimizeAnimations() {
    if (this.isReducedMotion) {
      // Disable complex animations for reduced motion
      document.documentElement.style.setProperty('--motion-slow', '0ms');
      document.documentElement.style.setProperty('--motion-medium', '0ms');
      document.documentElement.style.setProperty('--motion-fast', '0ms');
      return;
    }

    // Use transform and opacity for animations (GPU accelerated)
    const animatedElements = document.querySelectorAll('.animated');
    animatedElements.forEach(element => {
      element.style.willChange = 'transform, opacity';
    });

    // Throttle scroll events
    this.throttleScrollEvents();
    
    // Use requestAnimationFrame for smooth animations
    this.useRAF();
  }

  throttleScrollEvents() {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Scroll handler logic
          this.updateScrollAnimations();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  updateScrollAnimations() {
    // Efficient scroll-based animation updates
    const scrollTop = window.pageYOffset;
    const elements = document.querySelectorAll('.parallax-element');
    
    elements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      const transform = `translateY(${scrollTop * speed}px)`;
      element.style.transform = transform;
    });
  }

  useRAF() {
    // Replace setTimeout with requestAnimationFrame for smoother animations
    window.smoothSetTimeout = (callback, delay) => {
      const start = performance.now();
      
      const frame = (now) => {
        if (now - start >= delay) {
          callback();
        } else {
          requestAnimationFrame(frame);
        }
      };
      
      requestAnimationFrame(frame);
    };
  }

  // Resource hints
  addResourceHints() {
    const head = document.head;
    
    // DNS prefetch for external domains
    const dnsPrefetch = [
      'https://images.unsplash.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];
    
    dnsPrefetch.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      head.appendChild(link);
    });

    // Preconnect to critical domains
    const preconnect = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];
    
    preconnect.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      head.appendChild(link);
    });
  }

  preloadCriticalImages() {
    const criticalImages = [
      '/api/images/hero-1.webp',
      '/api/images/hero-2.webp',
      '/api/images/featured-product.webp'
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  optimizeFontLoading() {
    // Use font-display: swap for better loading performance
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
        src: url('/fonts/inter.woff2') format('woff2');
      }
      @font-face {
        font-family: 'Playfair Display';
        font-display: swap;
        src: url('/fonts/playfair.woff2') format('woff2');
      }
    `;
    document.head.appendChild(style);
  }

  reducerRenderBlocking() {
    // Load non-critical CSS asynchronously
    const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
    
    nonCriticalCSS.forEach(link => {
      link.media = 'print';
      link.onload = function() {
        this.media = 'all';
      };
    });
  }

  breakupLongTasks() {
    // Use scheduler API or setTimeout to break up long tasks
    window.yieldToMain = function() {
      return new Promise(resolve => {
        setTimeout(resolve, 0);
      });
    };
  }

  optimizeThirdParty() {
    // Load third-party scripts with low priority
    const scripts = document.querySelectorAll('script[data-third-party]');

    scripts.forEach(script => {
      script.async = true;
      script.defer = true;
    });
  }

  useWebWorkers() {
    // Offload heavy computations to web workers
    if ('Worker' in window) {
      const worker = new Worker('/workers/computation-worker.js');

      worker.postMessage({ type: 'HEAVY_COMPUTATION', data: {} });

      worker.onmessage = (event) => {
        const { type } = event.data;
        if (type === 'COMPUTATION_COMPLETE') {
          // Handle computation result
          console.log('Computation completed');
        }
      };
    }
  }

  setImageDimensions() {
    // Set explicit dimensions for images to prevent layout shift
    const images = document.querySelectorAll('img:not([width]):not([height])');
    
    images.forEach(img => {
      img.addEventListener('load', () => {
        if (!img.width || !img.height) {
          img.width = img.naturalWidth;
          img.height = img.naturalHeight;
        }
      });
    });
  }

  reserveSpaceForContent() {
    // Add placeholders for dynamic content
    const dynamicContainers = document.querySelectorAll('[data-dynamic]');
    
    dynamicContainers.forEach(container => {
      if (!container.style.minHeight) {
        container.style.minHeight = '200px'; // Reserve space
      }
    });
  }

  // Service Worker initialization
  initServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  // Resource monitoring
  monitorResources() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.transferSize > 1000000) { // > 1MB
            console.warn(`Large resource: ${entry.name} (${entry.transferSize} bytes)`);
          }
        });
      });
      
      observer.observe({ entryTypes: ['resource'] });
    }
  }

  // Bundle size optimization
  optimizeBundles() {
    // Code splitting hints
    const criticalComponents = [
      'Header',
      'CinematicHero',
      'ProductCard'
    ];
    
    // Preload critical components
    criticalComponents.forEach(component => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = `/components/${component}.js`;
      document.head.appendChild(link);
    });
  }

  // Performance metrics reporting
  reportMetrics() {
    // Send metrics to analytics (placeholder)
    const metrics = {
      LCP: this.metrics.LCP,
      FID: this.metrics.FID,
      CLS: this.metrics.CLS,
      timestamp: Date.now()
    };
    
    // In real app, send to analytics service
    console.log('Performance Metrics:', metrics);
  }

  // Cleanup
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// Create Service Worker content
const serviceWorkerContent = `
const CACHE_NAME = 'project-vibe-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/fonts/inter.woff2',
  '/fonts/playfair.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});
`;

// Create Web Worker for heavy computations
const webWorkerContent = `
self.onmessage = function(event) {
  const { type, data } = event.data;
  
  switch (type) {
    case 'HEAVY_COMPUTATION':
      // Perform heavy computation here
      const result = performComputation(data);
      self.postMessage({ type: 'COMPUTATION_COMPLETE', result });
      break;
  }
};

function performComputation(data) {
  // Placeholder for heavy computation
  return { processed: true };
}
`;

export default PerformanceOptimizer;
export { serviceWorkerContent, webWorkerContent };
