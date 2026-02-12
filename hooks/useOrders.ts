
import { useState, useEffect } from 'react';
import { Order } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';

const INITIAL_ORDERS_MOCK: Order[] = [
  { 
    id: 'DH001', 
    customerName: 'Nguyễn Văn A', 
    phone: '0987654321', 
    address: '123 Cách Mạng Tháng 8, Quận 3, TP.HCM',
    items: [
      { ...INITIAL_PRODUCTS[0], quantity: 2 },
      { ...INITIAL_PRODUCTS[1], quantity: 1 }
    ],
    shippingFee: 0,
    total: 115000, 
    status: 'pending', 
    createdAt: '12/05/2024',
    paymentMethod: 'cod',
    note: 'Giao sau 5h chiều'
  },
  { 
    id: 'DH002', 
    customerName: 'Trần Thị B', 
    phone: '0123456789', 
    address: '456 Lê Lợi, Quận 1, TP.HCM',
    items: [
      { ...INITIAL_PRODUCTS[2], quantity: 5 }
    ],
    shippingFee: 30000,
    total: 170000, 
    status: 'shipping', 
    createdAt: '11/05/2024',
    paymentMethod: 'transfer'
  },
];

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem('thinhphu_orders') || JSON.stringify(INITIAL_ORDERS_MOCK)));
  }, []);

  const addOrder = (order: Order) => {
    const updated = [order, ...orders];
    setOrders(updated);
    localStorage.setItem('thinhphu_orders', JSON.stringify(updated));
  };

  const saveOrders = (updated: Order[]) => {
    setOrders(updated);
    localStorage.setItem('thinhphu_orders', JSON.stringify(updated));
  };

  return { orders, addOrder, saveOrders };
};
