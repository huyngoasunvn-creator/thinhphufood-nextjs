'use client';

import React from 'react';
import AboutConfig from '@/components/admin/config/AboutConfig';
import HomePageConfig from '@/components/admin/config/HomePageConfig';
import { useGlobalSettings } from '@/hooks/useGlobalSettings';

export default function AdminConfigPage() {
  const {
    aboutConfig,
    homePageConfig,
    saveAboutConfig,
    saveHomePageConfig,
  } = useGlobalSettings();

  return (
    <div className="space-y-10">
      <HomePageConfig
        config={homePageConfig}
        onUpdate={saveHomePageConfig}
      />
      <AboutConfig config={aboutConfig} onUpdate={saveAboutConfig} />
    </div>
  );
}
