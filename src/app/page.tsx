'use client';

import React from 'react';
import { useProducts } from '@/context/ProductContext';
import { motion } from 'framer-motion';
import { getOptimizedImage } from '@/lib/image-utils';
import { Pagination } from '@/components/Pagination';

export default function Home() {
  const { products, loading, error, pagination, fetchProducts } = useProducts();

  const handlePageChange = (newPage: number) => {
    fetchProducts(newPage, pagination.limit);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-white/20">
      {/* Luxury Gradient Overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a1a1a_0%,transparent_50%)] pointer-events-none" />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            Dattaraj Ornaments
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto">
            Experience the pinnacle of luxury craftsmanship. Our jewelry collections are designed for those who appreciate the finer things in life.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center p-12 bg-red-500/10 border border-red-500/20 rounded-2xl">
            <p className="text-red-400 font-medium">Error: {error}</p>
            <button 
              onClick={() => fetchProducts(1, pagination.limit)}
              className="mt-4 px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.length === 0 ? (
                <div className="col-span-full text-center py-24 border border-dashed border-zinc-800 rounded-3xl">
                  <p className="text-zinc-500 italic">No products found in the collection.</p>
                </div>
              ) : (
                products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group relative bg-zinc-900/50 border border-zinc-800/50 rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                  >
                    <div className="aspect-[4/5] bg-zinc-950 flex items-center justify-center overflow-hidden">
                      {product.image?.mid || product.image?.thumbnail ? (
                        <img 
                          src={getOptimizedImage(product.image.mid || product.image.thumbnail, 'preview')} 
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      ) : (
                        <div className="text-zinc-700 font-bold text-4xl italic">D</div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-medium tracking-tight text-white/90">{product.name}</h3>
                          <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">{product.serialNumber}</p>
                        </div>
                        <span className="text-zinc-400 font-light">₹{product.price.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-zinc-500 line-clamp-2 font-light leading-relaxed">
                        {product.description}
                      </p>
                      <div className="mt-6 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-zinc-400">
                          {product.category}
                        </span>
                        <button className="text-xs font-semibold text-white group-hover:underline underline-offset-8">
                          View Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <Pagination 
              currentPage={pagination.page} 
              totalPages={pagination.totalPages} 
              onPageChange={handlePageChange} 
            />
          </>
        )}
      </main>
    </div>
  );
}
