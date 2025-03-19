import { useQuery } from '@tanstack/react-query'

// Example hook for fetching gem collection data
export function useGemCollections() {
  return useQuery({
    queryKey: ['gemCollections'],
    queryFn: async () => {
      // Replace with your actual API call
      const response = await fetch('/api/collections');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  });
}