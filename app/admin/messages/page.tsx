
'use client';

import React from 'react';
import AdminMessages from '@/components/admin/ContactMessages';
import { useAppState } from '../../../hooks/useAppState';
export const dynamic = "force-dynamic";

export default function AdminMessagesPage() {
  const { contactMessages, deleteMessage, markAsRead } = useAppState();

  return (
    <AdminMessages 
      messages={contactMessages} 
      onDelete={deleteMessage} 
      onMarkAsRead={markAsRead} 
    />
  );
}
