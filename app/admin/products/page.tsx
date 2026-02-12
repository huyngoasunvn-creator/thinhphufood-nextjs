
'use client';

import React from 'react';
import AdminProducts from '../../../pages/admin/Products';
import { useAppState } from '../../../hooks/useAppState';

export default function AdminProductsPage() {
  const { products, categories, saveProducts } = useAppState();

  return (
    <AdminProducts 
      products={products} 
      categories={categories} 
      onAdd={p => saveProducts([p, ...products])} 
      onUpdate={p => saveProducts(products.map(x => x.id === p.id ? p : x))} 
      onDelete={id => saveProducts(products.filter(p => p.id !== id))} 
    />
  );
}
