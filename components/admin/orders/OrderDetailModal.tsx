
import React from 'react';
import { X, Printer, Package, User, MapPin, Phone, MessageSquare, CreditCard } from 'lucide-react';
import { Order } from '../../../types';

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
  onUpdateStatus: (id: string, status: Order['status']) => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ order, onClose, onUpdateStatus }) => {
  const subtotal = order.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || (order.total - order.shippingFee);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-xl font-black text-slate-900">Chi tiết đơn hàng #{order.id}</h3>
            <p className="text-xs text-slate-500 font-medium">Ngày đặt: {order.createdAt}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scroll">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Cột trái: Thông tin khách & Sản phẩm */}
            <div className="space-y-8">
              <section className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center mb-6">
                  <User className="h-3 w-3 mr-2 text-green-600" /> Thông tin nhận hàng
                </h4>
                <div className="space-y-4">
                   <div>
                      <p className="text-sm font-black text-slate-900">{order.customerName}</p>
                      <p className="text-xs text-slate-500 flex items-center mt-1"><Phone className="h-3 w-3 mr-1.5" /> {order.phone}</p>
                   </div>
                   <div className="flex items-start">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 mt-0.5 mr-2 shrink-0" />
                      <p className="text-xs text-slate-600 leading-relaxed font-medium italic">{order.address}</p>
                   </div>
                   <div className="flex items-center text-xs text-slate-500 font-bold bg-white p-2.5 rounded-xl border border-slate-200">
                      <CreditCard className="h-3.5 w-3.5 mr-2 text-blue-500" />
                      Hình thức: {order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng'}
                   </div>
                   {order.note && (
                     <div className="flex items-start bg-yellow-50 p-3 rounded-xl border border-yellow-100">
                        <MessageSquare className="h-3.5 w-3.5 text-yellow-600 mt-0.5 mr-2 shrink-0" />
                        <p className="text-[11px] text-yellow-800 font-medium">{order.note}</p>
                     </div>
                   )}
                </div>
              </section>

              <section>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center mb-4">
                  <Package className="h-3 w-3 mr-2 text-green-600" /> Danh sách sản phẩm ({order.items?.length || 0})
                </h4>
                <div className="space-y-3">
                  {order.items?.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 bg-white p-3 rounded-2xl border border-slate-100 hover:shadow-sm transition-all">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-slate-900 truncate">{item.name}</h5>
                        <p className="text-[10px] text-slate-400 font-bold mt-0.5">{item.quantity} {item.unit} x {item.price.toLocaleString()}đ</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black text-slate-900">{(item.price * item.quantity).toLocaleString()}đ</p>
                      </div>
                    </div>
                  ))}
                  {(!order.items || order.items.length === 0) && (
                    <div className="text-center py-6 border-2 border-dashed border-slate-100 rounded-2xl">
                      <p className="text-xs text-slate-400 italic">Dữ liệu sản phẩm cũ (Không còn bản ghi chi tiết)</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Cột phải: Xử lý & Thanh toán */}
            <div className="space-y-8">
              <section className="bg-slate-900 p-6 rounded-[2rem] text-white shadow-xl shadow-slate-900/10">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Trạng thái xử lý</h4>
                <div className="grid grid-cols-2 gap-3">
                  {(['pending', 'shipping', 'completed', 'cancelled'] as const).map((s) => (
                    <button 
                      key={s}
                      onClick={() => onUpdateStatus(order.id, s)}
                      className={`px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                        order.status === s 
                        ? (s === 'pending' ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/20' : 
                           s === 'shipping' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 
                           s === 'completed' ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 
                           'bg-red-500 text-white shadow-lg shadow-red-500/20')
                        : 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-white border border-white/5'
                      }`}
                    >
                      {s === 'pending' ? 'Chờ duyệt' : s === 'shipping' ? 'Đang giao' : s === 'completed' ? 'Hoàn thành' : 'Hủy đơn'}
                    </button>
                  ))}
                </div>
              </section>

              <section className="bg-white p-8 rounded-[2rem] border border-slate-200 space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tổng kết thanh toán</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-medium">Tạm tính:</span>
                    <span className="font-bold text-slate-900">{subtotal.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-medium">Phí giao hàng:</span>
                    <span className="font-bold text-green-600">{order.shippingFee === 0 ? 'MIỄN PHÍ' : `${order.shippingFee.toLocaleString()}đ`}</span>
                  </div>
                  <div className="pt-4 border-t border-dashed border-slate-100 flex justify-between items-end">
                    <span className="text-sm font-black text-slate-900 uppercase">Tổng cộng:</span>
                    <span className="text-3xl font-black text-green-700">{order.total.toLocaleString()}đ</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-slate-100 flex justify-between bg-white">
          <button className="flex items-center space-x-2 text-slate-500 hover:text-slate-900 font-bold text-sm transition-all group">
            <Printer className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span>In hóa đơn đơn hàng</span>
          </button>
          <button 
            onClick={onClose}
            className="bg-slate-900 text-white px-10 py-3 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
      
      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default OrderDetailModal;
