import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  const navbarClasses = `fixed w-full z-50 transition-all duration-500 ${
    scrolled
      ? 'bg-white/90 backdrop-blur-md py-2 border-b border-amber-100'
      : 'bg-transparent py-6'
  }`;

  // Refined link animations and styles
  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const linkClasses = (path) => {
    const isActive = location.pathname === path;
    return `relative text-sm uppercase tracking-widest font-medium px-5 py-2 transition-all duration-300 ${
      scrolled
        ? isActive
          ? 'text-amber-700'
          : 'text-gray-800 hover:text-amber-600'
        : isActive
        ? 'text-amber-400'
        : 'text-white hover:text-amber-300'
    }`;
  };

  const linkUnderlineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { width: '100%', opacity: 1, transition: { duration: 0.4 } },
  };

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/collections', label: 'Collections' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={navbarClasses}>
      {/* Top accent line with gradient */}
      {scrolled && (
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300"></div>
      )}
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Text Logo with enhanced animation */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center"
          >
            <Link to="/" className="flex-shrink-0 relative group">
              <motion.div
                initial={{ scale: 0.95, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="relative"
              >
                {/* Ceylon Gems Hub Text Logo */}
                <div className="font-serif tracking-wide">
                  <span className={`text-xl font-bold ${scrolled ? 'text-amber-700' : 'text-white'}`}>
                    Ceylon Gems Hub
                  </span>
                </div>
                
                {/* Elegant glow effect on hover */}
                <div className="absolute -inset-1 bg-amber-400/20 rounded-md blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation Links with staggered animation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="ml-10 flex items-center space-x-6">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  custom={i}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link to={item.path} className={linkClasses(item.path)}>
                    <span>{item.label}</span>
                    {location.pathname === item.path && (
                      <motion.span
                        variants={linkUnderlineVariants}
                        initial="hidden"
                        animate="visible"
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mobile menu button with enhanced animation */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:hidden"
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${
                scrolled ? 'text-gray-800 hover:text-amber-600' : 'text-white hover:text-amber-400'
              }`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-6">
                <span
                  className={`absolute h-0.5 w-full bg-current transform transition duration-500 ease-in-out ${
                    isMenuOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-1'
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-full bg-current transform transition-opacity duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-full bg-current transform transition duration-500 ease-in-out ${
                    isMenuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-4'
                  }`}
                />
              </div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-white shadow-xl overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="px-6 pt-6 pb-8 space-y-4"
            >
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                >
                  <Link
                    to={item.path}
                    className={`block px-4 py-4 text-base font-medium border-b border-gray-100 ${
                      location.pathname === item.path
                        ? 'text-amber-600 border-l-2 border-amber-600 pl-3 bg-amber-50'
                        : 'text-gray-800 hover:text-amber-600 hover:border-l-2 hover:border-amber-400 hover:pl-3 hover:bg-amber-50/50'
                    } transition-all duration-300`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;