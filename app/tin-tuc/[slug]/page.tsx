export const dynamic = "force-dynamic";

import { adminDb } from "@/lib/firebase-admin";
import { notFound } from "next/navigation";

async function getNewsBySlug(slug: string) {
  const snapshot = await adminDb
    .collection("news")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];

  return {
    id: doc.id,
    ...doc.data(),
  };
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const post: any = await getNewsBySlug(params.slug);

  if (!post) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        {post.title}
      </h1>

      {/* QUAN TRỌNG NHẤT NẰM Ở ĐÂY */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />
    </div>
  );
}