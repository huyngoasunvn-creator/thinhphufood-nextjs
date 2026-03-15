import { NewsPost } from "@/types";
import { adminDb } from "@/lib/firebase-admin";
import { notFound } from "next/navigation";
import { decode } from "html-entities";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

const baseUrl = "https://thinhphufood.vn";

interface Props {
  params: { slug: string };
}

/* ================= FETCH ================= */

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

async function getRelatedPosts(
  category?: string,
  currentSlug?: string
): Promise<NewsPost[]> {
  if (!category) return [];

  const snapshot = await adminDb
  .collection("news")
  .where("category", "==", category)
  .orderBy("date", "desc")
  .limit(4)
  .get();

  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<NewsPost, "id">),
    }))
    .filter((item) => item.slug !== currentSlug)
    .slice(0, 3);
}

/* ================= SEO ================= */

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const post = await getNewsBySlug(params.slug);

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
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [post.image],
    },
  };
}

/* ================= PAGE ================= */

export default async function Page({ params }: Props) {
  const post = await getNewsBySlug(params.slug);
  if (!post) return notFound();

  const decodedContent = decode(post.content || "");
  const relatedPosts = await getRelatedPosts(
    post.category,
    post.slug
  );

  const articleUrl = `${baseUrl}/tin-tuc/${post.slug}`;

  return (
    <div className="w-full bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Back */}
        <Link
          href="/tin-tuc"
          className="text-gray-500 hover:text-green-600 flex items-center gap-2 mb-8"
        >
          ← Tất cả bài viết
        </Link>

        <article>

          {/* Category */}
          <div className="mb-4">
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="text-gray-500 text-sm mb-10 border-b pb-6">
            {post.date} • {post.author}
          </div>

          {/* Cover Image */}
          {post.image && (
            <div className="relative w-full aspect-[16/9] mb-10 rounded-2xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none
            prose-headings:font-bold
            prose-p:leading-relaxed
            prose-img:rounded-xl
            prose-a:text-green-600
            prose-strong:text-black
            mb-20"
            dangerouslySetInnerHTML={{
              __html: decodedContent,
            }}
          />

        </article>

        {/* ================= RELATED POSTS ================= */}

        {relatedPosts.length > 0 && (
          <section className="border-t pt-12">
            <div className="flex justify-between items-center mb-8">
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

            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((item) => (
                <article
                  key={item.id}
                  className="group bg-white rounded-2xl overflow-hidden border hover:shadow-xl transition duration-300"
                >
                  <Link href={`/tin-tuc/${item.slug}`}>
                    <div className="relative w-full h-52 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                  </Link>

                  <div className="p-5">
                    <p className="text-xs text-green-600 font-semibold mb-2">
                      {item.category}
                    </p>

                    <h3 className="text-lg font-bold mb-3 line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                      {item.summary}
                    </p>

                    <Link
                      href={`/tin-tuc/${item.slug}`}
                      className="text-green-600 font-semibold text-sm"
                    >
                      Đọc bài viết →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
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
              dateModified: post.date,
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
              mainEntityOfPage: articleUrl,
              description: post.summary,
            }),
          }}
        />
      </div>
    </div>
  );
}