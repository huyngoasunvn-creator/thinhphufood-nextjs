'use client';

import AboutConfig from '@/components/admin/config/AboutConfig';
import { useGlobalSettings } from '@/hooks/useGlobalSettings';

export const dynamic = 'force-dynamic';

export default function AdminAboutPage() {
  const { aboutConfig, saveAboutConfig } = useGlobalSettings();

  return <AboutConfig config={aboutConfig} onUpdate={saveAboutConfig} />;
}
