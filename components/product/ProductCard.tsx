'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product?: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  const { addToCart } = useCart();

  if (!product || !product.id) return null;

  const imageUrl = product.images?.[0] || "/placeholder.jpg";
  const productName = product.name || "Sản phẩm";
  const productSlug = product.slug || "";
  const price = typeof product.price === "number" ? product.price : 0;
  const canAddToCart = price > 0;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: price,
      images: product.images || [],
      unit: product.unit || "",
      category: product.category || "",
    });
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">

      {/* IMAGE */}
      <div className="relative aspect-[4/3] overflow-hidden">

        {product.isBestseller && (
          <span className="absolute top-3 left-3 z-10 bg-yellow-400 text-yellow-900 text-[10px] font-bold uppercase px-2 py-1 rounded-full shadow-sm">
            Bán chạy
          </span>
        )}

        <button className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 transition-colors">
          <Heart className="h-4 w-4" />
        </button>

        <Link href={`/san-pham/${productSlug}`}>
          <img
            src={imageUrl}
            alt={productName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* ADD TO CART (Desktop hover only) */}
        {canAddToCart && (
          <div className="hidden md:block absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              className="w-full bg-green-600 text-white py-2.5 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-green-700 active:scale-95 transition-all shadow-lg shadow-green-600/20"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Thêm vào giỏ</span>
            </button>
          </div>
        )}

      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1">

        <Link href={`/san-pham/${productSlug}`}>
          <h3 className="text-sm md:text-base font-semibold text-slate-900 line-clamp-2 min-h-[42px] hover:text-green-600 transition-colors">
            {productName}
          </h3>
        </Link>

        <p className="text-xs text-slate-500 mt-1 line-clamp-1">
          {product.category || ""}
        </p>

        <div className="flex-1" />

        {/* PRICE + BUTTON AREA */}
        <div className="mt-3">

          {price > 0 ? (
            <>
              <div className="flex items-end justify-between mb-2">
                <div>
                  <span className="text-lg font-bold text-green-700">
                    {price.toLocaleString('vi-VN')}đ
                  </span>
                  <span className="text-[10px] text-slate-400 ml-1">
                    /{product.unit || ""}
                  </span>
                </div>

                {(product.stock ?? 0) < 20 && (
                  <span className="text-[10px] text-orange-500 font-medium italic">
                    Sắp hết
                  </span>
                )}
              </div>

              {/* MOBILE ADD TO CART */}
              <button
                onClick={handleAddToCart}
                className="md:hidden w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 active:scale-95 transition"
              >
                Thêm vào giỏ
              </button>
            </>
          ) : (
            <a
              href="https://zalo.me/0978529390"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-sm font-semibold text-white bg-green-600 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Liên hệ
            </a>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProductCard;