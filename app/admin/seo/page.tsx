
'use client';

import React from 'react';
import SEOConfig from '@/components/admin/SEOConfig';
import { useAppState } from '../../../hooks/useAppState';
export const dynamic = "force-dynamic";

export default function AdminSEOPage() {
  const { siteConfig } = useAppState();

  return <SEOConfig config={siteConfig} />;
}
