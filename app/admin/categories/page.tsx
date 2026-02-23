
'use client';

import React from 'react';
import AdminCategories from '@/components/admin/Categories';
import { useAppState } from '../../../hooks/useAppState';
export const dynamic = "force-dynamic";

export default function AdminCategoriesPage() {
  const { categories, saveCategories } = useAppState();

  return <AdminCategories categories={categories} onUpdate={saveCategories} />;
}
