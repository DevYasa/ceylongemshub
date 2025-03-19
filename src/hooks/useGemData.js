import { useQuery } from '@tanstack/react-query';

/**
 * Custom hook to fetch and cache gem collection data
 * @param {string} collectionId - Optional collection ID for specific collection
 * @returns {Object} Query result with data, loading state, and error
 */
export function useGemCollections(collectionId = null) {
  const endpoint = collectionId 
    ? `/api/collections/${collectionId}` 
    : '/api/collections';
    
  return useQuery({
    queryKey: ['gemCollections', collectionId],
    queryFn: async () => {
      // If you don't have a real API yet, you can use mock data or fetch from JSON files
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      } catch (error) {
        console.error('Error fetching collections:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes before refetching
    cacheTime: 60 * 60 * 1000, // Keep in cache for 1 hour
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

/**
 * Custom hook to fetch featured gems for homepage
 */
export function useFeaturedGems() {
  return useQuery({
    queryKey: ['featuredGems'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/gems/featured');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      } catch (error) {
        console.error('Error fetching featured gems:', error);
        throw error;
      }
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
  });
}

/**
 * Custom hook to fetch gem details
 * @param {string} gemId - Gem ID
 */
export function useGemDetails(gemId) {
  return useQuery({
    queryKey: ['gemDetails', gemId],
    queryFn: async () => {
      if (!gemId) return null;
      
      try {
        const response = await fetch(`/api/gems/${gemId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      } catch (error) {
        console.error(`Error fetching gem ${gemId}:`, error);
        throw error;
      }
    },
    enabled: !!gemId, // Only run query if gemId exists
    staleTime: 60 * 60 * 1000, // 1 hour
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

