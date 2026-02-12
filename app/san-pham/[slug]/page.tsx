'use client';

import React from 'react';
import ProductDetail from '../../../pages/ProductDetail';
import { useAppState } from '../../../hooks/useAppState';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { products, siteConfig, addToCart } = useAppState();

  return (
    <ProductDetail 
      products={products} 
      siteConfig={siteConfig} 
      onAddToCart={addToCart}
             
    />
  );
}
