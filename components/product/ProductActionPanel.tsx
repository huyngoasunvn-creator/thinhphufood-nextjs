
import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product } from '../../types';

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
    <div className="flex flex-col sm:flex-row gap-6 pt-4 sticky bottom-0 bg-white/80 backdrop-blur-md py-4">
      {/* Bộ chọn số lượng */}
      <div className="flex items-center bg-slate-100 border border-slate-200 rounded-2xl h-16 px-3 shadow-inner">
        <button 
          onClick={() => handleQtyChange(-1)}
          className="p-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all disabled:bg-slate-300 shadow-sm"
          disabled={qty <= 1}
        >
          <Minus className="h-5 w-5" />
        </button>
        <input 
          type="number" 
          min="1"
          className="w-16 text-center font-black text-xl text-slate-900 bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          value={qty}
          onChange={handleInputQtyChange}
        />
        <button 
          onClick={() => handleQtyChange(1)}
          className="p-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all shadow-sm"
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
        className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white h-16 rounded-2xl font-bold text-xl flex items-center justify-center space-x-3 transition-all shadow-xl shadow-green-100 active:scale-95"
      >
        <ShoppingCart className="h-7 w-7" />
        <span>{product.stock > 0 ? 'Thêm Vào Giỏ Hàng' : 'Hết hàng'}</span>
      </button>
    </div>
  );
};

export default ProductActionPanel;
