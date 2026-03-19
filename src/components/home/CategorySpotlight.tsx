'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { IProduct } from '@/models/Product';
import { getOptimizedImage, getProductImage } from '@/lib/image-utils';
import { Button } from '@/components/ui/button';

interface CategorySpotlightProps {
  category: string;
  title: string;
  subtitle?: string;
  description?: string;
  theme?: 'cinematic' | 'serene' | 'modern' | 'bento';
  reversed?: boolean;
}

export const CategorySpotlight: React.FC<CategorySpotlightProps> = ({
  category,
  title,
  subtitle,
  description,
  theme = 'modern',
  reversed = false
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/products?category=${category}&limit=8&random=true`);
        if (res.data.success && res.data.data.length > 0) {
          setProducts(res.data.data);
        }
      } catch (error) {
        console.error(`Error fetching products for ${category}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  // Prevent Hydration Mismatch: Always render loading state on server and first client render
  if (!isHydrated || loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center bg-white border-b border-zinc-50 min-h-[400px]">
        <div className="w-10 h-10 border-2 border-zinc-100 border-t-[#430704] rounded-full animate-spin mb-4" />
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-300">Curating {title}</p>
      </div>
    );
  }

  // Fallback UI if no products found in DB for this specific category tag
  if (products.length === 0) {
    return (
      <section className="py-20 bg-zinc-50/30 border-y border-zinc-100/50">
        <div className="max-w-[1440px] mx-auto px-6 text-center">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 mb-4">{subtitle || "Curated"}</p>
           <h2 className="text-3xl font-black tracking-tighter text-zinc-200 italic mb-2 uppercase">{title}</h2>
           <p className="text-zinc-400 text-[9px] font-bold uppercase tracking-widest">Collection evolving in our atelier</p>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as any } }
  };

  // --- Utilities ---
  const onImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop';
  };
// Global premium fallback

  const renderCinematic = () => (
    <section className="py-12 md:py-16 bg-white overflow-hidden border-b border-zinc-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
          <div className="w-full md:w-1/4 space-y-6">
            <div className="space-y-3">
              <p className="text-[#430704] text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] opacity-80">{subtitle || "Signature Collection"}</p>
              <h2 className="text-xl md:text-2xl font-black tracking-tighter text-zinc-950 uppercase leading-tight">{title}</h2>
              <p className="text-zinc-500 text-[11px] font-medium leading-relaxed max-w-[240px]">
                {description || "Handcrafted silver pieces designed for the modern connoisseur."}
              </p>
            </div>
            <Link href={`/products?category=${category}`} className="inline-flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-[#430704] group hover:opacity-70 transition-opacity">
              Explore <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full md:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {products.slice(0, 4).map((product) => (
              <motion.div key={product._id} variants={itemVariants} className="group relative">
                <Link href={`/products/${product._id}`} className="block">
                  <div className="aspect-[4/5] overflow-hidden bg-zinc-50 border border-zinc-100/50">
                    <img 
                      src={getOptimizedImage(getProductImage(product.image, 'mid'), 'preview')} 
                      alt={product.name} 
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                      onError={onImageError}
                    />
                    {/* Fixed Label on Mobile, Hover on Desktop */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-[#430704]/95 backdrop-blur-sm md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500">
                      <h4 className="text-white text-[9px] font-black uppercase tracking-widest truncate">{product.name}</h4>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );

  const renderSerene = () => (
    <section className="py-12 md:py-16 bg-[#430704]/[0.02] border-b border-zinc-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12 space-y-3">
          <p className="text-[#430704] text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em]">{subtitle || "Sacred Series"}</p>
          <h2 className="text-xl md:text-2xl font-black tracking-tighter text-zinc-950 uppercase leading-tight">{title}</h2>
          <div className="w-8 h-[1px] bg-[#430704]/20" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {products.map((product) => (
            <motion.div key={product._id} variants={itemVariants} className="group text-center">
              <Link href={`/products/${product._id}`} className="block">
                <div className="aspect-[3/4] overflow-hidden bg-white border border-[#430704]/5 mb-4 p-3 shadow-sm group-hover:shadow-md transition-shadow">
                  <img 
                    src={getOptimizedImage(getProductImage(product.image, 'mid'), 'preview') || undefined} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    onError={onImageError}
                  />
                </div>
                <h4 className="text-[9px] font-black uppercase tracking-widest text-[#430704]">{product.name}</h4>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
           <Link href={`/products?category=${category}`} className="inline-block border border-[#430704] px-8 py-3 text-[9px] font-black uppercase tracking-widest text-[#430704] hover:bg-[#430704] hover:text-white transition-all">
             View All
           </Link>
        </div>
      </div>
    </section>
  );

  const renderModern = () => (
    <section className="py-12 md:py-16 bg-white border-b border-zinc-100">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-4">
          <div className="space-y-1">
             <span className="text-[#430704]/60 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em]">{subtitle || "Modern Essentials"}</span>
             <h2 className="text-xl md:text-2xl font-black tracking-tighter text-zinc-950 uppercase leading-tight">{title}</h2>
          </div>
          <Link href={`/products?category=${category}`} className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-[#430704] transition-colors self-start md:self-auto">
            See Catalog
          </Link>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 border-l border-t border-[#430704]/5"
        >
          {products.map((product) => (
            <motion.div 
              key={product._id} 
              variants={itemVariants}
              className="group relative aspect-square bg-white overflow-hidden border-r border-b border-[#430704]/5"
            >
              <Link href={`/products/${product._id}`} className="block w-full h-full">
                 <img 
                  src={getOptimizedImage(getProductImage(product.image, 'mid'), 'preview')} 
                  alt={product.name} 
                  className="w-full h-full object-cover md:opacity-80 group-hover:opacity-100 transition-opacity duration-700" 
                  onError={onImageError}
                />
                
                {/* Persistent bottom bar on mobile, full-screen overlay on desktop hover */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-white/95 backdrop-blur-md border-t border-[#430704]/5 md:inset-0 md:bg-white/95 md:p-4 md:opacity-0 md:group-hover:opacity-100 md:border-t-0 flex flex-col justify-center items-center text-center transition-all duration-500">
                   <h3 className="text-[#430704] font-black text-[8px] md:text-[9px] uppercase tracking-widest mb-2 md:mb-3 truncate w-full px-2">{product.name}</h3>
                   <span className="h-6 md:h-7 px-3 md:px-4 inline-flex items-center border border-[#430704] text-[7px] md:text-[8px] font-black uppercase tracking-widest text-[#430704] hover:bg-[#430704] hover:text-white transition-colors">Enquire</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );

  const renderBento = () => (
    <section className="py-10 bg-[#2d0503] overflow-hidden border-b border-white/5 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(67,7,4,0.1)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 space-y-2">
           <span className="text-white/40 text-[8px] md:text-[9px] font-black uppercase tracking-[0.5em]">{subtitle || "Curated Series"}</span>
           <h2 className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase leading-tight">{title}</h2>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {products.slice(0, 3).map((product) => (
            <motion.div 
              key={product._id}
              variants={itemVariants}
              className="group relative aspect-[4/5] overflow-hidden bg-[#430704]/10 border border-white/5"
            >
              <Link href={`/products/${product._id}`} className="block w-full h-full">
                <img 
                  src={getOptimizedImage(getProductImage(product.image, 'mid'), 'preview')} 
                  alt={product.name} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700" 
                  onError={onImageError}
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-black/60 backdrop-blur-md border-t border-white/5 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500 text-center">
                   <h3 className="text-white text-[9px] font-black uppercase tracking-widest">{product.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
            <Link href={`/products?category=${category}`} className="text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">
              Explore All Items
            </Link>
        </div>
      </div>
    </section>
  );

  switch (theme) {
    case 'cinematic': return renderCinematic();
    case 'serene': return renderSerene();
    case 'modern': return renderModern();
    case 'bento': return renderBento();
    default: return renderModern();
  }
};
