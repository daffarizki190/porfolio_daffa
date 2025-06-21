import { useState, useEffect } from 'react';

/**
 * Hook untuk melacak posisi scroll dan arah scroll
 * @param {Object} options - Opsi konfigurasi
 * @param {number} options.throttleMs - Waktu throttle dalam milidetik (default: 100)
 * @returns {Object} - {scrollY, scrollX, scrollDirection, isScrolling}
 */
export const useScrollPosition = (options = {}) => {
  const { throttleMs = 100 } = options;
  
  const [scrollPosition, setScrollPosition] = useState({
    scrollY: typeof window !== 'undefined' ? window.scrollY : 0,
    scrollX: typeof window !== 'undefined' ? window.scrollX : 0,
    scrollDirection: 'none', // 'up', 'down', 'left', 'right', 'none'
    isScrolling: false
  });
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let lastScrollY = window.scrollY;
    let lastScrollX = window.scrollX;
    let ticking = false;
    let scrollTimeout;
    
    const updateScrollPosition = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      
      // Tentukan arah scroll
      let scrollDirection = 'none';
      
      if (scrollY < lastScrollY) {
        scrollDirection = 'up';
      } else if (scrollY > lastScrollY) {
        scrollDirection = 'down';
      } else if (scrollX > lastScrollX) {
        scrollDirection = 'right';
      } else if (scrollX < lastScrollX) {
        scrollDirection = 'left';
      }
      
      setScrollPosition({
        scrollY,
        scrollX,
        scrollDirection,
        isScrolling: true
      });
      
      // Reset isScrolling setelah pengguna berhenti scroll
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrollPosition(prev => ({ ...prev, isScrolling: false }));
      }, 150);
      
      lastScrollY = scrollY;
      lastScrollX = scrollX;
      ticking = false;
    };
    
    const onScroll = () => {
      if (!ticking) {
        // Throttle update untuk performa
        window.requestAnimationFrame(() => {
          updateScrollPosition();
          setTimeout(() => {
            ticking = false;
          }, throttleMs);
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeout);
    };
  }, [throttleMs]);
  
  return scrollPosition;
};