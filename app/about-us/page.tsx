
'use client';

import React from 'react';
import AboutUs from '../../components/AboutUs';
import { useAppState } from '../../hooks/useAppState';

export default function AboutUsPage() {
  const { aboutPage } = useAppState();

  return <AboutUs config={aboutPage} />;
}
