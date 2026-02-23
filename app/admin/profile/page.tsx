'use client'

import { useAppState } from '@/hooks/useAppState'
import ProfileConfig from '@/components/admin/config/ProfileConfig'
export const dynamic = "force-dynamic";

export default function AdminProfilePage() {
  const { profile, saveProfile } = useAppState()

  return (
    <ProfileConfig
      config={profile}
      onUpdate={saveProfile}
    />
  )
}
