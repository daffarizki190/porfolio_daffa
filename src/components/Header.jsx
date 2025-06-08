import React from 'react';
import { MenuIcon, PaletteIcon } from '../assets.jsx'; // Diperbaiki

const Header = ({ onThemeCycle, onMenuOpen, handleNavClick }) => {
  const navLinks = [
    { href: '#tentang', label: 'Tentang' },
    { href: '#keahlian', label: 'Keahlian' },
    { href: '#pengalaman', label: 'Pengalaman' },
    { href: '#kontak', label: 'Kontak' },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-4">
      <div className="container mx-auto flex justify-between items-center text-white">
        
        <span className="font-bold text-xl">Portfolio</span>
        
        <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={handleNavClick} className="font-medium hover:text-gray-300 transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>
            
            <div className="flex items-center gap-4">
               <button onClick={onThemeCycle} className="text-white hover:text-yellow-300 transition-colors" aria-label="Ganti Tema">
                  <PaletteIcon />
               </button>
               <button onClick={onMenuOpen} className="md:hidden">
                  <MenuIcon />
               </button>
            </div>
        </div>

      </div>
    </header>
  );
};

export default Header;