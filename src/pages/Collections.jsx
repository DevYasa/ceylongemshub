import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaSearch, FaGem, FaRegStar, FaStar, FaFilter, FaTimes, FaWeightHanging } from 'react-icons/fa';
import Product1 from '../assets/product1.jpg';
import Product2 from '../assets/product2.jpg';
import Product3 from '../assets/product3.jpg';
import Product4 from '../assets/product4.jpg';
import Product5 from '../assets/product5.jpg';
import Product6 from '../assets/product6.jpg';
import Product7 from '../assets/product7.jpg';
import Product8 from '../assets/product8.jpg';
import Product9 from '../assets/product9.jpg';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    opacity: 0, 
    y: 20, 
    transition: { duration: 0.3 } 
  }
};

function Collections() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeGemstone, setActiveGemstone] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState('featured');
  
  const heroRef = useRef(null);
  const productsRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const productsInView = useInView(productsRef, { once: true, margin: "-100px" });

  // Enhanced product data with more details
  const products = [
    {
      id: 1,
      name: "Sapphire Princess Ring",
      category: "rings",
      gemstone: "sapphire",
      image: Product1, // Replace with your image path
      description: "Elegant sapphire ring with diamond accents set in 18K white gold.",
      price: 3800,
      carat: "2.5",
      rating: 5,
      isNew: true,
      isFeatured: true
    },
    {
      id: 2,
      name: "Ruby Teardrop Necklace",
      category: "necklaces",
      gemstone: "ruby",
      image: Product2,
      description: "Stunning ruby necklace with white gold chain and diamond accents.",
      price: 4200,
      carat: "3.2",
      rating: 4.5,
      isNew: true,
      isFeatured: false
    },
    {
      id: 3,
      name: "Emerald Stud Earrings",
      category: "earrings",
      gemstone: "emerald",
      image: Product3,
      description: "Classic emerald studs with diamond halos set in 18K yellow gold.",
      price: 2800,
      carat: "1.8",
      rating: 5,
      isNew: false,
      isFeatured: true
    },
    {
      id: 4,
      name: "Diamond Tennis Bracelet",
      category: "bracelets",
      gemstone: "diamond",
      image: Product4,
      description: "Elegant diamond bracelet with platinum setting, featuring 42 round-cut diamonds.",
      price: 7500,
      carat: "4.0",
      rating: 5,
      isNew: false,
      isFeatured: true
    },
    {
      id: 5,
      name: "Topaz Pendant",
      category: "necklaces",
      gemstone: "topaz",
      image: Product5,
      description: "Beautiful blue topaz pendant with delicate rose gold chain.",
      price: 1800,
      carat: "3.5",
      rating: 4,
      isNew: true,
      isFeatured: false
    },
    {
      id: 6,
      name: "Amethyst Cocktail Ring",
      category: "rings",
      gemstone: "amethyst",
      image: Product6,
      description: "Bold amethyst ring with intricate 18K gold work and pavé diamond setting.",
      price: 2400,
      carat: "5.2",
      rating: 4.5,
      isNew: false,
      isFeatured: false
    },
    {
      id: 7,
      name: "Pearl Drop Earrings",
      category: "earrings",
      gemstone: "pearl",
      image: Product7,
      description: "Elegant South Sea pearl earrings with diamond accents set in 18K white gold.",
      price: 3200,
      carat: "12mm",
      rating: 4,
      isNew: false,
      isFeatured: true
    },
    {
      id: 8,
      name: "Garnet Bangle",
      category: "bracelets",
      gemstone: "garnet",
      image: Product8,
      description: "Stylish garnet bangle with rose gold accents, featuring deep red Mozambique garnets.",
      price: 2100,
      carat: "4.8",
      rating: 4.5,
      isNew: true,
      isFeatured: false
    },
    {
      id: 9,
      name: "Diamond Solitaire Ring",
      category: "rings",
      gemstone: "diamond",
      image: Product9,
      description: "Classic diamond solitaire engagement ring with platinum band.",
      price: 5600,
      carat: "1.2",
      rating: 5,
      isNew: false,
      isFeatured: true
    },
  ];

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesGemstone = activeGemstone === 'all' || product.gemstone === activeGemstone;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.gemstone.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesGemstone && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortOption) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'newest':
        return a.isNew ? -1 : 1;
      case 'rating':
        return b.rating - a.rating;
      case 'featured':
      default:
        return b.isFeatured ? 1 : -1;
    }
  });

  // Category data
  const categories = [
    { id: 'all', name: 'All Collections' },
    { id: 'rings', name: 'Rings' },
    { id: 'necklaces', name: 'Necklaces' },
    { id: 'earrings', name: 'Earrings' },
    { id: 'bracelets', name: 'Bracelets' },
  ];

  // Gemstone data
  const gemstones = [
    { id: 'all', name: 'All Gemstones' },
    { id: 'diamond', name: 'Diamond' },
    { id: 'sapphire', name: 'Sapphire' },
    { id: 'ruby', name: 'Ruby' },
    { id: 'emerald', name: 'Emerald' },
    { id: 'topaz', name: 'Topaz' },
    { id: 'amethyst', name: 'Amethyst' },
    { id: 'pearl', name: 'Pearl' },
    { id: 'garnet', name: 'Garnet' },
  ];

  // Sort options
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'priceAsc', label: 'Price: Low to High' },
    { value: 'priceDesc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
  ];

  // Reset filters
  const resetFilters = () => {
    setActiveCategory('all');
    setActiveGemstone('all');
    setSearchTerm('');
    setSortOption('featured');
    setIsFiltering(false);
  };

  // Check if any filter is active
  useEffect(() => {
    const isAnyFilterActive = 
      activeCategory !== 'all' || 
      activeGemstone !== 'all' || 
      searchTerm !== '' ||
      sortOption !== 'featured';
    
    setIsFiltering(isAnyFilterActive);
  }, [activeCategory, activeGemstone, searchTerm, sortOption]);

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section */}
      <div ref={heroRef} className="relative bg-gray-900 text-white">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/90"></div>
          <div className="absolute inset-0 bg-repeat opacity-10" style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMjAgMEwwIDIwTDIwIDQwTDQwIDIwTDIwIDBaIiBmaWxsPSIjZDk3NzA2Ii8+PC9zdmc+')",
            backgroundSize: "30px 30px"
          }} />
        </div>

        <div className="container mx-auto px-6 py-32 relative z-10">
          <motion.div 
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeIn} className="inline-block mb-4">
              <div className="w-20 h-20 relative mx-auto mb-6">
                <div className="absolute inset-0 border-2 border-amber-400 transform rotate-45"></div>
                <div className="absolute inset-3 border border-amber-500/50 transform rotate-45"></div>
                <div className="absolute inset-0 flex items-center justify-center text-amber-400 font-serif text-2xl">CG</div>
              </div>
            </motion.div>

            <motion.h1 
              variants={fadeIn} 
              className="text-5xl font-serif font-bold mb-6"
            >
              Our <span className="text-amber-400">Collections</span>
            </motion.h1>
            
            <motion.div variants={fadeIn} className="w-20 h-px bg-amber-500 mx-auto mb-8"></motion.div>
            
            <motion.p variants={fadeIn} className="text-xl text-gray-300 mb-8 leading-relaxed">
              Explore our exquisite range of handcrafted jewelry featuring the finest gemstones from Ceylon. Each piece is meticulously designed and crafted to perfection.
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              variants={fadeIn}
              className="relative max-w-lg mx-auto"
            >
              <input
                type="text"
                placeholder="Search collections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm text-white border border-white/20 px-12 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400">
                <FaSearch size={18} />
              </div>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                >
                  <FaTimes size={18} />
                </button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={productsRef} className="py-16">
        <div className="container mx-auto px-6">
          {/* Mobile Filters Toggle */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-lg text-gray-800 font-medium transition-colors"
            >
              <FaFilter className="mr-2" />
              {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block lg:w-1/4`}>
              <div className="sticky top-24 bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-serif font-bold">Filters</h2>
                  {isFiltering && (
                    <button 
                      onClick={resetFilters}
                      className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center"
                    >
                      <FaTimes className="mr-1" /> Reset
                    </button>
                  )}
                </div>
                
                <div className="space-y-8">
                  {/* Category Filter */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Category</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setActiveCategory(category.id)}
                          className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                            activeCategory === category.id
                              ? 'bg-amber-100 text-amber-800 font-medium'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Gemstone Filter */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Gemstone</h3>
                    <div className="space-y-2">
                      {gemstones.map((gemstone) => (
                        <button
                          key={gemstone.id}
                          onClick={() => setActiveGemstone(gemstone.id)}
                          className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                            activeGemstone === gemstone.id
                              ? 'bg-amber-100 text-amber-800 font-medium'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {gemstone.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range Filter (simplified for demo) */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                    <div className="px-2">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600 text-sm">$1,000</span>
                        <span className="text-gray-600 text-sm">$10,000+</span>
                      </div>
                      <input 
                        type="range" 
                        min="1000" 
                        max="10000" 
                        step="500"
                        defaultValue="10000"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="lg:w-3/4">
              {/* Filter Results & Sort */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <h2 className="text-2xl font-serif font-bold">{isFiltering ? 'Filtered Results' : 'All Collections'}</h2>
                  <p className="text-gray-600">{sortedProducts.length} {sortedProducts.length === 1 ? 'item' : 'items'}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-gray-700 font-medium">Sort by:</label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Active Filters */}
              {isFiltering && (
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    {activeCategory !== 'all' && (
                      <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        {categories.find(c => c.id === activeCategory).name}
                        <button 
                          onClick={() => setActiveCategory('all')}
                          className="ml-2 text-amber-800/70 hover:text-amber-800"
                        >
                          <FaTimes size={12} />
                        </button>
                      </span>
                    )}
                    
                    {activeGemstone !== 'all' && (
                      <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        {gemstones.find(g => g.id === activeGemstone).name}
                        <button 
                          onClick={() => setActiveGemstone('all')}
                          className="ml-2 text-amber-800/70 hover:text-amber-800"
                        >
                          <FaTimes size={12} />
                        </button>
                      </span>
                    )}
                    
                    {searchTerm && (
                      <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        Search: "{searchTerm}"
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="ml-2 text-amber-800/70 hover:text-amber-800"
                        >
                          <FaTimes size={12} />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Products */}
              {sortedProducts.length > 0 ? (
                <motion.div 
                  initial="hidden"
                  animate={productsInView ? "visible" : "hidden"}
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  <AnimatePresence>
                    {sortedProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        variants={cardVariants}
                        layout
                        className="relative group"
                        onMouseEnter={() => setHoveredItem(product.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 group-hover:shadow-xl border border-gray-100">
                          {/* Image Container */}
                          <div className="relative h-64 overflow-hidden">
                            <img 
                              src={product.image}
                              alt={product.name} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                                <p className="text-amber-300 font-medium">${product.price.toLocaleString()}</p>
                              </div>
                            </div>
                            
                            {/* Badge for new items */}
                            {product.isNew && (
                              <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                NEW
                              </div>
                            )}
                            
                            {/* Featured badge */}
                            {product.isFeatured && (
                              <div className="absolute top-4 right-4 bg-amber-400/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                FEATURED
                              </div>
                            )}
                          </div>
                          
                          {/* Product Info */}
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-semibold">{product.name}</h3>
                              <span className="text-amber-600 font-bold">${product.price.toLocaleString()}</span>
                            </div>
                            
                            <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                            
                            {/* Product Details */}
                            <div className="flex justify-between items-center mb-4">
                              <div className="flex items-center text-sm text-gray-500">
                                <FaGem className="mr-1 text-amber-600" />
                                <span className="capitalize">{product.gemstone}</span>
                              </div>
                              
                              <div className="flex items-center text-sm text-gray-500">
                                <FaWeightHanging className="mr-1 text-amber-600" />
                                <span>{product.carat} ct</span>
                              </div>
                            </div>
                            
                            {/* Rating */}
                            <div className="flex justify-between items-center mb-6">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className="text-amber-400">
                                    {i < Math.floor(product.rating) ? <FaStar /> : 
                                     i < product.rating ? <FaStar className="opacity-70" /> : <FaRegStar />}
                                  </span>
                                ))}
                                <span className="text-gray-600 text-sm ml-2">{product.rating.toFixed(1)}</span>
                              </div>
                              
                              <span className="text-sm text-gray-500 capitalize">{product.category}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <Link to="/contact" className="text-amber-600 font-medium hover:text-amber-700 transition-colors">
                                View Details
                              </Link>
                              <Link to="/contact" className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition-colors shadow-sm hover:shadow text-sm font-medium">
                                Inquire
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="bg-gray-50 p-8 text-center rounded-lg shadow-inner">
                  <div className="text-gray-400 text-6xl mb-4">
                    <FaGem className="mx-auto" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">No items found</h3>
                  <p className="text-gray-600 mb-6">We couldn't find any jewelry matching your current filters.</p>
                  <button 
                    onClick={resetFilters}
                    className="bg-amber-600 text-white font-medium px-6 py-3 rounded hover:bg-amber-700 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-gray-600 text-lg mb-8">
              Our master craftsmen can create bespoke jewelry tailored to your preferences and requirements. 
              Book an appointment for a personalized consultation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="px-8 py-4 bg-white text-amber-800 font-medium rounded hover:bg-gray-100 transition-colors border border-amber-200">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collections;