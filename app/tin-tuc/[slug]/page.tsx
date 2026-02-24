export const dynamic = "force-dynamic";

import { adminDb } from "@/lib/firebase-admin";
import { notFound } from "next/navigation";

interface NewsPost {
  id: string;
  title: string;
  content: string;
  slug: string;
}

async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  const snapshot = await adminDb
    .collection("news")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];

  return {
    id: doc.id,
    ...(doc.data() as Omit<NewsPost, "id">),
  };
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getNewsBySlug(params.slug);

  if (!post) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        {post.title}
      </h1>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}