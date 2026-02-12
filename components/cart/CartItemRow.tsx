
import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem } from '../../types';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: string, delta: number) => void;
  onSetQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({ item, onUpdateQuantity, onSetQuantity, onRemoveItem }) => (
  <div className="py-6 flex items-center space-x-4">
    <div className="w-20 h-20 flex-shrink-0 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{item.name}</h3>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-0.5">{item.category}</p>
        </div>
        <button
          onClick={() => onRemoveItem(item.id)}
          className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-100 p-0.5 shadow-sm">
          <button
            onClick={() => onUpdateQuantity(item.id, -1)}
            className="p-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
            disabled={item.quantity <= 1}
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <input 
            type="number" 
            min="1"
            className="w-12 text-center text-sm font-black text-slate-900 bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={item.quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              onSetQuantity(item.id, isNaN(val) ? 1 : Math.max(1, val));
            }}
          />
          <button
            onClick={() => onUpdateQuantity(item.id, 1)}
            className="p-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="text-right">
          <div className="text-sm font-black text-green-700">
            {(item.price * item.quantity).toLocaleString('vi-VN')}đ
          </div>
          <div className="text-[10px] text-slate-400">
            {item.price.toLocaleString('vi-VN')}đ / {item.unit}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CartItemRow;
