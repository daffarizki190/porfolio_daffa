import React, { useEffect, useRef } from 'react';
import { experiencesData } from '../data/experience.js';
import { experienceAnimations } from '../utils/animasi';
import { backgrounds } from '../assets.js';

/**
 * Komponen Experience - Menampilkan bagian pengalaman
 * 
 * @param {Object} props - Props komponen
 * @param {Object} props.theme - Tema yang digunakan
 * @returns {React.ReactElement} Komponen Experience
 */
const Experience = ({ theme }) => {
  const experienceRefs = useRef([]);

  useEffect(() => {
    experienceRefs.current.forEach((ref, index) => {
      if (ref) {
        experienceAnimations.experienceItem(ref, index);
      }
    });
  }, []);

  return (
    <section
      id="pengalaman"
      className="py-20 relative overflow-hidden bg-black"
      data-section="pengalaman"
    >
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 transition-opacity duration-1000"
        >
          <source src={backgrounds.pengalamanVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 transition-all duration-1000 ease-in-out"></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white tracking-wider font-sans">
          Pengalaman
        </h2>
        <div className="space-y-8">
          {experiencesData.map((item, index) => (
            <div
              key={index}
              ref={el => experienceRefs.current[index] = el}
              className="p-6 rounded-lg bg-black/30 backdrop-blur-sm hover:bg-white/5 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-600/20 p-2 backdrop-blur-sm border border-blue-600/20">
                  <img
                    src={item.icon}
                    alt={item.company}
                    className="w-full h-full object-contain brightness-200 group-hover:scale-125 transition-all duration-300"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white/90 tracking-wide font-sans hover:text-white transition-colors duration-300">
                    {item.role}
                  </h3>
                  <p className="text-lg font-medium mb-2 text-white/90 tracking-wide font-sans hover:text-white transition-colors duration-300">
                    {item.company}
                  </p>
                  <p className="text-sm mb-4 text-white/80 font-sans">
                    {item.period}
                  </p>
                  <ul className="list-disc list-outside pl-5 space-y-2">
                    {item.tasks.map((task, idx) => (
                      <li
                        key={idx}
                        className="text-base text-white/90 hover:text-white transition-colors duration-300 font-sans"
                      >
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;