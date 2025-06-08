import React from 'react';
import WavyText from './WavyText.jsx';

const Hero = ({ theme, profileImage, handleImageClick, fileInputRef, handleImageChange, scrollDirection, handleNavClick }) => {
  return (
    <section id="tentang" className={`text-white text-center pt-24 pb-16 px-4 transition-colors duration-500 ${theme.hero}`}>
      <div className="max-w-md mx-auto">
        <img
          src={profileImage}
          alt="Foto Profil"
          className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white/50 shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
          onClick={handleImageClick}
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/128x128/FFFFFF/6366F1?text=Error'; }}
        />
        <input type="file" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} accept="image/*" />
        
        <WavyText as="h1" text="Halo, Saya Daffa Rizki Ariyanto" className="text-3xl font-bold mt-6" scrollDirection={scrollDirection} delayMultiplier={10} />
        
        <p className={`mt-2 ${theme.heroText}`}>
          Seorang yang berdedikasi dengan pengalaman dalam operasional dan kepemimpinan tim, kini bersemangat untuk beralih karir dan mendalami dunia pengembangan web front-end.
        </p>
        <a href="#kontak" onClick={handleNavClick} className={`mt-8 inline-block font-bold py-2 px-6 rounded-lg transition-colors ${theme.button}`}>
          Hubungi Saya
        </a>
      </div>
    </section>
  );
};

export default Hero;