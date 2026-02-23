import { getNewsServer } from '@/lib/server/news-server';
import NewsPage from '@/components/news/News';

export default async function TinTucPage() {
  const news = await getNewsServer();

  return <NewsPage news={news} />;
}
