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
import { CategorySpotlight } from '@/components/home/CategorySpotlight';

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

      {/* Boutique Category Spotlights */}
      <div id="product-grid" className="relative bg-white pt-16">
        {/* Dark Cinematic Section */}
        <CategorySpotlight 
          category="Selam_payal" 
          title="Signature Payal" 
          subtitle="The Art of Adornment"
          description="Exquisite Salem silver payal handcrafted by master artisans to celebrate every milestone of your journey."
          theme="cinematic"
        />

        {/* Light Serene Section */}
        <CategorySpotlight 
          category="Diva" 
          title="Sacred Silver" 
          subtitle="Divine Essentials"
          description="Elevate your spiritual practices with our serene collection of handcrafted silver Diva and pooja essentials."
          theme="serene"
          reversed={true}
        />

        {/* Dark Bento Section */}
        <CategorySpotlight 
          category="Special_murti" 
          title="Masterpiece Idols" 
          subtitle="Divine Presence"
          description="Intricately detailed special silver idols that bring a sense of peace and divinity to your home sanctuary."
          theme="bento"
        />

        {/* Light Modern Section */}
        <CategorySpotlight 
          category="Kolkata_dabi" 
          title="Heritage Pieces" 
          subtitle="Ancestral Craft"
          description="Timeless Kolkata Dabi and traditional silver items that carry the weight of history and craftsmanship."
          theme="modern"
          reversed={true}
        />
      </div>

      {/* Boutique Features Banner */}
      <section className="py-24 bg-white border-y border-zinc-100 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Bespoke Design", desc: "Custom silver commissions since 1980" },
              { title: "Worldwide Shipping", desc: "Secure global delivery for every piece" },
              { title: "Legacy Guarantee", desc: "Lifetime authenticity on all silver items" }
            ].map((feature, i) => (
              <div key={i} className="space-y-4 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 italic">Feature 0{i+1}</p>
                <h4 className="text-2xl font-black tracking-tighter text-zinc-900 italic uppercase">{feature.title}</h4>
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">{feature.desc}</p>
              </div>
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
