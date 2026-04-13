'use client';

import AdminContactConfig from '@/components/admin/config/AdminContactConfig';
import { useGlobalSettings } from '@/hooks/useGlobalSettings';

export default function AdminContactPage() {
  const { contact, saveContact } = useGlobalSettings();

  return <AdminContactConfig config={contact} onUpdate={saveContact} />;
}
