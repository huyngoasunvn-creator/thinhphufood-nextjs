
'use client';

import React from 'react';
import AdminMessages from '../../../pages/admin/ContactMessages';
import { useAppState } from '../../../hooks/useAppState';

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
