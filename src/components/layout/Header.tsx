'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Heart,
  ChevronRight,
  Search,
  Menu as MenuIcon,
  X,
  Loader2,
  ArrowRight,
  Play,
  Sparkles,
  BookOpen,
  Award,
  ShieldCheck,
  Layers,
  MessageSquare,
  Phone,
  MapPin
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';

// Premium Media Assets
const silverImg = "https://images.unsplash.com/photo-1515562141207-7a88fb0ce33e?q=80&w=1200&auto=format&fit=crop";
const traditionalImg = "https://images.unsplash.com/photo-1626248801379-31713d71708d?q=80&w=1200&auto=format&fit=crop";
const modernImg = "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1200&auto=format&fit=crop";
const weddingImg = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop";
const poojaImg = "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1200&auto=format&fit=crop";

interface SubItem {
  id: string;
  label: string;
  href: string;
  previewImage?: string;
  description?: string;
  items?: SubItem[];
}

interface NavItem {
  id: string;
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownType?: 'mega' | 'simple';
  columns?: {
    title: string;
    items: SubItem[];
  }[];
  simpleItems?: SubItem[];
  featured?: {
    title: string;
    subtitle: string;
    image: string;
    cta: string;
  };
}

const MediaPreview = ({ src, title, subtitle }: { src: string; title?: string; subtitle?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="relative w-full h-full rounded-2xl overflow-hidden group/preview"
    >
      <img src={src} alt={title || "Preview"} className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover/preview:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8">
        <motion.p 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          className="text-white/60 text-[10px] uppercase font-bold tracking-[0.4em] mb-2"
        >
          {subtitle || "The Archive"}
        </motion.p>
        <motion.h5 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y:0, opacity: 1 }} 
          transition={{ delay: 0.1 }}
          className="text-white text-3xl font-heading font-black italic leading-none tracking-tighter"
        >
          {title || "Heritage Piece"}
        </motion.h5>
      </div>
    </motion.div>
  );
};

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredSubItem, setHoveredSubItem] = useState<SubItem | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navigation: NavItem[] = useMemo(() => [
    { id: "home", name: "Home", href: "/" },
    {
      id: "products",
      name: "Products",
      href: "/products",
      hasDropdown: true,
      dropdownType: 'mega',
      featured: {
        title: "The Artisanal Collection",
        subtitle: "Handcrafted Silver",
        image: silverImg,
        cta: "Explore All"
      },
      columns: [
        {
          title: "Jewellery",
          items: [
            { id: "jodavi", label: "Jodavi", href: "/products/jewellery/jodavi", previewImage: "https://images.unsplash.com/photo-1544450297-6b04a926f749?q=80&w=800" },
            { id: "fancy-jodavi", label: "Fancy Jodavi", href: "/products/jewellery/fancy-jodavi", previewImage: "https://images.unsplash.com/photo-1603561591411-0e7bc26e13b8?q=80&w=800" },
            { id: "kada", label: "Kada", href: "/products/jewellery/kada", previewImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800" },
            { id: "rama-kada", label: "Rama Kada", href: "/products/jewellery/rama-kada", previewImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800" },
            { id: "payal", label: "Payal", href: "/products/jewellery/payal", previewImage: traditionalImg, items: [
              { id: "salem-payal", label: "Salem Payal", href: "/products/jewellery/payal/salem" }
            ]},
            { id: "ghanti", label: "Ghanti", href: "/products/jewellery/ghanti", previewImage: poojaImg },
            { id: "ghungraki", label: "Ghungraki", href: "/products/jewellery/ghungraki", previewImage: poojaImg },
          ]
        },
        {
          title: "Pooja Items",
          items: [
            { id: "samayi", label: "Samayi", href: "/products/pooja/samayi", previewImage: poojaImg },
            { id: "diva", label: "Diva", href: "/products/pooja/diva", previewImage: poojaImg },
            { id: "chamcha", label: "Chamcha", href: "/products/pooja/chamcha", previewImage: poojaImg },
            { id: "karanda", label: "Karanda", href: "/products/pooja/karanda", previewImage: poojaImg },
            { id: "nagdor-karanda", label: "Nagdor Karanda", href: "/products/pooja/nagdor-karanda", previewImage: poojaImg },
          ]
        },
        {
          title: "Murtis (Idols)",
          items: [
            { id: "pokal-murti", label: "Pokal Murti", href: "/products/murtis/pokal", previewImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800" },
            { id: "bhariv-murti", label: "Bhariv Murti", href: "/products/murtis/bhariv", previewImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800" },
            { id: "special-murti", label: "Special Murti", href: "/products/murtis/special", previewImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800" },
            { id: "mukavata", label: "Mukavata", href: "/products/murtis/mukavata", previewImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800" },
          ]
        },
        {
          title: "Traditional Items",
          items: [
            { id: "kolkata-dabi", label: "Kolkata Dabi", href: "/products/traditional/kolkata-dabi" },
            { id: "nag", label: "Nag", href: "/products/traditional/nag" },
            { id: "vedhni", label: "Vedhni", href: "/products/traditional/vedhni" },
            { id: "plain-mal", label: "Plain Mal", href: "/products/traditional/plain-mal" },
            { id: "one-gram-gold", label: "One Gram Gold", href: "/products/traditional/one-gram-gold" },
            { id: "all-products", label: "All Products", href: "/products" },
          ]
        }
      ]
    },
    {
      id: "collections",
      name: "Collections",
      href: "/collections",
      hasDropdown: true,
      dropdownType: 'mega',
      featured: {
        title: "Bespoke Masterpieces",
        subtitle: "The 2024 Collection",
        image: weddingImg,
        cta: "Discover Curation"
      },
      simpleItems: [
        { id: "best-sellers", label: "Best Sellers", href: "/collections/best-sellers", previewImage: "https://images.unsplash.com/photo-1515562141207-7a88fb0ce33e?q=80&w=800", description: "Our most coveted heritage designs." },
        { id: "new-arrivals", label: "New Arrivals", href: "/collections/new-arrivals", previewImage: modernImg, description: "Fresh expressions of silver artistry." },
        { id: "festive", label: "Festive Collection", href: "/collections/festive", previewImage: poojaImg, description: "Celebrate the divine with silver." },
      ]
    },
    {
      id: "story",
      name: "Our Story",
      href: "/our-story",
      hasDropdown: true,
      dropdownType: 'mega',
      featured: {
        title: "Heritage Reimagined",
        subtitle: "Since 1980",
        image: traditionalImg,
        cta: "Read Our Odyssey"
      },
      simpleItems: [
        { id: "about", label: "About Us", href: "/about-us", description: "The journey of Dattaraj." },
        { id: "craftsmanship", label: "Craftsmanship", href: "/craftsmanship", description: "The heart of every piece." },
        { id: "materials", label: "Materials", href: "/materials", description: "Silver & One Gram Gold." },
        { id: "why-choose-us", label: "Why Choose Us", href: "/why-choose-us", description: "The Dattaraj promise." },
      ]
    },
    { 
      id: "contact", 
      name: "Contact", 
      href: "/contact",
      hasDropdown: true,
      dropdownType: 'mega',
      featured: {
        title: "Private Concierge",
        subtitle: "At Your Service",
        image: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=800",
        cta: "Contact Us"
      },
      simpleItems: [
        { id: "contact-form", label: "Contact Form", href: "/contact#form", description: "Speak with our consultants." },
        { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/your-number", description: "Instant styling advice." },
        { id: "location", label: "Store Location", href: "/contact#location", description: "Visit our heritage boutique." },
      ]
    }
  ], []);

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveNav(id);
    const item = navigation.find(n => n.id === id);
    if (item?.dropdownType === 'mega') {
      setHoveredSubItem(null); // Reset to featured
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveNav(null);
      setHoveredSubItem(null);
    }, 200);
  };

  const activeItem = navigation.find(n => n.id === activeNav);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]',
          isScrolled || activeNav || mobileMenuOpen
            ? 'bg-white/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-zinc-100/50'
            : 'bg-transparent'
        )}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-[1240px] mx-auto px-6">
          <nav className="flex items-center justify-between h-24">
            {/* Logo Section */}
            <div className="flex-shrink-0 relative z-10">
              <Link href="/" className="group flex items-center gap-4">
                <div className="relative transition-all duration-700 group-hover:scale-105">
                  <img src="/cropedmain.png" alt="Dattaraj" className="h-10 w-auto object-contain" />
                </div>
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              {navigation.map((item) => (
                <div
                  key={item.id}
                  className="relative h-24 flex items-center group/nav"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500",
                      activeNav === item.id || pathname === item.href
                        ? "text-zinc-950"
                        : "text-zinc-400 hover:text-zinc-950"
                    )}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>

            {/* Action Icons - Hidden to maintain layout space but remove components */}
            <div className="flex items-center gap-2 relative z-10">
              <div className="hidden lg:flex items-center gap-2 invisible" aria-hidden="true">
                <Button variant="ghost" size="icon" className="rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/50 transition-all">
                  <Search size={18} />
                </Button>
                <Button variant="ghost" size="icon" className="group relative rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/50 transition-all">
                  <Heart size={18} />
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-zinc-900 rounded-full scale-0 group-hover:scale-100 transition-transform" />
                </Button>
                <Button variant="ghost" size="icon" className="group relative rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/50 transition-all">
                  <ShoppingBag size={18} />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[8px] font-black text-white">0</span>
                </Button>
              </div>
              <button 
                className="lg:hidden p-3 rounded-full hover:bg-zinc-100 transition-colors ml-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>
          </nav>
        </div>

        {/* Enhanced Dropdown System */}
        <AnimatePresence mode="wait">
          {activeNav && activeItem?.hasDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="absolute left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-zinc-100 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
              onMouseEnter={() => handleMouseEnter(activeNav)}
            >
              <div className="max-w-[1240px] mx-auto px-6 py-20">
                {activeItem.dropdownType === 'mega' ? (
                  activeItem.id === 'products' ? (
                    <div className="grid grid-cols-12 gap-12">
                      <div className="col-span-9 grid grid-cols-4 gap-8">
                        {activeItem.columns?.map((col, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                            className="space-y-8"
                          >
                            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300 border-b border-zinc-100/50 pb-4 mb-4">
                              {col.title}
                            </h4>
                            <ul className="space-y-5">
                              {col.items.map((sub, sidx) => (
                                <motion.li 
                                  key={sub.id} 
                                  className="group/item"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: (idx * 0.1) + (sidx * 0.05) }}
                                >
                                  <Link
                                    href={sub.href}
                                    onMouseEnter={() => setHoveredSubItem(sub)}
                                    className="flex flex-col gap-1 transition-all"
                                  >
                                    <span className="text-xs font-heading font-bold text-zinc-500 group-hover/item:text-zinc-950 flex items-center gap-2 group-hover/item:pl-2 transition-all duration-300 italic">
                                      {sub.label}
                                    </span>
                                    {sub.items && (
                                      <div className="pl-3 mt-1 space-y-2 border-l border-zinc-100">
                                        {sub.items.map(nested => (
                                          <Link 
                                            key={nested.id}
                                            href={nested.href}
                                            className="block text-[10px] text-zinc-400 hover:text-zinc-950 transition-colors uppercase tracking-widest font-black"
                                          >
                                            {nested.label}
                                          </Link>
                                        ))}
                                      </div>
                                    )}
                                  </Link>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>

                      {/* Dynamic Visual Preview Area */}
                      <div className="col-span-3 pl-8 border-l border-zinc-100">
                        <AnimatePresence mode="wait">
                          <MediaPreview 
                            key={hoveredSubItem?.id || activeItem.id}
                            src={hoveredSubItem?.previewImage || activeItem.featured?.image || silverImg}
                            title={hoveredSubItem?.label || activeItem.featured?.title}
                            subtitle={hoveredSubItem?.id ? "Category Spotlight" : activeItem.featured?.subtitle}
                          />
                        </AnimatePresence>
                        <div className="mt-8 flex justify-between items-center">
                          <Link href={activeItem.href} className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 flex items-center gap-2 transition-all group/cta">
                            View Everything
                            <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
                          </Link>
                          <span className="text-[9px] font-bold text-zinc-200 uppercase tracking-widest italic">Est. 1980</span>
                        </div>
                      </div>
                    </div>
                  ) : activeItem.id === 'collections' ? (
                    <div className="grid grid-cols-3 gap-8">
                      {activeItem.simpleItems?.map((item, idx) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.8 }}
                        >
                           <Link href={item.href} className="group/coll block relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                              <img src={item.previewImage} alt={item.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/coll:scale-110" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-center">
                                 <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.5em] mb-3">Anthology 0{idx + 1}</p>
                                 <h4 className="text-3xl font-heading font-black text-white italic tracking-tighter mb-4">{item.label}</h4>
                                 <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover/coll:opacity-100 transition-opacity duration-500">
                                    {item.description}
                                 </p>
                              </div>
                           </Link>
                        </motion.div>
                      ))}
                    </div>
                  ) : activeItem.id === 'story' ? (
                    <div className="grid grid-cols-12 gap-16 min-h-[400px]">
                      <div className="col-span-7 relative rounded-2xl overflow-hidden group/story">
                         <img src={activeItem.featured?.image} alt="Heritage" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover/story:scale-110" />
                         <div className="absolute inset-0 bg-black/40 backdrop-blur-sm group-hover/story:backdrop-blur-none transition-all duration-1000" />
                         <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                            <motion.p initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-white/60 text-[10px] font-black uppercase tracking-[0.6em] mb-4">The Dattaraj Odyssey</motion.p>
                            <h4 className="text-6xl font-heading font-black text-white italic tracking-tighter uppercase leading-none">{activeItem.featured?.title}</h4>
                         </div>
                      </div>
                      <div className="col-span-5 flex flex-col justify-center space-y-10 pl-8">
                         <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 border-b border-zinc-100 pb-4">Ancestral Narrative</h5>
                         <div className="grid grid-cols-1 gap-6">
                            {activeItem.simpleItems?.map((sub, idx) => (
                              <Link key={sub.id} href={sub.href} className="group/item flex items-center justify-between p-4 rounded-xl hover:bg-zinc-50 transition-all border border-transparent hover:border-zinc-100">
                                 <div className="flex items-center gap-6">
                                    <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover/item:bg-zinc-950 group-hover/item:text-white transition-all">
                                      {idx === 0 ? <BookOpen size={18} /> : idx === 1 ? <Award size={18} /> : idx === 2 ? <Layers size={18} /> : <ShieldCheck size={18} />}
                                    </div>
                                    <div>
                                       <p className="text-sm font-heading font-black text-zinc-950 italic">{sub.label}</p>
                                       <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{sub.description}</p>
                                    </div>
                                 </div>
                                 <ArrowRight size={18} className="text-zinc-200 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-2 transition-all" />
                              </Link>
                            ))}
                         </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-12 gap-16">
                      <div className="col-span-5 p-12 bg-zinc-950 rounded-2xl flex flex-col justify-center items-center text-center">
                         <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Bespoke Inquiries</p>
                         <h4 className="text-4xl font-heading font-black text-white italic tracking-tighter mb-8 leading-tight">Your Private<br/>Concierge</h4>
                         <div className="w-20 h-[1px] bg-white/10 mb-8" />
                         <Button className="bg-white text-zinc-950 hover:bg-amber-400 transition-colors uppercase font-black tracking-widest text-[10px] px-8 h-12 rounded-full">Explore Commissions</Button>
                      </div>
                      <div className="col-span-7 grid grid-cols-2 gap-6 pl-8">
                         {activeItem.simpleItems?.map((sub, idx) => (
                           <Link key={sub.id} href={sub.href} className="group/card relative overflow-hidden p-8 rounded-2xl border border-zinc-100 hover:border-amber-400/50 hover:bg-zinc-50 transition-all">
                              <div className="relative z-10 flex flex-col h-full">
                                 <div className="w-12 h-12 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400 mb-6 group-hover/card:bg-zinc-950 group-hover/card:text-white transition-all">
                                    {idx === 0 ? <MessageSquare size={24} /> : idx === 1 ? <Phone size={24} /> : <MapPin size={24} />}
                                 </div>
                                 <h5 className="text-xl font-heading font-black text-zinc-950 italic mb-2 tracking-tighter">{sub.label}</h5>
                                 <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{sub.description}</p>
                              </div>
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-amber-400/5 rounded-full blur-[60px] opacity-0 group-hover/card:opacity-100 transition-opacity" />
                           </Link>
                         ))}
                      </div>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                      {activeItem.simpleItems?.map((sub, idx) => (
                        <Link
                          key={sub.id}
                          href={sub.href}
                          className="group flex flex-col items-center text-center space-y-4 p-8 rounded-2xl hover:bg-zinc-50 transition-all"
                        >
                          <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-900 transition-all">
                            <span className="text-zinc-400 group-hover:text-white font-black text-xs">{idx + 1}</span>
                          </div>
                          <span className="text-sm font-black text-zinc-900 uppercase tracking-widest border-b-2 border-transparent group-hover:border-zinc-900 transition-all pb-1">{sub.label}</span>
                        </Link>
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
              
              {/* Decorative Glass Overlay Element */}
              <div className="absolute top-0 right-0 w-[600px] h-full bg-gradient-to-l from-zinc-50/50 to-transparent pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Modern Curtain Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-[60] bg-white lg:hidden flex flex-col"
          >
            <div className="px-6 h-24 flex justify-between items-center border-b border-zinc-100">
              <span className="font-heading font-black text-2xl tracking-tighter">DATTARAJ</span>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="p-3 rounded-full bg-zinc-100 text-zinc-900 transition-transform active:scale-95"
              >
                <X size={28} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-12 scroll-smooth">
              <nav className="space-y-12">
                {navigation.map((item, idx) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-5xl font-black uppercase tracking-tighter text-zinc-900 hover:italic hover:pl-4 transition-all block"
                    >
                      {item.name}
                    </Link>
                    {item.hasDropdown && (
                      <div className="mt-6 space-y-6 pl-4 border-l border-zinc-100">
                        {item.columns ? item.columns.flatMap(c => c.items).map(sub => (
                          <div key={sub.id} className="space-y-3">
                            <Link 
                              href={sub.href} 
                              onClick={() => setMobileMenuOpen(false)} 
                              className="text-[11px] font-black text-zinc-900 uppercase tracking-widest block"
                            >
                              {sub.label}
                            </Link>
                            {sub.items && (
                              <div className="space-y-2 pl-4">
                                {sub.items.map(nested => (
                                  <Link 
                                    key={nested.id}
                                    href={nested.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block"
                                  >
                                    {nested.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        )) : item.simpleItems?.map(sub => (
                          <Link 
                            key={sub.id} 
                            href={sub.href} 
                            onClick={() => setMobileMenuOpen(false)} 
                            className="text-[11px] font-black text-zinc-400 uppercase tracking-widest block hover:text-zinc-950 transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Menu Footer - Simplified */}
              <div className="mt-20 pt-12 border-t border-zinc-100 flex flex-col gap-6">
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em] text-center">
                  Dattaraj Artisans — Est. 1980
                </p>
                <div className="flex justify-center gap-8">
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-[10px] font-black uppercase tracking-widest text-zinc-900 border-b border-zinc-900">Enquire</Link>
                  <Link href="/collections" onClick={() => setMobileMenuOpen(false)} className="text-[10px] font-black uppercase tracking-widest text-zinc-900 border-b border-zinc-900">Collections</Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
