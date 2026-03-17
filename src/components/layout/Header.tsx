'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShoppingBag, 
  Heart, 
  ChevronRight, 
  ChevronDown,
  MessageCircle,
  MapPin,
  Info,
  Users,
  Star,
  Zap,
  Gift,
  Search,
  Menu as MenuIcon,
  X,
  Loader2
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

// Mock images or use default placeholders for now
const silverImg = "https://images.unsplash.com/photo-1515562141207-7a88fb0ce33e?q=80&w=800&auto=format&fit=crop";
const traditionalImg = "https://images.unsplash.com/photo-1626248801379-31713d71708d?q=80&w=800&auto=format&fit=crop";
const modernImg = "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop";
const weddingImg = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop";

interface SubItem {
  id: string;
  label: string;
  href: string;
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
}

const FadeImage = React.memo(({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden w-full h-full bg-zinc-100", className)}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-zinc-50">
          <Loader2 className="w-5 h-5 animate-spin text-zinc-300" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-all duration-700",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        )}
      />
    </div>
  );
});

const Header: React.FC = () => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation: NavItem[] = useMemo(() => [
    { id: "home", name: "Home", href: "/" },
    {
      id: "products",
      name: "Products",
      href: "/products",
      hasDropdown: true,
      dropdownType: 'mega',
      columns: [
        {
          title: "Jewellery",
          items: [
            { id: "jodavi", label: "Jodavi", href: "/products/jewellery/jodavi" },
            { id: "fancy-jodavi", label: "Fancy Jodavi", href: "/products/jewellery/fancy-jodavi" },
            { id: "kada", label: "Kada", href: "/products/jewellery/kada" },
            { id: "rama-kada", label: "Rama Kada", href: "/products/jewellery/rama-kada" },
            { 
              id: "payal", 
              label: "Payal", 
              href: "/products/jewellery/payal",
              items: [{ id: "salem-payal", label: "Salem Payal", href: "/products/jewellery/payal/salem" }]
            },
            { id: "ghanti", label: "Ghanti", href: "/products/jewellery/ghanti" },
            { id: "ghungraki", label: "Ghungraki", href: "/products/jewellery/ghungraki" },
          ]
        },
        {
          title: "Pooja Items",
          items: [
            { id: "samayi", label: "Samayi", href: "/products/pooja/samayi" },
            { id: "diva", label: "Diva", href: "/products/pooja/diva" },
            { id: "chamcha", label: "Chamcha", href: "/products/pooja/chamcha" },
            { id: "karanda", label: "Karanda", href: "/products/pooja/karanda" },
            { id: "nagdor-karanda", label: "Nagdor Karanda", href: "/products/pooja/nagdor" },
          ]
        },
        {
          title: "Murtis (Idols)",
          items: [
            { id: "pokal-murti", label: "Pokal Murti", href: "/products/murtis/pokal" },
            { id: "bhariv-murti", label: "Bhariv Murti", href: "/products/murtis/bhariv" },
            { id: "special-murti", label: "Special Murti", href: "/products/murtis/special" },
            { id: "mukavata", label: "Mukavata", href: "/products/murtis/mukavata" },
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
      dropdownType: 'simple',
      simpleItems: [
        { id: "best-sellers", label: "Best Sellers", href: "/collections/best-sellers" },
        { id: "new-arrivals", label: "New Arrivals", href: "/collections/new-arrivals" },
        { id: "festive", label: "Festive Collection", href: "/collections/festive" },
        { id: "bridal", label: "Bridal Collection", href: "/collections/bridal" },
        { id: "under-1000", label: "Under ₹1000", href: "/collections/under-1000" },
      ]
    },
    {
      id: "story",
      name: "Our Story",
      href: "/our-story",
      hasDropdown: true,
      dropdownType: 'simple',
      simpleItems: [
        { id: "about", label: "About Us", href: "/about-us" },
        { id: "craftsmanship", label: "Craftsmanship", href: "/craftsmanship" },
        { id: "materials", label: "Materials", href: "/materials" },
        { id: "why-choose-us", label: "Why Choose Us", href: "/why-choose-us" },
      ]
    },
    {
      id: "contact",
      name: "Contact",
      href: "/contact",
      hasDropdown: true,
      dropdownType: 'simple',
      simpleItems: [
        { id: "contact-form", label: "Contact Form", href: "/contact#form" },
        { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/919325614230" },
        { id: "location", label: "Store Location", href: "/contact#location" },
        { id: "faqs", label: "FAQs", href: "/faqs" },
      ]
    }
  ], []);

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveNav(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveNav(null), 150);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled || activeNav || mobileMenuOpen
            ? 'bg-white shadow-md border-b border-zinc-100'
            : 'bg-white/80 backdrop-blur-md border-b border-zinc-50'
        )}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <nav className="flex items-center justify-between h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <img 
                  src="/cropedmain.png" 
                  alt="Dattaraj" 
                  className="h-10 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navigation.map((item) => (
                <div
                  key={item.id}
                  className="relative h-24 flex items-center"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-[13px] font-bold uppercase tracking-[0.2em] transition-all duration-300",
                      activeNav === item.id || pathname === item.href
                        ? "text-zinc-900"
                        : "text-zinc-500 hover:text-zinc-900"
                    )}
                  >
                    {item.name}
                  </Link>
                  {activeNav === item.id && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-900"
                      initial={false}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-zinc-700 hover:bg-zinc-100"
              >
                <Search size={20} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-zinc-700 hover:bg-zinc-100"
              >
                <Heart size={20} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-zinc-700 hover:bg-zinc-100"
              >
                <ShoppingBag size={20} />
              </Button>
              <button 
                className="lg:hidden p-2 text-zinc-900"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {activeNav && navigation.find(n => n.id === activeNav)?.hasDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-0 w-full bg-white border-b border-zinc-100 shadow-2xl overflow-hidden"
              onMouseEnter={() => handleMouseEnter(activeNav)}
            >
              <div className="max-w-[1440px] mx-auto px-12 py-16">
                {navigation.find(n => n.id === activeNav)?.dropdownType === 'mega' ? (
                  <div className="grid grid-cols-5 gap-12">
                    {navigation.find(n => n.id === activeNav)?.columns?.map((col, idx) => (
                      <div key={idx} className="space-y-6">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 border-b border-zinc-100 pb-4">
                          {col.title}
                        </h4>
                        <ul className="space-y-4">
                          {col.items.map((sub) => (
                            <li key={sub.id} className="group/item">
                              <Link 
                                href={sub.href}
                                className="text-sm font-bold text-zinc-600 hover:text-zinc-900 flex items-center gap-2 transition-colors"
                              >
                                {sub.label}
                                {sub.items && <ChevronRight size={12} className="text-zinc-300" />}
                              </Link>
                              {sub.items && (
                                <ul className="mt-3 ml-4 space-y-2 border-l border-zinc-100 pl-4">
                                  {sub.items.map(nested => (
                                    <li key={nested.id}>
                                      <Link href={nested.href} className="text-[13px] text-zinc-400 hover:text-zinc-900 transition-colors capitalize">
                                        {nested.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="col-span-1 border-l border-zinc-100 pl-12">
                      <div className="aspect-[3/4] rounded-lg overflow-hidden relative group cursor-pointer">
                        <FadeImage src={weddingImg} alt="New Arrivals" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex flex-col justify-end p-6">
                          <p className="text-white text-[10px] uppercase font-bold tracking-widest mb-1">Featured</p>
                          <h5 className="text-white font-black text-xl italic leading-tight">Bridal<br/>Masterpieces</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <div className="grid grid-cols-3 gap-x-20 gap-y-8">
                       {navigation.find(n => n.id === activeNav)?.simpleItems?.map((sub) => (
                         <Link 
                            key={sub.id}
                            href={sub.href}
                            className="text-lg font-black text-zinc-900 hover:text-zinc-500 transition-colors uppercase tracking-tight flex items-center gap-4 group"
                         >
                           <span className="w-8 h-[2px] bg-zinc-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                           {sub.label}
                         </Link>
                       ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu (Overlay) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-white lg:hidden overflow-y-auto"
          >
            <div className="px-6 py-8">
              <div className="flex justify-between items-center mb-12">
                <span className="font-heading font-black text-2xl">DATTARAJ</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                  <X size={32} />
                </button>
              </div>
              <div className="space-y-8">
                {navigation.map((item) => (
                  <div key={item.id} className="space-y-4">
                    <Link 
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-3xl font-black uppercase tracking-tighter block"
                    >
                      {item.name}
                    </Link>
                    {item.hasDropdown && (
                      <div className="grid grid-cols-2 gap-4 pl-4 border-l-2 border-zinc-100">
                        {item.columns ? item.columns.flatMap(c => c.items).slice(0, 6).map(sub => (
                           <Link key={sub.id} href={sub.href} onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-zinc-500 uppercase">
                              {sub.label}
                           </Link>
                        )) : item.simpleItems?.map(sub => (
                          <Link key={sub.id} href={sub.href} onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-zinc-500 uppercase">
                             {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
