'use client';

import React from 'react';
import AboutConfig from '@/components/admin/config/AboutConfig';
import { useGlobalSettings } from '@/hooks/useGlobalSettings';

export default function AdminConfigPage() {
  const { aboutConfig, saveAboutConfig } = useGlobalSettings();

  return <AboutConfig config={aboutConfig} onUpdate={saveAboutConfig} />;
}
