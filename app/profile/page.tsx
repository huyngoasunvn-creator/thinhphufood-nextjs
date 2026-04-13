'use client';

import React from 'react';
import Profile from '@/components/Profile';
import { useGlobalSettings } from '@/hooks/useGlobalSettings';

export default function ProfilePage() {
  const { profile } = useGlobalSettings();

  return <Profile config={profile} />;
}
