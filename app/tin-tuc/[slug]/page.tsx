import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface PageProps {
  params: { slug: string };
}

async function getPost(slug: string) {
  const snap = await getDoc(doc(db, "posts", slug));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const post: any = await getPost(params.slug);
  if (!post) return {};

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.thumbnail],
      type: "article",
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const post: any = await getPost(params.slug);
  if (!post) return notFound();

  return (
    <article className="bg-background min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 text-primary leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="text-sm text-gray-500 mb-6">
          {new Date(post.createdAt?.seconds * 1000).toLocaleDateString("vi-VN")}
        </div>

        {/* Thumbnail */}
        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt={post.title}
            className="rounded-xl mb-8 w-full object-cover"
          />
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:text-primary"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}