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
import { useProducts } from '@/context/ProductContext';
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
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollY } = useScroll();
  const { filterOptions } = useProducts();

  const formatLabel = (label: string) => {
    return label
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^ /, '')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .map(word => {
        if (word.toLowerCase() === 'gold') return 'Gold';
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  };

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
          title: "All Categories",
          items: filterOptions.categories.slice(0, Math.ceil(filterOptions.categories.length / 2)).map(cat => ({
            id: cat,
            label: formatLabel(cat),
            href: `/products?category=${encodeURIComponent(cat)}`,
            previewImage: cat.toLowerCase().includes('silver') ? silverImg : cat.toLowerCase().includes('traditional') ? traditionalImg : poojaImg
          }))
        },
        {
          title: "More Categories",
          items: filterOptions.categories.slice(Math.ceil(filterOptions.categories.length / 2)).map(cat => ({
            id: cat,
            label: formatLabel(cat),
            href: `/products?category=${encodeURIComponent(cat)}`,
            previewImage: cat.toLowerCase().includes('murtis') ? weddingImg : poojaImg
          }))
        },
        {
          title: "Product Types",
          items: filterOptions.types.slice(0, Math.ceil(filterOptions.types.length / 2)).map(type => ({
            id: type,
            label: formatLabel(type),
            href: `/products?type=${encodeURIComponent(type)}`,
          }))
        },
        {
          title: "Special Filters",
          items: [
            ...filterOptions.types.slice(Math.ceil(filterOptions.types.length / 2)).map(type => ({
              id: type,
              label: formatLabel(type),
              href: `/products?type=${encodeURIComponent(type)}`,
            })),
            { id: "all-products", label: "View All Collection", href: "/products" }
          ]
        }
      ]
    },
    /* {
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
    }, */
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
  ], [filterOptions]);

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    
    enterTimeoutRef.current = setTimeout(() => {
      setActiveNav(id);
      const item = navigation.find(n => n.id === id);
      if (item?.dropdownType === 'mega') {
        setHoveredSubItem(null); // Reset to featured
      }
    }, 150); // Small delay to prevent accidental popups
  };

  const handleMouseLeave = () => {
    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
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
          <nav className="flex items-center justify-between h-20">
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
                  className="relative h-20 flex items-center group/nav"
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
              className="absolute left-0 w-full bg-white border-b border-zinc-100 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.08)] max-h-[85vh] overflow-y-auto"
              onMouseEnter={() => handleMouseEnter(activeNav)}
            >
              <div className="max-w-[1240px] mx-auto px-6 py-8">
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
                                    className="flex flex-col gap-1 transition-all group/link"
                                  >
                                    <span className="text-xs font-black text-zinc-900 group-hover/item:text-[#430704] flex items-center gap-2 group-hover/item:pl-2 transition-all duration-300 uppercase tracking-tight">
                                      {sub.label}
                                    </span>
                                    {sub.items && (
                                      <div className="pl-3 mt-1 space-y-2 border-l border-zinc-100">
                                        {sub.items.map(nested => (
                                          <Link 
                                            key={nested.id}
                                            href={nested.href}
                                            className="block text-[10px] text-zinc-500 hover:text-zinc-950 transition-colors uppercase tracking-widest font-black"
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
                    <div className="grid grid-cols-3 gap-6">
                      {activeItem.simpleItems?.map((item, idx) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1, duration: 0.8 }}
                        >
                           <Link href={item.href} className="group/coll block relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-zinc-100">
                              <img src={item.previewImage} alt={item.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/coll:scale-110" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                                 <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.5em] mb-3">Anthology 0{idx + 1}</p>
                                 <h4 className="text-3xl font-black text-white tracking-tighter mb-4 uppercase">{item.label}</h4>
                                 <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover/coll:opacity-100 transition-opacity duration-500">
                                    {item.description}
                                 </p>
                              </div>
                           </Link>
                        </motion.div>
                      ))}
                    </div>
                  ) : activeItem.id === 'story' ? (
                    <div className="grid grid-cols-12 gap-12 items-center">
                      <div className="col-span-8 relative rounded-3xl overflow-hidden group/story aspect-[16/8] shadow-2xl border border-zinc-100">
                         <img src={activeItem.featured?.image} alt="Heritage" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4000ms] group-hover/story:scale-110" />
                         <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                         <div className="absolute inset-0 flex flex-col justify-center p-16">
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-4">Ancestral Narrative</motion.p>
                            <h4 className="text-6xl font-black text-white tracking-tighter uppercase leading-none mb-8">{activeItem.featured?.title}</h4>
                            <Link href={activeItem.href} className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/80 hover:text-white transition-all group/cta">
                                {activeItem.featured?.cta} <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
                            </Link>
                         </div>
                      </div>
                      <div className="col-span-4 space-y-6 pl-6">
                         <div className="grid grid-cols-1 gap-4">
                            {activeItem.simpleItems?.map((sub, idx) => (
                              <Link key={sub.id} href={sub.href} className="group/item flex items-center gap-6 p-4 rounded-2xl hover:bg-zinc-50/50 transition-all border border-transparent hover:border-zinc-100">
                                 <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover/item:bg-zinc-950 group-hover/item:text-white transition-all shadow-sm">
                                    {idx === 0 ? <BookOpen size={16} /> : idx === 1 ? <Award size={16} /> : idx === 2 ? <Layers size={16} /> : <ShieldCheck size={16} />}
                                 </div>
                                 <div className="flex-1">
                                    <p className="text-sm font-black text-zinc-950 uppercase tracking-tight">{sub.label}</p>
                                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">{sub.description}</p>
                                 </div>
                                 <ArrowRight size={14} className="text-zinc-200 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                              </Link>
                            ))}
                         </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-12 gap-12 items-center">
                      <div className="col-span-4 p-12 bg-zinc-950 rounded-3xl flex flex-col justify-center items-center text-center shadow-2xl relative overflow-hidden group/concierge">
                         <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950" />
                         <div className="relative z-10">
                            <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Private Inquiries</p>
                            <h4 className="text-4xl font-black text-white tracking-tighter mb-8 leading-tight uppercase">Elite Concierge</h4>
                            <Button className="bg-white text-zinc-950 hover:bg-amber-400 transition-colors uppercase font-black tracking-widest text-[9px] px-10 h-12 rounded-full shadow-lg h-auto py-4">Explore Commissions</Button>
                         </div>
                         <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl" />
                      </div>
                      <div className="col-span-8 grid grid-cols-3 gap-4 pl-6">
                         {activeItem.simpleItems?.map((sub, idx) => (
                           <Link key={sub.id} href={sub.href} className="group/card relative overflow-hidden p-6 rounded-2xl border border-zinc-100 hover:border-amber-400/50 hover:bg-zinc-50/50 transition-all">
                              <div className="relative z-10 flex flex-col h-full">
                                 <div className="w-10 h-10 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-400 mb-6 group-hover/card:bg-zinc-950 group-hover/card:text-white transition-all shadow-sm">
                                    {idx === 0 ? <MessageSquare size={18} /> : idx === 1 ? <Phone size={18} /> : <MapPin size={18} />}
                                 </div>
                                 <h5 className="text-lg font-black text-zinc-950 mb-1 tracking-tighter uppercase">{sub.label}</h5>
                                 <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest leading-relaxed">{sub.description}</p>
                              </div>
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
            <div className="px-6 h-20 flex justify-between items-center border-b border-zinc-100">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex-shrink-0">
                <img src="/cropedmain.png" alt="Dattaraj" className="h-8 w-auto object-contain" />
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="p-3 rounded-full bg-zinc-100 text-zinc-900 transition-transform active:scale-95"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-12 scroll-smooth">
              <nav className="space-y-8">
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
                      className="text-3xl font-black uppercase tracking-tighter text-zinc-900 hover:italic hover:pl-4 transition-all block"
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
                  <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="text-[10px] font-black uppercase tracking-widest text-zinc-900 border-b border-zinc-900">Archives</Link>
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
