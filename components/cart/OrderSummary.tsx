
import React from 'react';
import { Send, Truck, CreditCard } from 'lucide-react';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  itemsCount: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, shipping, total, itemsCount }) => (
  <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 sticky top-24">
    <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Tóm tắt đơn hàng</h2>
    <div className="space-y-4 mb-8">
      <div className="flex justify-between text-sm">
        <span className="text-slate-400 font-medium">Tạm tính ({itemsCount} mặt hàng)</span>
        <span className="font-bold text-slate-900">{subtotal.toLocaleString('vi-VN')}đ</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-slate-400 font-medium">Phí giao hàng</span>
        <span className="font-bold text-slate-900">
          {shipping === 0 ? <span className="text-green-600 font-black tracking-wide">MIỄN PHÍ</span> : `${shipping.toLocaleString('vi-VN')}đ`}
        </span>
      </div>
      {shipping > 0 && (
        <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-[10px] text-blue-700 leading-relaxed italic">
          Mua thêm <strong>{(500000 - subtotal).toLocaleString('vi-VN')}đ</strong> để được miễn phí giao hàng.
        </div>
      )}
    </div>
    
    <div className="border-t border-slate-100 pt-6 mb-10 flex justify-between items-center">
      <span className="text-base font-black text-slate-900 uppercase">Tổng cộng</span>
      <span className="text-3xl font-black text-green-700">{total.toLocaleString('vi-VN')}đ</span>
    </div>

    <button 
      form="order-form"
      type="submit"
      className="w-full bg-slate-900 hover:bg-green-700 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-2xl shadow-slate-200 active:scale-[0.98] flex items-center justify-center space-x-3 group"
    >
      <span>HOÀN TẤT ĐẶT HÀNG</span>
      <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
    </button>
    
    <div className="mt-8 text-center">
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">Cam kết dịch vụ</p>
      <div className="flex justify-center items-center space-x-6">
        <div className="flex flex-col items-center">
          <div className="p-2 bg-slate-50 rounded-lg mb-1"><Truck className="h-4 w-4 text-slate-400" /></div>
          <span className="text-[8px] font-bold text-slate-400 uppercase">Giao hàng 2h</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-2 bg-slate-50 rounded-lg mb-1"><CreditCard className="h-4 w-4 text-slate-400" /></div>
          <span className="text-[8px] font-bold text-slate-400 uppercase">Bảo mật thanh toán</span>
        </div>
      </div>
    </div>
  </div>
);

export default OrderSummary;
