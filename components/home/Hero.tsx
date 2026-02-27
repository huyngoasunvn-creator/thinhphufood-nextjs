import React, { useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Banner } from '@/types';

interface HeroProps {
  banners?: Banner[]; // 🔒 cho phép undefined
}

const Hero: React.FC<HeroProps> = ({ banners = [] }) => {

  // 🔒 Làm sạch dữ liệu
  const safeBanners = Array.isArray(banners)
    ? banners.filter((b) => b && b.id)
    : [];

  const activeBanner = useMemo(() => {
    return safeBanners.find(
      (b) => b.placement === 'Trang chủ' && b.isActive
    );
  }, [safeBanners]);

  if (!activeBanner) return null;

  return (
    <section className="relative h-[450px] sm:h-[500px] lg:h-[650px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={activeBanner.imageUrl || '/placeholder.jpg'}
          alt={activeBanner.title || ''}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: activeBanner.overlayOpacity ?? 0.4 }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent md:from-black/40 md:via-transparent"></div>
      </div>

      <div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ color: activeBanner.textColor || '#ffffff' }}
      >
        <div className="max-w-2xl space-y-4 sm:space-y-6">
          <span className="inline-flex items-center px-4 py-1.5 bg-green-600 rounded-full text-xs font-bold text-white">
            🌾 Đặc sản nông sản chính gốc
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold">
            {activeBanner.title || ''}
          </h1>

          {activeBanner.subtitle && (
            <p className="text-sm sm:text-lg opacity-90 max-w-lg">
              {activeBanner.subtitle}
            </p>
          )}

          <div className="flex flex-wrap gap-4 pt-4">
            {activeBanner.link && (
              <Link
                href={activeBanner.link}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold flex items-center space-x-2"
              >
                <span>{activeBanner.buttonText || 'Xem Ngay'}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            )}

            <Link
              href="/about-us"
              className="bg-white/10 text-white border border-white/30 px-8 py-4 rounded-full font-bold"
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