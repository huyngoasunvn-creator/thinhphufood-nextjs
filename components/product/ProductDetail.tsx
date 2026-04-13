'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Truck,
  Leaf,
} from 'lucide-react';
import type { Product, SiteConfig } from '@/types';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductTrustBadges from './ProductTrustBadges';
import ProductActionPanel from './ProductActionPanel';
import ProductCard from './ProductCard';
import { useCart } from '@/context/CartContext';

interface ProductDetailProps {
  product: Product;
  config: SiteConfig;
  relatedProducts?: Product[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  config,
  relatedProducts = [],
}) => {
  const { addToCart } = useCart();

  // Chuẩn hóa giá để giữ đúng logic hiển thị.
  const price = typeof product.price === 'number' ? product.price : 0;
  const isContactOnly = !price || price <= 0;

  const discount =
    !isContactOnly &&
    product.comparePrice &&
    product.comparePrice > price
      ? Math.round(
          ((product.comparePrice - price) / product.comparePrice) * 100
        )
      : null;

  return (
    <div className="bg-gradient-to-b from-[#f6f9f4] to-white min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <Link
          href="/san-pham"
          className="inline-flex items-center text-slate-500 hover:text-green-700 mb-10 transition font-medium"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Quay lại cửa hàng
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <ProductGallery product={product} />
          </div>

          <div className="lg:sticky top-28 space-y-8">
            {discount && (
              <div className="inline-block bg-red-600 text-white text-sm px-4 py-1 rounded-full font-semibold">
                Giảm {discount}%
              </div>
            )}

            <ProductInfo product={product} />

            {product.stock < 20 && !isContactOnly && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl text-sm text-yellow-700 font-medium">
                Chỉ còn {product.stock} sản phẩm, đặt ngay trước khi hết hàng!
              </div>
            )}

            {!isContactOnly && (
              <ProductActionPanel
                product={product}
                onAddToCart={(currentProduct, _quantity) => {
                  addToCart({
                    id: currentProduct.id,
                    name: currentProduct.name,
                    price,
                    images: currentProduct.images ?? [],
                    unit: currentProduct.unit ?? '',
                    category: currentProduct.category ?? '',
                  });
                }}
              />
            )}

            <div className="grid grid-cols-3 gap-4 text-center text-sm mt-6">
              <div className="flex flex-col items-center space-y-2">
                <Leaf className="h-6 w-6 text-green-600" />
                <span className="text-slate-600">Gạo sạch tự nhiên</span>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <ShieldCheck className="h-6 w-6 text-green-600" />
                <span className="text-slate-600">Chuẩn an toàn</span>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <Truck className="h-6 w-6 text-green-600" />
                <span className="text-slate-600">Giao nhanh 24h</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <ProductTrustBadges config={config} />
        </div>

        <div className="mt-14 md:mt-24 bg-white rounded-3xl md:rounded-[3rem] shadow-sm border border-slate-100 p-6 md:p-10 lg:p-16">
          <header className="flex items-center space-x-4 mb-10 border-b border-slate-100 pb-6">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-3xl font-black text-slate-900">
                Thông tin chi tiết
              </h2>
            </div>
          </header>

          <div
            className="prose prose-lg max-w-none prose-slate prose-img:rounded-3xl prose-a:text-green-600 text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.description ?? '' }}
          />
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-14 md:mt-24">
            <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <span className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest">
                  Xem thêm
                </span>
                <h2 className="mt-4 text-2xl md:text-4xl font-black text-slate-900">
                  Sản phẩm khác dành cho bạn
                </h2>
                <p className="mt-3 text-slate-500">
                  Gợi ý thêm một vài lựa chọn cùng nhóm để bạn dễ so sánh và chọn nhanh hơn.
                </p>
              </div>

              <Link
                href="/san-pham"
                className="inline-flex items-center gap-2 text-green-700 font-bold hover:text-green-800 transition"
              >
                Xem tất cả sản phẩm
                <ArrowRight className="h-4 w-4" />
              </Link>
            </header>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
