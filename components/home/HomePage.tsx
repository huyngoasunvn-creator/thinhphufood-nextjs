'use client';

import React from 'react';
import Link from 'next/link';
import HeroSlider from './HeroSlider';
import {
  ArrowRight,
  Newspaper,
  Leaf,
  ShieldCheck,
  Truck,
  RotateCcw,
  Award,
  Star,
  Heart,
  CheckCircle,
} from 'lucide-react';

import ProductCard from '@/components/product/ProductCard';
import Hero from '@/components/home/Hero';
import SEOManager from '@/components/common/SEO';
import { Product, Banner, NewsPost, Commitment, AboutConfig } from '@/types';

const ICON_MAP: Record<string, any> = {
  Leaf,
  ShieldCheck,
  Truck,
  RotateCcw,
  Award,
  Star,
  Heart,
  CheckCircle,
};

interface HomeProps {
  products?: Product[];
  banners?: Banner[];
  news?: NewsPost[];
  commitments?: Commitment[];
  aboutConfig?: AboutConfig;
  onAddToCart?: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({
  products = [],
  banners = [],
  news = [],
  commitments = [],
  aboutConfig,
  onAddToCart,
}) => {
  const heroBanners = Array.isArray(banners)
    ? banners.filter(
        (banner) =>
          banner &&
          banner.id &&
          banner.placement === 'Trang chủ' &&
          banner.isActive
      )
    : [];

  const safeAbout = aboutConfig || {
    title: '',
    description: '',
    imageUrl: '',
    buttonText: 'Xem thêm',
    buttonLink: '/',
    stats: {
      value1: '',
      label1: '',
      value2: '',
      label2: '',
    },
  };

  const safeProducts = Array.isArray(products)
    ? products.filter((product) => product && product.id)
    : [];

  const safeNews = Array.isArray(news)
    ? news.filter((post) => post && post.id)
    : [];

  const safeCommitments = Array.isArray(commitments)
    ? commitments.filter((item) => item && item.id)
    : [];

  const bestsellers = safeProducts
    .filter((product) => product.isBestseller === true)
    .slice(0, 4);

  const latestNews = safeNews.slice(0, 3);

  const getColorClasses = (scheme?: string) => {
    switch (scheme) {
      case 'green':
        return 'bg-green-50 text-green-600';
      case 'blue':
        return 'bg-blue-50 text-blue-600';
      case 'orange':
        return 'bg-orange-50 text-orange-600';
      case 'purple':
        return 'bg-purple-50 text-purple-600';
      case 'red':
        return 'bg-red-50 text-red-600';
      default:
        return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      <SEOManager
        title="Trang Chủ - Gạo ST25 & Nông Sản Sạch Cao Cấp"
        description="Chào mừng bạn đến với Thịnh Phú Food, nơi cung cấp gạo ST25 và nông sản sạch chất lượng cao."
      />

      {heroBanners.length > 1 ? (
        <HeroSlider banners={heroBanners} />
      ) : heroBanners.length === 1 ? (
        <Hero banners={heroBanners} />
      ) : null}

      <section className="py-6 md:py-8 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {safeCommitments.map((item) => {
            const IconComp = ICON_MAP[item?.iconName] || Heart;

            return (
              <div key={item?.id} className="flex items-center gap-3">
                <div
                  className={`p-2.5 ${getColorClasses(
                    item?.colorScheme
                  )} rounded-xl`}
                >
                  <IconComp className="h-4 w-4 md:h-5 md:w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 text-xs md:text-sm leading-tight">
                    {item?.title || ''}
                  </h3>
                  <p className="text-[11px] md:text-xs text-slate-500 leading-tight">
                    {item?.description || ''}
                  </p>
                </div>
              </div>
            );
          })}

          {safeCommitments.length === 0 && (
            <p className="col-span-full text-center text-slate-400 text-xs italic">
              Chưa có thông tin cam kết.
            </p>
          )}
        </div>
      </section>

      <section className="py-10 md:py-16 bg-gradient-to-b from-white to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative order-2 lg:order-1 group">
              <div className="absolute -inset-4 bg-gradient-to-br from-green-50 to-green-100 rounded-[3rem] -rotate-2 transition-all duration-700 ease-out group-hover:rotate-0 shadow-lg shadow-green-200/30" />

              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl border border-white/50 bg-white">
                <img
                  src={safeAbout.imageUrl || ''}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Về Thịnh Phú Food"
                />
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-50 hidden md:block">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-md shadow-primary/40">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900">
                      {safeAbout?.stats?.value2 || ''}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {safeAbout?.stats?.label2 || ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div className="space-y-4">
                <span className="inline-block px-4 py-1.5 bg-primary-light/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
                  Câu chuyện thương hiệu
                </span>

                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight whitespace-pre-line tracking-tight">
                  {safeAbout.title}
                </h2>

                <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium">
                  {safeAbout.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-6 md:py-8 border-y border-slate-100">
                <div>
                  <p className="text-5xl font-extrabold text-primary mb-2 tracking-tight">
                    {safeAbout?.stats?.value1 || ''}
                  </p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {safeAbout?.stats?.label1 || ''}
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-black text-slate-900 mb-1">
                    ST25
                  </p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Gạo ngon nhất TG
                  </p>
                </div>
              </div>

              <Link
                href={safeAbout.buttonLink || '/'}
                className="inline-flex items-center space-x-3 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-extrabold transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 group"
              >
                <span>{safeAbout.buttonText}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-14 gap-3">
            <div className="text-center md:text-left">
              <div className="inline-block mb-3 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
                Sản phẩm nổi bật
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
                Đặc Sản Bán Chạy
              </h2>
              <p className="text-slate-500">
                Những hạt gạo vàng được tin dùng bởi hàng ngàn gia đình.
              </p>
            </div>

            <Link
              href="/san-pham"
              className="inline-flex items-center text-primary font-bold bg-white px-5 py-3 rounded-xl shadow-sm border border-primary/10 hover:shadow-md hover:-translate-y-1 transition-all group"
            >
              <span>Xem tất cả sản phẩm</span>
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
          </header>

          {bestsellers.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {bestsellers.map((product) => (
                <ProductCard
                  key={product?.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white/60 px-6 py-12 text-center text-slate-500">
              Chưa có sản phẩm nào được đánh dấu bán chạy để hiển thị ở trang chủ.
            </div>
          )}
        </div>
      </section>

      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 text-green-600 font-black uppercase tracking-widest text-xs mb-4">
            <Newspaper className="h-4 w-4" />
            <span>Góc chia sẻ & Tin tức</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-12">
            Cẩm Nang Sống Khỏe
          </h2>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {latestNews.map((post) => (
              <Link
                key={post?.id}
                href={post?.slug ? `/tin-tuc/${post.slug}` : '#'}
                className="group text-left"
              >
                <div className="aspect-[16/10] rounded-3xl overflow-hidden mb-6 shadow-xl shadow-green-900/5">
                  <img
                    src={post?.image || ''}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt={post?.title || ''}
                  />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
                  {post?.title || ''}
                </h3>

                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                  {post?.summary || ''}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
