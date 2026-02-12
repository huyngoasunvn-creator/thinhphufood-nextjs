
'use client';

import React from 'react';
import AdminNews from '../../../pages/admin/News';
import { useAppState } from '../../../hooks/useAppState';

export default function AdminNewsPage() {
  const { news, saveNews } = useAppState();

  return <AdminNews news={news} onUpdate={saveNews} />;
}
