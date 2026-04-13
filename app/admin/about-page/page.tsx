'use client';

import AboutPageConfig from '@/components/admin/config/AboutPageConfig';
import { useGlobalSettings } from '@/hooks/useGlobalSettings';

export const dynamic = 'force-dynamic';

export default function AdminAboutPageEmbed() {
  const { aboutPage, saveAboutPage } = useGlobalSettings();

  return <AboutPageConfig config={aboutPage} onUpdate={saveAboutPage} />;
}
