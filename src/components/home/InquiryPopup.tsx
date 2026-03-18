'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const STORAGE_KEY = 'dattaraj_enquiry_hidden';

export default function InquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Check if the user has already dismissed or filled the form
    const isHidden = localStorage.getItem(STORAGE_KEY);
    if (!isHidden) {
      // Delay the popup slightly for better UX
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem(STORAGE_KEY, 'true');
    }
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/enquiry', formData);
      if (res.data.success) {
        setSuccess(true);
        localStorage.setItem(STORAGE_KEY, 'true');
        setTimeout(() => setIsOpen(false), 3000);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Connection fragmented. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Left Side: Brand/Image */}
              <div className="hidden md:block w-1/3 bg-[#430704] relative">
                <img 
                  src="https://images.unsplash.com/photo-1626248801379-31713d71708d?q=80&w=600&auto=format&fit=crop" 
                  alt="Silver Ornament" 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                  <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-[10px] font-black italic">DR</span>
                  </div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2">Heritage</h4>
                  <p className="text-[8px] font-medium leading-relaxed opacity-60 uppercase tracking-widest">Handcrafted Excellence Since 2013</p>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="flex-1 p-8 md:p-10">
                {success ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8"
                  >
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="space-y-2">
                       <h3 className="text-lg font-black text-zinc-900 uppercase tracking-tight">Personalized Welcome</h3>
                       <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">Our concierge will contact you with chosen heritage masterpieces.</p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#430704]/60">Concierge Service</span>
                      <h3 className="text-2xl font-black text-zinc-950 uppercase tracking-tighter">Early <span className="italic font-light text-zinc-400">Access</span></h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                          <User size={10} className="text-[#430704]" /> Full Name
                        </label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-zinc-50 border-b border-zinc-100 px-0 py-2 focus:outline-none focus:border-[#430704] transition-colors text-xs font-semibold placeholder:text-zinc-300"
                          placeholder="Arjun Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                          <Phone size={10} className="text-[#430704]" /> WhatsApp Number
                        </label>
                        <input 
                          type="tel" 
                          required
                          className="w-full bg-zinc-50 border-b border-zinc-100 px-0 py-2 focus:outline-none focus:border-[#430704] transition-colors text-xs font-semibold placeholder:text-zinc-300"
                          placeholder="+91 — — — — — —"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                          <MapPin size={10} className="text-[#430704]" /> Your City
                        </label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-zinc-50 border-b border-zinc-100 px-0 py-2 focus:outline-none focus:border-[#430704] transition-colors text-xs font-semibold placeholder:text-zinc-300"
                          placeholder="Kolhapur / Mumbai"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                        />
                      </div>

                      {error && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{error}</p>}

                      <div className="pt-2 space-y-4">
                        <button 
                          type="submit"
                          disabled={loading}
                          className="w-full h-12 bg-[#430704] hover:bg-zinc-950 text-white uppercase tracking-[0.3em] text-[9px] font-black transition-all flex items-center justify-center gap-3 group"
                        >
                          {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              Join The Heritage <Send size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                          )}
                        </button>
                        
                        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setDontShowAgain(!dontShowAgain)}>
                          <div className={`w-3.5 h-3.5 border border-zinc-200 transition-colors flex items-center justify-center ${dontShowAgain ? 'bg-[#430704] border-[#430704]' : 'bg-transparent'}`}>
                             {dontShowAgain && <CheckCircle2 className="w-2.5 h-2.5 text-white" strokeWidth={4} />}
                          </div>
                          <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest group-hover:text-zinc-600">Don't show this again</span>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
