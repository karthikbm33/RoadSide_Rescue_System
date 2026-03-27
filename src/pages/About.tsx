import React from 'react';
import { motion } from 'motion/react';
import { Users, Award, Globe, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-brand-green font-mono text-sm tracking-[0.3em] uppercase mb-4">Our Story</h2>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
              REDEFINING <br />
              <span className="text-brand-green">ROADSIDE ASSISTANCE</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Founded in 2024, Roadside Rescue was born from a simple observation: getting help on the road shouldn't be a nightmare. We've combined cutting-edge AI technology with a human-centric approach to create the world's most responsive vehicle assistance network.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-3 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10">
                <span className="font-bold text-brand-green">1M+</span> <span className="text-sm opacity-70">Rescues Completed</span>
              </div>
              <div className="px-6 py-3 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10">
                <span className="font-bold text-brand-green">50k+</span> <span className="text-sm opacity-70">Certified Partners</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-full overflow-hidden border-8 border-white dark:border-brand-dark shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" 
                alt="Team" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute top-1/2 -left-12 -translate-y-1/2 bg-white dark:bg-brand-dark p-6 rounded-3xl shadow-2xl border border-slate-100 dark:border-white/10 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center text-white">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold">Award Winning</p>
                  <p className="text-xs opacity-60">Best Tech Startup 2025</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {[
            {
              icon: Users,
              title: "Community First",
              desc: "We empower local mechanics and small businesses by connecting them directly with drivers in need."
            },
            {
              icon: Globe,
              title: "Global Vision",
              desc: "Our goal is to make roadside assistance accessible and affordable in every corner of the globe."
            },
            {
              icon: Heart,
              title: "Safety Obsessed",
              desc: "Your safety is our top priority. We use AI to predict risks and ensure the fastest possible response."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-slate-50 dark:bg-white/5 rounded-[3rem] border border-slate-200 dark:border-white/10"
            >
              <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center mb-8">
                <item.icon className="w-8 h-8 text-brand-green" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black tracking-tighter mb-4 uppercase">MEET OUR LEADERSHIP</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            A diverse team of engineers, designers, and automotive experts working together to keep you moving.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {[
            { name: "Alex Rivera", role: "CEO & Founder", img: "https://i.pravatar.cc/300?u=alex" },
            { name: "Sarah Chen", role: "CTO", img: "https://i.pravatar.cc/300?u=sarah" },
            { name: "Marcus Thorne", role: "Head of Operations", img: "https://i.pravatar.cc/300?u=marcus" },
            { name: "Elena Vance", role: "Lead AI Engineer", img: "https://i.pravatar.cc/300?u=elena" }
          ].map((person, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="aspect-[3/4] rounded-[2rem] overflow-hidden mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">
                <img src={person.img} alt={person.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h4 className="text-xl font-bold">{person.name}</h4>
              <p className="text-sm text-brand-green font-mono uppercase tracking-widest">{person.role}</p>
            </motion.div>
          ))}
        </div>

        {/* Specialist Enrollment Section */}
        <section className="py-20 bg-slate-50 dark:bg-white/[0.02] rounded-[4rem] border border-slate-200 dark:border-white/5 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="max-w-5xl mx-auto px-10 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-brand-green font-mono text-sm tracking-[0.3em] uppercase mb-6">Join the Elite</h2>
                <h3 className="text-5xl font-black tracking-tighter mb-8 leading-none uppercase">
                  Become a <br />
                  <span className="text-brand-green">Specialist.</span>
                </h3>
                <p className="text-lg opacity-60 mb-10 leading-relaxed">
                  Are you a certified mechanic looking to expand your reach? Join our network of elite responders and earn more while helping people in need.
                </p>
                <div className="space-y-6 mb-12">
                  {[
                    "Flexible working hours",
                    "Guaranteed high-volume leads",
                    "Advanced AI diagnostic tools",
                    "Fast weekly payouts"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center">
                        <Award className="w-3 h-3 text-brand-green" />
                      </div>
                      <span className="font-bold text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-panel p-10 border-slate-200 dark:border-white/10">
                <h4 className="text-2xl font-black mb-8 tracking-tight uppercase">Quick Enrollment</h4>
                <form className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Full Name</label>
                    <input type="text" placeholder="Your Name" className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-brand-green transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Mobile Number</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-brand-green transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Specialization</label>
                    <select className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-brand-green transition-all appearance-none">
                      <option className="bg-white dark:bg-brand-dark">Mechanical Expert</option>
                      <option className="bg-white dark:bg-brand-dark">Electrical Specialist</option>
                      <option className="bg-white dark:bg-brand-dark">Towing Professional</option>
                      <option className="bg-white dark:bg-brand-dark">Battery Expert</option>
                    </select>
                  </div>
                  <button type="button" className="btn-primary w-full justify-center py-5 text-lg">
                    Submit Application
                  </button>
                  <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest mt-4">
                    * Spot inspection required for final approval
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
