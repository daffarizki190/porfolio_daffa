import React, { useState, useEffect, useCallback } from 'react';
import { backgrounds } from '../assets.js';
import anime from 'animejs';

const fallbackImageSrc = 'data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"%3e%3crect width="160" height="160" fill="%234338CA" opacity="0.1"/%3e%3ctext x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="16" fill="%234338CA"%3eNo Image%3c/text%3e%3c/svg%3e';

const Hero = ({ profileImage, handleNavClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const animateButton = useCallback((button) => {
    anime({
      targets: button,
      scale: {
        value: [1, 1.1, 1],
        duration: 300,
        easing: 'easeOutQuad'
      }
    });
  }, []);

  useEffect(() => {
    const contactButton = document.getElementById('contact-button');
    const projectButton = document.getElementById('project-button');
    
    const handleContactClick = () => animateButton(contactButton);
    const handleProjectClick = () => animateButton(projectButton);
    
    if (contactButton) {
      contactButton.addEventListener('click', handleContactClick);
    }
    if (projectButton) {
      projectButton.addEventListener('click', handleProjectClick);
    }
    
    return () => {
      if (contactButton) {
        contactButton.removeEventListener('click', handleContactClick);
      }
      if (projectButton) {
        projectButton.removeEventListener('click', handleProjectClick);
      }
    };
  }, [animateButton]);

  return (
    <section 
      id="tentang" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800"
    >
      <video 
        autoPlay 
        muted 
        loop 
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      >
        <source src={backgrounds.heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white tracking-normal mb-8">
              <span className="block animate-fade-in-up">
                Hi,
              </span>
              <span className="block animate-fade-in-left">
                <span className="inline-block">I'm</span>{" "}
                <span className="text-red-600 relative inline-block hover:scale-110 hover:text-red-400 transition-all duration-300">
                  Daffa
                </span>
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl font-strong font-bold tracking-normal animate-fade-in-up-delayed">
                Manajemen Operasional Parking
              </span>
            </h1>
            
            <div className="flex justify-start mt-6" id="hero-buttons">
              <button
                onClick={() => handleNavClick({ preventDefault: () => {}, currentTarget: { getAttribute: () => '#kontak' } })}
                className="px-8 py-4 bg-red-600 text-white font-medium rounded-lg shadow-lg transition duration-300 hover:scale-105 hover:bg-red-700"
                id="contact-button"
              >
                Hubungi Saya
              </button>
            </div>
          </div>
          
          <div className="relative h-full flex items-center justify-center">
            <div 
              className="w-[350px] aspect-square relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div 
                className={`absolute inset-0 rounded-full blur-xl scale-110 transition-all duration-600 ${
                  isHovered ? 'bg-red-600/60 scale-115' : 'bg-gray-600/70'
                }`}
              />
              <div 
                className={`absolute inset-0 rounded-full blur-lg scale-105 opacity-60 transition-all duration-1200 ${
                  isHovered ? 'bg-red-500/50 rotate-180' : 'bg-gray-700/50'
                }`}
              />
              <img
                src={profileImage}
                alt="Foto Profil"
                className="w-full h-full object-cover object-center rounded-full relative z-10 hover:scale-105 transition-transform duration-500"
                onError={(e) => { 
                  console.error('Error loading profile image');
                  const img = e.target instanceof HTMLImageElement ? e.target : null;
                  if (img) {
                    img.onerror = null;
                    img.src = fallbackImageSrc;
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;