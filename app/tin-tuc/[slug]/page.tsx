
'use client';

import React from 'react';
import NewsDetail from '../../../pages/NewsDetail';
import { useAppState } from '../../../hooks/useAppState';

export default function NewsDetailPage() {
  const { news } = useAppState();

  return (
    <NewsDetail news={news} />
  );
}
