
import React from 'react';
import { ADMIN_MENU_ITEMS } from './AdminSidebar';
// Use next/navigation instead of react-router-dom
import { usePathname } from 'next/navigation';

const AdminHeader: React.FC = () => {
  const pathname = usePathname();
  const currentTab = ADMIN_MENU_ITEMS.find(item => item.path === pathname)?.label || 'Quản trị';

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <h1 className="text-lg font-bold text-slate-800">{currentTab}</h1>
      <div className="flex items-center space-x-4">
        <div className="text-right mr-4">
          <p className="text-xs font-bold text-slate-900">Admin ThinhPhu</p>
          <p className="text-[10px] text-green-600 uppercase">Quản trị viên</p>
        </div>
        <div className="h-10 w-10 bg-green-100 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-green-700 font-bold">
          AD
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
