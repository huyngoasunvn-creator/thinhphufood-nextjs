
'use client';

import React from 'react';
import AdminCommitments from '@/components/admin/Commitments';
import { useAppState } from '../../../hooks/useAppState';
export const dynamic = "force-dynamic";

export default function AdminCommitmentsPage() {
  const { commitments, saveCommitments } = useAppState();

  return <AdminCommitments commitments={commitments} onUpdate={saveCommitments} />;
}
