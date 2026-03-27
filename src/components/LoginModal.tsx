import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, LogIn, Chrome, User } from 'lucide-react';

export const LoginModal = ({ isOpen, onClose, onLogin }: { isOpen: boolean; onClose: () => void; onLogin: (name: string) => void }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(name || email.split('@')[0] || "User");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-brand-dark max-w-md w-full p-10 relative overflow-hidden rounded-[3rem] shadow-2xl border border-slate-200 dark:border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Accents */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-green/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-green/5 rounded-full blur-3xl -z-10" />

            <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-brand-green/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                 <LogIn className="w-10 h-10 text-brand-green" />
              </div>
              <h2 className="text-4xl font-black tracking-tighter mb-2 uppercase">
                {isRegister ? 'Join the Network' : 'Welcome Back'}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {isRegister ? 'Create your account to get started.' : 'Access your dashboard and rescue history.'}
              </p>
            </div>

            <div className="space-y-6">
              <button 
                onClick={() => onLogin("Google User")}
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold hover:bg-slate-100 dark:hover:bg-white/10 transition-all shadow-sm"
              >
                <Chrome className="w-5 h-5 text-brand-green" /> 
                <span className="text-sm uppercase tracking-widest">Continue with Google</span>
              </button>

              <div className="relative flex items-center justify-center py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100 dark:border-white/5"></div>
                </div>
                <span className="relative bg-white dark:bg-brand-dark px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">or use email</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {isRegister && (
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                      <input 
                        type="text" 
                        placeholder="Elon Musk" 
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm focus:outline-none focus:border-brand-green transition-all dark:text-white" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                      type="email" 
                      placeholder="elon@mars.com" 
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm focus:outline-none focus:border-brand-green transition-all dark:text-white" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm focus:outline-none focus:border-brand-green transition-all dark:text-white" 
                      required 
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full justify-center py-5 text-lg shadow-xl shadow-brand-green/20">
                  {isRegister ? 'Create Account' : 'Enter Dashboard'}
                </button>
              </form>
            </div>

            <p className="text-center text-xs text-slate-400 mt-10 font-medium">
              {isRegister ? 'Already have an account?' : 'New to the service?'} 
              <button 
                onClick={() => setIsRegister(!isRegister)}
                className="text-brand-green font-black uppercase tracking-widest ml-2 hover:underline"
              >
                {isRegister ? 'Sign In' : 'Register Now'}
              </button>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
