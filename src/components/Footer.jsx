import React from 'react';
import WavyText from './WavyText.jsx';
import { MailIcon, GithubIcon, LinkedInIcon, LocationIcon } from '../assets.jsx'; // Diperbaiki

const Footer = ({ theme, scrollDirection }) => {
  return (
    <footer id="kontak" className={theme.footer}>
      <div className={`transition-colors duration-500 ${theme.footerCta}`}>
          <div className="container mx-auto text-white p-8 md:p-12 text-center">
              <WavyText as="h2" text="Mari Berkolaborasi!" className="text-3xl md:text-4xl font-bold" scrollDirection={scrollDirection} />
              <p className={`mt-4 max-w-xl mx-auto ${theme.heroText}`}>
                Saya terbuka untuk peluang baru dan diskusi. Jangan ragu untuk menghubungi saya melalui platform berikut.
              </p>
              <div className="mt-8">
                <a href="mailto:dafarizki209@gmail.com" className={`font-bold py-3 px-6 rounded-full inline-flex items-center gap-2 text-lg shadow-lg transition-colors ${theme.button}`}>
                  <MailIcon className="w-5 h-5"/>
                  Kirim Email
                </a>
              </div>
              <div className="mt-6 flex justify-center space-x-6">
                   <a href="https://github.com/daffarizki190" target="_blank" rel="noopener noreferrer" aria-label="Github" className={`${theme.heroText} hover:text-white transition-colors`}><GithubIcon className="w-7 h-7" /></a>
                   <a href="https://www.linkedin.com/in/daffa-rizki-ariyanto-4931a7150" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`${theme.heroText} hover:text-white transition-colors`}><LinkedInIcon className="w-7 h-7" /></a>
              </div>
          </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="py-12">
          <div className={`grid md:grid-cols-3 gap-8 text-center md:text-left text-gray-300`}>
              <div className="md:col-span-1">
                  <h3 className="text-xl font-bold text-white">Daffa Rizki Ariyanto</h3>
                  <p className={`mt-2 text-sm text-gray-400`}>
                      Leader Operasional dengan pengalaman di manajemen tim dan optimalisasi proses.
                  </p>
              </div>
              <div>
                  <h4 className="font-bold text-lg text-white mb-3">Kontak</h4>
                  <ul className="space-y-2 text-sm">
                      <li className="flex items-center justify-center md:justify-start gap-2">
                          <MailIcon className={`w-4 h-4 text-gray-400`}/>
                          <a href="mailto:dafarizki209@gmail.com" className="hover:text-white">
                              dafarizki209@gmail.com
                          </a>
                      </li>
                      <li className="flex items-center justify-center md:justify-start gap-2">
                         <LocationIcon className={`w-4 h-4 text-gray-400`}/>
                         <span>Jakarta, Indonesia</span>
                      </li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-bold text-lg text-white mb-3">Media Sosial</h4>
                  <div className="flex justify-center md:justify-start space-x-4">
                      <a href="https://github.com/daffarizki190" target="_blank" rel="noopener noreferrer" aria-label="Github" className={`text-gray-400 hover:text-white transition-colors`}><GithubIcon /></a>
                      <a href="https://www.linkedin.com/in/daffa-rizki-ariyanto-4931a7150" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={`text-gray-400 hover:text-white transition-colors`}><LinkedInIcon /></a>
                  </div>
              </div>
          </div>
          <div className={`text-center text-xs mt-12 border-t pt-6 text-gray-500 border-gray-800`}>
              &copy; {new Date().getFullYear()} Daffa Rizki Ariyanto. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;