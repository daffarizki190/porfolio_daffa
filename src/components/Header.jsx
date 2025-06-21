import React from 'react';
import { icons } from '../assets.js';

const Header = ({ onMenuOpen, handleNavClick, activeSection }) => {
  const navLinks = [
    { href: '#tentang', label: 'Tentang', id: 'tentang' },
    { href: '#keahlian', label: 'Keahlian', id: 'keahlian' },
    { href: '#pengalaman', label: 'Pengalaman', id: 'pengalaman' },
    { href: '#kontak', label: 'Kontak', id: 'kontak' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-[#111111]/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center text-white px-4 py-4">
        <span className="font-heading font-bold text-xl tracking-normal text-white transition-colors cursor-pointer hover:scale-105">
          Portfolio
        </span>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <div key={link.href} className="relative">
                <a 
                  href={link.href} 
                  onClick={handleNavClick}
                  className={`font-strong text-white/80 hover:text-white transition-all duration-300 tracking-normal hover:scale-110 hover:-translate-y-0.5 ${activeSection === link.id ? 'font-bold text-white' : 'font-medium'}`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <div className="nav-indicator bg-red-600" />
                  )}
                </a>
              </div>
            ))}
          </nav>
          <div className="flex items-center">
            <button 
              onClick={onMenuOpen} 
              className="md:hidden p-2 text-white/80 hover:text-white rounded-full transition-all duration-300 hover:bg-white/10 hover:scale-110"
            >
              <img src={icons.menu} alt="Menu" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;