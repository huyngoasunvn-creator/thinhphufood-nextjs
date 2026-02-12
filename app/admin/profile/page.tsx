'use client'

import { useAppState } from '@/hooks/useAppState'
import ProfileConfig from '@/pages/admin/ProfileConfig'

export default function AdminProfilePage() {
  const { profile, saveProfile } = useAppState()

  return (
    <ProfileConfig
      config={profile}
      onUpdate={saveProfile}
    />
  )
}
