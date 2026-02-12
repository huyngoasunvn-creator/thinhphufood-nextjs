
import React from 'react';
import AdminSidebar from '../../components/admin/layout/AdminSidebar';
import AdminHeader from '../../components/admin/layout/AdminHeader';

// Next.js layout style components use children instead of react-router-dom Outlet
const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen relative">
        <AdminHeader />
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
