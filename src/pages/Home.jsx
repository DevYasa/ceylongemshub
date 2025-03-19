import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import heroImage from '../assets/hero.png';
import featuredCollection1 from '../assets/featured1.png';
import featuredCollection2 from '../assets/featured2.png';
import featuredCollection3 from '../assets/featured3.png';
import sapphireImage from '../assets/sapphire.png'; // Replace with your actual image paths
import rubyImage from '../assets/ruby.png';  
import diamondImage from '../assets/diamond.png';

// Enhanced animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

// Diamond shape animation
const diamondVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -45 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1, ease: [0.34, 1.56, 0.64, 1] }
  }
};

function Home() {
  const scrollRef = useRef(null);
  const featuredRef = useRef(null);
  const aboutRef = useRef(null);
  const ctaRef = useRef(null);
  const testimonialsRef = useRef(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const featuredInView = useInView(featuredRef, { once: true, margin: "-100px" });
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  useEffect(() => {
    // Enhanced parallax effect with smoother transitions
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroSection = document.querySelector('.hero-section');
      const heroContent = document.querySelector('.hero-content');
      
      if (heroSection) {
        // Parallax for hero background
        heroSection.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
        
        // Fade out hero content as user scrolls
        if (heroContent) {
          const opacity = Math.max(1 - scrollPosition / 700, 0);
          heroContent.style.opacity = opacity;
          heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Testimonial auto rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      text: "The sapphire necklace I purchased from Ceylon Gems is absolutely stunning. The craftsmanship and attention to detail are remarkable.",
      author: "Sarah L.",
      location: "Kuala Lumpur"
    },
    {
      text: "Exceptional service and extraordinary pieces. My custom engagement ring exceeded all expectations and my fiancée was absolutely blown away.",
      author: "Michael T.",
      location: "Penang"
    },
    {
      text: "I've been collecting fine jewelry for years, and Ceylon Gems offers some of the most exquisite pieces I've ever seen. Truly museum quality.",
      author: "Elizabeth W.",
      location: "Johor Bahru"
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
    >
      {/* Enhanced Hero Section with Parallax and Animations */}
      <div className="hero-section relative overflow-hidden h-screen flex items-center">
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.2, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="w-full h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-transparent"></div>
            <img src={heroImage} alt="Ceylon Gems & Jewelry" className="w-full h-full object-cover" />
            
            {/* Elegant gold overlay pattern */}
            <div className="absolute inset-0 bg-repeat opacity-20 mix-blend-overlay" style={{
              backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMzAgMEwzMCA2MEwwIDMwWiIgZmlsbD0iI2Q5OTcwNiIvPjxwYXRoIGQ9Ik02MCAzMEwzMCA2MEwzMCAwWiIgZmlsbD0iI2Q5OTcwNiIvPjwvc3ZnPg==')",
              backgroundSize: "60px 60px"
            }} />
          </motion.div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-xl mx-auto md:mx-0"
          >
            {/* Animated logo/emblem */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="mb-8 relative w-20 h-20 md:w-24 md:h-24 mx-auto md:mx-0"
            >
              <motion.div 
                variants={diamondVariants}
                initial="hidden"
                animate="visible"
                className="absolute top-0 left-0 w-full h-full border-2 border-amber-400 transform rotate-45"
              />
              <motion.div 
                variants={diamondVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="absolute top-2 left-2 right-2 bottom-2 border border-amber-500/50 transform rotate-45"
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute inset-0 flex items-center justify-center text-amber-400 font-serif text-2xl"
              >
                CG
              </motion.div>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight md:text-6xl lg:text-7xl font-serif text-center md:text-left">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="block"
              >
                Discover
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 italic"
              >
                Exquisite Ceylon
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="block mt-2"
              >
                Gems & Jewelry
              </motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="mt-8 text-white text-base md:text-lg max-w-lg mx-auto md:mx-0 font-light text-center md:text-left"
            >
              <span className="border-l-2 border-amber-400 pl-4 italic block">
                Handcrafted premium jewelry inspired by Ceylon's rich gemstone heritage, now available in Malaysia. Where luxury meets exceptional craftsmanship.
              </span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.8 }}
              className="mt-10 flex justify-center md:justify-start"
            >
              <Link to="/collections" className="group relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 rounded transform transition-transform duration-300 group-hover:scale-105 shadow-lg"></span>
                <span className="relative block text-white font-medium px-8 py-3 md:px-10 md:py-4 rounded">
                  <span className="relative z-10 flex items-center">
                    <span>View Our Collections</span>
                    <motion.span 
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                      className="ml-2"
                    >
                      →
                    </motion.span>
                  </span>
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Improved decorative elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 2.2, duration: 1.5 }}
          className="absolute right-0 bottom-0 w-1/2 h-1/2 pointer-events-none hidden md:block"
        >
          <div className="absolute inset-0 bg-no-repeat bg-right-bottom bg-contain" style={{
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZD0iTTUwIDBMMCAxMDBMMTAwIDEwMFoiIGZpbGw9IiNkOTk3MDYiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')"
        }}></div>
        </motion.div>
        
        {/* Enhanced scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <span className="text-white/90 text-xs sm:text-sm mb-2 tracking-wider font-light">Explore Our Collection</span>
            <div className="w-px h-16 sm:h-20 bg-gradient-to-b from-amber-400 via-white to-transparent relative">
              <motion.div 
                animate={{ y: [0, 40, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-amber-400 rounded-full transform -translate-x-1/2 shadow-glow"
              ></motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* New Showcase Section with 3D Rotating Jewels */}
      <div className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIiBmaWxsPSIjZDk5NzA2Ii8+PC9zdmc+')",
            backgroundSize: "20px 20px"
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-serif font-bold text-white"
            >
              Our Signature Collection
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-px bg-amber-500 mx-auto mt-6"
            ></motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Royal Sapphire", 
                description: "Our iconic Ceylon blue sapphire, set in 18k gold",
                image: sapphireImage,
                color: "rgba(15, 82, 186, 0.6)" // Sapphire blue glow color
              },
              { 
                name: "Imperial Ruby", 
                description: "Vibrant red rubies in an elegant modern setting",
                image: rubyImage,
                color: "rgba(224, 17, 95, 0.6)" // Ruby red glow color
              },
              { 
                name: "Radiant Diamond", 
                description: "Ethically sourced diamonds with exceptional clarity",
                image: diamondImage,
                color: "rgba(210, 210, 255, 0.6)" // Diamond light blue glow color
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-gradient-to-b from-gray-900 to-gray-800 p-1 rounded-lg group hover:from-amber-900 hover:to-amber-800 transition-all duration-500"
              >
                <div className="border border-amber-500/20 rounded-lg p-8 h-full flex flex-col items-center">
                  {/* 3D Rotating Real Gem Image */}
                  <div className="w-40 h-40 relative mb-6 mx-auto" style={{ perspective: "600px" }}>
                    <motion.div 
                      className="w-full h-full relative flex items-center justify-center"
                      animate={{ 
                        rotateY: [0, 360]
                      }}
                      transition={{ 
                        rotateY: { 
                          repeat: Infinity, 
                          duration: 8, 
                          ease: "linear"
                        }
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Real gem image with shadow effect */}
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-4/5 h-4/5 object-contain"
                        style={{ 
                          filter: `drop-shadow(0 0 10px ${item.color})`
                        }}
                      />
                    </motion.div>
                    
                    {/* Light reflection layer */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: [
                          'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%)',
                          'radial-gradient(circle at 70% 40%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%)',
                          'radial-gradient(circle at 40% 60%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%)',
                          'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%)'
                        ]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </div>
                  
                  <h3 className="text-xl font-serif font-medium text-amber-400 mb-3">{item.name}</h3>
                  <p className="text-gray-300 text-center mb-6">{item.description}</p>
                  <div className="mt-auto">
                    <Link to="/collections" className="text-amber-300 hover:text-amber-200 flex items-center border-b border-amber-500/30 pb-1 group-hover:border-amber-400 transition-colors duration-300">
                      View Details
                      <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Featured Collections with Animation Effects */}
      <motion.div 
        ref={featuredRef}
        className="py-24 md:py-32 bg-white relative overflow-hidden"
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-repeat opacity-30" style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIyIiBmaWxsPSIjZDk5NzA2Ii8+PC9zdmc+')",
            backgroundSize: "20px 20px"
          }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col items-center mb-16 md:mb-20">
            <motion.div 
              initial={{ width: 0 }}
              animate={featuredInView ? { width: "4rem" } : { width: 0 }}
              transition={{ duration: 0.6 }}
              className="h-px bg-amber-600 mb-8"
            ></motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-5xl font-serif font-bold text-center relative"
            >
              <span className="relative">
                Featured Collections
                <span className="absolute -bottom-3 left-0 w-full h-px bg-amber-400/30"></span>
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={featuredInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-gray-600 mt-8 max-w-3xl text-center px-4"
            >
              Explore our exquisite collections featuring the finest gems from Ceylon, meticulously crafted into timeless pieces that capture light and imagination.
            </motion.p>
          </div>
          
          <motion.div 
            variants={staggerChildren}
            initial="hidden"
            animate={featuredInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
            {[
              { image: featuredCollection1, title: "Sapphire Collection", description: "Explore our exquisite blue sapphire jewelry, sourced from the finest mines in Sri Lanka. Each piece captures the mesmerizing depths of Ceylon's legendary blue gems." },
              { image: featuredCollection2, title: "Ruby Collection", description: "Discover our stunning ruby pieces, crafted with passion and precision. These fiery red treasures embody love and vitality in elegant settings." },
              { image: featuredCollection3, title: "Bridal Collection", description: "Make your special day unforgettable with our magnificent bridal jewelry. Timeless designs that will be cherished for generations." }
            ].map((collection, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10, transition: { duration: 0.4 } }}
                className="group bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    <img 
                      src={collection.image} 
                      alt={collection.title} 
                      className="w-full h-64 sm:h-80 object-cover"
                    />
                    {/* Radiant overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Gold corner accents */}
                    <div className="absolute top-0 left-0 w-10 h-10 sm:w-12 sm:h-12 border-t-2 border-l-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                    <div className="absolute bottom-0 right-0 w-10 h-10 sm:w-12 sm:h-12 border-b-2 border-r-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                  </motion.div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="w-10 h-px bg-amber-600 mb-4 transform origin-left group-hover:scale-x-150 transition-transform duration-300"></div>
                  <h3 className="text-xl sm:text-2xl font-serif font-semibold mb-3">{collection.title}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">{collection.description}</p>
                  <Link to="/collections" className="group inline-flex items-center text-amber-600 font-medium hover:text-amber-700">
                    <span>View Collection</span>
                    <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Simplified Testimonials Section with basic transitions */}
      <motion.div
        ref={testimonialsRef}
        className="py-0 pb-0 bg-gray-50 relative overflow-hidden" /* Reduced py-24 to py-16 and added pb-12 */
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full transform rotate-3 bg-repeat" style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMCAyMEw0MCAyME0yMCAwTDIwIDQwIiBzdHJva2U9IiNkOTk3MDYiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')",
            backgroundSize: "40px 40px"
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-serif font-bold text-center mb-10" /* Reduced mb-16 to mb-10 */
          >
            <span className="relative">
              Client Testimonials
              <span className="absolute -bottom-3 left-0 w-full h-px bg-amber-400/30"></span>
            </span>
          </motion.h2>

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
            {/* Slideshow Container */}
            <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
              {/* Slides wrapper */}
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 p-6 md:p-8" /* Reduced padding from p-8 md:p-10 */
                  >
                    <div className="relative">
                      <div className="absolute -top-5 -left-2 text-5xl md:text-7xl text-amber-300 opacity-30 font-serif">❝</div> {/* Reduced text-7xl to text-5xl md:text-7xl */}
                      <div className="relative z-10">
                        <p className="text-base md:text-lg font-serif text-gray-700 italic mb-4">{testimonial.text}</p> {/* Reduced text-lg to text-base and mb-6 to mb-4 */}
                        <div className="flex items-center">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold font-serif text-lg md:text-xl mr-3 md:mr-4"> {/* Reduced size */}
                            {testimonial.author.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{testimonial.author}</p>
                            <p className="text-gray-500 text-sm">{testimonial.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicator dots - reduced top margin */}
            <div className="flex justify-center mt-6"> {/* Reduced mt-10 to mt-6 */}
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full mx-2 transition-colors duration-300 ${
                    activeTestimonial === index ? 'bg-amber-500' : 'bg-gray-300'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        ref={aboutRef}
        style={{ y: parallaxY }}
        className="py-24 md:py-32 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 mb-16 md:mb-4"
            >
              <div className="w-16 h-px bg-amber-600 mb-8"></div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">About Ceylon Gems & Jewelry Hub</h2>
              <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                Established with a passion for fine jewelry, Ceylon Gems & Jewelry Hub brings the treasures of Sri Lanka to Malaysia. 
                Our expert craftsmen combine traditional techniques with modern design to create timeless pieces.
              </p>
              <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                Every gemstone is ethically sourced and certified, ensuring you receive only the finest quality jewelry with traceable origins.
              </p>
              <Link to="/about" className="group inline-flex items-center">
                <span className="relative px-6 py-3 bg-transparent">
                  <span className="relative z-10 text-amber-700 font-medium">Learn More About Us</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </span>
                <span className="ml-1 transform group-hover:translate-x-2 transition-transform duration-300 text-amber-600">→</span>
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:w-1/2 md:pl-8 lg:pl-16 w-full"
            >
              <div className="relative mb-36">  {/* Added mb-20 for extra bottom margin */}
                {/* Gold border decoration */}
                <div className="absolute -top-4 -left-4 right-8 bottom-12 border border-amber-400/40 rounded-lg hidden sm:block"></div>
                <div className="absolute -top-2 -right-2 left-10 bottom-14 border border-amber-300/30 rounded-lg hidden sm:block"></div>
                
                <div className="bg-white p-6 sm:p-10 rounded-lg shadow-xl relative z-10">
                <div className="w-10 h-10 bg-amber-50 absolute -top-5 -left-5 rounded-full border border-amber-200 hidden sm:flex items-center justify-center">
                  <div className="w-6 h-6 bg-amber-400 rounded-full"></div>
                </div>
                  
                  <h3 className="text-xl sm:text-2xl font-serif font-semibold mb-6">Our Locations</h3>
                  <div className="space-y-6">
                    {/* Kuala Lumpur location - improved for mobile */}
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 shadow-sm">
                      <div className="flex items-center mb-4">
                        <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-amber-300 rounded-full mr-3"></div>
                        <h4 className="font-medium text-lg sm:text-xl">Penang</h4>
                      </div>
                      <p className="text-gray-600 mb-4 pl-5">Lot. 4, Parkroyal Penang Resorts, 11100 Batu Ferringhi, Pulau Pinang</p>
                      <div className="flex text-gray-500 text-sm items-center mt-2 pl-5">
                        <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                        <span>Open Today: 10:00 AM - 6:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Call to Action with Animated Background - Updated for Contact Page */}
      <motion.div 
        ref={ctaRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-24 md:py-32 relative overflow-hidden"
      >
        {/* Luxurious gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-800 via-amber-600 to-amber-700"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-white rounded-full opacity-20 blur-3xl"></div>
          </div>
          <div className="absolute inset-0 bg-repeat opacity-10" style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIyIiBmaWxsPSIjZmZmZmZmIi8+PC9zdmc+')",
            backgroundSize: "20px 20px"
          }}></div>
        </div>
        
        {/* Floating diamond shapes */}
        <motion.div 
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-20 left-20 w-16 h-16 border-2 border-white/20 transform rotate-45 opacity-30 hidden md:block"
        ></motion.div>
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -8, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute bottom-20 right-1/4 w-24 h-24 border border-white/10 transform rotate-45 opacity-20 hidden md:block"
        ></motion.div>
        
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { 
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }
              }
            }}
            className="max-w-3xl mx-auto"
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
              }}
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6 sm:mb-8"
            >
              Ready to Find Your Perfect Jewelry?
            </motion.h2>
            <motion.p 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.8, delay: 0.3 } }
              }}
              className="text-white/90 text-lg sm:text-xl mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Visit our showrooms in KL or Penang, or reach out through our contact page for a personalized jewelry experience.
            </motion.p>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 } }
              }}
            >
              <Link to="/contact" className="group relative inline-block">
                <span className="absolute inset-0 bg-white rounded transform transition-transform duration-300 group-hover:scale-105 shadow-xl"></span>
                <span className="relative block bg-white text-amber-700 font-medium px-8 py-4 sm:px-12 sm:py-5 rounded">
                  <span className="relative z-10 flex items-center text-base sm:text-lg tracking-wide">
                    <span>Contact Us</span>
                    <motion.span 
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                      className="ml-3"
                    >
                      →
                    </motion.span>
                  </span>
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Home;