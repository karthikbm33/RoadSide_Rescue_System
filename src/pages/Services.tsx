import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { 
  Wrench, 
  Battery, 
  Fuel, 
  Truck, 
  Key, 
  ShieldCheck, 
  Clock, 
  MapPin,
  ArrowRight,
  Warehouse,
  Loader2,
  X,
  ExternalLink,
  Navigation
} from 'lucide-react';
import { getNearbyMechanics } from '../services/gemini';

const services = [
  {
    icon: Warehouse,
    title: "Garage Services",
    description: "Full-service garage facilities for major repairs, engine overhauls, and regular maintenance checks.",
    basePrice: 8200
  },
  {
    icon: Wrench,
    title: "On-Spot Repairs",
    description: "Minor mechanical issues fixed right where you are. Our mobile mechanics carry essential tools for quick fixes.",
    basePrice: 4000
  },
  {
    icon: Battery,
    title: "Battery Jumpstart",
    description: "Dead battery? We'll get your engine roaring again in minutes with our professional jumpstart equipment.",
    basePrice: 2900
  },
  {
    icon: Fuel,
    title: "Fuel Delivery",
    description: "Ran out of gas? We'll deliver enough fuel to get you to the nearest station, whether it's petrol or diesel.",
    basePrice: 2000
  },
  {
    icon: Truck,
    title: "Professional Towing",
    description: "When on-site repair isn't possible, we provide safe and secure towing to your preferred service center.",
    basePrice: 6200
  },
  {
    icon: Key,
    title: "Lockout Service",
    description: "Locked your keys inside? Our specialists use non-destructive methods to get you back in your vehicle.",
    basePrice: 3700
  },
  {
    icon: ShieldCheck,
    title: "Tire Change",
    description: "Flat tire? We'll swap it with your spare or provide a temporary replacement to keep you moving.",
    basePrice: 3300
  }
];

const Services = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [currency, setCurrency] = useState({ code: 'INR', symbol: '₹', rate: 1 });
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<{ text: string; links: { title: string; url: string }[] } | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const currencies = [
    { code: 'INR', symbol: '₹', rate: 1 },
    { code: 'USD', symbol: '$', rate: 0.012 },
    { code: 'GBP', symbol: '£', rate: 0.0095 },
    { code: 'EUR', symbol: '€', rate: 0.011 },
  ];

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          
          // We keep INR as default unless the user manually changes it
          // or if we were to implement a more robust IP-based detection.
          // For now, we respect the user's request to see Rupee.
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationError("Location access denied. Using default settings.");
        }
      );
    } else {
      setLocationError("Geolocation not supported by your browser.");
    }
  }, []);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = currencies.find(c => c.code === e.target.value);
    if (selected) setCurrency(selected);
  };

  const handleServiceClick = async (serviceTitle: string) => {
    if (!location) {
      alert("Please enable location access to find nearby mechanics.");
      return;
    }

    setSelectedService(serviceTitle);
    setIsSearching(true);
    setSearchResults(null);

    try {
      const results = await getNearbyMechanics(location, serviceTitle);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
      alert("Failed to find nearby mechanics. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const formatPrice = (basePrice: number) => {
    const converted = basePrice * currency.rate;
    return new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: currency.code,
    }).format(converted);
  };

  return (
    <div className="pt-24 pb-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-brand-green font-mono text-sm tracking-[0.3em] uppercase mb-4">Our Expertise</h2>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            COMPREHENSIVE <br />
            <span className="text-brand-green">RESCUE SOLUTIONS</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg mb-4">
            From minor glitches to major breakdowns, our network of certified specialists is equipped to handle any roadside emergency 24/7.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            {location ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/10 text-brand-green rounded-full text-xs font-bold uppercase tracking-widest border border-brand-green/20">
                <MapPin className="w-3 h-3" />
                Location Active
              </div>
            ) : locationError ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-full text-xs font-bold uppercase tracking-widest border border-red-500/20">
                <X className="w-3 h-3" />
                {locationError}
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 text-slate-400 rounded-full text-xs font-bold uppercase tracking-widest border border-slate-200 dark:border-white/10">
                <Loader2 className="w-3 h-3 animate-spin" />
                Detecting Location...
              </div>
            )}

            <div className="relative group/select">
              <label className="absolute -top-5 left-2 text-[10px] font-black uppercase tracking-widest text-slate-400 opacity-0 group-hover/select:opacity-100 transition-opacity">
                Change Currency
              </label>
              <select 
                value={currency.code}
                onChange={handleCurrencyChange}
                className="appearance-none bg-white dark:bg-white/5 border-2 border-brand-green/30 dark:border-brand-green/20 text-brand-green text-xs font-black uppercase tracking-widest px-6 py-2.5 pr-10 rounded-full focus:outline-none focus:border-brand-green transition-all cursor-pointer hover:bg-brand-green/5"
              >
                {currencies.map(c => (
                  <option key={c.code} value={c.code} className="bg-white dark:bg-brand-dark text-slate-900 dark:text-white">
                    {c.symbol} {c.code}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-green">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl hover:border-brand-green transition-all hover:shadow-2xl hover:shadow-brand-green/10 cursor-pointer"
              onClick={() => handleServiceClick(service.title)}
            >
              <div className="w-14 h-14 bg-brand-green/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-brand-green" />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5">
                <span className="font-mono text-sm font-bold text-brand-green">Starts at {formatPrice(service.basePrice)}</span>
                <button className="flex items-center gap-2 text-sm font-bold group/btn">
                  Find Nearby <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search Results Modal */}
        <AnimatePresence>
          {(isSearching || searchResults) && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-dark/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-2xl bg-white dark:bg-brand-dark rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col max-h-[80vh]"
              >
                <div className="p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-brand-green text-white">
                  <div className="flex items-center gap-3">
                    <Navigation className="w-6 h-6" />
                    <div>
                      <h3 className="font-black text-xl tracking-tight">Nearby Specialists</h3>
                      <p className="text-xs opacity-80 uppercase tracking-widest font-bold">For {selectedService}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setSearchResults(null); setIsSearching(false); }}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                  {isSearching ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                      <Loader2 className="w-12 h-12 text-brand-green animate-spin" />
                      <p className="font-bold text-slate-500 animate-pulse">Scanning nearby network...</p>
                    </div>
                  ) : searchResults ? (
                    <div className="space-y-8">
                      <div className="prose dark:prose-invert max-w-none">
                        <div className="markdown-body">
                          <Markdown>{searchResults.text}</Markdown>
                        </div>
                      </div>

                      {searchResults.links.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-slate-100 dark:border-white/5">
                          {searchResults.links.map((link, i) => (
                            <a 
                              key={i}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:border-brand-green transition-all group"
                            >
                              <span className="font-bold text-sm truncate pr-4">{link.title}</span>
                              <ExternalLink className="w-4 h-4 text-brand-green group-hover:scale-110 transition-transform" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>

                <div className="p-6 bg-slate-50 dark:bg-white/5 border-t border-slate-100 dark:border-white/5 flex justify-center">
                  <button 
                    onClick={() => { setSearchResults(null); setIsSearching(false); }}
                    className="btn-primary px-8"
                  >
                    Close Results
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Why Choose Us Section */}
        <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black tracking-tighter mb-8">WHY CHOOSE <br /> VEHICLES HUB?</h2>
            <div className="space-y-6">
              {[
                { icon: Clock, title: "15-Min Response Time", desc: "Our average response time in urban areas is less than 15 minutes." },
                { icon: MapPin, title: "Nationwide Coverage", desc: "Access help anywhere, anytime with our vast network of service providers." },
                { icon: ShieldCheck, title: "Certified Specialists", desc: "Every mechanic is background-checked and professionally certified." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center text-white">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&q=80&w=1200" 
                alt="Service" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-brand-green p-8 rounded-3xl text-white shadow-xl hidden md:block">
              <p className="text-4xl font-black">24/7</p>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">Availability</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Services;
