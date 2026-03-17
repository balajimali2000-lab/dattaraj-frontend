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
  Play
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative w-full h-full rounded-2xl overflow-hidden group/preview"
    >
      <img src={src} alt={title || "Preview"} className="w-full h-full object-cover transition-transform duration-1000 group-hover/preview:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
        <motion.p 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          className="text-white/60 text-[10px] uppercase font-black tracking-[0.4em] mb-2"
        >
          {subtitle || "Curated Excellence"}
        </motion.p>
        <motion.h5 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.1 }}
          className="text-white text-3xl font-black italic leading-none tracking-tighter"
        >
          {title || "Dattaraj Heritage"}
        </motion.h5>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity duration-500">
        <Play className="text-white fill-white ml-1" size={24} />
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
          title: "Fine Jewellery",
          items: [
            { id: "jodavi", label: "Jodavi", href: "/products/jewellery/jodavi", previewImage: "https://images.unsplash.com/photo-1544450297-6b04a926f749?q=80&w=800", description: "Authentic traditional silver toe-rings." },
            { id: "fancy-jodavi", label: "Fancy Jodavi", href: "/products/jewellery/fancy-jodavi", previewImage: "https://images.unsplash.com/photo-1603561591411-0e7bc26e13b8?q=80&w=800", description: "Contemporary designs for modern aesthetics." },
            { id: "kada", label: "Kada", href: "/products/jewellery/kada", previewImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800", description: "Bold silver bracelets for every occasion." },
            { id: "payal", label: "Payal", href: "/products/jewellery/payal", previewImage: "https://images.unsplash.com/photo-1626248801379-31713d71708d?q=80&w=800", description: "Melodious silver anklets crafted with precision." },
          ]
        },
        {
          title: "Divine Essentials",
          items: [
            { id: "pooja", label: "Pooja Items", href: "/products/pooja", previewImage: poojaImg, description: "Sacred silver artifacts for your spiritual journey." },
            { id: "samayi", label: "Samayi", href: "/products/pooja/samayi", previewImage: poojaImg },
            { id: "karanda", label: "Karanda", href: "/products/pooja/karanda", previewImage: poojaImg },
            { id: "murtis", label: "Murtis (Idols)", href: "/products/murtis", previewImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800" },
          ]
        },
        {
          title: "Collections",
          items: [
            { id: "heritage", label: "Heritage Collection", href: "/collections/heritage", previewImage: traditionalImg },
            { id: "modern", label: "Modern Classics", href: "/collections/modern", previewImage: modernImg },
            { id: "bridal", label: "Bridal Masterpieces", href: "/collections/bridal", previewImage: weddingImg },
            { id: "gifts", label: "Luxury Gifting", href: "/collections/gifts", previewImage: silverImg },
          ]
        }
      ]
    },
    {
      id: "collections",
      name: "Curated",
      href: "/collections",
      hasDropdown: true,
      dropdownType: 'simple',
      simpleItems: [
        { id: "best-sellers", label: "Best Sellers", href: "/collections/best-sellers" },
        { id: "new-arrivals", label: "New Arrivals", href: "/collections/new-arrivals" },
        { id: "festive", label: "Festive Collection", href: "/collections/festive" },
      ]
    },
    {
      id: "story",
      name: "The Story",
      href: "/our-story",
      hasDropdown: true,
      dropdownType: 'simple',
      simpleItems: [
        { id: "about", label: "About Us", href: "/about-us" },
        { id: "why-choose-us", label: "Why Choose Us", href: "/why-choose-us" },
      ]
    },
    { id: "contact", name: "Contact", href: "/contact" }
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
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
          isScrolled || activeNav || mobileMenuOpen
            ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border-b border-zinc-100/50'
            : 'bg-transparent'
        )}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <nav className="flex items-center justify-between h-24">
            {/* Logo Section */}
            <div className="flex-shrink-0 relative z-10">
              <Link href="/" className="group flex items-center gap-4">
                <div className="relative overflow-hidden rounded-full p-1 bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-500 group-hover:bg-white/20">
                  <img src="/cropedmain.png" alt="Dattaraj" className="h-12 w-auto object-contain transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-black text-2xl tracking-tighter text-zinc-900 leading-none">DATTARAJ</span>
                  <span className="text-[8px] uppercase tracking-[0.6em] text-zinc-400 font-bold mt-1">Heritage Since 1980</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navigation.map((item) => (
                <div
                  key={item.id}
                  className="relative h-24 flex items-center group/nav"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "px-6 py-2 text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 rounded-full",
                      activeNav === item.id || pathname === item.href
                        ? "text-zinc-900 bg-zinc-50/50"
                        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50/30"
                    )}
                  >
                    {item.name}
                  </Link>
                  {activeNav === item.id && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 w-1 h-1 bg-zinc-900 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-2 relative z-10">
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
              <div className="max-w-[1440px] mx-auto px-12 py-20">
                {activeItem.dropdownType === 'mega' ? (
                  <div className="grid grid-cols-12 gap-16">
                    {/* Multi-column Layout */}
                    <div className="col-span-8 grid grid-cols-3 gap-12">
                      {activeItem.columns?.map((col, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="space-y-8"
                        >
                          <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300 border-b border-zinc-100 pb-4">
                            {col.title}
                          </h4>
                          <ul className="space-y-4">
                            {col.items.map((sub) => (
                              <li key={sub.id} className="group/item">
                                <Link
                                  href={sub.href}
                                  onMouseEnter={() => setHoveredSubItem(sub)}
                                  className="flex flex-col gap-1 transition-all"
                                >
                                  <span className="text-sm font-bold text-zinc-600 group-hover/item:text-zinc-900 flex items-center gap-2 group-hover/item:pl-2 transition-all">
                                    {sub.label}
                                    <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-zinc-400" />
                                  </span>
                                  {sub.description && (
                                    <span className="text-[11px] text-zinc-400 font-medium group-hover/item:text-zinc-500 transition-colors">
                                      {sub.description}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>

                    {/* Dynamic Visual Preview Area */}
                    <div className="col-span-4 pl-16 border-l border-zinc-100">
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
                      <div className="mt-8 grid grid-cols-2 gap-y-4 gap-x-8 pl-4 border-l-2 border-zinc-900/10">
                        {item.columns ? item.columns.flatMap(c => c.items).map(sub => (
                          <Link key={sub.id} href={sub.href} onClick={() => setMobileMenuOpen(false)} className="text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-zinc-900 transition-colors">
                            {sub.label}
                          </Link>
                        )) : item.simpleItems?.map(sub => (
                          <Link key={sub.id} href={sub.href} onClick={() => setMobileMenuOpen(false)} className="text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-zinc-900 transition-colors">
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>

              <div className="mt-20 pt-12 border-t border-zinc-100 flex flex-col gap-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-white">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h5 className="font-black text-xs uppercase tracking-widest text-zinc-900">Your Boutique</h5>
                    <p className="text-[10px] text-zinc-400 font-bold mt-1">Free Shipping on Silver Orders</p>
                  </div>
                </div>
                <Button className="w-full bg-zinc-900 text-white h-16 rounded-2xl text-[13px] font-black uppercase tracking-widest">
                  Shop Collection
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
