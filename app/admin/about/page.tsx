'use client'

import { useAppState } from '@/hooks/useAppState'
import AboutConfig from '@/pages/admin/AboutConfig'

export default function AdminAboutPage() {
  const { aboutConfig, saveAboutConfig } = useAppState()

  return (
    <AboutConfig
      config={aboutConfig}
      onUpdate={saveAboutConfig}
    />
  )
}
