import { useState, useEffect } from 'react';

/**
 * Hook untuk mendeteksi bagian aktif pada halaman berdasarkan scrolling
 * @param {Object} options - Opsi konfigurasi
 * @param {number} options.threshold - Nilai threshold untuk IntersectionObserver (0-1)
 * @param {string} options.rootMargin - Margin untuk root observer
 * @returns {[string, function]} - Bagian aktif dan fungsi untuk mengubah bagian aktif
 */
export const useActiveSection = (options = {}) => {
  const {
    threshold = 0.2,
    rootMargin = '-20% 0px -20% 0px'
  } = options;

  const [activeSection, setActiveSection] = useState('tentang');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold,
        rootMargin
      }
    );
    
    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });
    
    // Cleanup observer pada unmount
    return () => {
      sections.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [threshold, rootMargin]);

  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    setActiveSection(targetId);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    return targetId; // Mengembalikan ID untuk digunakan oleh komponen (misalnya untuk menutup menu)
  };

  return { activeSection, handleNavClick };
};