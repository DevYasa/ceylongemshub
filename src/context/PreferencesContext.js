import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const PreferencesContext = createContext(null);

// Get initial preferences from localStorage or use defaults
const getInitialPreferences = () => {
  try {
    const storedPrefs = localStorage.getItem('cg_user_preferences');
    if (storedPrefs) {
      return JSON.parse(storedPrefs);
    }
  } catch (error) {
    console.error('Error loading user preferences:', error);
  }
  
  // Default preferences
  return {
    theme: 'light', // light or dark
    viewMode: 'grid', // grid or list for collections
    currency: 'USD', // USD, MYR, etc.
    recentlyViewed: [], // IDs of recently viewed gems/collections
    filters: {
      sort: 'newest', // 'newest', 'price-high', 'price-low'
      priceRange: [0, 10000], 
      gemTypes: [], // ['sapphire', 'ruby', etc.]
    }
  };
};

// Provider component
export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(getInitialPreferences);
  
  // Update localStorage when preferences change
  useEffect(() => {
    try {
      localStorage.setItem('cg_user_preferences', JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving user preferences:', error);
    }
  }, [preferences]);
  
  // Update specific preference
  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Add gem to recently viewed
  const addToRecentlyViewed = (gemId) => {
    if (!gemId) return;
    
    setPreferences(prev => {
      // Remove if already exists (to move it to the top)
      const filtered = prev.recentlyViewed.filter(id => id !== gemId);
      // Add to the beginning and limit to 10 items
      const updated = [gemId, ...filtered].slice(0, 10);
      
      return {
        ...prev,
        recentlyViewed: updated
      };
    });
  };
  
  // Update filter settings
  const updateFilters = (filterUpdates) => {
    setPreferences(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        ...filterUpdates
      }
    }));
  };
  
  // Clear all preferences
  const resetPreferences = () => {
    localStorage.removeItem('cg_user_preferences');
    setPreferences(getInitialPreferences());
  };
  
  // Return the context provider
  return (
    <PreferencesContext.Provider 
      value={{ 
        preferences, 
        updatePreference,
        addToRecentlyViewed, 
        updateFilters,
        resetPreferences
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

// Custom hook to use the preferences context
export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};