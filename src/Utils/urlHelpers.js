import { googleTagText } from "@/Contants/constant";

export const isGadSourcePresent = () => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Create a URL object from the current window location
      const url = new URL(window.location.href);
      
      // Check if the gad_source parameter exists in the URL
      return url.searchParams.has(googleTagText);
    }
    
    // Return false if not in browser environment
    return false;
  };
  