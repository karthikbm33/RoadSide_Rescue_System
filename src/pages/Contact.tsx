import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
          {/* Info */}
          <div>
            <h1 className="text-6xl font-black tracking-tighter mb-8 leading-none">Get in<br /><span className="text-brand-green">Touch.</span></h1>
            <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-md leading-relaxed">
              Have questions about our services or need technical support? Our team is here to help you 24/7.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-brand-green" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Call Us</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">1-800-RESCUE-ME</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Available 24/7 for emergencies</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-brand-green" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Email Us</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">support@roadsiderescue.com</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Response within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-brand-green" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Headquarters</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">123 Rescue Way, Tech City, TC 90210</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass-panel p-10">
            <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">First Name</label>
                  <input type="text" placeholder="John" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Last Name</label>
                  <input type="text" placeholder="Doe" className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Email Address</label>
                <input type="email" placeholder="john@example.com" className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Subject</label>
                <select className="input-field appearance-none">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Billing Question</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Message</label>
                <textarea placeholder="How can we help you?" className="input-field h-32 resize-none" />
              </div>
              <button className="btn-primary w-full justify-center py-4">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
