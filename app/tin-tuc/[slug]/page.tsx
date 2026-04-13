import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { decode } from "html-entities";
import { createPageMetadata, SITE_URL, stripHtml } from "@/lib/seo";
import {
  getNewsBySlug,
  getRelatedNewsServer,
} from "@/lib/server/news-server";

export const revalidate = 3600;

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getNewsBySlug(params.slug);

  if (!post) {
    return createPageMetadata({
      title: "Không tìm thấy bài viết",
      description: "Bài viết bạn đang tìm không tồn tại hoặc đã được ẩn.",
      path: `/tin-tuc/${params.slug}`,
      noIndex: true,
    });
  }

  const description = stripHtml(post.summary || decode(post.content || ""));

  return createPageMetadata({
    title: post.title,
    description: description || "Bài viết tại Thịnh Phú Food.",
    path: `/tin-tuc/${post.slug}`,
    image: post.image || "/og-image.jpg",
    type: "article",
  });
}

export default async function Page({ params }: PageProps) {
  const post = await getNewsBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const relatedPosts = await getRelatedNewsServer(post.category, post.slug);
  const decodedContent = decode(post.content || "");
  const articleUrl = `${SITE_URL}/tin-tuc/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: post.image ? [post.image] : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author || "Thịnh Phú Food",
    },
    publisher: {
      "@type": "Organization",
      name: "Thịnh Phú Food",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: articleUrl,
    description: stripHtml(post.summary || decodedContent),
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          href="/tin-tuc"
          className="text-gray-500 hover:text-green-600 flex items-center gap-2 mb-8"
        >
          ← Tất cả bài viết
        </Link>

        <article>
          <div className="mb-4">
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            {post.title}
          </h1>

          <div className="text-gray-500 text-sm mb-10 border-b pb-6">
            {post.date} • {post.author}
          </div>

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

          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-img:rounded-xl prose-a:text-green-600 prose-strong:text-black mb-20"
            dangerouslySetInnerHTML={{
              __html: decodedContent,
            }}
          />
        </article>

        {relatedPosts.length > 0 && (
          <section className="border-t pt-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Bài viết liên quan</h2>

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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />
      </div>
    </div>
  );
}
