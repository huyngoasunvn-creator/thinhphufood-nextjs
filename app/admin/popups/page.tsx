'use client';

import React from 'react';
import Popups from '@/components/admin/popups/Popups';
import { useGlobalSettings } from '@/hooks/useGlobalSettings';

export default function AdminPopupsPage() {
  const { popupConfig, savePopups } = useGlobalSettings();

  return <Popups config={popupConfig} onUpdate={savePopups} />;
}
