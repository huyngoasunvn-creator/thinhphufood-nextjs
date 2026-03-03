'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/layout/AdminSidebar';
import AdminHeader from '@/components/admin/layout/AdminHeader';

const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">
      
      {/* Sidebar */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <main className="flex-1 min-h-screen relative">
        <AdminHeader setSidebarOpen={setSidebarOpen} />
        
        <div className="p-8 pb-20">
          {children}
        </div>

        <footer className="absolute bottom-0 left-0 right-0 p-4 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest border-t border-slate-200 bg-white/50 backdrop-blur-sm">
          ThinhPhuFood CMS v2.5 • SEO Optimized Engine
        </footer>
      </main>
    </div>
  );
};

export default AdminLayout;