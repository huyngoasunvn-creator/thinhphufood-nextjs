
'use client';

import React from 'react';
import News from '@/components/news/News';
import { useAppState } from '../../hooks/useAppState';

export default function NewsPage() {
  const { banners, news } = useAppState();

  return (
    <News banners={banners} news={news} />
  );
}
