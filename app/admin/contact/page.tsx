'use client';

import { useAppState } from '@/hooks/useAppState'
import AdminContactConfig from '@/components/admin/config/AdminContactConfig'
export const dynamic = "force-dynamic";

export default function AdminContactPage() {
  const { contact, saveContact } = useAppState()

  return (
    <AdminContactConfig
      config={contact}
      onUpdate={saveContact}
    />
  )
}
