'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, 
  List, 
  Search, 
  ChevronRight, 
  ArrowRight, 
  Sparkles,
  Loader2,
  SearchX,
  X,
  ChevronDown
} from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import { Button } from '@/components/ui/button';
import { getProductImage } from '@/lib/image-utils';

const formatLabel = (label: string) => {
  if (!label) return '';
  if (label === 'all') return 'All Masterpieces';
  return label
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const getOptimizedVariant = (product: any, cols: number) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  if (isMobile) {
    if (cols === 1) return getProductImage(product.image, 'high');
    return getProductImage(product.image, 'mid');
  }

  if (cols === 6) {
    return getProductImage(product.image, 'mid');
  }
  
  return getProductImage(product.image, 'high');
};

function ProductListContent() {
  const { 
    products, 
    loading, 
    loadingMore, 
    filterOptions, 
    pagination, 
    fetchProducts 
  } = useProducts();
  const searchParams = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [colsPerRow, setColsPerRow] = useState<number>(3);
  const [isMobile, setIsMobile] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Smooth scroll to top when filters or layout change
  useEffect(() => {
    if (sectionRef.current) {
      const offset = sectionRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  }, [selectedCategory, selectedType, searchQuery, colsPerRow]);

  // Handle URL parameters on initial load
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const typeParam = searchParams.get('type');
    
    if (categoryParam) setSelectedCategory(categoryParam);
    if (typeParam) setSelectedType(typeParam);

    const checkMobile = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(isNowMobile);
      
      setColsPerRow(prev => {
        // If switching TO mobile
        if (isNowMobile && (prev === 6 || prev === 5)) return 3;
        // If switching TO desktop
        if (!isNowMobile && prev === 1) return 2;
        return prev;
      });
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [searchParams]);

  useEffect(() => {
    const filters: any = {};
    if (selectedCategory !== 'all') filters.category = selectedCategory;
    if (selectedType) filters.type = selectedType;
    if (searchQuery) filters.search = searchQuery;
    
    // Reset to page 1 when filters change
    fetchProducts(1, 12, filters);
  }, [selectedCategory, selectedType, searchQuery]);

  const handleLoadMore = () => {
    const nextPage = pagination.page + 1;
    const filters: any = {};
    if (selectedCategory !== 'all') filters.category = selectedCategory;
    if (selectedType) filters.type = selectedType;
    if (searchQuery) filters.search = searchQuery;
    
    fetchProducts(nextPage, 12, filters, true);
  };

  return (
    <main className="min-h-screen bg-[#FDFDFD] pt-16 md:pt-20 pb-20">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Editorial Page Header */}
        <div className="py-8 md:py-12 border-b border-zinc-100 mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-4 max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-[1px] bg-[#430704]/40" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#430704]/60">
                  {selectedCategory === 'all' ? 'Anthology 2024' : formatLabel(selectedCategory)}
                </span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-black text-zinc-950 uppercase tracking-tighter leading-none"
              >
                The Masterpiece <span className="italic font-light text-zinc-400">Collection</span>
              </motion.h1>
            </div>
            
            <div className="flex items-center gap-4 text-zinc-400 text-[10px] font-black uppercase tracking-widest pb-2">
              <Sparkles className="w-3 h-3 text-[#430704]/40" />
              <span>Showing {products.length} of {pagination.total} items</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-28 lg:h-[calc(100vh-140px)] lg:overflow-y-auto lg:pr-4 lg:scrollbar-hide space-y-8 md:space-y-12 pb-8 md:pb-12">
              {/* Categories - Hidden on Mobile, using Modal instead */}
              <div className="hidden lg:block space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 border-b border-zinc-100 pb-4">Categories</h3>
                <div className="flex flex-col gap-2">
                  <button
                      onClick={() => {
                          setSelectedCategory('all');
                          setSelectedType(null);
                      }}
                      className={`group flex items-center justify-between px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                          selectedCategory === 'all' 
                          ? 'bg-[#430704] text-white shadow-lg' 
                          : 'text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50'
                      }`}
                  >
                      <span>All Masterpieces</span>
                      <ChevronRight className={`w-3 h-3 transition-transform ${selectedCategory === 'all' ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                  </button>
                  {filterOptions.categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => {
                          setSelectedCategory(cat.name);
                          setSelectedType(null);
                      }}
                      className={`group flex items-center justify-between px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                        selectedCategory === cat.name 
                          ? 'bg-[#430704] text-white shadow-lg' 
                          : 'text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50'
                      }`}
                    >
                      <span className="text-left">{formatLabel(cat.name)}</span>
                      <ChevronRight className={`w-3 h-3 transition-transform ${selectedCategory === cat.name ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Refine by Type */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 border-b border-zinc-100 pb-4">Refine by Type</h3>
                <div className="grid grid-cols-1 gap-2">
                  {filterOptions.types.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(selectedType === type ? null : type)}
                      className={`flex items-center gap-3 px-4 py-2 text-[10px] font-black uppercase tracking-widest border transition-all ${
                        selectedType === type 
                          ? 'border-[#430704] text-[#430704] bg-[#430704]/5' 
                          : 'border-zinc-100 text-zinc-400 hover:border-zinc-300 hover:text-zinc-600'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${selectedType === type ? 'bg-[#430704]' : 'bg-zinc-200'}`} />
                      <span className="text-left">{formatLabel(type)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Feed */}
          <section ref={sectionRef} className="flex-1 min-w-0">
            
            {/* Mobile Category Trigger - Sticky */}
            {isMobile && (
              <div className="sticky top-24 z-[35] mb-2">
                <button 
                  onClick={() => setIsCategoryModalOpen(true)}
                  className="w-full h-[76px] flex items-center justify-between px-6 bg-[#430704] text-white shadow-2xl active:scale-[0.98] transition-transform"
                >
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-[7px] text-white/40 font-black uppercase tracking-[0.4em]">Current Collection</span>
                    <span className="text-sm font-black uppercase tracking-tight italic">
                      {selectedCategory === 'all' ? 'All Masterpieces' : formatLabel(selectedCategory)}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <ChevronDown className="w-5 h-5 text-white" />
                  </div>
                </button>
              </div>
            )}

            {/* Toolbar */}
            <div className="sticky top-[148px] md:top-20 z-30 bg-white/60 backdrop-blur-xl border border-zinc-100/30 p-1 md:p-1.5 mb-4 md:mb-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] ring-1 ring-black/[0.01] overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center justify-between md:justify-start gap-4 px-2 w-full md:w-auto">
                  <div className="flex items-center gap-1.5 py-1">
                    <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300 mr-1.5 hidden sm:inline">Layout</span>
                    {(isMobile ? [1, 2, 3] : [2, 3, 6]).map((cols) => (
                        <button 
                            key={cols}
                            onClick={() => setColsPerRow(cols)}
                            className={`w-8 h-8 flex-shrink-0 flex items-center justify-center text-[9px] font-black tracking-tighter transition-all border ${
                                colsPerRow === cols 
                                ? 'bg-[#430704] text-white border-[#430704] shadow-md' 
                                : 'text-zinc-400 border-zinc-100 bg-white/50 hover:text-zinc-950 hover:border-zinc-300'
                            }`}
                        >
                            {cols}
                        </button>
                    ))}
                  </div>
                  
                </div>

                <div className="relative group w-full md:w-52 lg:w-56 px-2 md:px-0">
                  <div className="absolute left-5 md:left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-zinc-300 group-hover:text-[#430704] transition-colors">
                    <Search className="w-full h-full" />
                  </div>
                  <input 
                      type="text" 
                      placeholder="SEARCH..."
                      className="w-full bg-zinc-50/50 border border-zinc-200/40 pl-8 pr-4 py-2 md:py-2.5 text-[8px] font-black uppercase tracking-[0.2em] placeholder:text-zinc-200 focus:ring-1 focus:ring-[#430704]/10 focus:bg-white transition-all outline-none rounded-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="relative min-h-[600px]">
                {loading && !loadingMore && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-50 flex flex-col items-center justify-center space-y-4">
                        <Loader2 className="w-8 h-8 text-[#430704] animate-spin" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#430704]/60">Summoning Masterpieces</span>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {products.length === 0 && !loading ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-40 text-center space-y-6"
                        >
                            <SearchX className="w-12 h-12 text-zinc-100" />
                            <div className="space-y-2">
                                <h3 className="text-xl font-black text-zinc-950 uppercase tracking-tight">No Pieces Found</h3>
                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Adjust your filters</p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key={`${selectedCategory}-${selectedType}-${searchQuery}-${colsPerRow}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`grid gap-x-3 md:gap-x-4 gap-y-8 md:gap-y-10 ${
                                colsPerRow === 1 ? 'grid-cols-1' :
                                colsPerRow === 2 ? 'grid-cols-2' :
                                colsPerRow === 3 ? 'grid-cols-3' :
                                'grid-cols-2 md:grid-cols-5 lg:grid-cols-6'
                            }`}
                        >
                            {products.map((product, idx) => (
                                <motion.div 
                                    key={`${product._id}-${idx}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: (idx % 12) * 0.03 }}
                                    className={`group flex flex-col`}
                                >
                                    <Link 
                                        href={`/products/${product._id}`} 
                                        className={`relative bg-zinc-50 overflow-hidden block ${colsPerRow === 3 ? 'aspect-square' : 'aspect-[4/5]'}`}
                                    >
                                        <img 
                                            src={getOptimizedVariant(product, colsPerRow)} 
                                            alt={product.name} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-2 left-2">
                                            {product.featured && (
                                                <span className="bg-[#430704] text-white text-[6px] font-black uppercase tracking-widest px-2 py-1 shadow-lg">
                                                    Signature Selection
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                    <div className={`pt-3 md:pt-4 space-y-1 md:space-y-1.5`}>
                                        <span className={`text-[#430704] font-black uppercase tracking-[0.2em] opacity-60 ${colsPerRow === 3 ? 'text-[8px]' : 'text-[9px]'}`}>
                                            {product.category}
                                        </span>
                                        <h3 className={`font-black text-zinc-900 uppercase tracking-tighter italic leading-tight line-clamp-1 md:line-clamp-2 ${colsPerRow === 3 ? 'text-xs' : 'text-sm'}`}>
                                            {product.name}
                                        </h3>
                                        <div className="flex justify-between items-center pt-1.5 border-t border-zinc-100/50">
                                            <p className={`text-zinc-400 font-bold uppercase tracking-widest ${colsPerRow === 3 ? 'text-[9px]' : 'text-[10px]'}`}>
                                                {product.serialNumber || 'DATTA-RAJ'}
                                            </p>
                                            <div className="flex gap-1 opacity-40">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Load More Section */}
                {!loading && pagination.page < pagination.totalPages && (
                    <div className="mt-20 flex justify-center">
                        <Button 
                            onClick={handleLoadMore}
                            disabled={loadingMore}
                            className={`rounded-none bg-[#430704] text-white text-[10px] font-black uppercase tracking-[0.3em] px-16 py-6 h-auto hover:bg-[#5a0905] transition-all disabled:opacity-50`}
                        >
                            {loadingMore ? (
                                <span className="flex items-center gap-3">
                                    <Loader2 className="w-3 h-3 animate-spin" /> Unveiling...
                                </span>
                            ) : (
                                "Load More Masterpieces"
                            )}
                        </Button>
                    </div>
                )}
            </div>
          </section>
        </div>

        {/* Floating Bottom Contact CTA */}
        <div className="mt-40 bg-[#430704] p-12 md:p-20 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -mr-48 -mt-48" />
             <div className="relative z-10 space-y-8">
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.6em]">The DattaRaj Concierge</p>
                <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">Can't find a specific piece?</h2>
                <Link href="/contact" className="inline-flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.3em] text-white border border-white/20 px-12 py-5 hover:bg-white hover:text-[#430704] transition-all">
                    Request Bespoke Design <ArrowRight size={14} />
                </Link>
             </div>
        </div>

        {/* Global Category Selection Modal */}
        <AnimatePresence>
          {isCategoryModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-zinc-950/95 backdrop-blur-2xl lg:hidden flex flex-col"
            >
              <div className="px-6 h-20 flex justify-between items-center border-b border-white/10">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Select Collection</span>
                <button 
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="p-3 rounded-full bg-white/10 text-white active:scale-95 transition-transform"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-12">
                <div className="space-y-4">
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => {
                      setSelectedCategory('all');
                      setIsCategoryModalOpen(false);
                    }}
                    className={`w-full text-left py-6 border-b border-white/5 flex items-center justify-between group ${selectedCategory === 'all' ? 'text-white' : 'text-white/40'}`}
                  >
                    <span className="text-3xl font-black uppercase tracking-tighter group-active:italic transition-all">All Masterpieces</span>
                    {selectedCategory === 'all' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </motion.button>

                  {filterOptions.categories.map((cat, idx) => (
                    <motion.button
                      key={cat.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setIsCategoryModalOpen(false);
                      }}
                      className={`w-full text-left py-6 border-b border-white/5 flex items-center justify-between group ${selectedCategory === cat.name ? 'text-white' : 'text-white/40'}`}
                    >
                      <span className="text-3xl font-black uppercase tracking-tighter group-active:italic transition-all">{formatLabel(cat.name)}</span>
                      {selectedCategory === cat.name && <div className="w-2 h-2 rounded-full bg-white" />}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="p-8 border-t border-white/5 bg-zinc-900/50">
                <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] text-center">
                  Dattaraj Heritage Archives &copy; 2024
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default function ProductListPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#430704] animate-spin" />
      </div>
    }>
      <ProductListContent />
    </Suspense>
  );
}
