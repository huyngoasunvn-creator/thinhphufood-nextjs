'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Banner } from '@/types';

interface Props {
  banners: Banner[];
}

export default function HeroSlider({ banners }: Props) {
  if (!banners || banners.length === 0) return null;

  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000 }}
        loop
        pagination={{ clickable: true }}
        navigation={false} // 🔥 TẮT MŨI TÊN TRÊN MOBILE
        className="h-[320px] sm:h-[400px] md:h-[500px] lg:h-[650px]"
      >
        {banners.map((banner) => {
          const buttonText = banner.buttonText?.trim();

          return (
            <SwiperSlide key={banner.id}>
              <div className="relative w-full h-full flex items-center">

                {/* Background */}
                <Image
                  src={banner.imageUrl}
                  alt={banner.title || 'Banner'}
                  fill
                  priority
                  className="object-cover"
                  sizes="100vw"
                />

                {/* Overlay */}
                <div
                  className="absolute inset-0 bg-black"
                  style={{ opacity: banner.overlayOpacity ?? 0.4 }}
                />

                {/* Content */}
                <div
                  className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8"
                  style={{ color: banner.textColor || '#fff' }}
                >
                  <div className="max-w-xl space-y-4 md:space-y-6">

                    {/* Title */}
                    <h2
                      className="
                        font-extrabold
                        leading-tight
                        drop-shadow-xl
                        text-[clamp(20px,5vw,60px)]
                      "
                    >
                      {banner.title?.split('\n').map((line, index) => (
                        <span key={index} className="block">
                          {line}
                        </span>
                      ))}
                    </h2>

                    {/* Subtitle */}
                    {banner.subtitle && (
                      <p className="text-xs sm:text-sm md:text-lg opacity-90 leading-relaxed">
                        {banner.subtitle}
                      </p>
                    )}

                    {/* Button */}
                    {banner.link && buttonText && (
                      <Link
                        href={banner.link}
                        className="
                          inline-block
                          mt-3
                          sm:mt-4
                          bg-green-600
                          hover:bg-green-700
                          text-white
                          px-5 sm:px-6 md:px-8
                          py-2.5 sm:py-3 md:py-4
                          text-sm sm:text-base
                          rounded-full
                          font-bold
                          transition
                        "
                      >
                        {buttonText}
                      </Link>
                    )}

                  </div>
                </div>

              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}