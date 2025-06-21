import { useState, useEffect } from 'react';

/**
 * Hook untuk mendeteksi media query
 * @param {string} query - Media query yang akan dideteksi, contoh: '(max-width: 768px)'
 * @returns {boolean} - True jika media query cocok, false jika tidak
 */
export const useMediaQuery = (query) => {
  // Cek apakah window tersedia (untuk SSR compatibility)
  const getMatches = (query) => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState(getMatches(query));

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);

    // Inisialisasi dengan nilai saat ini
    updateMatches();

    // Tambahkan listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMatches);
    } else {
      // Fallback untuk browser lama
      mediaQuery.addListener(updateMatches);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateMatches);
      } else {
        // Fallback untuk browser lama
        mediaQuery.removeListener(updateMatches);
      }
    };
  }, [query]);

  return matches;
};

/**
 * Hook untuk mendeteksi ukuran layar berdasarkan breakpoint yang umum digunakan
 * @returns {Object} - { isMobile, isTablet, isDesktop, isLargeDesktop }
 */
export const useResponsive = () => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px) and (max-width: 1440px)');
  const isLargeDesktop = useMediaQuery('(min-width: 1441px)');

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    // Helper untuk mendapatkan nilai berdasarkan ukuran layar
    value: ({
      mobile = null,
      tablet = null,
      desktop = null,
      largeDesktop = null,
      defaultValue = null
    }) => {
      if (isMobile && mobile !== null) return mobile;
      if (isTablet && tablet !== null) return tablet;
      if (isDesktop && desktop !== null) return desktop;
      if (isLargeDesktop && largeDesktop !== null) return largeDesktop;
      return defaultValue;
    }
  };
};