
'use client';

import React from 'react';
import Products from '../../components/Products';
import { useAppState } from '../../hooks/useAppState';

export default function ProductsPage() {
  const { products, categories, addToCart } = useAppState();

  return (
    <Products 
      products={products} 
      categories={categories} 
      onAddToCart={addToCart} 
    />
  );
}
