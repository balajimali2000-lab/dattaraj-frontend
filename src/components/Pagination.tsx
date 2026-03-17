'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center space-x-6">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="group flex items-center gap-2 p-4 rounded-none text-zinc-400 hover:text-zinc-900 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden sm:inline">Prev</span>
      </button>

      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "w-12 h-12 rounded-none text-[13px] font-black transition-all border",
              currentPage === page
                ? "bg-zinc-900 text-white border-zinc-900 shadow-xl"
                : "text-zinc-400 border-transparent hover:border-zinc-100 hover:text-zinc-900"
            )}
          >
            {page.toString().padStart(2, '0')}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="group flex items-center gap-2 p-4 rounded-none text-zinc-400 hover:text-zinc-900 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden sm:inline">Next</span>
        <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
      </button>
    </nav>
  );
};
