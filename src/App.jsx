import React from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Footer from './components/Footer.jsx';
import { themes } from './data/themes.js'; 
// Use a placeholder image if the import fails
const defaultProfilePic = 'https://via.placeholder.com/150';
import { useActiveSection, useMenu, useTheme } from './hooks';

/**
 * Komponen ErrorFallback - Menampilkan pesan error jika terjadi kesalahan rendering
 * 
 * @param {Object} props - Props komponen
 * @param {Error} props.error - Error yang terjadi
 * @returns {React.ReactElement} Komponen ErrorFallback
 */
const ErrorFallback = ({ error }) => (
  <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <p className="text-gray-700 mb-4">The application encountered an error while rendering.</p>
      <details className="border rounded p-3 mt-2">
        <summary className="font-medium cursor-pointer">Error details</summary>
        <pre className="mt-2 text-sm overflow-auto p-2 bg-gray-100 rounded">
          {error.message}
          {error.stack}
        </pre>
      </details>
      <button 
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        onClick={() => window.location.reload()}
      >
        Reload Page
      </button>
    </div>
  </div>
);

/**
 * Komponen BackgroundAnimation - Menampilkan animasi latar belakang berdasarkan tema
 * 
 * @param {Object} props - Props komponen
 * @param {Object} props.theme - Tema yang digunakan
 * @returns {React.ReactElement} Komponen BackgroundAnimation
 */
const BackgroundAnimation = ({ theme }) => {
  if (!theme.animation) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {theme.animation.type === 'float' && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`absolute ${theme.accent || ''} opacity-20 rounded-full animate-float`}
              style={{
                width: Math.random() * 150 + 100 + 'px',
                height: Math.random() * 150 + 100 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      )}
      {theme.animation.type === 'meteor' && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className={`absolute ${theme.accent || ''} opacity-30 animate-meteor`}
              style={{
                width: '3px',
                height: '150px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                transform: 'rotate(45deg)',
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Komponen utama aplikasi
 * 
 * @returns {React.ReactElement} Komponen App
 */
export default function App() {
  const [isMenuOpen, toggleMenu, closeMenu] = useMenu();
  const [activeSection, handleNavClick] = useActiveSection();
  const [theme] = useTheme();
  const { theme, setTheme, themes: themesList } = useTheme({ initialTheme: themes[0] });
  
  // Menangani error dengan try-catch
  try {

    return (
      <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden bg-white text-gray-800">
        {/* Background animations */}
        <BackgroundAnimation theme={theme} />
        {/* Header */}
        <Header 
          onMenuOpen={toggleMenu}
          activeSection={activeSection}
          handleNavClick={handleNavClick}
        />
        
        {/* Main content */}
        <main className="flex-1 relative z-10">
          {/* Hero section */}
          <Hero profileImage={defaultProfilePic} handleNavClick={handleNavClick} />
          
          {/* Skills section */}
          <Skills />
          
          {/* Experience section */}
          <Experience />
        </main>
        
        {/* Footer */}
        <Footer />
        <Footer theme={theme} />
      </div>
    );
  } catch (error) {
    console.error('Error rendering App component:', error);
    return <ErrorFallback error={error} />;
  }
}
