'use client';

import React from 'react';
import AboutUs from '@/components/AboutUs';
import { useGlobalSettings } from '@/hooks/useGlobalSettings';

export default function AboutUsPage() {
  const { aboutPage } = useGlobalSettings();

  return <AboutUs config={aboutPage} />;
}
