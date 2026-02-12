
import React from 'react';
import { ShoppingBag, Truck, CheckCircle, XCircle } from 'lucide-react';
import { Order } from '../../../types';

interface OrderStatsProps {
  orders: Order[];
}

const OrderStats: React.FC<OrderStatsProps> = ({ orders }) => {
  const getCount = (status: Order['status']) => orders.filter(o => o.status === status).length;

  const stats = [
    { label: 'Chờ xử lý', value: getCount('pending'), icon: ShoppingBag, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Đang giao', value: getCount('shipping'), icon: Truck, color: 'bg-blue-50 text-blue-600' },
    { label: 'Hoàn thành', value: getCount('completed'), icon: CheckCircle, color: 'bg-green-50 text-green-600' },
    { label: 'Đã hủy', value: getCount('cancelled'), icon: XCircle, color: 'bg-red-50 text-red-600' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-green-300 transition-all">
          <div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
          </div>
          <div className={`p-3 ${stat.color} rounded-2xl transition-transform group-hover:scale-110`}>
            <stat.icon className="h-6 w-6" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStats;
