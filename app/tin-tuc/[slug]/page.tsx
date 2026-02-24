import { getNewsBySlug } from "@/lib/server/news-server";
import { notFound } from "next/navigation";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  return <div>Slug là: {slug}</div>;
}