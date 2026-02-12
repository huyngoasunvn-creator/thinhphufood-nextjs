
'use client';

import React from 'react';
import AdminPopups from '../../../pages/admin/Popups';
import { useAppState } from '../../../hooks/useAppState';

export default function AdminPopupsPage() {
  const { popupConfig, savePopups } = useAppState();

  return <AdminPopups config={popupConfig} onUpdate={savePopups} />;
}
