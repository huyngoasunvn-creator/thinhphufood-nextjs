
'use client';

import React from 'react';
import AdminBanners from '../../../pages/admin/Banners';
import { useAppState } from '../../../hooks/useAppState';

export default function AdminBannersPage() {
  const { banners, saveBanners } = useAppState();

  return <AdminBanners banners={banners} onUpdate={saveBanners} />;
}
