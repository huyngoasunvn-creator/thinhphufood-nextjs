'use client';

import useMenus from "@/hooks/useMenus";
import EventMenu from "@/components/header/EventMenu";
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  ShoppingCart,
  Menu,
  X,
  Search,
  User,
  ShieldCheck,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  profileActive?: boolean;
  aboutPageActive?: boolean;
}

type MenuItem = {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  order?: number;
};

const Header: React.FC<HeaderProps> = ({
  profileActive = true,
  aboutPageActive = true,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [adminNavigating, setAdminNavigating] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, logout, isAdmin, loading, syncAdminSession } = useAuth();
  const { cartCount } = useCart();

  const menus = useMenus() as MenuItem[];
  const menuMap = useMemo(
    () => new Map(menus.map((menu) => [menu.id, menu])),
    [menus],
  );

  const parents = menus
    .filter((menu) => menu.parentId === null || menu.parentId === "")
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const productRoot = parents.find((menu) => menu.slug === "san-pham") ?? null;

  useEffect(() => {
    const categoryId = searchParams.get("category");

    if (categoryId) {
      setCurrentCategoryId(categoryId);
      return;
    }

    if (pathname.startsWith("/danh-muc/")) {
      const slug = pathname.replace("/danh-muc/", "").split("/")[0];
      const matchedMenu = menus.find((menu) => menu.slug === slug) ?? null;
      setCurrentCategoryId(matchedMenu?.id ?? null);
      return;
    }

    setCurrentCategoryId(null);
  }, [menus, pathname, searchParams]);

  const isProductCategoryMenu = (menu: MenuItem) => {
    let current: MenuItem | undefined = menu;

    while (current) {
      if (current.slug === "san-pham") {
        return menu.id !== current.id;
      }

      current = current.parentId ? menuMap.get(current.parentId) : undefined;
    }

    return false;
  };

  const getChildren = (parentId: string) => {
    return menus
      .filter((menu) => menu.parentId === parentId)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  };

  const buildMenuHref = (menu?: MenuItem | null) => {
    if (!menu?.slug) return "/";

    if (isProductCategoryMenu(menu)) {
      return `/san-pham?category=${menu.id}`;
    }

    if (menu.slug.startsWith("/")) {
      return menu.slug;
    }

    return `/${menu.slug}`;
  };

  const navLinks =
    parents.length > 0
      ? parents.map((menu) => ({
          name: menu.name,
          href: buildMenuHref(menu),
          menu,
        }))
      : [
          { name: 'Trang chủ', href: '/', menu: null },
          { name: 'Sản phẩm', href: '/san-pham', menu: null },
          { name: 'Tin tức', href: '/tin-tuc', menu: null },
          ...(profileActive ? [{ name: 'Giới thiệu', href: '/profile', menu: null }] : []),
          ...(aboutPageActive ? [{ name: 'Về chúng tôi', href: '/about-us', menu: null }] : []),
          { name: 'Liên hệ', href: '/contact', menu: null },
        ];

  const isActive = (href: string, menu?: MenuItem | null) => {
    if (menu && isProductCategoryMenu(menu)) {
      return currentCategoryId === menu.id;
    }

    if (menu?.slug === "san-pham") {
      return pathname === "/san-pham" || pathname.startsWith("/danh-muc/");
    }

    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      router.push(`/tim-kiem/${encodeURIComponent(searchKeyword.trim().replaceAll(" ", "-"))}`);
      setSearchKeyword('');
      setIsMenuOpen(false);
    }
  };

  const handleAdminAccess = async () => {
    if (adminNavigating) return;

    try {
      setAdminNavigating(true);
      await syncAdminSession();
      router.push("/admin");
    } catch (error) {
      console.error("Admin access error:", error);
      router.push("/login");
    } finally {
      setAdminNavigating(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link
            href="/"
            className="flex items-center space-x-3 group shrink-0"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src="https://res.cloudinary.com/dozhznwuf/image/upload/v1770731483/logo-tp-5_yizb09.png"
              alt="ThinhPhuFood Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="hidden xs:block text-xl sm:text-2xl font-bold text-green-800 tracking-tight">
              THINHPHU<span className="text-green-600">FOOD</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {parents.map((parent) => {
              const children = getChildren(parent.id);
              const isDropdownOpen = openDropdownId === parent.id;

              return (
                <div
                  key={parent.id}
                  className="relative"
                  onMouseEnter={() => setOpenDropdownId(parent.id)}
                  onMouseLeave={() =>
                    setOpenDropdownId((current) =>
                      current === parent.id ? null : current,
                    )
                  }
                >
                  <Link
                    href={buildMenuHref(parent)}
                    className={`text-sm font-bold transition-colors hover:text-green-600 ${
                      isActive(buildMenuHref(parent), parent)
                        ? 'text-green-600'
                        : 'text-slate-600'
                    }`}
                  >
                    {parent.name}
                  </Link>

                  {children.length > 0 && (
                    <div className="absolute left-0 top-full pt-3 z-[70]">
                      <div
                        className={`bg-white border border-slate-100 rounded-xl shadow-xl transition-all min-w-[180px] ${
                          isDropdownOpen
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible -translate-y-1"
                        }`}
                      >
                        {children.map((child) => (
                          <Link
                            key={child.id}
                            href={buildMenuHref(child)}
                            className={`block px-4 py-2 text-sm font-semibold whitespace-nowrap ${
                              isActive(buildMenuHref(child), child)
                                ? "bg-green-50 text-green-600"
                                : "text-slate-600 hover:bg-green-50 hover:text-green-600"
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <EventMenu />
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center relative group"
            >
              <input
                type="text"
                placeholder="Tìm sản phẩm..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all w-40 lg:w-48 focus:w-64"
              />
              <Search className="absolute left-3.5 h-4 w-4 text-slate-400 group-focus-within:text-green-600 transition-colors" />
            </form>

            {!loading && isAdmin && (
              <button
                type="button"
                onClick={handleAdminAccess}
                disabled={adminNavigating}
                className="hidden sm:flex items-center space-x-1 border border-slate-100 rounded-full px-3 py-2 text-slate-500 hover:text-green-600 hover:bg-slate-50 transition-colors disabled:opacity-70"
              >
                <ShieldCheck className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-tighter">
                  {adminNavigating ? 'Đang vào' : 'Quản trị'}
                </span>
              </button>
            )}

            <Link
              href="/cart"
              className="p-2 text-slate-500 hover:text-green-600 transition-colors relative"
            >
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
                    <img
                      src={user.photoURL}
                      className="h-full w-full object-cover"
                      alt="User"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <User className="h-5 w-5 text-slate-400" />
                  )}
                </button>

                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-3 py-2 border-b border-slate-50 mb-2">
                    <p className="text-xs font-black text-slate-900 truncate">
                      {user.displayName || 'Khách hàng'}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>

                  {isAdmin && (
                    <button
                      type="button"
                      onClick={handleAdminAccess}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-bold text-green-600 hover:bg-green-50 rounded-xl transition-colors"
                    >
                      <ShieldCheck className="h-4 w-4" />
                      <span>Vào quản trị</span>
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="p-2 text-slate-500 hover:text-green-600 transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>
            )}

            <button
              className="lg:hidden p-2 text-slate-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-green-100 bg-white shadow-md">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            <form onSubmit={handleSearch} className="flex items-center relative">
              <input
                type="text"
                placeholder="Tìm sản phẩm..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-green-500 outline-none"
              />
              <Search className="absolute left-3 h-4 w-4 text-slate-400" />
            </form>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-bold ${
                  isActive(link.href, link.menu)
                    ? 'text-green-600'
                    : 'text-slate-600'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {productRoot &&
              getChildren(productRoot.id).map((child) => (
                <Link
                  key={child.id}
                  href={buildMenuHref(child)}
                  onClick={() => setIsMenuOpen(false)}
                  className={`pl-4 text-sm font-semibold ${
                    isActive(buildMenuHref(child), child)
                      ? 'text-green-600'
                      : 'text-slate-500'
                  }`}
                >
                  {child.name}
                </Link>
              ))}

            {isAdmin && (
              <button
                type="button"
                onClick={handleAdminAccess}
                className="text-left text-sm font-bold text-green-600"
              >
                Vào quản trị
              </button>
            )}

            <EventMenu />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
