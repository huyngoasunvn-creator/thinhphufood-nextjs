"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, Truck } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Banner } from "@/types";
import { splitHeroTitle } from "@/components/home/heroTitle";

interface Props {
  banners: Banner[];
}

const TRUST_POINTS = [
  { icon: Leaf, label: "Nguồn gốc rõ ràng" },
  { icon: ShieldCheck, label: "Chọn lọc kỹ lưỡng" },
  { icon: Truck, label: "Hỗ trợ sỉ và lẻ" },
];

export default function HeroSlider({ banners }: Props) {
  const activeBanners = [...(banners || [])]
    .filter((banner) => banner?.isActive)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  if (activeBanners.length === 0) return null;

  const getAlignClass = (align?: Banner["contentAlign"]) => {
    switch (align) {
      case "center":
        return {
          wrapper: "mx-auto text-center items-center",
          inner: "mx-auto",
          buttonWrap: "justify-center",
        };
      case "right":
        return {
          wrapper: "ml-auto text-right items-end",
          inner: "ml-auto",
          buttonWrap: "justify-end",
        };
      default:
        return {
          wrapper: "mr-auto text-left items-start",
          inner: "mr-auto",
          buttonWrap: "justify-start",
        };
    }
  };

  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={activeBanners.length > 1}
        pagination={{ clickable: true }}
        navigation={false}
        className="h-[420px] sm:h-[520px] md:h-[620px] lg:h-[760px]"
      >
        {activeBanners.map((banner) => {
          const mediaType = banner.mediaType || "image";
          const align = getAlignClass(banner.contentAlign);
          const primaryHref = banner.link || "/san-pham";
          const primaryText = banner.buttonText?.trim() || "Xem sản phẩm";
          const hasManualBreaks = Boolean(banner.title?.includes("\n"));
          const headlineLines = splitHeroTitle(banner.title);

          return (
            <SwiperSlide key={banner.id}>
              <div className="relative flex h-full w-full items-center overflow-hidden">
                {mediaType === "video" ? (
                  <video
                    src={banner.imageUrl}
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title || "Banner"}
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                  />
                )}

                <div
                  className="absolute inset-0 bg-slate-950"
                  style={{ opacity: banner.overlayOpacity ?? 0.46 }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.18),transparent_38%),linear-gradient(90deg,rgba(2,6,23,0.88)_0%,rgba(2,6,23,0.58)_45%,rgba(2,6,23,0.3)_100%)]" />

                <div
                  className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8"
                  style={{ color: banner.textColor || "#fff" }}
                >
                  <div
                    className={`flex max-w-2xl flex-col gap-5 md:gap-7 ${align.wrapper}`}
                  >
                    {banner.logoUrl && (
                      <div
                        className={`relative h-14 w-32 md:h-20 md:w-44 ${align.inner}`}
                      >
                        <Image
                          src={banner.logoUrl}
                          alt="Banner logo"
                          fill
                          className="object-contain"
                          sizes="176px"
                        />
                      </div>
                    )}

                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] backdrop-blur-md sm:text-xs">
                      Thịnh Phú Food
                    </span>

                    <h1
                      className={[
                        "text-[clamp(32px,6vw,78px)] font-black tracking-[-0.03em] drop-shadow-2xl",
                        hasManualBreaks
                          ? "max-w-[22ch] leading-[1.02] md:text-[clamp(32px,5.2vw,72px)]"
                          : "max-w-[15ch] leading-[0.98]",
                      ].join(" ")}
                    >
                      {headlineLines.map((line, index) => (
                        <span
                          key={`${line}-${index}`}
                          className={hasManualBreaks ? "block md:whitespace-nowrap" : "block"}
                        >
                          {line}
                        </span>
                      ))}
                    </h1>

                    <p className="max-w-2xl text-sm leading-relaxed opacity-95 sm:text-base md:text-lg">
                      {banner.subtitle ||
                        "Tinh tuyển gạo sạch và nông sản chất lượng cao cho gia đình, đại lý và khách hàng doanh nghiệp."}
                    </p>

                    <div className={`flex flex-wrap gap-3 ${align.buttonWrap}`}>
                      <Link
                        href={primaryHref}
                        className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3.5 font-bold text-white shadow-2xl shadow-green-950/20 transition hover:bg-green-700 md:px-8 md:py-4"
                      >
                        <span>{primaryText}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>

                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-6 py-3.5 font-bold text-white backdrop-blur-md transition hover:bg-white/14 md:px-8 md:py-4"
                      >
                        Nhận báo giá
                      </Link>
                    </div>

                    <div
                      className={`grid gap-3 pt-2 sm:grid-cols-3 ${
                        align.buttonWrap === "justify-center" ? "w-full" : ""
                      }`}
                    >
                      {TRUST_POINTS.map((item) => {
                        const Icon = item.icon;

                        return (
                          <div
                            key={item.label}
                            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/12">
                              <Icon className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-semibold leading-tight">
                              {item.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
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
