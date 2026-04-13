'use client';

import React from 'react';
import AdminMessages from '@/components/admin/ContactMessages';
import { useContactMessages } from '@/hooks/useContactMessages';

export default function AdminMessagesPage() {
  const { contactMessages, deleteMessage, markAsRead } = useContactMessages();

  return (
    <AdminMessages
      messages={contactMessages}
      onDelete={deleteMessage}
      onMarkAsRead={markAsRead}
    />
  );
}
