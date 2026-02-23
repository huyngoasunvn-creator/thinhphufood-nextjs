import { getNewsBySlug } from "@/lib/server/news-server";
import NewsDetail from "@/components/news/NewsDetail";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic"; // 🔥 QUAN TRỌNG

interface Props {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: Props) {
  const news = await getNewsBySlug(params.slug);

  if (!news) {
    return notFound();
  }

  return <NewsDetail news={news} />;
}
