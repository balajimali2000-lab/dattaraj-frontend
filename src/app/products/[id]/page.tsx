'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Layers,
  Phone,
  MessageSquare,
  Loader2,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { IProduct } from '@/models/Product';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getOptimizedImage, getProductImage } from '@/lib/image-utils';

const onImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop';
};

const formatLabel = (label: string) => {
  if (!label) return '';
  return label
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// --- Sub-components ---

const ImageMagnifier = ({ src, zoomSrc, alt }: { src: string, zoomSrc: string, alt: string }) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const magnifierHeight = 300;
  const magnifierWidth = 300;
  const zoomLevel = 2.5;

  const onMouseEnter = (e: React.MouseEvent) => {
    const elem = e.currentTarget;
    const { width, height } = elem.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const elem = e.currentTarget;
    const { top, left } = elem.getBoundingClientRect();
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    setXY([x, y]);
  };

  return (
    <div className="relative w-full h-full overflow-hidden cursor-crosshair rounded-xl border border-zinc-100 bg-zinc-50">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setShowMagnifier(false)}
      />

      <AnimatePresence>
        {showMagnifier && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: "absolute",
              pointerEvents: "none",
              height: `${magnifierHeight}px`,
              width: `${magnifierWidth}px`,
              top: `${y - magnifierHeight / 2}px`,
              left: `${x - magnifierWidth / 2}px`,
              border: "2px solid #430704",
              borderRadius: "4px",
              backgroundColor: "white",
              backgroundImage: `url('${zoomSrc}')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
              backgroundPosition: `${-x * zoomLevel + magnifierWidth / 2}px ${-y * zoomLevel + magnifierHeight / 2}px`,
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              zIndex: 50
            }}
          />
        )}
      </AnimatePresence>
      
      <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-200 flex items-center gap-2 pointer-events-none">
        <Maximize2 className="w-3.5 h-3.5 text-zinc-500" />
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Hover to Explore Detail</span>
      </div>
    </div>
  );
};

const ProductCard = ({ product }: { product: IProduct }) => {
  const onImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop';
  };

  return (
    <Link href={`/products/${product._id}`} className="group block">
      <div className="aspect-[4/5] bg-zinc-50 mb-4 overflow-hidden rounded-xl border border-zinc-100">
                  <img
                    src={getOptimizedImage(getProductImage(product.image, 'mid'), 'preview') || undefined}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={onImageError}
                  />
</div>
      <div className="space-y-1">
        <span className="text-[9px] font-black text-[#430704]/60 uppercase tracking-widest">{formatLabel(product.category)}</span>
        <h4 className="text-xs font-black text-zinc-900 group-hover:text-[#430704] transition-colors">{product.name}</h4>
      </div>
    </Link>
  );
};

// --- Main Page Component ---

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [similarProducts, setSimilarProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/products/${params.id}`);
        if (res.data.success) {
          const productData = res.data.data;
          setProduct(productData);
          
          // Fetch similar products
          const similarRes = await axios.get(`/api/products?category=${productData.category}&limit=5`);
          if (similarRes.data.success) {
            setSimilarProducts(similarRes.data.data.filter((p: IProduct) => p._id !== productData._id).slice(0, 4));
          }
        }
      } catch (err: any) {
        setError(err.message || "Fragmented heritage. Product not found.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchProductDetails();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-[#430704] animate-spin" />
        <span className="text-xs font-black uppercase tracking-[0.4em] text-[#430704]/60">Revealing Masterpiece</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6 px-6 text-center">
        <div className="w-16 h-[1px] bg-zinc-200" />
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-zinc-950 uppercase tracking-tight">The piece has vanished</h2>
          <p className="text-xs text-zinc-400 font-bold uppercase tracking-[0.2em]">{error || "Product not found"}</p>
        </div>
        <Button onClick={() => router.push('/products')} variant="outline" className="rounded-none border-zinc-200 uppercase tracking-widest text-[10px] px-8">
          Return to Archives
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-[1440px] mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16 md:pb-24">
        
        {/* Navigation */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <button 
            onClick={() => router.back()}
            className="group flex items-center gap-3 text-zinc-400 hover:text-zinc-900 transition-colors self-start"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-zinc-100 flex items-center justify-center group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-300">
              <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </div>
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">Return to Archives</span>
          </button>
          
          <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest overflow-hidden">
            <span className="hidden sm:inline">Catalogue</span>
            <ChevronRight className="w-3 h-3 hidden sm:inline" />
            <span className="truncate max-w-[80px] sm:max-w-none">{formatLabel(product.category)}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#430704] truncate">{product.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left: Image with Zoom */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="aspect-[4/5] w-full max-w-4xl mx-auto">
              <ImageMagnifier 
                src={getProductImage(product.image, 'high')} 
                zoomSrc={getProductImage(product.image, 'veryHigh')} 
                alt={product.name}
              />
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-12 lg:sticky lg:top-32 h-fit">
            
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[#430704]/40" />
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[#430704]/60">
                    {formatLabel(product.category)}
                  </span>
                </div>
                <h1 className="text-2xl md:text-5xl font-black text-zinc-950 uppercase tracking-tighter leading-[1.1]">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                  <span className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-sm">Ref: {product.serialNumber}</span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#B8860B]" />
                    {formatLabel(product.type)}
                  </span>
                </div>
              </div>

              <div className="p-4 md:p-6 bg-zinc-50 border border-zinc-100 rounded-2xl">
                <p className="text-xs md:text-sm text-zinc-600 leading-relaxed font-medium">
                  {product.description || "A masterfully crafted signature creation from Dattaraj, embodying decades of heritage and precision."}
                </p>
              </div>
            </div>

            {/* Quality Seals */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 border border-zinc-100 rounded-xl hover:border-[#430704]/20 transition-colors">
                <ShieldCheck className="w-5 h-5 text-[#430704]" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-900">Certified</span>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">Authenticity</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 border border-zinc-100 rounded-xl hover:border-[#430704]/20 transition-colors">
                <Award className="w-5 h-5 text-[#430704]" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-900">Heritage</span>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">Craftsmanship</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-4 pt-4">
              <div className="flex gap-4">
                <Button className="flex-1 h-14 bg-[#430704] hover:bg-[#2d0503] text-white rounded-none uppercase tracking-[0.2em] text-[10px] font-black shadow-xl">
                  Enquire via WhatsApp
                </Button>
                <button className="w-14 h-14 border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors">
                  <MessageSquare className="w-5 h-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-[9px] text-center text-zinc-400 font-bold uppercase tracking-widest">
                Our consultants are ready to assist with bespoke requests.
              </p>
            </div>

            <div className="pt-8 border-t border-zinc-100">
                <div className="flex items-center gap-4 text-zinc-400 group cursor-pointer hover:text-zinc-900 transition-colors">
                    <Phone className="w-4 h-4" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest">Elite Concierge</span>
                        <span className="text-[9px] font-bold">+91 9152 70 4102</span>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <section className="mt-32 pt-24 border-t border-zinc-100">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[#430704]/40" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#430704]/60">Complete the Look</span>
                </div>
                <h2 className="text-3xl font-black text-zinc-950 uppercase tracking-tighter">
                  Similar <span className="italic font-light text-zinc-400">Creations</span>
                </h2>
              </div>
              <Link href={`/products?category=${product.category}`} className="group flex items-center gap-3 text-zinc-900">
                <span className="text-[10px] font-black uppercase tracking-widest border-b border-zinc-900 pb-1">Explore all from {formatLabel(product.category)}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {similarProducts.map((p, idx) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
