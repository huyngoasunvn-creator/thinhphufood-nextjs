'use client';

import React from 'react';
import SEOConfig from '@/components/admin/SEOConfig';
import { useGlobalSettings } from '@/hooks/useGlobalSettings';

export default function AdminSEOPage() {
  const { siteConfig } = useGlobalSettings();

  return <SEOConfig config={siteConfig} />;
}
