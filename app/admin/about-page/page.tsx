'use client'

import { useAppState } from '@/hooks/useAppState'
import AboutPageConfig from '@/pages/admin/AboutPageConfig'

export default function AdminAboutPageEmbed() {
  const { aboutPage, saveAboutPage } = useAppState()

  return (
    <AboutPageConfig 
      config={aboutPage}
      onUpdate={saveAboutPage}
    />
  )
}
