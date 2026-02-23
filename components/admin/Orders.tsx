
import React, { useState, useMemo, useEffect } from 'react';
import { Eye, Printer, Search, Filter } from 'lucide-react';
import { Order } from '../../types';
import OrderStats from '../../components/admin/orders/OrderStats';
import OrderDetailModal from '../../components/admin/orders/OrderDetailModal';

interface AdminOrdersProps {
  orders: Order[];
  onUpdateOrders: (orders: Order[]) => void;
}

const AdminOrders: React.FC<AdminOrdersProps> = ({ orders, onUpdateOrders }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<Order['status'] | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            order.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
      return matchesSearch && matchesStatus;
    }).sort((a, b) => b.id.localeCompare(a.id));
  }, [orders, searchTerm, filterStatus]);

  const handleUpdateStatus = (id: string, status: Order['status']) => {
    const updatedOrders = orders.map(o => o.id === id ? { ...o, status } : o);
    onUpdateOrders(updatedOrders);
    
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status });
    }
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'shipping': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <OrderStats orders={orders} />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Tìm mã ĐH hoặc khách hàng..." 
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 text-sm shadow-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
        </div>
        
        <div className="flex items-center space-x-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto max-w-full scroll-hide">
          {(['all', 'pending', 'shipping', 'completed', 'cancelled'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all whitespace-nowrap ${filterStatus === s ? 'bg-green-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {s === 'all' ? 'Tất cả' : s === 'pending' ? 'Chờ duyệt' : s === 'shipping' ? 'Đang giao' : s === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Mã Đơn hàng</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Khách hàng</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Tổng tiền</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Ngày đặt</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Xử lý</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 group transition-colors">
                  <td className="px-8 py-5 text-sm font-black text-slate-900">#{order.id}</td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold text-slate-900">{order.customerName}</p>
                    <p className="text-xs text-slate-400 font-medium">{order.phone}</p>
                  </td>
                  <td className="px-8 py-5 text-sm font-black text-green-700">{order.total.toLocaleString()}đ</td>
                  <td className="px-8 py-5 text-sm text-slate-500 font-medium">{order.createdAt}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter shadow-sm ${getStatusStyle(order.status)}`}>
                      {order.status === 'pending' ? 'Chờ duyệt' : 
                       order.status === 'shipping' ? 'Đang giao' : 
                       order.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end space-x-1">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="p-2.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all"
                        title="Xem chi tiết & Xử lý"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all" title="In đơn hàng">
                        <Printer className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center">
                      <Filter className="h-10 w-10 text-slate-200 mb-4" />
                      <p className="text-slate-400 font-bold">Không tìm thấy đơn hàng nào phù hợp</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailModal 
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
};

export default AdminOrders;
