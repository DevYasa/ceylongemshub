import React, { useEffect, useState, lazy, Suspense } from 'react';
// Add these keyframe animations to your index.css
import './index.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import logo from './assets/logo.png';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Collections = lazy(() => import('./pages/Collections'));
const Contact = lazy(() => import('./pages/Contact'));

// Loading component
const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[70vh]">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 relative mb-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
        <img 
          src={logo} 
          alt="Ceylon Gems Logo" 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 object-contain"
        />
      </div>
      <p className="text-amber-600 text-sm font-serif tracking-wider">LOADING...</p>
    </div>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);

  // Updated preloader approach using React state instead of direct DOM manipulation
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Simply use a timer to control the loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Preloader component rendered directly in React with fixed alignment
  const Preloader = () => (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Diamond shape */}
          <svg viewBox="0 0 100 100" width="200" height="200" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffeba7" />
                <stop offset="50%" stopColor="#d9a007" />
                <stop offset="100%" stopColor="#ffd700" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <g style={{ transformOrigin: 'center', animation: 'diamondRotate 3s infinite ease-in-out' }}>
              <polygon 
                points="50,10 90,50 50,90 10,50" 
                fill="url(#diamondGradient)" 
                stroke="#ffd700" 
                strokeWidth="1.5"
                filter="url(#glow)"
                style={{ opacity: 0.25, animation: 'diamondPulse 2s infinite alternate' }}
              />
            </g>
          </svg>
          
          {/* Logo Image */}
          <img 
            src={logo} 
            alt="Ceylon Gems Logo" 
            style={{ 
              position: 'absolute', 
              width: '8rem', 
              height: '8rem', 
              objectFit: 'contain', 
              zIndex: 10, 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              animation: 'logoPulse 2s infinite alternate'
            }}
          />
          
          {/* Reflection */}
          <div 
            style={{ 
              position: 'absolute', 
              bottom: '-30px', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              width: '80px', 
              height: '20px', 
              background: 'radial-gradient(ellipse at center, rgba(255,215,0,0.3) 0%, rgba(255,215,0,0) 70%)', 
              filter: 'blur(5px)', 
              animation: 'reflectionPulse 2s infinite alternate'
            }}
          ></div>
        </div>
        
        <div 
          style={{ 
            marginTop: '2rem', 
            color: 'white', 
            fontFamily: 'serif', 
            letterSpacing: '0.2em', 
            textAlign: 'center', 
            animation: 'fadeIn 1s ease-in-out 0.5s forwards', 
            opacity: 0
          }}
        >
          <div style={{ fontSize: '1.5rem' }}>CEYLON GEMS HUB</div>
          <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#fbbf24' }}>EXQUISITE CRAFTSMANSHIP</div>
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <ScrollToTop />
      <div className="App bg-gradient-to-b from-neutral-50 to-neutral-100 text-gray-900 relative overflow-hidden">
        {/* Background pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
          <div className="absolute w-full h-full bg-repeat opacity-10" style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMzAgMEwzMCA2MEwwIDMwWiIgZmlsbD0iIzk3NzEwYyIvPjxwYXRoIGQ9Ik02MCAzMEwzMCA2MEwzMCAwWiIgZmlsbD0iIzk3NzEwYyIvPjwvc3ZnPg==')",
            backgroundSize: "60px 60px"
          }} />
        </div>

        <Navbar />
        {loading ? (
          <Preloader />
        ) : (
          <AnimatePresence mode="wait">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        )}
        <Footer />
      </div>
    </Router>
  );
}

export default App;