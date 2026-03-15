'use client';

import React, { ReactNode } from 'react';
import { ProductProvider } from '@/context/ProductContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ProductProvider>
      {/* Add other providers here (e.g., Theme, Auth, Cart) */}
      {children}
    </ProductProvider>
  );
}
