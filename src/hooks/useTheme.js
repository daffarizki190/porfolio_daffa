import { useState, useEffect } from 'react';
import { themes } from '../data/themes';

/**
 * Hook untuk mengelola tema aplikasi
 * @param {Object} options - Opsi konfigurasi
 * @param {string} options.initialTheme - Nama tema awal (default: tema pertama dalam daftar)
 * @param {boolean} options.persistTheme - Apakah menyimpan preferensi tema di localStorage (default: true)
 * @returns {Object} - { theme, setTheme, themes } tema saat ini, fungsi untuk mengubah tema, dan daftar tema
 */
export const useTheme = (options = {}) => {
  const {
    initialTheme = themes[0].name,
    persistTheme = true
  } = options;
  
  // Coba ambil tema dari localStorage jika persistTheme aktif
  const getSavedTheme = () => {
    if (persistTheme && typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('app-theme');
      if (savedTheme) {
        const themeObj = themes.find(t => t.name === savedTheme);
        return themeObj || themes[0];
      }
    }
    return themes.find(t => t.name === initialTheme) || themes[0];
  };
  
  const [theme, setCurrentTheme] = useState(getSavedTheme());
  
  // Fungsi untuk mengubah tema
  const setTheme = (themeName) => {
    const newTheme = themes.find(t => t.name === themeName);
    if (newTheme) {
      setCurrentTheme(newTheme);
      if (persistTheme && typeof window !== 'undefined') {
        localStorage.setItem('app-theme', newTheme.name);
      }
    }
  };
  
  // Efek untuk menerapkan tema ke dokumen
  useEffect(() => {
    // Contoh: Anda dapat menerapkan kelas tema ke elemen root atau mengubah variabel CSS
    // document.documentElement.className = theme.rootClass || '';
    
    // Atau mengatur variabel CSS kustom
    if (theme) {
      document.documentElement.style.setProperty('--primary-color', theme.accent || '#FCD34D');
      document.documentElement.style.setProperty('--header-bg', theme.header || '#4338CA');
      // Tambahkan variabel CSS lainnya sesuai kebutuhan
    }
  }, [theme]);
  
  return { theme, setTheme, themes };
};