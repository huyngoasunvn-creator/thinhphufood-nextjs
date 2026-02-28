'use client';

import { useAppState } from '@/hooks/useAppState'
import AboutPageConfig from '@/components/admin/config/AboutPageConfig'
export const dynamic = "force-dynamic";

export default function AdminAboutPageEmbed() {
  const { aboutPage, saveAboutPage } = useAppState()

  return (
    <AboutPageConfig 
      config={aboutPage}
      onUpdate={saveAboutPage}
    />
  )
}