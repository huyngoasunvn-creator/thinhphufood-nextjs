export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getNewsServer } from "@/lib/server/news-server";
import NewsDetail from "@/components/news/NewsDetail";

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {

  console.log("PARAM SLUG:", params.slug);

  return <div>Slug là: {params.slug}</div>;
}

