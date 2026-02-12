
'use client';

import React from 'react';
import AdminCommitments from '../../../pages/admin/Commitments';
import { useAppState } from '../../../hooks/useAppState';

export default function AdminCommitmentsPage() {
  const { commitments, saveCommitments } = useAppState();

  return <AdminCommitments commitments={commitments} onUpdate={saveCommitments} />;
}
