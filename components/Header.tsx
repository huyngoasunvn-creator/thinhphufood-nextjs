
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X, Search, User, ShieldCheck, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  cartCount?: number;
  profileActive?: boolean;
  aboutPageActive?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  cartCount = 0,
  profileActive = true,
  aboutPageActive = true
}) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAdmin } = useAuth();

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Sản phẩm', path: '/products' },
    { name: 'Tin tức', path: '/tin-tuc' },
    ...(profileActive ? [{ name: 'Trang cá nhân', path: '/profile' }] : []),
    ...(aboutPageActive ? [{ name: 'Về chúng tôi', path: '/about-us' }] : []),
    { name: 'Liên hệ', path: '/contact' },
  ];

  const isActive = (path: string) => pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchKeyword.trim())}`);
      setSearchKeyword('');
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link href="/" className="flex items-center space-x-3 group shrink-0">
            <img 
              src="https://res.cloudinary.com/dozhznwuf/image/upload/v1770731483/logo-tp-5_yizb09.png" 
              alt="ThinhPhuFood Logo" 
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="hidden xs:block text-xl sm:text-2xl font-bold text-green-800 tracking-tight">
              THINHPHU<span className="text-green-600">FOOD</span>
            </span>
          </Link>

          <nav className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-bold transition-colors hover:text-green-600 ${
                  isActive(link.path) ? 'text-green-600' : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative group">
              <input 
                type="text"
                placeholder="Tìm sản phẩm..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all w-40 lg:w-48 focus:w-64"
              />
              <Search className="absolute left-3.5 h-4 w-4 text-slate-400 group-focus-within:text-green-600 transition-colors" />
            </form>
            
            {isAdmin && (
              <Link href="/admin" className="p-2 text-slate-500 hover:text-green-600 transition-colors hidden sm:flex items-center space-x-1 border border-slate-100 rounded-full px-3 hover:bg-slate-50">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-tighter">Quản trị</span>
              </Link>
            )}

            <Link href="/cart" className="p-2 text-slate-500 hover:text-green-600 transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-black leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-slate-50 transition-all border border-slate-100 bg-white shadow-sm overflow-hidden">
                  {user.photoURL && !imageError ? (
                    <img src={user.photoURL} className="h-full w-full object-cover" alt="User" onError={() => setImageError(true)} />
                  ) : (
                    <User className="h-5 w-5 text-slate-400" />
                  )}
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-3 py-2 border-b border-slate-50 mb-2">
                    <p className="text-xs font-black text-slate-900 truncate">{user.displayName || 'Khách hàng'}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                  </div>
                  <button onClick={logout} className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                    <LogOut className="h-4 w-4" />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="p-2 text-slate-500 hover:text-green-600 transition-colors">
                <User className="h-5 w-5" />
              </Link>
            )}
            
            <button className="lg:hidden p-2 text-slate-500" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-green-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <form onSubmit={handleSearch} className="relative mt-2">
              <input 
                type="text"
                placeholder="Tìm sản phẩm..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            </form>
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`block px-4 py-3 rounded-xl text-base font-bold ${
                    isActive(link.path) ? 'bg-green-50 text-green-700' : 'text-slate-600 hover:bg-green-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            {!user && (
              <Link
                href="/login"
                className="block px-4 py-4 rounded-2xl text-center bg-green-600 text-white font-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Đăng nhập ngay
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
