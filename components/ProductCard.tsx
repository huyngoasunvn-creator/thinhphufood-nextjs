
import React from 'react';
// Use next/link instead of react-router-dom
import Link from 'next/link';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        {product.isBestseller && (
          <span className="absolute top-4 left-4 z-10 bg-yellow-400 text-yellow-900 text-[10px] font-bold uppercase px-2 py-1 rounded-full shadow-sm">
            Bán chạy
          </span>
        )}
        <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 transition-colors">
          <Heart className="h-4 w-4" />
        </button>
        <Link href={`/san-pham/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-green-600 text-white py-2.5 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-green-700 active:scale-95 transition-all shadow-lg shadow-green-600/20"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Thêm vào giỏ</span>
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-1 mb-2">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold text-slate-700">{product.rating}</span>
          <span className="text-xs text-slate-400">(42)</span>
        </div>
        <Link href={`/san-pham/${product.slug}`}>
          <h3 className="text-sm font-semibold text-slate-900 mb-1 line-clamp-2 hover:text-green-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-slate-500 mb-3 line-clamp-1">{product.category}</p>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-lg font-bold text-green-700">{product.price.toLocaleString('vi-VN')}đ</span>
            <span className="text-[10px] text-slate-400 ml-1">/{product.unit}</span>
          </div>
          {product.stock < 20 && (
            <span className="text-[10px] text-orange-500 font-medium italic">Sắp hết hàng</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
