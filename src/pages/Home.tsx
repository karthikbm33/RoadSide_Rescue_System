import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Clock, 
  Wrench, 
  Battery, 
  Fuel, 
  Truck, 
  Lock, 
  Disc,
  ArrowRight,
  Search
} from 'lucide-react';
import { cn } from '../lib/utils';

export const Home = ({ user }: { user: any }) => {
  const [activeTab, setActiveTab] = useState('services');

  const services = [
    { icon: Wrench, title: "On-Spot Repairs", desc: "Quick fixes for minor mechanical issues right at your location." },
    { icon: Battery, title: "Battery Jump Start", desc: "Dead battery? Get a quick jump start to get you moving." },
    { icon: Fuel, title: "Fuel Delivery", desc: "Ran out of fuel? We deliver fuel right to your location." },
    { icon: Truck, title: "Towing Service", desc: "Professional towing to the nearest garage or your preferred location." },
    { icon: Lock, title: "Lockout Assistance", desc: "Locked out of your vehicle? We help you get back in safely." },
    { icon: Disc, title: "Flat Tire Change", desc: "Get your spare tire installed quickly and safely." }
  ];

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-[10px] font-bold mb-4 uppercase tracking-widest border border-brand-green/20">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" /> Live System Status: Optimal
            </div>
            <h1 className="text-5xl font-black tracking-tighter mb-2">
              Good afternoon, <span className="text-brand-green">{user?.name || 'Guest'}</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              The fastest roadside assistance in the city. Tell us where you are, we'll handle the rest.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-primary">
              Request Mechanic <ArrowRight className="w-4 h-4" />
            </button>
            <button className="bg-red-500 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-red-500/20">
              Emergency SOS
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Nearby Experts", val: "12", icon: ShieldCheck },
            { label: "Avg. Arrival", val: "14m", icon: Clock },
            { label: "Avg. Rating", val: "4.9", icon: Zap },
            { label: "Live Support", val: "24/7", icon: Phone }
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-6 flex flex-col items-center justify-center text-center">
              <stat.icon className="w-6 h-6 text-brand-green mb-3 opacity-50" />
              <span className="text-3xl font-black mb-1">{stat.val}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="space-y-12">
           <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black tracking-tighter">Our Premium Services</h2>
                <p className="text-xs text-slate-400 font-mono">EXPLORE SERVICES</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {services.map((service, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="glass-panel p-8 hover:border-brand-green/30 transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:bg-brand-green group-hover:text-white transition-all">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">{service.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">{service.desc}</p>
                    <button className="text-xs font-bold text-brand-green flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                      Request Service <ArrowRight className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
           </section>

           {/* Location Section */}
           <section className="bg-slate-50 dark:bg-white/5 rounded-[2rem] p-12 text-center border border-slate-200 dark:border-white/5">
              <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-8">
                  <MapPin className="w-8 h-8 text-brand-green" />
                </div>
                <h2 className="text-4xl font-black mb-4 tracking-tighter">Where are you stuck?</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-10">We need your location to find the closest certified mechanics who can reach you in minutes.</p>
                <button className="btn-primary mx-auto px-12 py-4 text-lg">
                  <MapPin className="w-5 h-5" /> Detect My Location
                </button>
              </div>
           </section>

           {/* AI Section */}
           <section className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-brand-green font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Next-Gen Diagnostics</span>
                <h2 className="text-5xl font-black mb-6 tracking-tighter leading-[0.9]">AI Assistant<br />Under the Hood.</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                  Upload a photo or describe the symptoms. Our advanced AI model analyzes mechanical data to give you instant troubleshooting steps.
                </p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3 text-sm font-medium">
                    <div className="w-5 h-5 rounded-full bg-brand-green/10 flex items-center justify-center">
                      <ShieldCheck className="w-3 h-3 text-brand-green" />
                    </div>
                    Real-time engine data analysis
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium">
                    <div className="w-5 h-5 rounded-full bg-brand-green/10 flex items-center justify-center">
                      <ShieldCheck className="w-3 h-3 text-brand-green" />
                    </div>
                    Visual issue recognition
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium">
                    <div className="w-5 h-5 rounded-full bg-brand-green/10 flex items-center justify-center">
                      <ShieldCheck className="w-3 h-3 text-brand-green" />
                    </div>
                    94% diagnostic accuracy
                  </li>
                </ul>
                <button className="btn-primary">
                  Launch Full Chatbot <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="glass-panel p-8 border-dashed border-2">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Elite Diagnostic AI</h4>
                      <p className="text-[10px] text-brand-green font-bold">ACTIVE & MONITORING</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-12 text-center border border-slate-200 dark:border-white/5 mb-6">
                  <Loader2 className="w-8 h-8 text-slate-300 dark:text-white/10 mx-auto mb-4 animate-spin" />
                  <h5 className="font-bold text-slate-400">Awaiting Input...</h5>
                  <p className="text-xs text-slate-300 dark:text-white/5">Describe your issue or drop a photo to start analysis.</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-slate-100 dark:bg-white/5 py-2 rounded-lg text-[10px] font-bold hover:bg-brand-green hover:text-white transition-colors">Car won't start</button>
                  <button className="flex-1 bg-slate-100 dark:bg-white/5 py-2 rounded-lg text-[10px] font-bold hover:bg-brand-green hover:text-white transition-colors">Strange noise</button>
                  <button className="flex-1 bg-slate-100 dark:bg-white/5 py-2 rounded-lg text-[10px] font-bold hover:bg-brand-green hover:text-white transition-colors">Flat tire</button>
                </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

const Loader2 = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
);
