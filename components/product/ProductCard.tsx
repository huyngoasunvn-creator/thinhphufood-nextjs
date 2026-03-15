'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  if (!product || !product.id) return null;

  const imageUrl = product.images?.[0] ?? "/placeholder.jpg";
  const productName = product.name || "Sản phẩm";
  const productSlug = product.slug || "";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // không cho link chuyển trang
    e.stopPropagation();
    onAddToCart?.(product);
  };

  return (
    <Link
  href={`/san-pham/${productSlug}`}
  prefetch={true}
  className="block group"
>
      <div className="bg-white rounded-2xl border border-slate-100 hover:border-green-400 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">

        {/* IMAGE */}
        <div className="relative aspect-[1/1] overflow-hidden">

          {product.isBestseller && (
            <span className="absolute top-2 left-2 z-10 bg-green-600 text-white text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full">
              Bán chạy
            </span>
          )}

          <button
            onClick={(e) => e.preventDefault()}
            className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 rounded-full text-slate-400 hover:text-green-600 transition-colors"
          >
            <Heart className="h-3.5 w-3.5" />
          </button>

          <Image
  src={imageUrl}
  alt={productName}
  fill
  sizes="(max-width:768px) 50vw, (max-width:1200px) 25vw, 300px"
  className="object-cover group-hover:scale-105 transition-transform duration-500"
/>

          {/* Hover nhẹ */}
          <div className="absolute inset-0 bg-green-600/0 group-hover:bg-green-600/10 transition duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 text-green-700 text-xs font-semibold bg-white px-3 py-1 rounded-full shadow-sm transition duration-300">
              Xem chi tiết
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-3 py-2 flex flex-col gap-1">

          <h3 className="text-[13px] font-semibold text-green-900 truncate group-hover:text-green-700 transition-colors">
            {productName}
          </h3>

          <p className="text-[12px] text-slate-400 truncate">
            {product.category || ""}
          </p>

          {/* ADD TO CART */}
          {onAddToCart && (
            <button
              onClick={handleAddToCart}
              className="mt-2 flex items-center justify-center gap-1 text-[11px] font-medium bg-green-600 hover:bg-green-700 text-white py-1.5 rounded-lg transition"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              Thêm vào giỏ
            </button>
          )}

        </div>
      </div>
    </Link>
  );
};

export default React.memo(ProductCard);