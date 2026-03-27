/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Landing } from './pages/Landing';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import Services from './pages/Services';
import About from './pages/About';
import { ChatBot } from './components/ChatBot';
import { LoginModal } from './components/LoginModal';
import { cn } from './lib/utils';

export default function App() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const location = useLocation();

  // Load user from local storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('roadside_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (name: string) => {
    const userData = { name };
    setUser(userData);
    localStorage.setItem('roadside_user', JSON.stringify(userData));
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('roadside_user');
  };

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark text-slate-900 dark:text-white transition-colors duration-300">
      {/* Watermark */}
      <div className="watermark-text">Vehicles Hub</div>

      <Navbar user={user} onLoginClick={() => setIsLoginOpen(true)} onLogout={handleLogout} />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Landing onJoinClick={() => setIsLoginOpen(true)} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/home" 
              element={user ? <Home user={user} /> : <Navigate to="/" replace />} 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <ChatBot />
      
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLogin} 
      />

      {/* Footer */}
      <footer className="px-6 py-20 border-t border-slate-100 dark:border-white/5 relative z-10 bg-brand-light dark:bg-brand-dark">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-black text-3xl tracking-tighter mb-4">ROADSIDE RESCUE</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8 leading-relaxed">
              The world's most advanced AI-powered roadside assistance network. Keeping you safe and moving 24/7 with a 15-minute response guarantee.
            </p>
            <div className="flex gap-6">
              {['Twitter', 'Instagram', 'LinkedIn', 'Facebook'].map(social => (
                <a key={social} href="#" className="text-sm font-bold hover:text-brand-green transition-colors text-slate-600 dark:text-slate-400">{social}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-brand-green">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <li><Link to="/" className="hover:text-brand-green transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-brand-green transition-colors">Services</Link></li>
              <li><Link to="/about" className="hover:text-brand-green transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-brand-green transition-colors">Contact</Link></li>
              <li><Link to="/about" className="text-brand-green font-bold hover:underline">Specialist Enrollment</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-brand-green">Emergency</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li className="font-bold text-slate-900 dark:text-white text-lg">1-800-RESCUE-ME</li>
              <li>Available 24/7</li>
              <li>Global Coverage</li>
              <li>Certified Mechanics</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.5em]">
            &copy; 2026 Roadside Rescue Elite. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-brand-green">Privacy Policy</a>
            <a href="#" className="hover:text-brand-green">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
