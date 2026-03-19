'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  Instagram, 
  Facebook,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import axios from 'axios';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/contact', formData);
      if (res.data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Fragmented connection. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2000&auto=format&fit=crop" 
            alt="Silver Craftsmanship" 
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-transparent to-zinc-950/60" />
        </div>
        
        <div className="relative z-10 text-center space-y-4 px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <div className="w-10 h-[1px] bg-white/40" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-white/60">Connect With Us</span>
            <div className="w-10 h-[1px] bg-white/40" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter"
          >
            Our <span className="italic font-light text-white/40">Atelier</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] max-w-md mx-auto"
          >
            Personalized Heritage Consultations for the Modern Connoisseur
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-6 -mt-16 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left: Contact Info */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 space-y-8"
          >
            <div className="bg-[#430704] text-white p-8 md:p-12 shadow-2xl">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-8">Heritage Archives</h2>
              <div className="space-y-10">
                <motion.div variants={itemVariants} className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 bg-white/10 flex items-center justify-center border border-white/5">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Our Foundation</h4>
                    <p className="text-sm font-medium leading-relaxed">
                      Mali Building, Mahavir Nagar,<br />
                      Ingrole, Hupri, Kolhapur,<br />
                      Maharashtra 416203, India
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 bg-white/10 flex items-center justify-center border border-white/5">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Concierge Direct</h4>
                    <p className="text-sm font-medium">+91 93256 14230</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 bg-white/10 flex items-center justify-center border border-white/5">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Digital Inquiry</h4>
                    <p className="text-sm font-medium">balajimali2000@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex gap-6 border-t border-white/10 pt-10">
                  <div className="w-12 h-12 shrink-0 bg-white/10 flex items-center justify-center border border-white/5">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Atelier Hours</h4>
                    <p className="text-sm font-medium">Mon - Sat: 10:00 AM — 08:30 PM</p>
                    <p className="text-sm font-medium text-white/40 italic mt-1">Closed on Sundays & Major Holidays</p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-12 flex gap-4">
                <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#430704] transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#430704] transition-all">
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            <div className="p-8 border border-zinc-100 bg-zinc-50/50">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#430704]/60 mb-2 block">Heritage Note</span>
                <p className="text-xs text-zinc-500 font-medium italic leading-relaxed">
                  Crafting sterling silver excellence since 2013. Every piece in our archives is a testament to generations of artisanal expertise.
                </p>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-white p-8 md:p-16 border border-zinc-100 shadow-xl shadow-zinc-200/50 h-full">
              <div className="mb-12 space-y-4">
                <h3 className="text-2xl md:text-4xl font-black text-zinc-950 uppercase tracking-tighter">Request a <span className="italic font-light text-zinc-400">Consultation</span></h3>
                <p className="text-sm text-zinc-500 font-medium">Have a bespoke request or need expert guidance on our silver archives? Complete the form below.</p>
              </div>

              {success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-zinc-900 uppercase tracking-tight">Heritage Inquiry Sent</h4>
                    <p className="text-sm text-zinc-500 max-w-xs mx-auto">Our elite concierge will review your request and contact you within 24 business hours.</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="mt-4 rounded-none border-zinc-200 px-8 uppercase tracking-widest text-[10px] font-black"
                    onClick={() => setSuccess(false)}
                  >
                    Send Another message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Full Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-zinc-50 border-b border-zinc-200 px-0 py-3 focus:outline-none focus:border-[#430704] transition-colors text-sm font-medium"
                        placeholder="Arjun Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Email Address</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-zinc-50 border-b border-zinc-200 px-0 py-3 focus:outline-none focus:border-[#430704] transition-colors text-sm font-medium"
                        placeholder="arjun.sharma@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Phone Number (Optional)</label>
                      <input 
                        type="tel" 
                        className="w-full bg-zinc-50 border-b border-zinc-200 px-0 py-3 focus:outline-none focus:border-[#430704] transition-colors text-sm font-medium"
                        placeholder="+91 — — — — — —"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Interested In</label>
                      <select 
                        className="w-full bg-zinc-50 border-b border-zinc-200 px-0 py-3 focus:outline-none focus:border-[#430704] transition-colors text-sm font-medium appearance-none"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      >
                        <option>General Inquiry</option>
                        <option>Bespoke Silver Art</option>
                        <option>The Royal Kada Collection</option>
                        <option>Temple Heritage Masterpieces</option>
                        <option>Bulk/Business Request</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">How can we assist you?</label>
                    <textarea 
                      rows={4}
                      required
                      className="w-full bg-zinc-50 border-b border-zinc-200 px-0 py-3 focus:outline-none focus:border-[#430704] transition-colors text-sm font-medium resize-none"
                      placeholder="Describe your heritage requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{error}</p>}

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-[#430704] hover:bg-zinc-900 text-white rounded-none uppercase tracking-[0.3em] text-[10px] font-black transition-all duration-500 flex items-center justify-center gap-4 group"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Transfer Inquiry <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <p className="text-[8px] text-center text-zinc-400 font-bold uppercase tracking-[0.2em]">
                    By submitting, you agree to our elite privacy archives and concierge terms.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Map or secondary grid */}
      <section className="py-24 border-t border-zinc-100 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-16">
                <span className="text-[#430704]/60 text-[8px] md:text-[10px] font-black uppercase tracking-[1em]">Our Presence</span>
                <h2 className="text-2xl md:text-4xl font-black text-zinc-950 uppercase tracking-tighter">Global <span className="italic font-light text-zinc-400">Archives</span></h2>
                <div className="w-12 h-[1px] bg-[#430704]/20" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { title: "Direct Shipping", desc: "Across India & Global Archives" },
                    { title: "Secure Handover", desc: "Insured heritage transfers" },
                    { title: "Artisan Support", desc: "Direct from our Hupri workshop" },
                    { title: "Legacy Pricing", desc: "Manufacturing direct to customer" }
                ].map((item, idx) => (
                    <div key={idx} className="p-8 border border-zinc-50 bg-zinc-50/30 text-center space-y-3">
                        <h4 className="text-[9px] font-black uppercase tracking-widest text-zinc-900">{item.title}</h4>
                        <p className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}

// Sub-component wrapper for Button to match existing components
function Button({ children, variant, className, onClick, disabled }: any) {
  const baseStyles = "px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all";
  const variants: any = {
    outline: "border border-zinc-200 bg-transparent hover:bg-zinc-50 text-zinc-900",
    solid: "bg-[#430704] text-white hover:bg-zinc-900 shadow-lg"
  };
  
  return (
    <button 
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant || 'solid']} ${className}`}
    >
      {children}
    </button>
  );
}
