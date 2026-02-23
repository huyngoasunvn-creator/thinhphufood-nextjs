
'use client';

import React from 'react';
import AdminOrders from '@/components/admin/Orders';
import { useAppState } from '../../../hooks/useAppState';
export const dynamic = "force-dynamic";

export default function AdminOrdersPage() {
  const { orders, saveOrders } = useAppState();

  return <AdminOrders orders={orders} onUpdateOrders={saveOrders} />;
}
