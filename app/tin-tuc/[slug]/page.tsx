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

// 🔥 Hàm làm sạch HTML từ Word
function cleanHtml(html: string) {
  if (!html) return "";

  return html
    .replace(/class="MsoNormal"/g, "")
    .replace(/<o:p>.*?<\/o:p>/g, "")
    .replace(/style="[^"]*"/g, "")
    .replace(/&nbsp;/g, " ");
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const post: any = await getNewsBySlug(params.slug);

  if (!post) return notFound();

  const cleanedContent = cleanHtml(post.content);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        {post.title}
      </h1>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{
          __html: cleanedContent,
        }}
      />
    </div>
  );
}