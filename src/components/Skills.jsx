import React, { useState, useEffect, useRef } from 'react';
import { skillsData } from '../data/skills.js';
import  AnimatedText  from './AnimatedText.jsx';
import { skillsAnimations } from '../utils/animasi';
import { backgrounds } from '../assets.js';

const SkillCard = ({ skill, index, activeCard, setActiveCard, theme }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const handleMouseEnter = () => {
    setActiveCard(index);
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setActiveCard(null);
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };
  
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotateYValue = ((x - rect.width / 2) / (rect.width / 2)) * 7;
    const rotateXValue = ((y - rect.height / 2) / (rect.height / 2)) * -7;
    setRotateX(prev => prev * 0.5 + rotateXValue * 0.5);
    setRotateY(prev => prev * 0.5 + rotateYValue * 0.5);
  };

  const themeClasses = {
    card: theme === 'dark' ? 'bg-black/30 hover:bg-purple-900/10' : 'bg-white/30 hover:bg-purple-100/10',
    text: theme === 'dark' ? 'text-purple-300 group-hover:text-purple-200' : 'text-purple-700 group-hover:text-purple-800',
    description: theme === 'dark' ? 'text-purple-300/90' : 'text-purple-700/90',
  };
  
  return (
    <div 
      className={`relative p-6 transition-all duration-300 backdrop-blur-sm flex flex-col items-center justify-start overflow-hidden group cursor-pointer hover:scale-[1.02] ${isHovered ? 'aspect-auto' : 'aspect-square'} ${themeClasses.card}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transition: 'transform 0.2s ease-out, box-shadow 0.3s ease',
        boxShadow: activeCard === index ? '0 0 20px rgba(147,112,219,0.3)' : 'none',
        willChange: 'transform'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div 
        className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-all duration-300"
        style={{ 
          backgroundImage: `url(${backgrounds.heroBg})`,
          transform: `translateZ(2px) translateX(${-rotateY/3}px) translateY(${rotateX/3}px)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: activeCard === index ? 'brightness(1.2) hue-rotate(230deg)' : 'brightness(1)',
          transition: 'transform 0.2s ease-out, filter 0.3s ease',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      ></div>
      
      <div 
        className="relative z-10 mb-4 hover:scale-105"
        style={{ 
          transform: `translateZ(15px)`,
          transition: 'transform 0.2s ease-out',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      >
        <img 
          src={skill.icon} 
          alt={skill.name} 
          className="w-12 h-12 object-contain filter hue-rotate-[230deg] brightness-125 group-hover:brightness-150 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_8px_rgba(147,112,219,0.6)]" 
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        />
      </div>

      <h3 
        className={`relative z-10 text-xl font-bold ${themeClasses.text} tracking-wide font-sans transition-colors duration-300`}
        style={{ 
          transform: `translateZ(12px)`,
          textShadow: '0 0 8px rgba(147,112,219,0.4)',
          transition: 'transform 0.2s ease-out, text-shadow 0.3s ease',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      >
        {skill.name}
      </h3>
      
      {isHovered && (
        <div
          className="relative z-10 mt-4 w-full"
          style={{ 
            transform: `translateZ(8px)`,
            transition: 'transform 0.2s ease-out',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <p 
            className={`${themeClasses.description} text-sm text-center leading-relaxed`}
            style={{ 
              textShadow: '0 0 6px rgba(147,112,219,0.3)',
              transition: 'all 0.2s ease-out',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            {skill.description}
          </p>
        </div>
      )}
    </div>
  );
};

const SkillModal = ({ skill, onClose, theme }) => {
  if (!skill) return null;
  
  const themeClasses = {
    bg: theme === 'dark' ? 'bg-black/80' : 'bg-white/80',
    text: theme === 'dark' ? 'text-white' : 'text-black',
    border: theme === 'dark' ? 'border-white/20' : 'border-black/20',
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div 
        className={`relative ${themeClasses.bg} ${themeClasses.border} border p-6 rounded-lg max-w-md w-full`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className={`absolute top-3 right-3 ${themeClasses.text}/70 hover:${themeClasses.text} transition-colors`}
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="flex items-center mb-4">
          <div className="mr-4 p-2 bg-white/10 rounded-full">
            <img src={skill.icon} alt={skill.name} className="w-10 h-10 object-contain brightness-200" />
          </div>
          <h3 className={`text-2xl font-bold ${themeClasses.text}`}>{skill.name}</h3>
        </div>
        
        <p className={`${themeClasses.text}/90 leading-relaxed`}>{skill.description}</p>
      </div>
    </div>
  );
};

export default function Skills({ theme }) {
  const [activeCard, setActiveCard] = useState(null);
  const skillsRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        skillsAnimations.skillCard(ref, index);
      }
    });
  }, []);

  const themeClasses = {
    background: 'bg-black',
    text: theme === 'dark' ? 'text-white' : 'text-black',
    cardBg: theme === 'dark' ? 'bg-black/30' : 'bg-white/30',
    hoverBg: theme === 'dark' ? 'hover:bg-purple-900/10' : 'hover:bg-purple-100/10',
  };

  return (
    <section 
      id="keahlian" 
      ref={skillsRef}
      className={`min-h-screen relative overflow-hidden ${themeClasses.background}`}
    >
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 transition-opacity duration-1000"
        >
          <source src={backgrounds.skillPengalamanVideo} type="video/mp4" />
        </video>
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/60' : 'bg-white/60'} transition-all duration-1000 ease-in-out`}></div>
      </div>

      <div className="container mx-auto relative z-10 pt-32 pb-20">
        <AnimatedText 
          as="h2" 
          text="Skills" 
          className={`text-4xl md:text-5xl font-bold text-center ${themeClasses.text} mb-16 tracking-wider font-sans`}
        />
        
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mx-auto max-w-4xl"
        >
          {skillsData.map((skill, index) => (
            <div
              key={skill.name}
              className={`scroll-reveal backdrop-blur-sm ${themeClasses.cardBg}`}
              data-index={index}
              ref={el => cardRefs.current[index] = el}
            >
              <SkillCard
                skill={skill}
                index={index}
                activeCard={activeCard}
                setActiveCard={setActiveCard}
                theme={theme}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}