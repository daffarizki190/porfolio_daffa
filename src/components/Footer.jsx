import React, { useEffect, useRef } from 'react';
import { icons, backgrounds } from '../assets.js';
import anime from 'animejs';

/**
 * Komponen Footer - Menampilkan bagian footer dengan informasi kontak
 * 
 * @param {Object} props - Props komponen
 * @param {Object} props.theme - Tema yang digunakan
 * @returns {React.ReactElement} Komponen Footer
 */
const Footer = () => {
  const socialIconsRef = useRef(null);
  const contactRef = useRef(null);
  const copyrightRef = useRef(null);
  
  useEffect(() => {
  
    if (socialIconsRef.current) {
      anime({
        targets: socialIconsRef.current.querySelectorAll('a'),
        translateY: [50, 0],
        opacity: [0, 1],
        scale: [0.5, 1],
        delay: anime.stagger(150),
        easing: 'easeOutElastic(1, .5)',
        duration: 800
      });
    }
    
  
    if (copyrightRef.current) {
      anime({
        targets: copyrightRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        easing: 'easeOutQuad',
        duration: 800,
        delay: 600
      });
    }
  }, []);
  
  return (
    <footer id="kontak" className="bg-[#111827] relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <div 
          className="absolute inset-0 opacity-25 bg-repeat"
          style={{ backgroundImage: `url(${backgrounds.heroBg})` }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 
            className="text-4xl font-bold text-white mb-8 tracking-normal"
          >
            Yuk, Ngobrol!
          </h2>
          
          <div className="flex flex-col md:flex-row justify-between">
            <div 
              className="mb-8 md:mb-0"
              ref={contactRef}
            >
              <p className="text-white/80 max-w-md mb-6">
                Setiap proyek dimulai dengan obrolan santai. Saya selalu siap mendengarkan 
                dan dengan senang hati mengembangkan ide kamu.
              </p>
              
              <a 
                href="mailto:dafarizki209@gmail.com?subject=Ide%20Proyek%20Baru&body=Halo%20Daffa,%0A%0ASaya%20punya%20ide%20untuk%20dibahas%20bersama."
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md inline-flex items-center gap-2 transition-all duration-300"
              >
                Ceritakan Ide Kamu
              </a>
            </div>
            
            <div
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                  <img src={icons.email} alt="Email" className="w-5 h-5 brightness-200" />
                </div>
                <div>
                  <span className="text-white/50 text-sm block">Email</span>
                  <a href="mailto:dafarizki209@gmail.com" className="text-white hover:text-blue-300 transition-colors">
                    dafarizki209@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.44,13c-.22,0-.45-.07-.67-.12a9.44,9.44,0,0,1-1.31-.39,2,2,0,0,0-2.48,1l-.22.45a12.18,12.18,0,0,1-2.66-2,12.18,12.18,0,0,1-2-2.66L10.52,9a2,2,0,0,0,1-2.48,10.33,10.33,0,0,1-.39-1.31c-.05-.22-.09-.45-.12-.68a3,3,0,0,0-3-2.49h-3a3,3,0,0,0-3,3.41A19,19,0,0,0,18.53,21.91l.38,0a3,3,0,0,0,2-.76,3,3,0,0,0,1-2.25v-3A3,3,0,0,0,19.44,13Zm.5,6a1,1,0,0,1-.34.75,1.05,1.05,0,0,1-.82.25A17,17,0,0,1,4.07,5.22a1.09,1.09,0,0,1,.25-.82,1,1,0,0,1,.75-.34h3a1,1,0,0,1,1,.79q.06.41.15.81a11.12,11.12,0,0,0,.46,1.55l-1.4.65a1,1,0,0,0-.49,1.33,14.49,14.49,0,0,0,7,7,1,1,0,0,0,.76,0,1,1,0,0,0,.57-.52l.62-1.4a13.69,13.69,0,0,0,1.58.46q.4.09.81.15a1,1,0,0,1,.79,1Z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-white/50 text-sm block">Telepon</span>
                  <a href="tel:+6281290506565" className="text-white hover:text-blue-300 transition-colors">
                    (+62) 81290506565
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                  <img src={icons.location} alt="Location" className="w-5 h-5 brightness-200" />
                </div>
                <div>
                  <span className="text-white/50 text-sm block">Lokasi</span>
                  <p className="text-white">
                    Jakarta, Indonesia
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-6 mt-12" ref={socialIconsRef}>
            <a 
              href="https://github.com/daffarizki190" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Github" 
              className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center hover:bg-blue-600/40 transition-all"
            >
              <img src={icons.github} alt="Github" className="w-6 h-6 brightness-200" />
            </a>
            <a 
              href="https://linkedin.com/in/daffa-rizki-ariyanto-4931a7150" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn" 
              className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center hover:bg-blue-600/40 transition-all"
            >
              <img src={icons.linkedin} alt="LinkedIn" className="w-6 h-6 brightness-200" />
            </a>
            <a 
              href="mailto:dafarizki209@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Email" 
              className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center hover:bg-blue-600/40 transition-all"
            >
              <img src={icons.email} alt="Email" className="w-6 h-6 brightness-200" />
            </a>
          </div>
        </div>
      </div>

      <div 
        className="relative z-10 py-4 text-center text-white/40 text-sm bg-black/50 backdrop-blur-sm border-t border-white/10"
      >
        <div className="container mx-auto">
          <p className="font-strong tracking-normal" ref={copyrightRef}>© {new Date().getFullYear()} Daffa Rizki Ariyanto. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;