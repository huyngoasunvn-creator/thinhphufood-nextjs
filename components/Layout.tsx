
import React from 'react';
// Use next/navigation instead of react-router-dom
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';
import { SiteConfig } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  cartCount: number;
  profileActive: boolean;
  aboutActive: boolean;
  siteConfig: SiteConfig;
}

const Layout: React.FC<LayoutProps> = ({ children, cartCount, profileActive, aboutActive, siteConfig }) => {
  const pathname = usePathname();
const isAdmin = pathname?.startsWith('/admin') ?? false;


  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Header cartCount={cartCount} profileActive={profileActive} aboutPageActive={aboutActive} />}
      <main className={`flex-grow ${!isAdmin ? 'pb-16 md:pb-0' : ''}`}>
        {children}
      </main>
      {!isAdmin && <Footer config={siteConfig} />}
      <MobileBottomNav cartCount={cartCount} profileActive={profileActive} />
    </div>
  );
};

export default Layout;
