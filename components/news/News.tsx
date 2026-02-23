'use client';

import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { NewsPost, Banner } from '@/types';
import NewsCard from './NewsCard';
import SEOManager from '@/components/common/SEO';

interface NewsProps {
  news: NewsPost[];
  banners?: Banner[];
}

const News: React.FC<NewsProps> = ({ news, banners = [] }) => {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Tất cả', 'Kiến thức', 'Khuyến mãi', 'Món ngon', 'Tin công ty'];

  const newsBanner = useMemo(() => {
    return banners.find(
      b => b.placement === 'Tin tức' && b.isActive
    );
  }, [banners]);

  const filtered = useMemo(() => {
    return news.filter(post => {
      const matchCategory =
        activeCategory === 'Tất cả' || post.category === activeCategory;

      const matchSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [news, activeCategory, searchTerm]);

  return (
    <div style={{ padding: 40 }}>
      <h1>Tin tức</h1>

      {filtered.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default News;
