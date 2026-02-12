
'use client';

import React from 'react';
import News from '../../pages/News';
import { useAppState } from '../../hooks/useAppState';

export default function NewsPage() {
  const { banners, news } = useAppState();

  return (
    <News banners={banners} news={news} />
  );
}
