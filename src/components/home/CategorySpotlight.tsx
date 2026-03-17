'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { IProduct } from '@/models/Product';
import { getOptimizedImage } from '@/lib/image-utils';
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

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/products?category=${encodeURIComponent(category)}&limit=4`);
        if (response.data.success && response.data.data.length > 0) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error(`Error fetching products for ${category}:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center opacity-50">
        <div className="w-12 h-12 border-2 border-zinc-100 border-t-zinc-950 rounded-full animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Loading {title}</p>
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

  // --- UI THEMES ---

  const renderCinematic = () => (
    <section className="py-16 bg-white overflow-hidden border-b border-zinc-50">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
          <div className="w-full md:w-1/4 space-y-6">
            <div className="space-y-3">
              <p className="text-zinc-400 text-[9px] font-black uppercase tracking-[0.4em]">{subtitle || "Signature Collection"}</p>
              <h2 className="text-2xl font-black tracking-tighter text-zinc-950 uppercase leading-none">{title}</h2>
              <p className="text-zinc-500 text-[11px] font-medium leading-relaxed max-w-[240px]">
                {description || "Handcrafted silver pieces designed for the modern connoisseur."}
              </p>
            </div>
            <Link href={`/products?category=${category}`} className="inline-flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-zinc-950 group">
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
                <div className="aspect-[4/5] overflow-hidden bg-zinc-50">
                  <img 
                    src={getOptimizedImage(product.image?.mid || product.image?.thumbnail || '', 'preview')} 
                    alt={product.name} 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 border-t border-zinc-100">
                    <h4 className="text-zinc-950 text-[9px] font-black uppercase tracking-widest truncate">{product.name}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );

  const renderSerene = () => (
    <section className="py-16 bg-zinc-50/30 border-b border-zinc-50">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-12 space-y-3">
          <p className="text-zinc-400 text-[9px] font-black uppercase tracking-[0.4em]">{subtitle || "Sacred Series"}</p>
          <h2 className="text-2xl font-black tracking-tighter text-zinc-950 uppercase leading-none">{title}</h2>
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
              <div className="aspect-[3/4] overflow-hidden bg-white border border-zinc-100 mb-4 p-3">
                <img 
                  src={getOptimizedImage(product.image?.mid || product.image?.thumbnail || '', 'preview')} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <h4 className="text-[9px] font-black uppercase tracking-widest text-zinc-950">{product.name}</h4>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
           <Link href={`/products?category=${category}`} className="inline-block border border-zinc-900 px-8 py-3 text-[9px] font-black uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all">
             View All
           </Link>
        </div>
      </div>
    </section>
  );

  const renderModern = () => (
    <section className="py-16 bg-white border-b border-zinc-100">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex justify-between items-end mb-12 px-2">
          <div className="space-y-2">
             <span className="text-zinc-400 text-[9px] font-black uppercase tracking-[0.4em]">{subtitle || "Modern Essentials"}</span>
             <h2 className="text-2xl font-black tracking-tighter text-zinc-950 uppercase leading-none">{title}</h2>
          </div>
          <Link href={`/products?category=${category}`} className="text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-950 transition-colors">
            See Catalog
          </Link>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 border-l border-t border-zinc-50"
        >
          {products.map((product) => (
            <motion.div 
              key={product._id} 
              variants={itemVariants}
              className="group relative aspect-square bg-white overflow-hidden border-r border-b border-zinc-50"
            >
               <img 
                src={getOptimizedImage(product.image?.mid || product.image?.thumbnail || '', 'preview')} 
                alt={product.name} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" 
              />
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm p-4 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <h3 className="text-zinc-950 font-black text-[9px] uppercase tracking-widest mb-3">{product.name}</h3>
                 <Button variant="outline" className="h-7 px-4 rounded-none text-[8px] font-black uppercase tracking-widest border-zinc-900">Enquire</Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );

  const renderBento = () => (
    <section className="py-16 bg-zinc-950 overflow-hidden border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-12 space-y-3">
           <span className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.5em]">{subtitle || "Curated Series"}</span>
           <h2 className="text-2xl font-black tracking-tighter text-white uppercase leading-none">{title}</h2>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {products.slice(0, 3).map((product) => (
            <motion.div 
              key={product._id}
              variants={itemVariants}
              className="group relative aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/5"
            >
              <img 
                src={getOptimizedImage(product.image?.mid || product.image?.thumbnail || '', 'preview')} 
                alt={product.name} 
                className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700" 
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-zinc-950/90 border-t border-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                 <h3 className="text-white font-black text-[9px] uppercase tracking-widest">{product.name}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
            <Link href={`/products?category=${category}`} className="text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
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
