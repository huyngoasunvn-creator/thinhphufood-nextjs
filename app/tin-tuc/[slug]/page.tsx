export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getNewsServer } from "@/lib/server/news-server";
import NewsDetail from "@/components/news/NewsDetail";

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const news = await getNewsServer();

  console.log("PARAM SLUG:", params.slug);
  console.log("ALL SLUGS:", news.map(n => n.slug));

  const post = news.find((n) => n.slug === params.slug);

  if (!post) return notFound();

  return <NewsDetail news={news} slug={params.slug} />;
}
