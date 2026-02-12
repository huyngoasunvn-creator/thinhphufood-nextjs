
import React from 'react';
// Use next/link instead of react-router-dom
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

const CartEmpty: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
      <ShoppingBag className="h-12 w-12 text-green-300" />
    </div>
    <h2 className="text-2xl font-bold text-slate-900 mb-2">Giỏ hàng đang trống</h2>
    <p className="text-slate-500 mb-8 max-w-xs">Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng của mình.</p>
    <Link
      href="/products"
      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-green-200"
    >
      Tiếp tục mua sắm
    </Link>
  </div>
);

export default CartEmpty;
