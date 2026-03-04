'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Newspaper,
  Tags,
  Image as ImageIcon,
  MonitorPlay,
  Settings,
  LogOut,
  ChevronRight,
  Info,
  UserCircle,
  HelpCircle,
  PhoneCall,
  LucideIcon,
  Heart,
  Search,
  Mail,
  Calendar
} from 'lucide-react';

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

/* ================= MENU ITEMS ================= */

export const ADMIN_MENU_ITEMS: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Tổng quan', path: '/admin' },
  { icon: Package, label: 'Sản phẩm', path: '/admin/products' },
  { icon: ShoppingCart, label: 'Đơn hàng', path: '/admin/orders' },
  { icon: Tags, label: 'Danh mục', path: '/admin/categories' },
  { icon: Newspaper, label: 'Tin tức', path: '/admin/news' },
  { icon: ImageIcon, label: 'Banner', path: '/admin/banners' },
  { icon: Heart, label: 'Cam kết', path: '/admin/commitments' },
  { icon: Search, label: 'Cấu hình SEO', path: '/admin/seo' },
  { icon: Info, label: 'Vùng Giới thiệu', path: '/admin/about' },
  { icon: HelpCircle, label: 'Nhúng Giới thiệu', path: '/admin/about-page' },
  { icon: Calendar, label: 'Nhúng Sự kiện', path: '/admin/event-embeds' },
  { icon: PhoneCall, label: 'Cấu hình Liên hệ', path: '/admin/contact' },
  { icon: Mail, label: 'Tin nhắn khách hàng', path: '/admin/messages' },
  { icon: UserCircle, label: 'Nhúng Profile', path: '/admin/profile' },
  { icon: MonitorPlay, label: 'Popup', path: '/admin/popups' },
  { icon: MonitorPlay, label: 'Theme hiệu ứng', path: '/admin/theme' },
  { icon: Settings, label: 'Cấu hình', path: '/admin/config' },
];

/* ================= COMPONENT ================= */

const AdminSidebar: React.FC<Props> = ({
  sidebarOpen,
  setSidebarOpen
}) => {
  const pathname = usePathname() ?? '';

  const isActivePath = (path: string) => {
    if (path === '/admin') {
      return pathname === '/admin';
    }
    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
    <aside
  className={`
    fixed md:static
    top-0 left-0
    h-full
    w-64
    bg-slate-900
    text-slate-400
    flex flex-col
    z-50
    shadow-2xl
    transform transition-transform duration-300
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0
  `}
>
      {/* Logo */}
      <div className="p-6 flex items-center space-x-3 bg-slate-950 border-b border-white/5">
        <img
          src="https://res.cloudinary.com/dozhznwuf/image/upload/v1770731483/logo-tp-5_yizb09.png"
          className="h-8 w-auto"
          alt="Logo"
        />
        <span className="text-white font-black tracking-tighter text-lg">
          THINHPHU<span className="text-green-500">CMS</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scroll-hide">
        {ADMIN_MENU_ITEMS.map((item) => {
          const isActive = isActivePath(item.path);

          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setSidebarOpen(false)} // ✅ auto close mobile
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-green-600 text-white shadow-lg shadow-green-900/40 translate-x-1'
                  : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon
                  className={`h-5 w-5 ${
                    isActive ? 'text-white' : 'text-slate-500'
                  }`}
                />
                <span className="font-bold text-xs uppercase tracking-tight">
                  {item.label}
                </span>
              </div>

              {isActive && <ChevronRight className="h-4 w-4" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/5">
        <Link
          href="/"
          className="flex items-center space-x-3 px-4 py-3 text-slate-500 hover:text-white transition-colors group"
        >
          <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">
            Thoát CMS
          </span>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;