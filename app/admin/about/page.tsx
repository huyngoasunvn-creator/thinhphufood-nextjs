'use client';

import { useAppState } from '@/hooks/useAppState'
import AboutConfig from '@/components/admin/config/AboutConfig'
export const dynamic = "force-dynamic";

export default function AdminAboutPage() {
  const { aboutConfig, saveAboutConfig } = useAppState()

  return (
    <AboutConfig
      config={aboutConfig}
      onUpdate={saveAboutConfig}
    />
  )
}