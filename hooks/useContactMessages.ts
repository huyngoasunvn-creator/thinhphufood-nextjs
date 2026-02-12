
import { useState, useEffect } from 'react';
import { ContactMessage } from '../types';

export const useContactMessages = () => {
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('thinhphu_contact_messages');
    if (saved) {
      setContactMessages(JSON.parse(saved));
    }
  }, []);

  const saveMessages = (updated: ContactMessage[]) => {
    setContactMessages(updated);
    localStorage.setItem('thinhphu_contact_messages', JSON.stringify(updated));
  };

  const addMessage = (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const newMessage: ContactMessage = {
      ...msg,
      id: `MSG${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toLocaleString('vi-VN'),
      status: 'new'
    };
    const updated = [newMessage, ...contactMessages];
    saveMessages(updated);
  };

  const deleteMessage = (id: string) => {
    const updated = contactMessages.filter(m => m.id !== id);
    saveMessages(updated);
  };

  const markAsRead = (id: string) => {
    const updated = contactMessages.map(m => 
      m.id === id ? { ...m, status: 'read' as const } : m
    );
    saveMessages(updated);
  };

  return { contactMessages, addMessage, deleteMessage, markAsRead, saveMessages };
};
