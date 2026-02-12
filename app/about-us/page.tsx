
'use client';

import React from 'react';
import AboutUs from '../../pages/AboutUs';
import { useAppState } from '../../hooks/useAppState';

export default function AboutUsPage() {
  const { aboutPage } = useAppState();

  return <AboutUs config={aboutPage} />;
}
