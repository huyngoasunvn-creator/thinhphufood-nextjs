'use client';

import React from 'react';
import AdminOrders from '@/components/admin/Orders';
import { useOrders } from '@/hooks/useOrders';

export default function AdminOrdersPage() {
  const { orders, updateOrder } = useOrders();

  return <AdminOrders orders={orders} onUpdateOrders={updateOrder} />;
}
