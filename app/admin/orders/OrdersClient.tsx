'use client';

import AdminOrders from '@/components/admin/Orders';
import { useOrders } from '@/hooks/useOrders';

export default function OrdersClient() {
  const { orders, updateOrder } = useOrders();

  return <AdminOrders orders={orders} onUpdateOrders={updateOrder} />;
}
