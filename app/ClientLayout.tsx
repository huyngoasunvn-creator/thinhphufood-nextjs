'use client';

import React from 'react';
import Header from '@/components/admin/layout/Header';
import Footer from '@/components/admin/layout/Footer';
import MobileBottomNav from '@/components/admin/layout/MobileBottomNav';
import { useAppState } from '@/hooks/useAppState';
import { AuthProvider } from '@/context/AuthContext';
import Popup from '@/components/common/Popup';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const state = useAppState() || {
    cartCount: 0,
    siteConfig: null,
  };

  return (
    <AuthProvider>
  <div className="flex flex-col min-h-screen">
    <Header cartCount={state.cartCount} />

    <main className="flex-grow pb-20 md:pb-0">
      {children}
    </main>

    <Footer config={state.siteConfig} />
    <MobileBottomNav cartCount={state.cartCount} />

    {state.popupConfig && (
      <Popup config={state.popupConfig} />
    )}
  </div>
</AuthProvider>
  );
}