
'use client';

import React from 'react';
import AdminBanners from '@/components/admin/Banners';
import { useAppState } from '../../../hooks/useAppState';
export const dynamic = "force-dynamic";

export default function AdminBannersPage() {
  const { banners, saveBanners } = useAppState();

  return <AdminBanners banners={banners} onUpdate={saveBanners} />;
}
