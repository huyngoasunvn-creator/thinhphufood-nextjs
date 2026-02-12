
'use client';

import React from 'react';
import AdminConfig from '../../../pages/admin/Config';
import { useAppState } from '../../../hooks/useAppState';

export default function AdminConfigPage() {
  const { siteConfig, updateSiteConfig } = useAppState();

  return <AdminConfig config={siteConfig} onUpdate={updateSiteConfig} />;
}
