'use client';

import React from 'react';
import Popups from '@/components/admin/popups/Popups';
import { useAppState } from '@/hooks/useAppState';

export default function AdminPopupsPage() {
  const { popupConfig, savePopups } = useAppState();

  return (
    <Popups 
      config={popupConfig} 
      onUpdate={savePopups} 
    />
  );
}
