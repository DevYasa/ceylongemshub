const CACHE_NAME = 'ceylon-gems-cache-v1';
const STATIC_CACHE = 'ceylon-gems-static-v1';
const IMAGES_CACHE = 'ceylon-gems-images-v1';
const API_CACHE = 'ceylon-gems-api-v1';

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/ceylongemshub',
  '/ceylongemshub/',
  '/assets/logo.svg', // Adjust these paths to match your actual assets
  // Add other critical assets here
];

// Install event - precache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting()) // Force new service worker to activate immediately
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [STATIC_CACHE, IMAGES_CACHE, API_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => self.clients.claim()) // Take control of all clients
  );
});

// Helper function to determine cache strategy based on request
const getCacheStrategy = (request) => {
  const url = new URL(request.url);
  
  // API requests - network first, fallback to cache
  if (url.pathname.includes('/api/')) {
    return {
      cacheName: API_CACHE,
      strategy: 'network-first',
      maxAgeSeconds: 60 * 60, // 1 hour
    };
  }
  
  // Image files - cache first, fallback to network
  if (
    request.destination === 'image' || 
    url.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)
  ) {
    return {
      cacheName: IMAGES_CACHE,
      strategy: 'cache-first',
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
    };
  }
  
  // HTML files - network first
  if (request.destination === 'document' || url.pathname.match(/\.(html)$/i)) {
    return {
      cacheName: STATIC_CACHE,
      strategy: 'network-first',
      maxAgeSeconds: 24 * 60 * 60, // 1 day
    };
  }
  
  // Default - static assets, cache first
  return {
    cacheName: STATIC_CACHE,
    strategy: 'cache-first',
    maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
  };
};

// Fetch event - handle with appropriate caching strategy
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // Get caching strategy based on request
  const { cacheName, strategy, maxAgeSeconds } = getCacheStrategy(event.request);
  
  if (strategy === 'cache-first') {
    // Cache-first strategy (for static assets, images)
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(event.request)
            .then((response) => {
              // Don't cache non-successful responses or opaque responses
              if (!response || response.status !== 200 || response.type === 'opaque') {
                return response;
              }
              
              // Cache the fresh response
              const responseToCache = response.clone();
              caches.open(cacheName)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
                
              return response;
            })
            .catch((error) => {
              console.error('Fetch failed:', error);
              // Fallback could go here
            });
        })
    );
  } else if (strategy === 'network-first') {
    // Network-first strategy (for API requests, HTML)
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Don't cache non-successful or opaque responses
          if (!response || response.status !== 200 || response.type === 'opaque') {
            return response;
          }
          
          // Cache the fresh network response
          const responseToCache = response.clone();
          caches.open(cacheName)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
            
          return response;
        })
        .catch((error) => {
          console.log('Network request failed, trying cache:', error);
          return caches.match(event.request);
        })
    );
  }
});

// Handle push notifications if you want to add them later
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: 'path/to/icon.png',
      badge: 'path/to/badge.png',
      data: {
        url: data.url
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification click - open the target URL
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});