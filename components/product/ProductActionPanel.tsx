'use client'

import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product } from '@/types';

interface ProductActionPanelProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductActionPanel: React.FC<ProductActionPanelProps> = ({ product, onAddToCart }) => {
  const [qty, setQty] = useState(1);

  const handleQtyChange = (delta: number) => {
    setQty(prev => Math.max(1, prev + delta));
  };

  const handleInputQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQty(isNaN(value) ? 1 : Math.max(1, value));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-2 md:pt-4 bg-white">
      {/* Bộ chọn số lượng */}
      <div className="flex items-center justify-between bg-slate-100 rounded-2xl h-12 px-2">
        <button 
          onClick={() => handleQtyChange(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm active:scale-95 transition disabled:opacity-40"
          disabled={qty <= 1}
        >
          <Minus className="h-5 w-5" />
        </button>
        <input 
          type="number" 
          min="1"
          className="w-10 text-center font-bold text-base text-slate-900 bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          value={qty}
          onChange={handleInputQtyChange}
        />
        <button 
          onClick={() => handleQtyChange(1)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-green-600 text-white shadow-md shadow-green-600/20 active:scale-95 transition"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <button 
        onClick={() => {
          onAddToCart(product, qty);
          alert(`Đã thêm ${qty} ${product.unit} ${product.name} vào giỏ hàng!`);
        }}
        disabled={product.stock <= 0}
        className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white h-12 md:h-14 rounded-2xl font-semibold text-base md:text-lg flex items-center justify-center space-x-2 transition-all shadow-lg shadow-green-600/30 active:scale-95"
      >
        <ShoppingCart className="h-7 w-7" />
        <span>{product.stock > 0 ? 'Thêm Vào Giỏ Hàng' : 'Hết hàng'}</span>
      </button>
    </div>
  );
};

export default ProductActionPanel;
