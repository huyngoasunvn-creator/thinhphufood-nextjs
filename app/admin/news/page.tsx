
'use client';

import React from 'react';
import AdminNews from '@/components/admin/News';
import { useAppState } from '../../../hooks/useAppState';
export const dynamic = "force-dynamic";

export default function AdminNewsPage() {
  const { news, saveNews } = useAppState();

  return <AdminNews news={news} onUpdate={saveNews} />;
}
