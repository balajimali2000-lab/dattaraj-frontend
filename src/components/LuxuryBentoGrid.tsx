'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Gem, PenTool } from 'lucide-react';
import Link from 'next/link';

const templeImg = "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1200&auto=format&fit=crop";
const weddingImg = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop";
const ringImg = "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop";
const detailImg = "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1200&auto=format&fit=crop";
const earringImg = "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop";
const templeVideo = 'https://res.cloudinary.com/dqmpgzst5/video/upload/v1766821132/6262756-uhd_3840_2160_25fps_lo0t43.mp4';

export const LuxuryBentoGrid = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video.play().catch(() => {});
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.2 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="py-32 bg-white overflow-hidden border-b border-zinc-50">
            <div className="max-w-[1440px] mx-auto px-6">
                {/* Editorial Header */}
                <div className="flex flex-col items-center mb-24 space-y-6 text-center">
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        className="w-16 h-[1px] bg-[#430704]/40"
                    />
                    <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#430704]/60">Spring Anthology</span>
                        <h2 className="text-4xl md:text-5xl font-black text-zinc-950 uppercase tracking-tighter leading-none">
                            The Latest <span className="italic font-light text-zinc-400">Chapters</span>
                        </h2>
                    </div>
                </div>

                {/* Main Cinematic Frame with Zero-Flicker Transition */}
                <div className="relative mb-24 group">
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="relative aspect-[16/7] md:aspect-[21/9] overflow-hidden shadow-2xl rounded-sm bg-zinc-100"
                    >
                        {/* Poster Image (Visible while video loads) */}
                        <AnimatePresence>
                            {!isVideoLoaded && (
                                <motion.img
                                    key="poster"
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.2, ease: "easeInOut" }}
                                    src={templeImg}
                                    alt="Loading Cinematic..."
                                    className="absolute inset-0 w-full h-full object-cover z-10"
                                />
                            )}
                        </AnimatePresence>

                        {/* Video Element */}
                        <video
                            ref={videoRef}
                            src={templeVideo}
                            autoPlay
                            muted
                            loop
                            playsInline
                            onCanPlayThrough={() => setIsVideoLoaded(true)}
                            className={`w-full h-full object-cover transition-opacity duration-1000 ${
                                isVideoLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                        />

                        {/* Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 z-20" />
                        
                        <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row justify-between items-end md:items-center z-30">
                            <div className="max-w-xl space-y-2">
                                <Link href="/collections/temple" className="group/link inline-flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-white/60" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/90">Curated Heritage</span>
                                </Link>
                                <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tight leading-none">
                                    Divine Silver Mastery
                                </h3>
                            </div>
                            <Link href="/products" className="hidden md:flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-white border border-white/20 px-8 py-4 hover:bg-white hover:text-[#430704] transition-all">
                                Explore Anthology <ArrowRight size={12} />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Proper Structured Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
                    {/* Column 1: The Product Context */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="aspect-[4/5] overflow-hidden shadow-lg border border-zinc-100 bg-zinc-50">
                            <img src={weddingImg} alt="Story" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="space-y-4 pr-8">
                            <span className="text-[#430704] text-[9px] font-black uppercase tracking-widest border-b border-[#430704]/20 pb-2 inline-block">Chapter 01</span>
                            <h4 className="text-xl font-black text-zinc-950 uppercase tracking-tighter italic">Bridal Elegance</h4>
                            <p className="text-[11px] text-zinc-500 font-medium leading-relaxed tracking-wide">
                                Discover timeless silver silhouettes designed for the modern bride who treasures heritage. Each piece is a testament to ancestral craftsmanship.
                            </p>
                            <Link href="/products?category=bridal" className="inline-flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-[#430704] group/btn">
                                View Selection <ArrowRight size={10} className="group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Column 2: Spotlight Piece */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8 md:-mt-12"
                    >
                        <div className="relative aspect-square overflow-hidden shadow-2xl ring-1 ring-zinc-100 p-6 bg-white flex flex-col">
                            <div className="flex-1 overflow-hidden relative">
                                <img src={ringImg} alt="Signature" className="w-full h-full object-contain hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="mt-8 text-center space-y-2">
                                <Gem className="w-5 h-5 text-[#430704]/30 mx-auto mb-4" />
                                <h4 className="text-lg font-black text-zinc-950 uppercase tracking-tight">The Celestial Band</h4>
                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Available in pure 925 Silver</p>
                            </div>
                        </div>
                        <div className="aspect-[16/9] overflow-hidden bg-zinc-950 relative group">
                            <img src={detailImg} alt="Detail" className="w-full h-full object-cover transition-opacity duration-700" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white font-black text-[9px] uppercase tracking-[0.6em] select-none">Divine Detail</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Column 3: The Artisan Perspective */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="aspect-[4/5] overflow-hidden shadow-lg border border-zinc-100 bg-zinc-50">
                            <img src={earringImg} alt="Craft" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="space-y-4 pr-8">
                             <span className="text-[#430704] text-[9px] font-black uppercase tracking-widest border-b border-[#430704]/20 pb-2 inline-block">Chapter 02</span>
                            <h4 className="text-xl font-black text-zinc-950 uppercase tracking-tighter italic">Handcrafted Aura</h4>
                            <p className="text-[11px] text-zinc-500 font-medium leading-relaxed tracking-wide">
                                Our artisans spend hundreds of hours etching every divine curve. It's not just jewelry; it's a wearable chronicle of silver smithing expertise.
                            </p>
                            <Link href="/products?category=handcrafted" className="inline-flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-[#430704] group/btn">
                                Explore Mastery <ArrowRight size={10} className="group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Aesthetic Footer */}
                <div className="mt-40 flex flex-col md:flex-row justify-between items-center py-12 border-t border-zinc-100 space-y-8 md:space-y-0 relative z-40">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4">
                            <PenTool className="w-4 h-4 text-[#430704]/20" />
                            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.4em]">Design Est. 1924</span>
                        </div>
                        <div className="w-[1px] h-8 bg-zinc-100" />
                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.4em]">Pure Silver Anthology</span>
                    </div>
                    
                    <Link href="/products" className="group flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.6em] text-[#430704] hover:opacity-50 transition-all">
                        View Full Gallery 
                        <div className="w-16 h-[1px] bg-[#430704]/40 group-hover:w-24 transition-all" />
                    </Link>
                </div>
            </div>
        </section>
    );
};
