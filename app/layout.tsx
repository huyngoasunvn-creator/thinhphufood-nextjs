
import React from 'react';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav';
import { useAppState } from '../hooks/useAppState';
import { INITIAL_SITE_CONFIG } from '../data/siteSettings';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Vì là Server Component, chúng ta sẽ quản lý state ở các Client Component bên trong
  // Hoặc dùng một Layout Wrapper Client nếu cần state toàn cục phức tạp
  return (
    <html lang="vi">
      <head>
        <title>ThinhPhuFood - Tinh Hoa Gạo Việt</title>
        <meta name="description" content="Chuyên cung cấp gạo ST25, gạo lứt và nông sản sạch" />
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow pb-20 md:pb-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
