import { getNewsServer } from '@/lib/server/news-server';
import NewsPage from '@/components/news/News';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tin tức',
  description: 'Cập nhật kiến thức, khuyến mãi và thông tin mới nhất từ ThinhPhuFood.',
  openGraph: {
    title: 'Tin tức',
    description: 'Cập nhật kiến thức, khuyến mãi và thông tin mới nhất từ ThinhPhuFood.',
    type: 'website',
  },
};

export default async function TinTucPage() {
  const news = await getNewsServer();
  return <NewsPage news={news} />;
}
