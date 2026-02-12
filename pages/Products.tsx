
import React, { useState, useMemo, useEffect } from 'react';
// Use next/navigation instead of react-router-dom
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Search, SlidersHorizontal, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface ProductsProps {
  products: Product[];
  categories: string[];
  onAddToCart: (product: Product) => void;
}

const Products: React.FC<ProductsProps> = ({ products, categories, onAddToCart }) => {
  const searchParams = useSearchParams();
  const safeSearchParams = searchParams ?? new URLSearchParams();

  const router = useRouter();
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState(
  safeSearchParams.get('q') ?? ''
);


  const [sortBy, setSortBy] = useState('newest');

  // Đồng bộ hóa khi tham số URL thay đổi (từ Header)
  useEffect(() => {
  const q = safeSearchParams.get('q');
  if (q) setSearchQuery(q);
}, [safeSearchParams]);



  // Cập nhật URL khi người dùng nhập vào ô tìm kiếm tại trang này
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    const params = new URLSearchParams(safeSearchParams.toString());

    if (val) {
      params.set('q', val);
    } else {
      params.delete('q');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'Tất cả' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 animate-in fade-in duration-500">
      {/* Header Trang */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">Cửa Hàng Nông Sản</h1>
              <p className="text-xs md:text-sm text-slate-500">Tìm thấy {filteredProducts.length} sản phẩm phù hợp</p>
            </div>
            {/* Search cho Mobile hiện ngay ở đầu */}
            <div className="relative md:hidden">
              <input
                type="text"
                placeholder="Tìm ST25, Gạo lứt..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-[1.25rem] focus:ring-2 focus:ring-green-500 focus:bg-white outline-none text-sm text-slate-900 font-medium transition-all"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Topbar Categories */}
          <aside className="lg:w-64 flex-shrink-0">
            {/* Desktop Sidebar Search */}
            <div className="hidden lg:block space-y-8">
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Tìm kiếm</h3>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="ST25, Gạo lứt..."
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-[1.25rem] focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none text-sm text-slate-900 font-bold transition-all shadow-sm group-hover:border-slate-300"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-green-600 transition-colors" />
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Danh mục</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-5 py-3.5 rounded-2xl text-sm font-bold transition-all flex items-center justify-between group ${
                        activeCategory === cat
                          ? 'bg-green-600 text-white shadow-xl shadow-green-200'
                          : 'text-slate-600 bg-white border border-slate-100 hover:border-green-200 hover:text-green-600'
                      }`}
                    >
                      <span>{cat}</span>
                      <ChevronRight className={`h-4 w-4 opacity-0 group-hover:opacity-100 transition-all translate-x-1 ${activeCategory === cat ? 'opacity-100 translate-x-0' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Horizontal Scroll Categories */}
            <div className="lg:hidden">
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Danh mục sản phẩm</h3>
                <SlidersHorizontal className="h-3 w-3 text-slate-400" />
              </div>
              <div className="flex overflow-x-auto pb-4 gap-2 scroll-hide no-scrollbar -mx-4 px-4">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-6 py-3 rounded-full text-xs font-bold transition-all border shadow-sm ${
                      activeCategory === cat
                        ? 'bg-green-600 text-white border-green-600 shadow-green-200'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-green-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6 md:mb-8 bg-white p-4 rounded-[1.5rem] shadow-sm border border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="text-xs md:text-sm text-slate-400 font-bold uppercase tracking-wider">Sắp xếp:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)} 
                  className="text-sm font-black bg-transparent border-none focus:ring-0 outline-none text-green-700 cursor-pointer"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="price-asc">Giá tăng dần</option>
                  <option value="price-desc">Giá giảm dần</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Không tìm thấy sản phẩm</h3>
                <p className="text-slate-500 mt-2 mb-8">Thử tìm kiếm với từ khóa khác nhé!</p>
                <button 
                  onClick={() => {setActiveCategory('Tất cả'); handleSearchChange('');}} 
                  className="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
