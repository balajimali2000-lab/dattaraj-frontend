'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { IProduct } from '@/models/Product';

interface ProductContextType {
  products: IProduct[];
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
  };
  fetchProducts: (page?: number, limit?: number) => Promise<void>;
  getProductById: (id: string) => IProduct | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 0,
    limit: 10,
  });

  const fetchProducts = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products?page=${page}&limit=${limit}`);
      if (response.data.success) {
        setProducts(response.data.data);
        setPagination(response.data.pagination);
      } else {
        setError(response.data.error || 'Failed to fetch products');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getProductById = (id: string) => {
    return products.find((p) => p._id === id);
  };

  return (
    <ProductContext.Provider
      value={{ products, loading, error, pagination, fetchProducts, getProductById }}
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
