export const dynamic = "force-dynamic";

import { adminDb } from "@/lib/firebase-admin";
import { notFound } from "next/navigation";
import { decode } from "html-entities";
import Link from "next/link";
import { Metadata } from "next";

const baseUrl = "https://thinhphufood.vn";

interface Props {
  params: { slug: string };
}

/* ================= FETCH ================= */

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

async function getRelatedPosts(category: string, currentSlug: string) {
  const snapshot = await adminDb
    .collection("news")
    .where("category", "==", category)
    .limit(3)
    .get();

  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((item: any) => item.slug !== currentSlug);
}

/* ================= SEO ================= */

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const post: any = await getNewsBySlug(params.slug);

  if (!post) {
    return { title: "Không tìm thấy bài viết" };
  }

  const url = `${baseUrl}/tin-tuc/${post.slug}`;

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.summary,
      url,
      type: "article",
      locale: "vi_VN",
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

/* ================= PAGE ================= */

export default async function Page({ params }: Props) {
  const post: any = await getNewsBySlug(params.slug);
  if (!post) return notFound();

  const decodedContent = decode(post.content || "");
  const relatedPosts = await getRelatedPosts(
    post.category,
    post.slug
  );

  return (
    <div className="w-full bg-white">
  <div className="max-w-3xl mx-auto px-6 py-12">

      {/* Back link */}
      <Link
        href="/tin-tuc"
        className="text-gray-500 hover:text-green-600 flex items-center gap-2 mb-6"
      >
        ← Tất cả bài viết
      </Link>

      {/* Cover image */}
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-2xl mb-10 object-cover aspect-[16/9]"
        />
      )}

      {/* Category */}
      <div className="mb-3">
        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
          {post.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-3.5xl font-extrabold leading-tight mb-6">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="text-gray-500 text-sm mb-10">
        {post.date} • {post.author}
      </div>

      {/* Content */}
      <div
        className="prose prose-lg max-w-none 
prose-headings:font-bold 
prose-p:leading-relaxed 
prose-li:leading-relaxed 
prose-img:rounded-xl 
mb-16"
        dangerouslySetInnerHTML={{
          __html: decodedContent,
        }}
      />

      {/* ================= RELATED POSTS ================= */}
      {relatedPosts.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Bài viết liên quan
            </h2>

            <Link
              href="/tin-tuc"
              className="text-green-600 font-semibold text-sm"
            >
              Xem thêm →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((item: any) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group"
              >
                <Link href={`/tin-tuc/${item.slug}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-48 w-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </Link>

                <div className="p-5">
                  <p className="text-xs text-green-600 font-semibold mb-2">
                    {item.category}
                  </p>

                  <h3 className="text-lg font-bold mb-2 line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500 line-clamp-3">
                    {item.summary}
                  </p>

                  <Link
                    href={`/tin-tuc/${item.slug}`}
                    className="text-green-600 font-semibold text-sm mt-3 inline-block"
                  >
                    Đọc bài viết →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* ================= JSON-LD ================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            image: post.image,
            datePublished: post.date,
            author: {
              "@type": "Person",
              name: post.author,
            },
            publisher: {
              "@type": "Organization",
              name: "Thịnh Phú Food",
              logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/logo.png`,
              },
            },
            description: post.summary,
          }),
        }}
      />
    </div>
    </div>
  );
}