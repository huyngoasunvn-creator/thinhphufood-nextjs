export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getNewsServer } from "@/lib/server/news-server";

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const news = await getNewsServer();

  const post = news.find((n) => n.slug === params.slug);

  if (!post) {
    console.log("NOT FOUND SLUG:", params.slug);
    console.log("AVAILABLE SLUGS:", news.map((n) => n.slug));
    return notFound();
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>{post.title}</h1>
      <p>{post.summary}</p>
    </div>
  );
}
