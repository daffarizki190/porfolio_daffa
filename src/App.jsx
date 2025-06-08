import React, { useState, useRef, useEffect } from 'react';

// Impor komponen dari file terpisah
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Footer from './components/Footer.jsx';
import { CloseIcon } from './assets.jsx';
import { themes } from './themes.js'; 
import defaultProfilePic from './assets/foto-profil.jpg';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultProfilePic);
  const fileInputRef = useRef(null);
  const [themeIndex, setThemeIndex] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const lastScrollY = useRef(0);

  const cycleTheme = () => {
      setThemeIndex(prevIndex => (prevIndex + 1) % themes.length);
  };
  
  const currentTheme = themes[themeIndex];

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImageURL = URL.createObjectURL(file);
      setProfileImage(newImageURL);
    }
  };
    
  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) < 5) return;
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 p-6 flex flex-col">
          <button onClick={() => setIsMenuOpen(false)} className="self-end mb-8"> <CloseIcon /> </button>
          <nav className="flex flex-col items-center space-y-6 text-lg">
            <a href="#tentang" onClick={handleNavClick} className="text-gray-700 hover:text-indigo-600">Tentang</a>
            <a href="#keahlian" onClick={handleNavClick} className="text-gray-700 hover:text-indigo-600">Keahlian</a>
            <a href="#pengalaman" onClick={handleNavClick} className="text-gray-700 hover:text-indigo-600">Pengalaman Kerja</a>
            <a href="#kontak" onClick={handleNavClick} className="text-gray-700 hover:text-indigo-600">Kontak</a>
          </nav>
        </div>
      )}

      <Header onThemeCycle={cycleTheme} onMenuOpen={() => setIsMenuOpen(true)} handleNavClick={handleNavClick} />

      <main>
        <Hero 
          theme={currentTheme}
          profileImage={profileImage}
          handleImageClick={handleImageClick}
          fileInputRef={fileInputRef}
          handleImageChange={handleImageChange}
          scrollDirection={scrollDirection}
          handleNavClick={handleNavClick}
        />
        <Skills theme={currentTheme} scrollDirection={scrollDirection} />
        <Experience theme={currentTheme} scrollDirection={scrollDirection} />
      </main>
      
      <Footer theme={currentTheme} scrollDirection={scrollDirection} />
    </>
  );
}
