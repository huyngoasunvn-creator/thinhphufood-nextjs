'use client';

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Footer from '@/components/admin/layout/Footer';
import Header from '@/components/admin/layout/Header';
import MobileBottomNav from '@/components/admin/layout/MobileBottomNav';
import Popup from '@/components/common/Popup';
import { AuthProvider } from '@/context/AuthContext';
import { useGlobalSettings } from '@/hooks/useGlobalSettings';

function PublicClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { popupConfig, siteConfig } = useGlobalSettings();

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Suspense fallback={<div className="h-16 sm:h-20 border-b border-green-100 bg-white" />}>
          <Header />
        </Suspense>

        <main className="flex-grow pb-20 md:pb-0">{children}</main>

        <Footer config={siteConfig} />

        <MobileBottomNav />

        {popupConfig && <Popup config={popupConfig} />}
      </div>
    </AuthProvider>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return children;
  }

  return <PublicClientLayout>{children}</PublicClientLayout>;
}
