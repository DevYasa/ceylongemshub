import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Decorative diamond pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-repeat opacity-30" style={{
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMjAgMEwwIDIwTDIwIDQwTDQwIDIwTDIwIDBaIiBmaWxsPSIjZDk3NzA2Ii8+PC9zdmc+')",
          backgroundSize: "40px 40px"
        }} />
      </div>
      
      {/* Top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300"></div>

      <div className="container mx-auto px-6 pt-16 pb-8 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-4 gap-12"
        >
          <motion.div variants={fadeUp} className="mb-8">
            <h3 className="text-2xl font-serif font-semibold mb-4 relative inline-block">
              Ceylon Gems & Jewelry Hub
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-amber-500"></span>
            </h3>
            <p className="text-gray-400 mt-6 leading-relaxed">
              Bringing the finest Ceylon gemstones and jewelry craftsmanship to Malaysia. Each piece tells a story of elegance, heritage, and unparalleled quality.
            </p>
            
            {/* Certification badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="border border-amber-700/30 rounded-sm px-3 py-2 flex items-center bg-amber-900/20">
                <span className="text-xs text-amber-400">GIA Certified</span>
              </div>
              <div className="border border-amber-700/30 rounded-sm px-3 py-2 flex items-center bg-amber-900/20">
                <span className="text-xs text-amber-400">Ethically Sourced</span>
              </div>
              <div className="border border-amber-700/30 rounded-sm px-3 py-2 flex items-center bg-amber-900/20">
                <span className="text-xs text-amber-400">Premium Quality</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={fadeUp} className="mb-8">
            <h4 className="text-xl font-serif font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-amber-500"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/collections", label: "Collections" },
                { to: "/contact", label: "Contact" }
              ].map((link, index) => (
                <li key={index}>
                  <Link to={link.to} className="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 h-px bg-amber-400 mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={fadeUp} className="mb-8 space-y-6">
            <h4 className="text-xl font-serif font-semibold mb-6 relative inline-block">
              Our Locations
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-amber-500"></span>
            </h4>
            
            <div className="flex space-x-3">
              <div className="text-amber-400 mt-1">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h5 className="font-medium text-white">Penang</h5>
                <p className="text-gray-400 mt-1">Lot. 4, Parkroyal Penang Resorts, 11100 Batu Ferringhi, Pulau Pinang</p>
                <div className="flex items-center mt-2 text-gray-400">
                  <FaPhoneAlt className="text-xs mr-2" />
                  <p>+60 4-881 9002</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={fadeUp} className="mb-8">
            <h4 className="text-xl font-serif font-semibold mb-6 relative inline-block">
              Connect With Us
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-amber-500"></span>
            </h4>
            
            <div className="flex space-x-4 mb-6">
              {[
                { icon: <FaFacebook size={22} />, url: "https://facebook.com", color: "hover:bg-blue-600" },
                { icon: <FaInstagram size={22} />, url: "https://www.instagram.com/ceylongemshub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", color: "hover:bg-pink-600" },
                { icon: <FaTwitter size={22} />, url: "https://twitter.com", color: "hover:bg-blue-400" },
                { icon: <FaWhatsapp size={22} />, url: "https://wa.me/6048819002", color: "hover:bg-green-500" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`text-gray-300 hover:text-white ${social.color} w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 border border-gray-700 hover:border-transparent`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaEnvelope className="text-amber-400 mt-1" />
                <div>
                  <p className="text-gray-300 font-medium">Email</p>
                  <p className="text-gray-400 mt-1">ceylongemshub@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <FaClock className="text-amber-400 mt-1" />
                <div>
                  <p className="text-gray-300 font-medium">Business Hours</p>
                  <p className="text-gray-400 mt-1">10AM - 6PM (Tue-Sun)</p>
                  <p className="text-gray-400">Closed on Mondays</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Newsletter subscription */}
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 mb-12 max-w-xl mx-auto text-center"
        >
          <h4 className="text-xl font-serif font-semibold mb-4">Subscribe to Our Newsletter</h4>
          <p className="text-gray-400 mb-6">Be the first to know about new collections and exclusive offers.</p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-3 bg-gray-800 border border-gray-700 focus:border-amber-500 rounded-sm text-white flex-grow focus:outline-none"
            />
            <button className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium transition-colors duration-300 rounded-sm">
              Subscribe
            </button>
          </div>
        </motion.div>
        
        {/* Copyright bar */}
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center"
        >
          <p>&copy; {currentYear} Ceylon Gems & Jewelry Hub Malaysia. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;