import type { QueryDocumentSnapshot, Timestamp } from "firebase-admin/firestore"
interface News {
  title: string
  slug: string
  content: string
  image?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

import { adminDb } from "@/lib/firebase-admin";
import Link from "next/link";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 6;
const baseUrl = "https://thinhphufood.vn";

interface Props {
  searchParams?: {
    page?: string;
    category?: string;
    q?: string;
  };
}

/* ============================= */
/* SEO METADATA */
/* ============================= */

export const metadata: Metadata = {
  title: "Tin tức & Kiến thức",
  description:
    "Khám phá kiến thức nông sản, thực phẩm và tin tức mới nhất từ Thịnh Phú Food.",
  alternates: {
    canonical: `${baseUrl}/tin-tuc`,
  },
  openGraph: {
    title: "Tin tức & Kiến thức",
    description:
      "Khám phá kiến thức nông sản, thực phẩm và tin tức mới nhất.",
    url: `${baseUrl}/tin-tuc`,
    siteName: "Thịnh Phú Food",
    locale: "vi_VN",
    type: "website",
  },
};

/* ============================= */
/* FETCH DATA */
/* ============================= */

async function getNews() {
  const snapshot = await adminDb.collection("news").get();

  return snapshot.docs.map(
  (doc: QueryDocumentSnapshot<News>) => ({
    id: doc.id,
    ...doc.data(),
  })) as any[];
}

/* ============================= */
/* PAGE */
/* ============================= */

export default async function NewsPage({ searchParams }: Props) {
  const allNews = await getNews();

  const page = Number(searchParams?.page || 1);
  const category = searchParams?.category || "";
  const keyword = searchParams?.q?.toLowerCase() || "";

  /* ===== Filter ===== */
  let filtered = allNews;

  if (category) {
    filtered = filtered.filter((item) => item.category === category);
  }

  if (keyword) {
    filtered = filtered.filter(
      (item) =>
        item.title?.toLowerCase().includes(keyword) ||
        item.summary?.toLowerCase().includes(keyword)
    );
  }

  /* ===== Pagination ===== */
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  /* ===== Categories ===== */
  const categories = [
    "Tất cả",
    ...Array.from(new Set(allNews.map((item) => item.category))),
  ];

  return (
    <div className="w-full bg-white">
  <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">
          Tin Tức & Kiến Thức
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Cập nhật tin tức mới nhất về nông sản, thực phẩm
          và hoạt động của Thịnh Phú Food.
        </p>
      </div>

      {/* Filter + Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-10">
        {/* Categories */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat: string, index: number) => {
            const isActive =
              (cat === "Tất cả" && !category) ||
              cat === category;

            return (
              <Link
                key={index}
                href={
                  cat === "Tất cả"
                    ? "/tin-tuc"
                    : `/tin-tuc?category=${cat}`
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition
                ${
                  isActive
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-gray-100 hover:bg-green-100"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Search */}
        <form className="flex">
          <input
            type="text"
            name="q"
            placeholder="Tìm kiếm bài viết..."
            defaultValue={keyword}
            className="border rounded-l-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 rounded-r-lg"
          >
            Tìm
          </button>
        </form>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginated.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group"
          >
            <Link href={`/tin-tuc/${item.slug}`}>
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-52 w-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            </Link>

            <div className="p-5">
              <p className="text-xs text-green-600 font-semibold mb-2">
                {item.category}
              </p>

              <h2 className="text-lg font-bold mb-2 line-clamp-2">
                {item.title}
              </h2>

              <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                {item.summary}
              </p>

              <Link
                href={`/tin-tuc/${item.slug}`}
                className="text-green-600 font-semibold text-sm"
              >
                Đọc tiếp →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Link
              key={i}
              href={`/tin-tuc?page=${i + 1}`}
              className={`px-4 py-2 rounded-lg text-sm ${
                page === i + 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 hover:bg-green-100"
              }`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Tin tức Thịnh Phú Food",
            url: `${baseUrl}/tin-tuc`,
          }),
        }}
      />
    </div>
    </div>
  );
}