'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { removeVietnameseTones } from '@/lib/utils/removeVietnameseTones';

interface Category {
  id: string;
  name: string;
  parentId?: string | null;
}

interface ProductsProps {
  products: Product[];
  categories: Category[];
  onAddToCart?: (product: Product) => void;
}

const ProductsPage: React.FC<ProductsProps> = ({
  products,
  categories,
  onAddToCart
}) => {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [openParents, setOpenParents] = useState<string[]>([]);

  /* ===============================
     Sync search từ URL
  =============================== */
  useEffect(() => {
    const q = searchParams?.get('q') ?? '';
    setSearchQuery(q);
  }, [searchParams]);

  /* ===============================
     Update URL khi search
  =============================== */
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    const params = new URLSearchParams(searchParams?.toString());

    if (value.trim()) {
      params.set('q', value);
    } else {
      params.delete('q');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  /* ===============================
     Category Helpers
  =============================== */

  const parentCategories = categories.filter(cat => !cat.parentId);
  const childCategories = categories.filter(cat => cat.parentId);

  const toggleParent = (id: string) => {
    if (openParents.includes(id)) {
      setOpenParents(openParents.filter(i => i !== id));
    } else {
      setOpenParents([...openParents, id]);
    }
  };

  const getChildCategoryIds = (parentId: string) => {
    return childCategories
      .filter(child => child.parentId === parentId)
      .map(child => child.id);
  };

  /* ===============================
     Filter + Sort
  =============================== */

  const filteredProducts = useMemo(() => {

    const normalizedSearch = removeVietnameseTones(
      searchQuery.toLowerCase()
    );

    let result = products.filter(product => {

      const categoryName =
        categories.find(c => c.id === product.categoryId)?.name || '';

      const childIds = getChildCategoryIds(activeCategory);

      const matchesCategory =
        activeCategory === 'all' ||
        product.categoryId === activeCategory ||
        childIds.includes(product.categoryId);

      const matchesSearch =
        removeVietnameseTones(product.name.toLowerCase()).includes(normalizedSearch) ||
        removeVietnameseTones(categoryName.toLowerCase()).includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt || '').getTime() -
            new Date(a.createdAt || '').getTime()
        );
        break;
    }

    return result;

  }, [products, categories, activeCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">

      {/* ===== Header ===== */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Cửa Hàng Nông Sản
            </h1>
            <p className="text-sm text-slate-500">
              Tìm thấy {filteredProducts.length} sản phẩm
            </p>
          </div>

          <div className="relative hidden md:block w-80">
            <input
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Tìm ST25, Gạo lứt..."
              className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* ===== Content ===== */}
      <div className="max-w-7xl mx-auto px-4 mt-8 flex gap-8">

        {/* ===== Sidebar ===== */}
        <aside className="hidden lg:block w-64">

          <h3 className="text-xs uppercase font-bold text-slate-400 mb-4">
            Danh mục
          </h3>

          <div className="space-y-3">

            {/* Tất cả */}
            <button
              onClick={() => setActiveCategory('all')}
              className={`w-full text-left px-4 py-2 rounded-xl font-semibold transition ${
                activeCategory === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-white border'
              }`}
            >
              Tất cả
            </button>

            {parentCategories.map(parent => {

              const children = childCategories.filter(
                child => child.parentId === parent.id
              );

              const isOpen = openParents.includes(parent.id);

              return (
                <div
                  key={parent.id}
                  className="rounded-xl border bg-white shadow-sm"
                >

                  {/* Parent */}
                  <div className="flex items-center justify-between px-4 py-3">

                    <button
                      onClick={() => setActiveCategory(parent.id)}
                      className={`font-semibold transition ${
                        activeCategory === parent.id
                          ? 'text-green-600'
                          : 'hover:text-green-600'
                      }`}
                    >
                      {parent.name}
                    </button>

                    {children.length > 0 && (
                      <button
                        onClick={() => toggleParent(parent.id)}
                        className="text-slate-400 hover:text-green-600 text-lg"
                      >
                        {isOpen ? '−' : '+'}
                      </button>
                    )}
                  </div>

                  {/* Children */}
                  {isOpen && children.length > 0 && (
                    <div className="border-t bg-slate-50 px-3 py-2 space-y-2">
                      {children.map(child => (
                        <button
                          key={child.id}
                          onClick={() => setActiveCategory(child.id)}
                          className={`block w-full text-left rounded-lg px-3 py-2 text-sm transition ${
                            activeCategory === child.id
                              ? 'bg-green-100 text-green-600 font-semibold'
                              : 'hover:bg-green-50 text-slate-600'
                          }`}
                        >
                          {child.name}
                        </button>
                      ))}
                    </div>
                  )}

                </div>
              );
            })}

          </div>
        </aside>

        {/* ===== Main ===== */}
        <main className="flex-1">

          {/* Sort */}
          <div className="flex justify-end mb-6">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="newest">Mới nhất</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
            </select>
          </div>

          {/* Products */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
              <Search className="mx-auto mb-4 h-8 w-8 text-slate-300" />
              <h3 className="text-lg font-bold">
                Không tìm thấy sản phẩm
              </h3>
              <p className="text-slate-500 mb-6">
                Thử từ khóa khác nhé
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  handleSearchChange('');
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-full"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default ProductsPage;