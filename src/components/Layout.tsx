import React from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-black font-sans selection:bg-black selection:text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7] border-b-2 border-black shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black tracking-tighter text-black drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]"
          >
            INFERENCES.
          </motion.div>
          <div className="hidden md:flex gap-8 text-sm font-bold text-black uppercase tracking-wider">
            <a href="#about" className="hover:underline decoration-2 underline-offset-4 transition-all">About</a>
            <a href="#gallery" className="hover:underline decoration-2 underline-offset-4 transition-all">Gallery</a>
            <a href="#contact" className="hover:underline decoration-2 underline-offset-4 transition-all">Contact</a>
          </div>
        </div>
      </nav>
      <main className="pt-20">
        {children}
      </main>
      <footer className="py-12 border-t-2 border-black mt-20 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-6 text-center text-black text-sm font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Mohammed Ibrahim Faisal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
