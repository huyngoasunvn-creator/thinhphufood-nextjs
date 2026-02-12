'use client'

import { useAppState } from '@/hooks/useAppState'
import AdminContactConfig from '@/pages/admin/AdminContactConfig'

export default function AdminContactPage() {
  const { contact, saveContact } = useAppState()

  return (
    <AdminContactConfig
      config={contact}
      onUpdate={saveContact}
    />
  )
}
