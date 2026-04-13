'use client';

import ProfileConfig from '@/components/admin/config/ProfileConfig';
import { useGlobalSettings } from '@/hooks/useGlobalSettings';

export default function AdminProfilePage() {
  const { profile, saveProfile } = useGlobalSettings();

  return <ProfileConfig config={profile} onUpdate={saveProfile} />;
}
