import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Zap, ShieldCheck, Clock, MapPin, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export const Landing = ({ onJoinClick }: { onJoinClick: () => void }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden pt-20">
        {/* Background Accents */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/20 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-[120px] -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl z-10"
        >
          <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-brand-green/20">
            <Zap className="w-3 h-3" /> AI-Powered Diagnostics Now Live
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] uppercase">
            Stuck? We'll<br />
            <span className="text-brand-green">Rescue You.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            The world's most advanced AI roadside service. One tap to connect with certified experts nearby in under 15 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={onJoinClick} 
              className="btn-primary px-12 py-6 text-xl w-full sm:w-auto shadow-[0_20px_50px_rgba(34,197,94,0.3)] hover:shadow-[0_25px_60px_rgba(34,197,94,0.4)] group"
            >
              Get Help Now <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-3 font-black text-slate-600 dark:text-slate-300 hover:text-brand-green transition-all px-8 py-6 uppercase tracking-widest text-sm">
              <ShieldCheck className="w-6 h-6" /> Emergency SOS
            </button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* Stats Section with Bento Grid feel */}
      <section className="py-32 px-6 bg-slate-50 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: 'Successful Rescues', value: '15k+', color: 'text-brand-green' },
            { label: 'Avg. Arrival Time', value: '12m', color: 'text-slate-900 dark:text-white' },
            { label: 'User Satisfaction', value: '4.9/5', color: 'text-brand-green' },
            { label: 'Active Experts', value: '50k+', color: 'text-slate-900 dark:text-white' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-white dark:bg-white/5 rounded-[2.5rem] border border-slate-200 dark:border-white/10 text-center"
            >
              <h3 className={cn("text-5xl font-black mb-2 tracking-tighter", stat.color)}>{stat.value}</h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features - Editorial Style */}
      <section className="py-48 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-brand-green font-mono text-sm tracking-[0.3em] uppercase mb-6">Innovation</h2>
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
                AI DIAGNOSTICS <br />
                <span className="text-slate-300 dark:text-white/20">INSTANT ANSWERS.</span>
              </h3>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-10">
                Our proprietary AI model analyzes your vehicle's symptoms in real-time. Simply describe the issue or upload a photo, and get an immediate diagnosis and repair estimate.
              </p>
              <ul className="space-y-4">
                {['99.2% Accuracy Rate', 'Instant Repair Estimates', 'Direct Mechanic Briefing'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold">
                    <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center">
                      <Zap className="w-3 h-3 text-brand-green" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&q=80&w=800" 
                  alt="AI Tech" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-brand-green p-10 rounded-[2.5rem] text-white shadow-2xl hidden md:block">
                <p className="text-4xl font-black">99.2%</p>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">AI Accuracy</p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: MapPin, title: "Real-time Tracking", desc: "Watch your rescue vehicle arrive in real-time with precise GPS tracking." },
              { icon: Clock, title: "15-Min Response", desc: "Our network ensures help arrives faster than any traditional service." },
              { icon: ShieldCheck, title: "Verified Experts", desc: "Every specialist is background-checked, certified, and rated by users." }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-12 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[3rem] hover:border-brand-green transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center mb-8 group-hover:bg-brand-green group-hover:text-white transition-all duration-500">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-black mb-4 tracking-tight uppercase">{feature.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Dark Luxury Style */}
      <section className="py-48 px-6 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-green via-transparent to-transparent" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-6xl md:text-9xl font-black mb-12 tracking-tighter leading-none uppercase">
            Ready for <br />
            <span className="text-brand-green">Peace of Mind?</span>
          </h2>
          <p className="text-xl md:text-2xl opacity-60 mb-16 max-w-2xl mx-auto leading-relaxed">
            Join the elite network of drivers who never worry about getting stuck again. Your safety is our mission.
          </p>
          <button 
            onClick={onJoinClick} 
            className="bg-white text-brand-dark px-16 py-8 rounded-full font-black text-2xl hover:scale-105 transition-transform shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
          >
            REGISTER NOW
          </button>
        </div>
      </section>
    </div>
  );
};

const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
);
