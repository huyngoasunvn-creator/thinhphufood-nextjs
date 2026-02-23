
'use client';

import React from 'react';
import Profile from '@/components/Profile';
import { useAppState } from '../../hooks/useAppState';

export default function ProfilePage() {
  const { profile } = useAppState();

  return <Profile config={profile} />;
}
