
import React from 'react';
// Use next/link and next/navigation instead of react-router-dom
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Package, ShoppingCart, Newspaper, 
  Tags, Image as ImageIcon, MonitorPlay, Settings, LogOut, ChevronRight, Info, UserCircle, HelpCircle, PhoneCall, LucideIcon, Heart, Search, Mail
} from 'lucide-react';

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

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
  { icon: PhoneCall, label: 'Cấu hình Liên hệ', path: '/admin/contact' },
  { icon: Mail, label: 'Tin nhắn khách hàng', path: '/admin/messages' },
  { icon: UserCircle, label: 'Nhúng Profile', path: '/admin/profile' },
  { icon: MonitorPlay, label: 'Popup', path: '/admin/popups' },
  { icon: Settings, label: 'Cấu hình', path: '/admin/config' },
];

const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-400 flex flex-col fixed h-full z-20 shadow-2xl">
      <div className="p-6 flex items-center space-x-3 bg-slate-950 border-b border-white/5">
        <img src="https://res.cloudinary.com/dozhznwuf/image/upload/v1770731483/logo-tp-5_yizb09.png" className="h-8 w-auto" alt="Logo" />
        <span className="text-white font-black tracking-tighter text-lg">THINHPHU<span className="text-green-500">CMS</span></span>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scroll-hide">
        {ADMIN_MENU_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                ? 'bg-green-600 text-white shadow-lg shadow-green-900/40 translate-x-1' 
                : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span className="font-bold text-xs uppercase tracking-tight">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="h-4 w-4" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <Link href="/" className="flex items-center space-x-3 px-4 py-3 text-slate-500 hover:text-white transition-colors group">
          <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Thoát CMS</span>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
