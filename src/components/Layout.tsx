import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, AtSign, Rss, Sun, Moon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newVal = !prev;
      if (newVal) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newVal;
    });
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-sans selection:bg-secondary-container transition-colors duration-300">
      <nav className="bg-surface-bright text-on-surface font-headline text-lg selection:bg-outline-variant w-full sticky top-0 z-50 border-b border-outline-variant/40 ease-in-out cursor-pointer transition-colors duration-300">
        <div className="flex justify-between items-center h-20 px-8 max-w-7xl mx-auto">
          <div className="font-headline text-3xl font-black tracking-tight text-primary uppercase">INFERENCES.</div>
          <div className="hidden md:flex items-center gap-8">
            <a onClick={handleScroll} className="text-on-surface-variant font-medium hover:text-primary hover:translate-x-[2px] transition-all duration-300 font-sans text-sm outline-none" href="#gallery">Research Gallery</a>
            <a onClick={handleScroll} className="text-on-surface-variant font-medium hover:text-primary hover:translate-x-[2px] transition-all duration-300 font-sans text-sm outline-none" href="#about">About</a>
            <a onClick={handleScroll} className="text-on-surface-variant font-medium hover:text-primary hover:translate-x-[2px] transition-all duration-300 font-sans text-sm outline-none" href="#contact">Contact</a>
            <div className="flex items-center ml-2 gap-4">
              <button 
                onClick={toggleTheme} 
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-outline-variant/30 transition-colors text-on-surface-variant hover:text-on-surface"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
                <input className="bg-surface-container-low border border-transparent focus:border-outline-variant/50 focus:ring-1 focus:ring-primary rounded-full pl-10 pr-4 py-1.5 text-sm w-48 transition-all duration-300 outline-none font-sans text-on-surface placeholder:text-on-surface-variant/70" placeholder="Search insights..." type="text"/>
              </div>
              <button className="bg-primary text-on-primary px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors duration-300 font-sans">Subscribe</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Reading Progress Indicator */}
      <div className="fixed top-20 left-0 w-full h-[2px] z-50 pointer-events-none">
        <div className="h-full bg-primary w-1/3"></div>
      </div>

      <main>
        {children}
      </main>

      <footer className="bg-surface-container-low text-on-surface font-sans text-sm tracking-wide uppercase w-full py-16 mt-24 border-t border-outline-variant transition-colors duration-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-12 max-w-7xl mx-auto gap-8">
          <div className="flex flex-col gap-2">
            <div className="font-headline text-2xl font-black tracking-tight text-primary uppercase">INFERENCES.</div>
            <p className="normal-case opacity-60">© {new Date().getFullYear()} Mohammed Ibrahim Faisal. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-8">
            <a onClick={handleScroll} className="text-on-surface-variant hover:text-on-surface underline decoration-outline-variant transition-colors duration-200" href="#gallery">Research Archive</a>
            <a className="text-on-surface-variant hover:text-on-surface underline decoration-outline-variant transition-colors duration-200" href="#">Privacy Policy</a>
            <a onClick={handleScroll} className="text-on-surface-variant hover:text-on-surface underline decoration-outline-variant transition-colors duration-200" href="#contact">Contact</a>
          </div>
          <div className="flex gap-4">
            <a className="w-10 h-10 flex items-center justify-center border border-outline-variant rounded-full hover:bg-outline-variant/30 transition-colors text-on-surface-variant" href="#">
              <AtSign className="w-4 h-4" />
            </a>
            <a className="w-10 h-10 flex items-center justify-center border border-outline-variant rounded-full hover:bg-outline-variant/30 transition-colors text-on-surface-variant" href="#">
              <Rss className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
