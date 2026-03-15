'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Gem, Crown, TrendingUp } from 'lucide-react';

const silverImg = "https://images.unsplash.com/photo-1515562141207-7a88fb0ce33e?q=80&w=800&auto=format&fit=crop";
const traditionalImg = "https://images.unsplash.com/photo-1626248801379-31713d71708d?q=80&w=800&auto=format&fit=crop";
const modernImg = "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop";
const templeImg = "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=800&auto=format&fit=crop";
const weddingImg = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop";
const ringImg = "https://images.unsplash.com/photo-1544450297-6b04a926f749?q=80&w=800&auto=format&fit=crop";
const templeVideo = 'https://res.cloudinary.com/dqmpgzst5/video/upload/v1766821132/6262756-uhd_3840_2160_25fps_lo0t43.mp4';

export const LuxuryBentoGrid = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

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
            { threshold: 0.3 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-[1px] w-12 bg-zinc-200" />
                        <span className="text-[10px] tracking-[0.5em] uppercase text-zinc-400 font-bold">Curated Excellence</span>
                        <div className="h-[1px] w-12 bg-zinc-200" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900">
                        Latest <span className="italic font-light text-zinc-500">Arrivals</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
                    {/* Hero Video Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="col-span-12 md:col-span-8 row-span-2 group relative overflow-hidden rounded-3xl aspect-[16/10] md:h-[500px] border border-zinc-100 shadow-sm"
                    >
                        <video
                            ref={videoRef}
                            src={templeVideo}
                            poster={templeImg}
                            loop muted playsInline
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute inset-0 p-10 flex flex-col justify-end">
                            <Badge className="w-fit mb-4 bg-white text-black hover:bg-zinc-100">New Collection</Badge>
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-none">Temple<br/>Heritage</h3>
                            <p className="text-zinc-200 text-sm md:text-base max-w-md mb-8">Timeless designs inspired by sacred architecture</p>
                            <Button className="w-fit bg-white text-black hover:bg-zinc-100 rounded-full px-8">
                                Discover Collection
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </motion.div>

                    {/* Offer Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="col-span-12 md:col-span-4 group relative overflow-hidden rounded-3xl aspect-square md:h-[240px] border border-zinc-100 shadow-sm"
                    >
                        <img src={weddingImg} alt="Sale" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-white/20 group-hover:bg-white/10 transition-colors" />
                        <div className="absolute inset-0 p-8 flex flex-col justify-between">
                            <Badge className="w-fit bg-red-600 text-white border-0">Limited Time</Badge>
                            <div>
                                <div className="text-5xl font-bold text-zinc-900 mb-1">30%</div>
                                <p className="text-zinc-600 text-sm font-bold uppercase tracking-wider">Festive Collection</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Custom Design Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="col-span-12 md:col-span-4 group relative overflow-hidden rounded-3xl aspect-square md:h-[240px] border border-zinc-100 shadow-sm"
                    >
                        <img src={ringImg} alt="Custom" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-zinc-900/40 group-hover:bg-zinc-900/30 transition-colors" />
                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <Gem className="w-8 h-8 text-white mb-4" />
                            <h4 className="text-2xl font-bold text-white mb-1">Bespoke Jewelry</h4>
                            <p className="text-white/80 text-sm">Create your masterpiece</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
