import { getNewsServer } from '@/lib/server/news-server';
import NewsPage from '@/components/news/News';

export default async function TinTucPage() {
  const news = await getNewsServer();

  console.log("NEWS DATA:", news);

  return <NewsPage news={news} />;
}
