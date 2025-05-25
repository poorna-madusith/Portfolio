import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface DarkModeToggleProps {
  className?: string;
}

const DarkModeToggle = ({ className = '' }: DarkModeToggleProps) => {
  // Initialize with system preference or previous setting
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage first
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode class to html element
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`fixed top-3 right-3 sm:top-4 sm:right-4 z-50 p-2 sm:p-3 rounded-full transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-dark-secondary to-dark-primary text-dark-accent hover:shadow-dark-accent/20 hover:scale-110' 
          : 'bg-gradient-to-br from-white to-gray-100 text-accent hover:shadow-accent/20 hover:scale-110'
      } shadow-lg backdrop-blur-sm ring-1 ${isDarkMode ? 'ring-dark-accent/20' : 'ring-accent/10'} ${className}`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative">
        <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}>
          <Sun size={18} className="sm:hidden" strokeWidth={2.5} />
          <Sun size={20} className="hidden sm:block" strokeWidth={2.5} />
        </span>
        <span className={`flex items-center justify-center transition-opacity duration-300 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}>
          <Moon size={18} className="sm:hidden" strokeWidth={2.5} />
          <Moon size={20} className="hidden sm:block" strokeWidth={2.5} />
        </span>
      </div>
    </button>
  );
};

export default DarkModeToggle;
