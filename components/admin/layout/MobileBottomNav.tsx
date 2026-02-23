
import React from 'react';
// Use next/link and next/navigation instead of react-router-dom
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Newspaper, ShoppingCart, User } from 'lucide-react';

interface MobileBottomNavProps {
  cartCount?: number;
  profileActive?: boolean;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  cartCount = 0,
  profileActive = true
}) => {

  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  // Không hiển thị trong trang quản trị
  if (pathname?.startsWith('/admin')) return null;


  const navs = [
    { label: 'Trang chủ', icon: Home, path: '/' },
    { label: 'Cửa hàng', icon: ShoppingBag, path: '/products' },
    ...(profileActive ? [{ label: 'Tài khoản', icon: User, path: '/profile' }] : [{ label: 'Tin tức', icon: Newspaper, path: '/tin-tuc' }]),
    { label: 'Giỏ hàng', icon: ShoppingCart, path: '/cart', badge: cartCount },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/80 backdrop-blur-xl border-t border-slate-200 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16">
        {navs.map((nav) => (
          <Link
            key={nav.path}
            href={nav.path}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-all relative ${
              isActive(nav.path) ? 'text-green-600' : 'text-slate-400'
            }`}
          >
            <div className={`relative p-1 rounded-xl transition-all ${isActive(nav.path) ? 'scale-110' : ''}`}>
              <nav.icon className={`h-5 w-5 ${isActive(nav.path) ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
              {nav.badge !== undefined && nav.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black h-4 w-4 flex items-center justify-center rounded-full border-2 border-white">
                  {nav.badge}
                </span>
              )}
            </div>
            <span className={`text-[10px] mt-1 font-bold tracking-tight ${isActive(nav.path) ? 'opacity-100' : 'opacity-70'}`}>
              {nav.label}
            </span>
            {isActive(nav.path) && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-green-600 rounded-b-full shadow-lg shadow-green-200"></span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;
