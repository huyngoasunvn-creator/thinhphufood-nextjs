'use client';

import React from 'react';
import { ADMIN_MENU_ITEMS } from './AdminSidebar';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

interface Props {
  setSidebarOpen: (value: boolean) => void;
}

const AdminHeader: React.FC<Props> = ({ setSidebarOpen }) => {
  const pathname = usePathname();

  const currentTab =
    ADMIN_MENU_ITEMS.find(
      (item) =>
        pathname === item.path ||
        pathname?.startsWith(item.path + '/')
    )?.label || 'Quản trị';

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <button
          className="md:hidden p-2 rounded hover:bg-slate-100"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6 text-slate-700" />
        </button>

        <h1 className="text-lg font-bold text-slate-800">
          {currentTab}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-right mr-4 hidden sm:block">
          <p className="text-xs font-bold text-slate-900">
            Admin ThinhPhu
          </p>
          <p className="text-[10px] text-green-600 uppercase">
            Quản trị viên
          </p>
        </div>

        <div className="h-10 w-10 bg-green-100 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-green-700 font-bold">
          AD
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;