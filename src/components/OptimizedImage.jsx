import React, { useState, useEffect } from 'react';

const OptimizedImage = ({ src, alt, className, width, height }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if image is cached in sessionStorage
    const cachedImage = sessionStorage.getItem(`img_cache_${src}`);
    
    if (cachedImage) {
      setImgSrc(cachedImage);
      setLoading(false);
    } else {
      // If not cached, load the image
      const img = new Image();
      img.src = src;
      img.onload = () => {
        // For small images, we can store them as base64
        // For larger images, just cache the URL
        if (img.width * img.height < 100000) { // Roughly limit to smaller images
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          try {
            // Try to cache as data URL
            const dataURL = canvas.toDataURL('image/webp');
            sessionStorage.setItem(`img_cache_${src}`, dataURL);
            setImgSrc(dataURL);
          } catch (e) {
            // If too large or cross-origin issues, just use the src
            sessionStorage.setItem(`img_cache_${src}`, src);
            setImgSrc(src);
          }
        } else {
          sessionStorage.setItem(`img_cache_${src}`, src);
          setImgSrc(src);
        }
        setLoading(false);
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        setImgSrc(src); // Fallback to original source
        setLoading(false);
      };
    }
  }, [src]);

  // Lazy-loading with Intersection Observer for images
  useEffect(() => {
    if (!imgSrc) return;

    const imgElement = document.getElementById(`img-${src.replace(/[^\w]/g, '')}`);
    if (!imgElement) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Only set the src when the image is visible
          entry.target.src = imgSrc;
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px' }); // Load images when they're within 200px of viewport

    observer.observe(imgElement);
    return () => observer.disconnect();
  }, [imgSrc, src]);

  return (
    <>
      {loading ? (
        <div 
          className={`${className} bg-gray-200 animate-pulse`} 
          style={{ width: width || '100%', height: height || '300px' }}
        />
      ) : (
        <img
          id={`img-${src.replace(/[^\w]/g, '')}`}
          src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" // Tiny placeholder
          data-src={imgSrc}
          alt={alt}
          className={className}
          width={width}
          height={height}
          onLoad={(e) => {
            // Replace with actual source when in view
            if (e.target.dataset.src) {
              e.target.src = e.target.dataset.src;
            }
          }}
        />
      )}
    </>
  );
};

export default OptimizedImage;