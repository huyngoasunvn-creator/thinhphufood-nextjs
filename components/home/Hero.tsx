
import React, { useMemo } from 'react';
// Use next/link instead of react-router-dom
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Banner } from '../../types';

interface HeroProps {
  banners: Banner[];
}

const Hero: React.FC<HeroProps> = ({ banners }) => {
  // Lấy banner trang chủ đang hoạt động (lấy cái đầu tiên nếu có nhiều)
  const activeBanner = useMemo(() => {
    return banners.find(b => b.placement === 'Trang chủ' && b.isActive);
  }, [banners]);

  if (!activeBanner) return null;

  return (
    <section className="relative h-[450px] sm:h-[500px] lg:h-[650px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={activeBanner.imageUrl}
          alt={activeBanner.title}
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0 bg-black" 
          style={{ opacity: activeBanner.overlayOpacity }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent md:from-black/40 md:via-transparent"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ color: activeBanner.textColor }}>
        <div className="max-w-2xl space-y-4 sm:space-y-6 animate-in slide-in-from-left duration-1000">
          <span className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 bg-green-600/90 backdrop-blur-md rounded-full text-[10px] sm:text-xs md:text-sm font-bold tracking-wider uppercase border border-green-400/30 text-white shadow-lg">
            🌾 Đặc sản nông sản chính gốc
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] sm:leading-[1.1] tracking-tight">
            {activeBanner.title}
          </h1>
          {activeBanner.subtitle && (
            <p className="text-sm sm:text-lg opacity-90 max-w-lg leading-relaxed line-clamp-3 sm:line-clamp-none">
              {activeBanner.subtitle}
            </p>
          )}
          <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
            {activeBanner.link && (
              <Link
                href={activeBanner.link}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold transition-all shadow-xl shadow-green-900/40 flex items-center space-x-2 group text-sm sm:text-base"
              >
                <span>{activeBanner.buttonText || 'Xem Ngay'}</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            <Link
              href="/about-us"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold transition-all text-sm sm:text-base"
            >
              Về Chúng Tôi
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
