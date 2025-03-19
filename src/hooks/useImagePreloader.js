import { useState, useEffect } from 'react';

/**
 * Custom hook to preload a set of images
 * Useful for image galleries, carousels, and slideshows
 * 
 * @param {Array} imageSources - Array of image URLs to preload
 * @param {number} preloadCount - Number of images to preload at a time (default: 3)
 * @param {number} currentIndex - Current active image index
 * @returns {Object} preloadStatus - Status of preloading for each image
 */
const useImagePreloader = (imageSources = [], preloadCount = 3, currentIndex = 0) => {
  const [preloadStatus, setPreloadStatus] = useState({});
  
  useEffect(() => {
    if (!imageSources || imageSources.length === 0) return;
    
    // Determine which images to preload
    const imagesToPreload = [];
    
    // Always preload the current image if not loaded
    if (!preloadStatus[imageSources[currentIndex]]) {
      imagesToPreload.push(imageSources[currentIndex]);
    }
    
    // Preload next images
    for (let i = 1; i <= preloadCount; i++) {
      const nextIndex = (currentIndex + i) % imageSources.length;
      if (!preloadStatus[imageSources[nextIndex]]) {
        imagesToPreload.push(imageSources[nextIndex]);
      }
    }
    
    // Preload previous images
    for (let i = 1; i <= preloadCount; i++) {
      const prevIndex = (currentIndex - i + imageSources.length) % imageSources.length;
      if (!preloadStatus[imageSources[prevIndex]]) {
        imagesToPreload.push(imageSources[prevIndex]);
      }
    }
    
    // Load unique images 
    const uniqueImagesToPreload = [...new Set(imagesToPreload)];
    
    // Track loading status
    uniqueImagesToPreload.forEach(src => {
      const img = new Image();
      
      img.onload = () => {
        setPreloadStatus(prev => ({
          ...prev,
          [src]: 'loaded'
        }));
        
        // Cache in session storage if possible
        try {
          if (!sessionStorage.getItem(`img_cache_${src}`)) {
            sessionStorage.setItem(`img_cache_${src}`, src);
          }
        } catch (e) {
          // Handle storage errors gracefully
          console.log('Session storage error:', e);
        }
      };
      
      img.onerror = () => {
        setPreloadStatus(prev => ({
          ...prev,
          [src]: 'error'
        }));
      };
      
      // Start loading
      setPreloadStatus(prev => ({
        ...prev,
        [src]: 'loading'
      }));
      
      img.src = src;
    });
  }, [imageSources, currentIndex, preloadCount, preloadStatus]);
  
  return preloadStatus;
};

export default useImagePreloader;