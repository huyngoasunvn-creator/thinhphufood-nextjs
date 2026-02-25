'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ShieldCheck, Truck, Leaf } from 'lucide-react';
import type { Product, SiteConfig } from '@/types';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductTrustBadges from './ProductTrustBadges';

interface ProductDetailProps {
  product: Product;
  config: SiteConfig;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, config }) => {
  

  const discount =
    product.comparePrice && product.comparePrice > product.price
      ? Math.round(
          ((product.comparePrice - product.price) / product.comparePrice) * 100
        )
      : null;

  return (
    <div className="bg-gradient-to-b from-[#f6f9f4] to-white min-h-screen pb-24">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Back */}
        <Link
          href="/san-pham"
          className="inline-flex items-center text-slate-500 hover:text-green-700 mb-10 transition font-medium"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Quay lại cửa hàng
        </Link>

        {/* MAIN SECTION */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT - GALLERY */}
          <div>
            <ProductGallery product={product} />
          </div>

          {/* RIGHT - INFO */}
          <div className="lg:sticky top-28 space-y-8">

            {/* BADGE */}
            {discount && (
              <div className="inline-block bg-red-600 text-white text-sm px-4 py-1 rounded-full font-semibold">
                Giảm {discount}%
              </div>
            )}

            <ProductInfo product={product} />

            {/* STOCK ALERT */}
            {product.stock < 20 && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl text-sm text-yellow-700 font-medium">
                🔥 Chỉ còn {product.stock} sản phẩm – đặt ngay trước khi hết hàng!
              </div>
            )}

            {/* TRUST MINI BADGES */}
            <div className="grid grid-cols-3 gap-4 text-center text-sm mt-6">

              <div className="flex flex-col items-center space-y-2">
                <Leaf className="h-6 w-6 text-green-600" />
                <span className="text-slate-600">Gạo sạch tự nhiên</span>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <ShieldCheck className="h-6 w-6 text-green-600" />
                <span className="text-slate-600">Đạt chuẩn VietGAP</span>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <Truck className="h-6 w-6 text-green-600" />
                <span className="text-slate-600">Giao nhanh 24h</span>
              </div>

            </div>

          </div>
        </div>

        {/* TRUST SECTION */}
        <div className="mt-24">
          <ProductTrustBadges config={config} />
        </div>

        {/* DESCRIPTION */}
        <div className="mt-24 bg-white rounded-[3rem] shadow-sm border border-slate-100 p-10 lg:p-16">

          <header className="flex items-center space-x-4 mb-10 border-b border-slate-100 pb-6">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900">
                Thông tin chi tiết
              </h2>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-tight">
                Nguồn gốc – Chất lượng – Hướng dẫn sử dụng
              </p>
            </div>
          </header>

          <div
            className="prose prose-lg max-w-none prose-slate prose-img:rounded-3xl prose-a:text-green-600 text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

        </div>

      </div>
    </div>
  );
};

export default ProductDetail;