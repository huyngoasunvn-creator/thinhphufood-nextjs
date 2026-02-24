import { notFound } from "next/navigation";
import { db } from "@/lib/firebase-admin";

async function getPost(slug: string) {
  const doc = await db.collection("posts").doc(slug).get();
  if (!doc.exists) return null;

  return { id: doc.id, ...doc.data() };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post: any = await getPost(params.slug);
  if (!post) return notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-primary">
        {post.title}
      </h1>

      <img
        src={post.thumbnail}
        alt={post.title}
        className="rounded-xl mb-8"
      />

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}