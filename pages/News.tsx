
import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import SEOManager from '../components/common/SEO';
import NewsCard from '../components/news/NewsCard';
import { NewsPost, Banner } from '../types';

interface NewsProps {
  banners: Banner[];
  news: NewsPost[];
}

const News: React.FC<NewsProps> = ({ banners, news }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  // Lấy banner trang tin tức đang hoạt động
  const newsBanner = useMemo(() => {
    return banners.find(b => b.placement === 'Tin tức' && b.isActive);
  }, [banners]);

  const filtered = useMemo(() => {
    return news.filter(n => {
      const matchSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = activeCategory === 'Tất cả' || n.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [news, searchTerm, activeCategory]);

  const categories = ['Tất cả', 'Kiến thức', 'Khuyến mãi', 'Món ngon', 'Tin công ty'];

  return (
    <div className="bg-slate-50 min-h-screen pb-20 animate-in fade-in duration-500">
      <SEOManager 
        title="Tin Tức & Kiến Thức Nông Sản" 
        description="Cập nhật tin tức mới nhất về thị trường lúa gạo, mẹo nấu ăn ngon và các chương trình khuyến mãi từ ThinhPhuFood."
      />

      {/* News Header Section */}
      <section className={`relative overflow-hidden transition-all duration-700 ${newsBanner ? 'py-24 sm:py-32' : 'bg-white border-b border-green-50 py-16 sm:py-24'}`}>
        {/* Background Image if exists */}
        {newsBanner && (
          <div className="absolute inset-0 z-0">
            <img 
              src={newsBanner.imageUrl} 
              alt={newsBanner.title} 
              className="w-full h-full object-cover"
            />
            <div 
              className="absolute inset-0 bg-black" 
              style={{ opacity: newsBanner.overlayOpacity }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50"></div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex flex-col items-center space-y-6">
            <span className="inline-flex items-center px-5 py-1.5 bg-green-50 text-green-600 rounded-full text-[11px] font-black uppercase tracking-[0.2em] border border-green-100/50 shadow-sm animate-in slide-in-from-bottom duration-500">
              Blog & Community
            </span>
            
            <h1 
              className="text-4xl sm:text-7xl font-black leading-[1.1] tracking-tight animate-in slide-in-from-bottom duration-700 delay-100"
              style={{ color: newsBanner ? newsBanner.textColor : '#0f172a' }}
            >
              {newsBanner ? newsBanner.title : 'Tin Tức & Kiến Thức'}
              {!newsBanner && (
                <span className="text-green-600 relative ml-2">
                  <svg className="absolute -bottom-2 left-0 w-full h-2 text-green-200" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                  </svg>
                </span>
              )}
            </h1>
            
            <p 
              className="max-w-xl mx-auto text-lg leading-relaxed animate-in slide-in-from-bottom duration-1000 delay-200 font-medium opacity-90"
              style={{ color: newsBanner ? newsBanner.textColor : '#64748b' }}
            >
              {newsBanner?.subtitle || 'Khám phá thế giới nông sản qua những bài viết chuyên sâu, chia sẻ từ đội ngũ chuyên gia của chúng tôi.'}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative z-20">
        <div className="bg-white p-4 sm:p-6 rounded-[2.5rem] shadow-xl shadow-green-900/5 border border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all uppercase tracking-wider ${
                  activeCategory === cat 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200 scale-105' 
                  : 'bg-slate-50 text-slate-500 hover:bg-green-50 hover:text-green-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96 group">
            <input 
              type="text" 
              placeholder="Tìm kiếm nội dung bài viết..." 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-medium text-slate-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-green-600 transition-colors" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filtered.map(post => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
            <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900">Không tìm thấy bài viết nào</h3>
            <p className="text-slate-500 mt-2">Hãy thử thay đổi từ khóa hoặc bộ lọc của bạn.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
