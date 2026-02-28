'use client';

import React, { useState, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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
  initialCategory?: string;
  initialSearch?: string;
  onAddToCart?: (product: Product) => void;
}

const ProductsPage: React.FC<ProductsProps> = ({
  products,
  categories,
  initialCategory = 'all',
  initialSearch = '',
  onAddToCart
}) => {

  const router = useRouter();
  const pathname = usePathname();

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('newest');

  // ✅ QUAN TRỌNG: dùng Set thay vì 1 string
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  /* =========================== UPDATE URL =========================== */

  const updateURL = (category: string, search: string) => {
    const params = new URLSearchParams();

    if (category !== 'all') params.set('category', category);
    if (search.trim()) params.set('q', search);

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    updateURL(categoryId, searchQuery);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    updateURL(activeCategory, value);
  };

  /* =========================== BUILD TREE =========================== */

  const buildTree = (parentId: string | null = null): any[] => {
    return categories
      .filter(cat => cat.parentId === parentId)
      .map(cat => ({
        ...cat,
        children: buildTree(cat.id)
      }));
  };

  const categoryTree = useMemo(() => buildTree(null), [categories]);

  /* =========================== GET DESCENDANTS =========================== */

  const getAllChildIds = (id: string): string[] => {
    const directChildren = categories.filter(c => c.parentId === id);
    let ids: string[] = [];

    directChildren.forEach(child => {
      ids.push(child.id);
      ids = ids.concat(getAllChildIds(child.id));
    });

    return ids;
  };

  /* =========================== FILTER =========================== */

  const filteredProducts = useMemo(() => {

    const normalizedSearch = removeVietnameseTones(
      searchQuery.toLowerCase()
    );

    let result = products.filter(product => {

      const categoryName =
        categories.find(c => c.id === product.categoryId)?.name || '';

      const descendantIds =
        activeCategory !== 'all'
          ? getAllChildIds(activeCategory)
          : [];

      const matchesCategory =
        activeCategory === 'all' ||
        product.categoryId === activeCategory ||
        descendantIds.includes(product.categoryId);

      const matchesSearch =
        removeVietnameseTones(product.name.toLowerCase()).includes(normalizedSearch) ||
        removeVietnameseTones(categoryName.toLowerCase()).includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });

    result = [...result];

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
    }

    return result;

  }, [products, categories, activeCategory, searchQuery, sortBy]);

  /* =========================== TOGGLE OPEN =========================== */

  const toggleOpen = (id: string) => {
    setOpenCategories(prev => {
      const newSet = new Set(prev);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      return newSet;
    });
  };

  /* =========================== RENDER TREE =========================== */

  const renderCategories = (nodes: any[], level = 0) => {
    return nodes.map(node => {

      const isOpen = openCategories.has(node.id);
      const isActive = activeCategory === node.id;

      return (
        <div key={node.id} className="mb-3">

          <div
            className={`flex items-center justify-between px-4 py-2 rounded-xl transition-all duration-200
            ${
              isActive
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-white border hover:bg-green-50'
            }`}
            style={{
              paddingLeft: `${16 + level * 20}px`
            }}
          >

            <button
              onClick={() => handleCategoryChange(node.id)}
              className="flex-1 text-left font-medium"
            >
              {node.name}
            </button>

            {node.children.length > 0 && (
              <button
                onClick={() => toggleOpen(node.id)}
                className={`ml-2 transition ${
                  isActive ? 'text-white' : 'text-slate-400'
                }`}
              >
                {isOpen ? '−' : '+'}
              </button>
            )}

          </div>

          {isOpen && node.children.length > 0 && (
            <div className="mt-2 border-l border-slate-200">
              {renderCategories(node.children, level + 1)}
            </div>
          )}

        </div>
      );
    });
  };

  /* =========================== UI =========================== */

  return (
    <div className="min-h-screen bg-slate-50 pb-20">

      <div className="max-w-7xl mx-auto px-4 mt-8 flex gap-8">

        {/* Sidebar */}
        <aside className="hidden lg:block w-64">
          <h3 className="text-xs uppercase font-bold text-slate-400 mb-4">
            Danh mục
          </h3>

          <button
            onClick={() => handleCategoryChange('all')}
            className={`mb-4 w-full text-left px-4 py-2 rounded-xl font-semibold ${
              activeCategory === 'all'
                ? 'bg-green-600 text-white'
                : 'bg-white border'
            }`}
          >
            Tất cả
          </button>

          {renderCategories(categoryTree)}
        </aside>

        {/* Main */}
        <main className="flex-1">

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
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default ProductsPage;