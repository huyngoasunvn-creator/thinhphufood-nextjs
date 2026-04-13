'use client';

import React from 'react';
import AdminNews from '@/components/admin/News';
import { useNews } from '@/hooks/useNews';

export default function AdminNewsPage() {
  const { news, saveNews } = useNews();

  return <AdminNews news={news} onUpdate={saveNews} />;
}
