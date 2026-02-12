'use client';
import React from 'react';
import Home from '../pages/Home';
import { useAppState } from '../hooks/useAppState';

export default function Page() {
  const state = useAppState();

  return (
    <Home 
      products={state.products} 
      banners={state.banners} 
      news={state.news} 
      commitments={state.commitments} 
      aboutConfig={state.aboutConfig} 
      onAddToCart={state.addToCart} 
    />
  );
}
