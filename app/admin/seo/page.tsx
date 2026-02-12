
'use client';

import React from 'react';
import SEOConfig from '../../../pages/admin/SEOConfig';
import { useAppState } from '../../../hooks/useAppState';

export default function AdminSEOPage() {
  const { siteConfig } = useAppState();

  return <SEOConfig config={siteConfig} />;
}
