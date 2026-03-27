import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Moon, Sun, User, LogIn, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export const Navbar = ({ user, onLoginClick, onLogout }: { user: any; onLoginClick: () => void; onLogout: () => void }) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-brand-light/90 dark:bg-brand-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-white/5">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-brand-green p-2 rounded-lg">
          <Car className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-black text-lg leading-none tracking-tighter">ROADSIDE RESCUE</h1>
          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Premium Service</p>
        </div>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link 
            key={link.path}
            to={link.path} 
            className={cn(
              "text-sm font-medium hover:text-brand-green transition-colors", 
              location.pathname === link.path ? 'text-brand-green' : 'text-slate-600 dark:text-slate-400'
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/home" className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10">
                <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center text-[10px] font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium">{user.name}</span>
              </Link>
              <button 
                onClick={onLogout}
                className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogIn className="w-5 h-5 rotate-180" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={onLoginClick}
                className="text-sm font-bold px-4 py-2 hover:text-brand-green transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={onLoginClick}
                className="btn-primary text-sm py-2"
              >
                Join Now
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-brand-light dark:bg-brand-dark border-b border-slate-200 dark:border-white/5 overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={cn(
                    "text-lg font-bold py-2", 
                    location.pathname === link.path ? 'text-brand-green' : 'text-slate-600 dark:text-slate-400'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex flex-col gap-4">
                {user ? (
                  <>
                    <Link to="/home" className="flex items-center gap-3 py-2">
                      <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center font-bold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-bold">{user.name}</span>
                    </Link>
                    <button 
                      onClick={onLogout}
                      className="text-left font-bold py-2 text-red-500"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={onLoginClick}
                      className="text-left font-bold py-2 hover:text-brand-green transition-colors"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={onLoginClick}
                      className="btn-primary w-full justify-center py-4"
                    >
                      Join Now
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
