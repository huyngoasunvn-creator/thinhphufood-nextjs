
import React, { useMemo } from 'react';
// Use next/navigation and next/link instead of react-router-dom
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Newspaper, Sparkles } from 'lucide-react';
import { NewsPost } from '../types';
import SEOManager from '../components/common/SEO';
import NewsCard from '../components/news/NewsCard';

interface NewsDetailProps {
  news: NewsPost[];
}

const NewsDetail: React.FC<NewsDetailProps> = ({ news }) => {
  const { slug } = useParams() as { slug: string };
  
  const post = useMemo(() => news.find(n => n.slug === slug), [news, slug]);
  
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return news.filter(n => n.id !== post.id && n.category === post.category).slice(0, 3);
  }, [news, post]);

  const latestPosts = useMemo(() => {
    if (!post) return [];
    const relatedIds = relatedPosts.map(r => r.id);
    return news
      .filter(n => n.id !== post.id && !relatedIds.includes(n.id))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }, [news, post, relatedPosts]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Bài viết không tồn tại</h2>
          <Link href="/tin-tuc" className="bg-green-600 text-white px-8 py-3 rounded-full font-bold">Quay lại Tin tức</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20 animate-in fade-in duration-500">
      <SEOManager 
        title={post.title} 
        description={post.summary} 
        image={post.image}
        type="article"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/tin-tuc" className="inline-flex items-center text-slate-500 hover:text-green-600 mb-8 transition-colors font-medium">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Tất cả bài viết</span>
        </Link>

        <article className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden mb-16">
          <div className="aspect-video overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="p-8 sm:p-12 lg:p-16">
            <header className="mb-10 text-center max-w-3xl mx-auto">
              <span className="px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                {post.category}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-8 leading-[1.4]">
                {post.title}
              </h1>
              <div className="flex items-center justify-center space-x-6 text-sm text-slate-400 font-medium">
                <span className="flex items-center"><Calendar className="h-4 w-4 mr-2" /> {post.date}</span>
                <span className="w-px h-4 bg-slate-200"></span>
                <span className="flex items-center uppercase"><User className="h-4 w-4 mr-2" /> {post.author}</span>
              </div>
            </header>

            <div 
              className="prose prose-lg max-w-none prose-slate prose-img:rounded-3xl prose-a:text-green-600 text-slate-600 leading-loose space-y-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-16 pt-10 border-t border-slate-100">
              <p className="text-center text-slate-400 text-xs font-medium italic">--- Hết nội dung bài viết ---</p>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-20">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 text-green-600 rounded-xl">
                  <Newspaper className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-black text-slate-900">Bài viết liên quan</h2>
              </div>
              <div className="h-px flex-1 bg-slate-200 mx-8 hidden sm:block"></div>
              <Link href="/tin-tuc" className="text-green-600 font-bold hover:underline whitespace-nowrap">Xem thêm</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(p => (
                <NewsCard key={p.id} post={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default NewsDetail;
