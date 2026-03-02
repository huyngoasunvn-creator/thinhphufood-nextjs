import React from 'react';
import { Info } from 'lucide-react';
import { Product, SiteConfig } from '@/types';
import Link from "next/link";

interface ProductInfoProps {
  product: Product;
  siteConfig?: SiteConfig;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, siteConfig }) => {
  // ✅ Chuẩn hoá giá an toàn
  const price = typeof product.price === "number" ? product.price : 0;
  const isContactOnly = !price || price <= 0;

  const hasStock = typeof product.stock === "number" && product.stock > 0;

  return (
    <div className="space-y-8">
      <div>
        {product.category && (
          <span className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest">
            {product.category}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4 leading-tight">
          {product.name}
        </h1>

        {/* Stock chỉ hiển thị khi có giá */}
        {siteConfig?.showStock && !isContactOnly && (
          <div className="flex items-center space-x-3 mt-4">
            <div className="h-4 w-px bg-slate-200"></div>

            <span
              className={`text-sm font-bold ${
                hasStock ? "text-green-600" : "text-red-500"
              }`}
            >
              {hasStock
                ? `Còn ${product.stock} ${product.unit ?? ""} trong kho`
                : "Hết hàng"}
            </span>
          </div>
        )}
      </div>

      {/* ✅ PRICE BLOCK */}
      {/* PRICE BLOCK */}
<div className="bg-green-50/50 p-6 rounded-3xl border border-green-100">
  {!isContactOnly ? (
    <div className="flex items-baseline space-x-3">
      <span className="text-4xl font-black text-green-700">
        {price.toLocaleString("vi-VN")}đ
      </span>

      {product.unit && (
        <span className="text-slate-400 font-bold text-lg">
          / {product.unit}
        </span>
      )}
    </div>
  ) : (
    <Link
      href="/contact"
      className="inline-flex items-center justify-center w-full bg-green-600 text-white font-bold py-4 rounded-2xl text-lg hover:bg-green-700 transition-all active:scale-95 shadow-lg shadow-green-600/20"
    >
      Liên hệ để nhận báo giá
    </Link>
  )}
</div>

      {/* Short Description */}
      {product.shortDescription && (
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center">
            <Info className="h-3 w-3 mr-2 text-green-600" />
            Tóm tắt sản phẩm
          </h3>

          <p className="text-slate-600 leading-relaxed font-medium">
            {product.shortDescription}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;