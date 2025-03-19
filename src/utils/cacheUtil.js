const cacheUtil = {
    /**
     * Set data in cache with expiration
     * @param {string} key - Cache key
     * @param {any} data - Data to cache
     * @param {number} expirationMinutes - Cache expiration in minutes
     */
    set: (key, data, expirationMinutes = 60) => {
      const now = new Date();
      const item = {
        data: data,
        expiry: now.getTime() + (expirationMinutes * 60 * 1000),
      };
      
      try {
        localStorage.setItem(`cg_cache_${key}`, JSON.stringify(item));
        return true;
      } catch (error) {
        console.error('Cache set error:', error);
        return false;
      }
    },
    
    /**
     * Get data from cache
     * @param {string} key - Cache key
     * @returns {any|null} - Cached data or null if not found/expired
     */
    get: (key) => {
      try {
        const itemStr = localStorage.getItem(`cg_cache_${key}`);
        
        // Return null if item doesn't exist
        if (!itemStr) {
          return null;
        }
        
        const item = JSON.parse(itemStr);
        const now = new Date();
        
        // Check if the item is expired
        if (now.getTime() > item.expiry) {
          // Remove expired item
          localStorage.removeItem(`cg_cache_${key}`);
          return null;
        }
        
        return item.data;
      } catch (error) {
        console.error('Cache get error:', error);
        return null;
      }
    },
    
    /**
     * Remove item from cache
     * @param {string} key - Cache key
     */
    remove: (key) => {
      try {
        localStorage.removeItem(`cg_cache_${key}`);
        return true;
      } catch (error) {
        console.error('Cache remove error:', error);
        return false;
      }
    },
    
    /**
     * Clear all cache items for this app
     */
    clear: () => {
      try {
        // Only clear keys that start with our prefix
        Object.keys(localStorage)
          .filter(key => key.startsWith('cg_cache_'))
          .forEach(key => localStorage.removeItem(key));
        return true;
      } catch (error) {
        console.error('Cache clear error:', error);
        return false;
      }
    }
  };
  
  export default cacheUtil;