import React from 'react';
import PropTypes from 'prop-types';
import { icons } from '../assets';  // Remove .js extension

const Header = ({ onMenuOpen, handleNavClick, activeSection }) => {
  const navLinks = [
    { href: '#tentang', label: 'Tentang', id: 'tentang' },
    { href: '#keahlian', label: 'Keahlian', id: 'keahlian' },
    { href: '#pengalaman', label: 'Pengalaman', id: 'pengalaman' },
    { href: '#kontak', label: 'Kontak', id: 'kontak' },
  ];

  const handleClick = (e) => {
    try {
      handleNavClick(e);
    } catch (error) {
      console.error('Navigation click error:', error);
    }
  };

  const handleMenuOpen = () => {
    try {
      onMenuOpen();
    } catch (error) {
      console.error('Error opening menu:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-[#111111]/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center text-white px-4 py-4">
        <span className="font-heading font-bold text-xl tracking-normal text-white transition-colors cursor-pointer hover:scale-105">
          Portfolio
        </span>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    onClick={handleClick}
                    aria-current={activeSection === link.id ? 'page' : undefined}
                    className={`text-white/80 tracking-normal transition transform duration-300 ${
                      activeSection === link.id
                        ? 'font-bold text-white'
                        : 'font-medium hover:scale-110 hover:-translate-y-0.5'
                    }`}
                  >
                    {link.label}
                    {activeSection === link.id && <div className="nav-indicator" />}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleMenuOpen}
              aria-label="Open navigation menu"
              className="md:hidden p-2 text-white/80 hover:text-white rounded-full transition transform duration-300 hover:bg-white/10 hover:scale-110"
            >
              {icons?.menu ? (
                <img src={icons.menu} alt="" className="w-5 h-5" />
              ) : (
                <span className="text-sm">Menu</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onMenuOpen: PropTypes.func.isRequired,
  handleNavClick: PropTypes.func.isRequired,
  activeSection: PropTypes.string,
};

export default Header;
