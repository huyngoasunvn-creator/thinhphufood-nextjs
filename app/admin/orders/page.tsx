
'use client';

import React from 'react';
import AdminOrders from '../../../pages/admin/Orders';
import { useAppState } from '../../../hooks/useAppState';

export default function AdminOrdersPage() {
  const { orders, saveOrders } = useAppState();

  return <AdminOrders orders={orders} onUpdateOrders={saveOrders} />;
}
