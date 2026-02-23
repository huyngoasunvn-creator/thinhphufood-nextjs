import NewsDetail from '@/components/news/NewsDetail';
import { getNewsServer } from '@/lib/server/news-server';


export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const news = await getNewsServer();

  return <NewsDetail news={news} slug={params.slug} />;
}
