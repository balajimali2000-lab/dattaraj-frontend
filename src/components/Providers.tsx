'use client';

import React, { ReactNode } from 'react';
import { ProductProvider } from '@/context/ProductContext';
import { ThemeProvider } from '@/context/ThemeContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ProductProvider>
        {/* Add other providers here (e.g., Auth, Cart) */}
        {children}
      </ProductProvider>
    </ThemeProvider>
  );
}
