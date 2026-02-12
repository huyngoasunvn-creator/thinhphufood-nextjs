
'use client';

import React from 'react';
import AdminCategories from '../../../pages/admin/Categories';
import { useAppState } from '../../../hooks/useAppState';

export default function AdminCategoriesPage() {
  const { categories, saveCategories } = useAppState();

  return <AdminCategories categories={categories} onUpdate={saveCategories} />;
}
