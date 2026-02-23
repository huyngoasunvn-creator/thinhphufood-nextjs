export const dynamic = "force-dynamic";

import Script from "next/script";
import { notFound } from "next/navigation";
import { getNewsServer } from "@/lib/server/news-server";
import NewsDetail from "@/components/news/NewsDetail";
import type { Metadata } from "next";


export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {

  const news = await getNewsServer();
  const post = news.find(n => n.slug === params.slug);

  if (!post) {
    return {
      title: 'Bài viết không tồn tại',
    };
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [post.image],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [post.image],
    },
  };
}

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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    image: post.image,
    author: {
      "@type": "Person",
      name: post.author,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <NewsDetail news={news} slug={params.slug} />
    </>
  );
}
