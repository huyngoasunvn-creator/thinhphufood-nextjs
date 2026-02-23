
'use client';

import React from 'react';
import Products from '@/components/admin/products/Products';
import { useAppState } from '@/hooks/useAppState';
export const dynamic = "force-dynamic";

export default function AdminProductsPage() {
  const { products, categories, saveProducts } = useAppState();

  return (
  <Products 
    products={products} 
    categories={categories} 
    onAdd={p => saveProducts([p, ...products])} 
    onUpdate={p => saveProducts(products.map(x => x.id === p.id ? p : x))} 
    onDelete={id => saveProducts(products.filter(p => p.id !== id))} 
  />
);

}
