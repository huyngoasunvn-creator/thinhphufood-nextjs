
import React from 'react';
import { Star, Info } from 'lucide-react';
import { Product, SiteConfig } from '../../types';

interface ProductInfoProps {
  product: Product;
  siteConfig: SiteConfig;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, siteConfig }) => (
  <div className="space-y-8">
    <div>
      <span className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest">
        {product.category}
      </span>
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4 leading-tight">
        {product.name}
      </h1>
      <div className="flex items-center space-x-6 mt-6">
        <div className="flex items-center text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
          ))}
          <span className="ml-2 font-bold text-slate-700">{product.rating}</span>
        </div>
        {siteConfig.showStock && (
          <>
            <div className="h-4 w-px bg-slate-200"></div>
            <span className={`text-sm font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {product.stock > 0 ? `Còn ${product.stock} ${product.unit} trong kho` : 'Hết hàng'}
            </span>
          </>
        )}
      </div>
    </div>

    <div className="bg-green-50/50 p-6 rounded-3xl border border-green-100 flex items-baseline space-x-3">
      <span className="text-4xl font-black text-green-700">{product.price.toLocaleString('vi-VN')}đ</span>
      <span className="text-slate-400 font-bold text-lg">/ {product.unit}</span>
    </div>

    {/* Short Description Section */}
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

export default ProductInfo;
