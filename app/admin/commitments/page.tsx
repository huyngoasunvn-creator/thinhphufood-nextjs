'use client';

import React from 'react';
import AdminCommitments from '@/components/admin/Commitments';
import { useCommitments } from '@/hooks/useCommitments';

export default function AdminCommitmentsPage() {
  const { commitments, saveCommitments } = useCommitments();

  return <AdminCommitments commitments={commitments} onUpdate={saveCommitments} />;
}
