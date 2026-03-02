'use client';

import React from 'react';
import Header from '@/components/admin/layout/Header';
import Footer from '@/components/admin/layout/Footer';
import MobileBottomNav from '@/components/admin/layout/MobileBottomNav';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import Popup from '@/components/common/Popup';
import { useAppState } from '@/hooks/useAppState';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const state = useAppState(); // chỉ dùng popup & config

  return (
    <CartProvider>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          
          <Header />

          <main className="flex-grow pb-20 md:pb-0">
            {children}
          </main>

          <Footer config={state?.siteConfig} />

          <MobileBottomNav />

          {state?.popupConfig && (
            <Popup config={state.popupConfig} />
          )}

        </div>
      </AuthProvider>
    </CartProvider>
  );
}