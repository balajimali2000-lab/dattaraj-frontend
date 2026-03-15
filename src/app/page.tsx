'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Heart, 
  ChevronDown, 
  Gem, 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useProducts } from '@/context/ProductContext';
import { getOptimizedImage } from '@/lib/image-utils';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LuxuryBentoGrid } from '@/components/LuxuryBentoGrid';
import SoftBubbleBackground from '@/components/animations/SoftBubbleBackground';
import { Pagination } from '@/components/Pagination';

// Local assets for exact UI replication
import silverImg from '@/assets/images/johny-silver-Y6I9H4N-c2Q-unsplash.jpg';
import traditionalImg from '@/assets/images/bhawana-priyadarshini-YXLDZaa1an8-unsplash.jpg';
import modernImg from '@/assets/images/sina-salehian-R7dr736gS4I-unsplash.jpg';
import templeImg from '@/assets/images/prahant-designing-studio-GuN1LsSoYd4-unsplash.jpg';
import weddingImg from '@/assets/images/prahant-designing-studio-pVGX1UIhSvE-unsplash.jpg';
import ringImg from '@/assets/images/engagement-ring-beside-frame.jpg';

const collections = [
  { id: 1, name: "Sterling Silver", description: "Pure 925 silver tailored for elegance", image: silverImg.src, link: "/silver-jewellery" },
  { id: 2, name: "Traditional", description: "Heritage designs with timeless appeal", image: traditionalImg.src, link: "/traditional" },
  { id: 3, name: "Oxidized Finish", description: "Contemporary rustic silver charm", image: modernImg.src, link: "/collections/oxidized" },
  { id: 4, name: "Temple Jewellery", description: "Divine craftsmanship for special occasions", image: templeImg.src, link: "/traditional/temple" }
];

export default function Home() {
  const { products, loading, error, pagination, fetchProducts } = useProducts();

  const handlePageChange = (newPage: number) => {
    fetchProducts(newPage, pagination.limit);
    window.scrollTo({ top: document.getElementById('product-grid')?.offsetTop || 0, behavior: 'smooth' });
  };

  return (
    <main className="bg-[#FDFDFD] text-zinc-900 transition-colors duration-500">
      {/* Hero Section - Collage Style */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FDFDFD]">
        {/* Soft Bubble Background */}
        <SoftBubbleBackground />

        {/* Subtle radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.02)_100%)] pointer-events-none" />

        {/* Central Content Wrapper */}
        <div className="relative w-full h-full flex items-center justify-center">

          {/* Collage Images - Scattered Around (10 images) */}

          {/* Top Left Cluster */}
          <motion.div
            initial={{ opacity: 0, x: -100, y: -50, rotate: -20 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: -12 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="absolute top-[12%] left-[8%] md:left-[18%] w-28 md:w-36 aspect-[3/4] rounded-lg shadow-lg overflow-hidden z-10 hover:z-30 hover:scale-110 transition-all duration-500 border-2 border-white/50"
          >
            <img src={ringImg.src} alt="Ring" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -80, y: 50, rotate: -5 }}
            whileInView={{ opacity: 0.8, x: 0, y: 0, rotate: -15 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="absolute top-[30%] left-[2%] md:left-[10%] w-24 md:w-32 aspect-square rounded-lg shadow-md overflow-hidden z-0 hover:z-30 hover:scale-110 transition-all duration-500 grayscale hover:grayscale-0 border-2 border-white/50"
          >
            <img src={silverImg.src} alt="Silver" className="w-full h-full object-cover" />
          </motion.div>


          {/* Top Right Cluster */}
          <motion.div
            initial={{ opacity: 0, x: 100, y: -50, rotate: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 15 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute top-[18%] right-[5%] md:right-[15%] w-32 md:w-44 aspect-[3/4] rounded-lg shadow-xl overflow-hidden z-10 hover:z-30 hover:scale-110 transition-all duration-500 border-2 border-white/50"
          >
            <img src={silverImg.src} alt="Necklace" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80, y: 20, rotate: 10 }}
            whileInView={{ opacity: 0.7, x: 0, y: 0, rotate: 6 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="absolute top-[10%] right-[15%] md:right-[24%] w-28 md:w-40 aspect-[3/2] rounded-lg shadow-lg overflow-hidden z-0 hover:z-30 hover:scale-110 transition-all duration-500 border-2 border-white/50"
          >
            <img src={traditionalImg.src} alt="Traditional" className="w-full h-full object-cover" />
          </motion.div>


          {/* Bottom Left Cluster */}
          <motion.div
            initial={{ opacity: 0, y: 100, rotate: 10 }}
            whileInView={{ opacity: 1, y: 0, rotate: 6 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="absolute bottom-[15%] left-[10%] md:left-[22%] w-32 md:w-44 aspect-[4/5] rounded-lg shadow-lg overflow-hidden z-10 hover:z-30 hover:scale-110 transition-all duration-500 border-2 border-white/50"
          >
            <img src={templeImg.src} alt="Temple" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50, y: 80, rotate: -20 }}
            whileInView={{ opacity: 0.6, x: 0, y: 0, rotate: -8 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute bottom-[8%] left-[20%] md:left-[30%] w-24 md:w-32 aspect-video rounded-lg shadow-sm overflow-hidden z-0 hover:z-30 hover:scale-110 transition-all duration-500 grayscale hover:grayscale-0 border-2 border-white/50"
          >
            <img src={weddingImg.src} alt="Wedding" className="w-full h-full object-cover" />
          </motion.div>


          {/* Bottom Right Cluster */}
          <motion.div
            initial={{ opacity: 0, y: 100, rotate: -10 }}
            whileInView={{ opacity: 1, y: 0, rotate: -8 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="absolute bottom-[20%] right-[10%] md:right-[22%] w-28 md:w-40 aspect-square rounded-lg shadow-2xl overflow-hidden z-10 hover:z-30 hover:scale-110 transition-all duration-500 border-2 border-white/50"
          >
            <img src={modernImg.src} alt="Modern" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100, y: 100, rotate: 5 }}
            whileInView={{ opacity: 0.8, x: 0, y: 0, rotate: 12 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="absolute bottom-[10%] right-[5%] md:right-[15%] w-24 md:w-32 aspect-[3/4] rounded-lg shadow-md overflow-hidden z-0 hover:z-30 hover:scale-110 transition-all duration-500 border-2 border-white/50"
          >
            <img src={ringImg.src} alt="Detail" className="w-full h-full object-cover" />
          </motion.div>

          {/* Center Back Decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-2xl aspect-square rounded-full bg-gradient-to-r from-zinc-200 to-zinc-100 blur-[100px] -z-0"
          />


          {/* Central Logo - The Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-20 flex flex-col items-center justify-center text-center p-12 md:p-20"
          >
            <img
              src="/mainLogo.png"
              alt="DattaRaj Logo"
              className="w-64 md:w-96 h-auto object-contain drop-shadow-2xl"
            />
            
            <div className="mt-8 space-y-4 flex flex-col items-center">
              <p className="text-sm md:text-lg tracking-[0.4em] font-medium uppercase gold font-heading">
                Since 1980
              </p>

              {/* Animated Scroll Down Indicator */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-12 cursor-pointer"
                onClick={() => document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-2 text-zinc-300 hover:text-zinc-600 transition-colors"
                >
                  <span className="text-[10px] uppercase tracking-widest font-medium">Scroll to Explore</span>
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Luxury Bento Grid Section */}
      <LuxuryBentoGrid />

      {/* Dynamic Product Grid */}
      <section id="product-grid" className="py-24 bg-white border-y border-zinc-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-zinc-50 rounded-full border border-zinc-200">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Live Inventory</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900">Full Collection</h2>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-[4/5] rounded-3xl bg-zinc-50 animate-pulse border border-zinc-100" />
              ))}
            </div>
          ) : error ? (
            <div className="p-20 text-center bg-zinc-50 rounded-3xl border border-zinc-100">
              <p className="text-red-400 text-lg mb-4">{error}</p>
              <Button onClick={() => fetchProducts()} variant="outline">Try Again</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-zinc-50 border border-zinc-100 shadow-sm transition-all group-hover:shadow-xl group-hover:border-zinc-200">
                      {product.image?.mid || product.image?.thumbnail ? (
                        <img
                          src={getOptimizedImage(product.image?.mid || product.image?.thumbnail || '', 'preview')}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-6xl font-black text-zinc-200">D</div>
                      )}
                      
                      <div className="absolute top-4 right-4 z-10">
                        <Button size="icon" variant="secondary" className="rounded-full bg-white/60 backdrop-blur-md border border-zinc-100 hover:bg-white text-zinc-900">
                          <Heart size={18} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-6 px-2">
                       <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">SN: {product.serialNumber}</span>
                            <h3 className="text-zinc-900 font-bold group-hover:text-zinc-600 transition-colors uppercase tracking-wider">{product.name}</h3>
                          </div>
                          <span className="text-zinc-900 font-black text-lg">₹{product.price.toLocaleString()}</span>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="mt-20">
                  <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Crafted Collections Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 mb-4 italic">Crafted Collections</h2>
            <p className="text-zinc-500 max-w-xl mx-auto">Each collection tells a unique story of heritage and handcrafted excellence.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection, idx) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer bg-zinc-50 border border-zinc-100 shadow-sm hover:shadow-xl transition-all"
              >
                <img src={collection.image} alt={collection.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent p-8 flex flex-col justify-end">
                   <h3 className="text-2xl font-bold text-zinc-900 mb-2">{collection.name}</h3>
                   <div className="flex items-center text-zinc-900 text-xs font-bold gap-2">Explore <ArrowRight size={14} /></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden bg-zinc-50 border-t border-zinc-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.01)_0%,rgba(255,255,255,0)_100%)]" />
        <div className="relative container mx-auto px-6 text-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 1 }}
             viewport={{ once: true }}
             className="max-w-4xl mx-auto"
           >
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-zinc-900 mb-10 leading-none">Begin Your Silver Journey</h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                 <Button className="bg-zinc-900 text-white hover:bg-zinc-800 h-16 px-10 rounded-full text-lg font-bold">
                    Visit Showroom
                 </Button>
                 <Button variant="outline" className="border-zinc-200 text-zinc-900 hover:bg-zinc-50 h-16 px-10 rounded-full text-lg font-bold">
                    Our Story
                 </Button>
              </div>
           </motion.div>
        </div>
      </section>
    </main>
  );
}
