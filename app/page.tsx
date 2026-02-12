
'use client';
import React from 'react';
import Home from '../pages/Home';
import { useAppState } from '../hooks/useAppState';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';

export default function Page() {
  const state = useAppState();

  return (
    <>
      <Header cartCount={state.cartCount} />
      <Home 
        products={state.products} 
        banners={state.banners} 
        news={state.news} 
        commitments={state.commitments} 
        aboutConfig={state.aboutConfig} 
        onAddToCart={state.addToCart} 
      />
      <Footer config={state.siteConfig} />
      <MobileBottomNav cartCount={state.cartCount} />
    </>
  );
}
