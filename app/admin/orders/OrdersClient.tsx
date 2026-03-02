'use client';

import AdminOrders from '@/components/admin/Orders';
import { useAppState } from '@/hooks/useAppState';

export default function OrdersClient() {
  const { orders, updateOrder } = useAppState();

  return (
    <AdminOrders
      orders={orders}
      onUpdateOrders={updateOrder}
    />
  );
}