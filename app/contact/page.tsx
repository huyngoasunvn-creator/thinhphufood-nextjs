'use client';

import React from 'react';
import Contact from '@/components/Contact';
import { useContactMessages } from '@/hooks/useContactMessages';
import { useGlobalSettings } from '@/hooks/useGlobalSettings';

export default function ContactPage() {
  const { contact } = useGlobalSettings();
  const { addMessage } = useContactMessages();

  return <Contact config={contact} onSendMessage={addMessage} />;
}
