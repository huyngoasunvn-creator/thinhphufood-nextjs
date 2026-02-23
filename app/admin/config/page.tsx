'use client';

import React from 'react';
import AboutConfig from '@/components/admin/config/AboutConfig';
import { useAppState } from '@/hooks/useAppState';

export default function AdminConfigPage() {
  const { aboutConfig, saveAboutConfig } = useAppState();

  return (
    <AboutConfig
      config={aboutConfig}
      onUpdate={saveAboutConfig}
    />
  );
}
