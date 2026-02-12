
import React from 'react';
// Use next/link instead of react-router-dom
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { NewsPost } from '../../types';

interface NewsCardProps {
  post: NewsPost;
}

const NewsCard: React.FC<NewsCardProps> = ({ post }) => {
  return (
    <article className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-500 flex flex-col h-full">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Link href={`/tin-tuc/${post.slug}`}>
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </Link>
        <span className="absolute top-4 left-4 bg-green-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-lg">
          {post.category}
        </span>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center space-x-4 text-[11px] text-slate-400 font-medium mb-3">
          <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" /> {post.date}</span>
          <span className="flex items-center uppercase tracking-tighter"><User className="h-3 w-3 mr-1" /> {post.author}</span>
        </div>
        
        <Link href={`/tin-tuc/${post.slug}`}>
          <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-sm text-slate-500 line-clamp-3 mb-6 flex-1 leading-relaxed">
          {post.summary}
        </p>
        
        <Link 
          href={`/tin-tuc/${post.slug}`} 
          className="inline-flex items-center text-sm font-bold text-green-700 hover:text-green-600 transition-colors group/btn"
        >
          <span>Đọc bài viết</span>
          <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
};

export default NewsCard;
