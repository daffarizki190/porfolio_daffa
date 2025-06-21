import { useEffect, useRef } from 'react';
import anime from 'animejs';

/**
 * Hook untuk menerapkan animasi dengan anime.js pada elemen
 * @param {Object} options - Opsi animasi
 * @param {Object} options.initial - Konfigurasi animasi awal
 * @param {Object} options.hover - Konfigurasi animasi hover (opsional)
 * @param {number} options.delay - Delay sebelum animasi dimulai (ms)
 * @returns {Object} - Referensi elemen dan state hover
 */
export const useAnimeAnimation = (options = {}) => {
  const {
    initial = {},
    hover = null,
    delay = 0
  } = options;
  
  const elementRef = useRef(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Animasi awal
    const defaultInitial = {
      targets: element,
      opacity: [0, 1],
      translateY: [20, 0],
      easing: 'easeOutElastic(1, .5)',
      duration: 1000,
      delay
    };
    
    const initialAnimation = anime({
      ...defaultInitial,
      ...initial
    });
    
    // Setup animasi hover jika disediakan
    if (hover && typeof hover === 'object') {
      const setupHoverAnimation = () => {
        const defaultEnter = {
          targets: element,
          scale: 1.05,
          duration: 300,
          easing: 'easeOutQuad'
        };
        
        const defaultLeave = {
          targets: element,
          scale: 1,
          duration: 300,
          easing: 'easeOutQuad'
        };
        
        element.addEventListener('mouseenter', () => {
          anime({
            ...defaultEnter,
            ...hover.enter
          });
        });
        
        element.addEventListener('mouseleave', () => {
          anime({
            ...defaultLeave,
            ...hover.leave
          });
        });
      };
      
      // Setup hover animation setelah animasi awal selesai
      if (initialAnimation.completed) {
        setupHoverAnimation();
      } else {
        initialAnimation.complete = setupHoverAnimation;
      }
    }
    
    // Cleanup
    return () => {
      if (hover && element) {
        element.removeEventListener('mouseenter', () => {});
        element.removeEventListener('mouseleave', () => {});
      }
      initialAnimation.pause();
    };
  }, [initial, hover, delay]);
  
  return elementRef;
};