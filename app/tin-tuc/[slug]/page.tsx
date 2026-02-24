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

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getNewsBySlug(params.slug);

  if (!post) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        {post.title}
      </h1>

      {/* Quan trọng: dùng prose */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}