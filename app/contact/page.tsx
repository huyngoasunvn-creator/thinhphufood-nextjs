
'use client';

import React from 'react';
import Contact from '../../pages/Contact';
import { useAppState } from '../../hooks/useAppState';

export default function ContactPage() {
  const { contact, addMessage } = useAppState();

  return (
    <Contact config={contact} onSendMessage={addMessage} />
  );
}
