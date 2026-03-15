'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, ShoppingBag, Heart, MessageCircle, ChevronRight, Menu, X, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

// Mock images or use default placeholders for now
const silverImg = "https://images.unsplash.com/photo-1515562141207-7a88fb0ce33e?q=80&w=800&auto=format&fit=crop";
const traditionalImg = "https://images.unsplash.com/photo-1626248801379-31713d71708d?q=80&w=800&auto=format&fit=crop";
const modernImg = "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop";
const templeImg = "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800&auto=format&fit=crop";
const weddingImg = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop";
const ringImg = "https://images.unsplash.com/photo-1544450297-6b04a926f749?q=80&w=800&auto=format&fit=crop";

const video1 = 'https://res.cloudinary.com/dqmpgzst5/video/upload/v1766821132/6262756-uhd_3840_2160_25fps_lo0t43.mp4';
const video2 = 'https://res.cloudinary.com/dqmpgzst5/video/upload/v1766821132/6262756-uhd_3840_2160_25fps_lo0t43.mp4';
const video3 = 'https://res.cloudinary.com/dqmpgzst5/video/upload/v1766821132/6262756-uhd_3840_2160_25fps_lo0t43.mp4';

interface SubCategory {
  id: string;
  label: string;
  href: string;
  media: {
    image: string;
  };
}

interface NavItem {
  id: string;
  name: string;
  href: string;
  isAction?: boolean;
  hasDropdown?: boolean;
  dropdownItems?: SubCategory[];
  mainImage?: string;
  videoSrc?: string;
  layout?: 'standard' | 'showcase';
}

const FadeImage = React.memo(({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden w-full h-full bg-zinc-800/30", className)}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-zinc-800/10 backdrop-blur-sm">
          <Loader2 className="w-6 h-6 animate-spin text-white/40" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-all duration-700 ease-in-out",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        )}
      />
    </div>
  );
});

const CategoryVideo = React.memo(({ src, poster }: { src: string; poster: string }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsVideoLoaded(false);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [src]);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden rounded-md">
      <FadeImage src={poster} alt="Video Poster" className="absolute inset-0 z-10" />
      <video
        ref={videoRef}
        className={cn(
          "absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000",
          isVideoLoaded ? "opacity-100" : "opacity-0"
        )}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        onCanPlay={() => setIsVideoLoaded(true)}
      />
      <div className="absolute inset-0 bg-black/10 z-20" />
    </div>
  );
});

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'root' | 'submenu'>('root');
  const [activeMobileCategory, setActiveMobileCategory] = useState<NavItem | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation: NavItem[] = useMemo(() => [
    { id: "whatsapp", name: "Whatsapp", href: "https://wa.me/919325614230", isAction: true, hasDropdown: false },
    {
      id: "silver",
      name: "Silver Jewellery",
      href: "/silver-jewellery",
      hasDropdown: true,
      layout: 'standard',
      mainImage: silverImg,
      videoSrc: video1,
      dropdownItems: [
        { id: "necklaces", label: "Necklaces", href: "/silver/necklaces", media: { image: silverImg } },
        { id: "earrings", label: "Earrings", href: "/silver/earrings", media: { image: modernImg } },
        { id: "rings", label: "Rings", href: "/silver/rings", media: { image: ringImg } },
        { id: "bracelets", label: "Bracelets", href: "/silver/bracelets", media: { image: weddingImg } },
        { id: "anklets", label: "Anklets", href: "/silver/anklets", media: { image: traditionalImg } },
      ]
    },
    {
      id: "traditional",
      name: "Traditional",
      href: "/traditional",
      hasDropdown: true,
      layout: 'standard',
      mainImage: traditionalImg,
      videoSrc: video2,
      dropdownItems: [
        { id: "temple", label: "Temple", href: "/traditional/temple", media: { image: templeImg } },
        { id: "antique", label: "Antique", href: "/traditional/antique", media: { image: traditionalImg } },
        { id: "bridal", label: "Bridal", href: "/traditional/bridal", media: { image: weddingImg } },
      ]
    },
    {
      id: "ornaments",
      name: "Ornaments",
      href: "/ornaments",
      hasDropdown: true,
      layout: 'standard',
      mainImage: templeImg,
      videoSrc: video2,
      dropdownItems: [
        { id: "pooja", label: "Pooja Items", href: "/ornaments/pooja", media: { image: traditionalImg } },
        { id: "gifts", label: "Silver Gifts", href: "/ornaments/gifts", media: { image: silverImg } },
      ]
    },
    {
      id: "collections",
      name: "Collections",
      href: "/collections",
      hasDropdown: true,
      layout: 'showcase',
      mainImage: weddingImg,
      videoSrc: video3,
      dropdownItems: [
        { id: "wedding", label: "Wedding Collection", href: "/collections/wedding", media: { image: weddingImg } },
        { id: "festive", label: "Festive Special", href: "/collections/festive", media: { image: traditionalImg } },
        { id: "office", label: "Office Wear", href: "/collections/office", media: { image: modernImg } },
      ]
    },
    { id: "custom", name: "Custom", href: "/custom", hasDropdown: false, mainImage: ringImg }
  ], []);

  const handleMouseEnter = (navId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveNav(navId);
    const navItem = navigation.find(n => n.id === navId);
    if (navItem?.dropdownItems && navItem.dropdownItems.length > 0) {
      setActiveSubCategory(navItem?.dropdownItems[0]);
    } else {
      setActiveSubCategory(null);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveNav(null);
      setActiveSubCategory(null);
    }, 150);
  };

  const activeNavItem = navigation.find(n => n.id === activeNav);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-black/80 backdrop-blur-md shadow-sm border-b border-zinc-800'
            : 'bg-transparent border-b border-transparent'
        )}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full px-4 lg:px-8">
          <nav className="flex items-center justify-between h-20">
            <div className="hidden lg:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {navigation.filter(n => !n.isAction).map((item) => (
                <div
                  key={item.id}
                  className="relative h-full flex items-center py-2"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "relative text-[13px] font-medium transition-colors duration-300 px-1 py-1 uppercase tracking-widest",
                      activeNav === item.id || pathname === item.href
                        ? "text-white"
                        : "text-zinc-400 hover:text-white"
                    )}
                  >
                    {item.name}
                    <span className={cn(
                      "absolute bottom-0 left-0 w-full h-[1.5px] bg-white transform scale-x-0 transition-transform duration-300 origin-left",
                      activeNav === item.id ? "scale-x-100" : ""
                    )} />
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex items-center">
               <Link href="/" className="font-heading font-bold text-2xl tracking-tighter text-white">
                  Dattaraj
               </Link>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full text-zinc-400 hover:text-black">
                <Heart size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full text-zinc-400 hover:text-white hover:bg-white/10">
                <ShoppingBag size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full text-white"
                onClick={() => setIsMobileOpen(true)}
              >
                <Menu size={20} />
              </Button>
            </div>
          </nav>
        </div>

        <AnimatePresence>
          {activeNav && activeNavItem?.hasDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="hidden lg:block absolute top-full left-0 w-full bg-white border-t border-zinc-100 shadow-2xl overflow-hidden"
              onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
              onMouseLeave={handleMouseLeave}
            >
              <div className="max-w-7xl mx-auto px-8 py-10">
                {activeNavItem.layout === 'standard' ? (
                  <div className="grid grid-cols-12 gap-10">
                    <div className="col-span-3 space-y-2">
                       {activeNavItem.dropdownItems?.map((item) => (
                         <Link
                           key={item.id}
                           href={item.href}
                           onMouseEnter={() => setActiveSubCategory(item)}
                           className={cn(
                             "flex items-center justify-between px-4 py-3 rounded-lg transition-all",
                             activeSubCategory?.id === item.id ? "bg-zinc-100 text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-900"
                           )}
                         >
                           <span className="text-sm font-medium">{item.label}</span>
                           <ChevronRight size={16} />
                         </Link>
                       ))}
                    </div>
                    <div className="col-span-6 relative aspect-video rounded-xl overflow-hidden shadow-xl border border-zinc-100">
                       <FadeImage 
                          src={activeSubCategory?.media.image || activeNavItem.mainImage || silverImg} 
                          alt="Category" 
                        />
                       <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent flex flex-col justify-end p-8">
                          <h4 className="text-2xl font-bold text-zinc-900 mb-2">{activeSubCategory?.label || activeNavItem.name}</h4>
                          <p className="text-zinc-500 text-sm max-w-sm font-medium">Handcrafted excellence defined by purity and tradition.</p>
                       </div>
                    </div>
                    <div className="col-span-3 relative aspect-video rounded-xl overflow-hidden shadow-xl border border-zinc-100">
                       <CategoryVideo 
                          src={activeNavItem.videoSrc || video1} 
                          poster={activeNavItem.mainImage || silverImg} 
                        />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-6">
                    {activeNavItem.dropdownItems?.map((collection) => (
                      <Link
                        key={collection.id}
                        href={collection.href}
                        className="group relative aspect-[16/10] rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100"
                      >
                        <FadeImage src={collection.media.image} alt={collection.label} />
                        <div className="absolute inset-0 bg-white/40 group-hover:bg-white/20 transition-all flex items-center justify-center">
                           <span className="text-zinc-900 text-xl font-black uppercase tracking-tighter border-b-2 border-transparent group-hover:border-zinc-900 transition-all">{collection.label}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 z-[100] bg-white flex flex-col p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-10">
                <span className="text-xl font-black text-zinc-900 tracking-tighter uppercase">Menu</span>
                <Button variant="ghost" size="icon" className="text-zinc-900" onClick={() => setIsMobileOpen(false)}>
                  <X />
                </Button>
            </div>
            <div className="space-y-8">
                {navigation.filter(n => !n.isAction).map((item) => (
                  <div key={item.id} className="space-y-6">
                     <Link 
                      href={item.href} 
                      className="text-4xl font-black text-zinc-900 block hover:text-zinc-500 transition-colors uppercase tracking-tight"
                      onClick={() => setIsMobileOpen(false)}
                     >
                       {item.name}
                     </Link>
                     {item.dropdownItems && (
                       <div className="grid grid-cols-1 gap-4 pl-4 border-l border-zinc-100">
                          {item.dropdownItems.map(sub => (
                            <Link 
                             key={sub.id} 
                             href={sub.href} 
                             className="text-zinc-500 block text-lg font-bold hover:text-zinc-900 transition-colors"
                             onClick={() => setIsMobileOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          ))}
                       </div>
                     )}
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
