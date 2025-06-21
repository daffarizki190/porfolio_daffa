import { useState, useCallback } from 'react';

/**
 * Hook untuk mengelola state menu (terbuka/tertutup)
 * @param {Object} options - Opsi konfigurasi
 * @param {boolean} options.initialState - State awal menu (default: false/tertutup)
 * @returns {Object} - { isMenuOpen, openMenu, closeMenu, toggleMenu } state dan fungsi-fungsi untuk mengelola menu
 */
export const useMenu = (options = {}) => {
  const { initialState = false } = options;
  
  const [isMenuOpen, setIsMenuOpen] = useState(initialState);
  
  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
    // Opsional: Tambahkan kode untuk mencegah scrolling body saat menu terbuka
    document.body.style.overflow = 'hidden';
  }, []);
  
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    // Kembalikan scrolling body
    document.body.style.overflow = '';
  }, []);
  
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => {
      const newState = !prev;
      // Atur overflow body berdasarkan state menu
      document.body.style.overflow = newState ? 'hidden' : '';
      return newState;
    });
  }, []);
  
  return { isMenuOpen, openMenu, closeMenu, toggleMenu };
};