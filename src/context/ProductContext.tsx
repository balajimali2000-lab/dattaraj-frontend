'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { IProduct } from '@/models/Product';

interface ProductContextType {
  products: IProduct[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  filterOptions: {
    categories: { name: string; image: string | null }[];
    types: string[];
  };
  pagination: {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
  };
  fetchProducts: (
    page?: number, 
    limit?: number, 
    filters?: { category?: string; type?: string; search?: string },
    append?: boolean
  ) => Promise<void>;
  fetchFilterOptions: () => Promise<void>;
  getProductById: (id: string) => IProduct | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 0,
    limit: 12,
  });
  const [filterOptions, setFilterOptions] = useState<{
    categories: { name: string; image: string | null }[];
    types: string[];
  }>({ categories: [], types: [] });

  const fetchFilterOptions = async () => {
    try {
      console.log('[Context] Fetching filters...');
      const res = await axios.get('/api/products/filters');
      if (res.data.success) {
        console.log('[Context] Filters Received:', res.data.data);
        setFilterOptions(res.data.data);
      } else {
        console.error('[Context] Failed to fetch filters:', res.data.error);
      }
    } catch (err) {
      console.error('[Context] Failed to fetch filter options:', err);
    }
  };

  const fetchProducts = async (
    page: number = 1, 
    limit: number = 12, 
    filters: { category?: string; type?: string; search?: string } = {},
    append: boolean = false
  ) => {
    try {
      if (append) setLoadingMore(true);
      else setLoading(true);

      let url = `/api/products?page=${page}&limit=${limit}`;
      if (filters.category && filters.category !== 'all') url += `&category=${encodeURIComponent(filters.category)}`;
      if (filters.type && filters.type !== 'all') url += `&type=${encodeURIComponent(filters.type)}`;
      if (filters.search) url += `&search=${encodeURIComponent(filters.search)}`;
      
      const response = await axios.get(url);
      if (response.data.success) {
        if (append) {
          setProducts(prev => [...prev, ...response.data.data]);
        } else {
          setProducts(response.data.data);
        }
        setPagination(response.data.pagination);
      } else {
        setError(response.data.error || 'Failed to fetch products');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching products');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchFilterOptions();
    fetchProducts(1, 12);
  }, []);

  const getProductById = (id: string) => {
    return products.find((p) => p._id === id);
  };

  return (
    <ProductContext.Provider
      value={{ 
        products, 
        loading, 
        loadingMore,
        error, 
        filterOptions,
        pagination, 
        fetchProducts, 
        fetchFilterOptions,
        getProductById 
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
