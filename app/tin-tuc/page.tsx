export const dynamic = "force-dynamic";
export const revalidate = 3600;

import Link from "next/link";
import { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";

import { getNewsServer } from "@/lib/server/news-server";
import { getBannersServer } from "@/lib/server/banner-server";

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
/* 🔥 DYNAMIC SEO METADATA      */
/* ============================= */
export async function generateMetadata(
  props: Props
): Promise<Metadata> {
  const searchParams = props.searchParams;

  const page = Number(searchParams?.page || 1);
  const category = searchParams?.category || "";
  const keyword = searchParams?.q || "";

  let title = "Tin tức & Kiến thức | Thịnh Phú Food";
  let description =
    "Khám phá kiến thức nông sản, thực phẩm và tin tức mới nhất từ Thịnh Phú Food.";

  if (category) {
    title = `Tin tức ${category} | Thịnh Phú Food`;
    description = `Các bài viết thuộc chuyên mục ${category} của Thịnh Phú Food.`;
  }

  if (keyword) {
    title = `Tìm kiếm "${keyword}" | Tin tức Thịnh Phú Food`;
    description = `Kết quả tìm kiếm cho từ khóa "${keyword}".`;
  }

  if (page > 1) {
    title += ` - Trang ${page}`;
  }

  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (keyword) params.set("q", keyword);
  if (page > 1) params.set("page", String(page));

  const canonicalUrl =
    params.toString().length > 0
      ? `${baseUrl}/tin-tuc?${params.toString()}`
      : `${baseUrl}/tin-tuc`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Thịnh Phú Food",
      locale: "vi_VN",
      type: "website",
    },
  };
}

/* ============================= */
/* PAGE                         */
/* ============================= */
export default async function NewsPage(
  props: Props
) {
  try {
    const searchParams = props.searchParams || {};

    const [allNewsRaw, bannersRaw] = await Promise.all([
      getNewsServer(),
      getBannersServer(),
    ]);

    const allNews: any[] = Array.isArray(allNewsRaw)
      ? allNewsRaw
      : [];

    const banners: any[] = Array.isArray(bannersRaw)
      ? bannersRaw
      : [];

    /* Banner Tin Tức */
    const newsBanners = banners
      .filter((b) => {
        const placement = (b.placement || "").toLowerCase();
        const isActive = b.isActive !== false;
        return placement.includes("tin") && isActive;
      })
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    /* Params */
    const page = Number(searchParams?.page || 1);
    const category = searchParams?.category || "";
    const keyword = searchParams?.q?.toLowerCase() || "";

    /* Filter */
    let filtered = allNews;

    if (category) {
      filtered = filtered.filter(
        (item) => item.category === category
      );
    }

    if (keyword) {
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(keyword) ||
          item.summary?.toLowerCase().includes(keyword)
      );
    }

    /* Pagination */
    const totalPages = Math.ceil(
      filtered.length / PAGE_SIZE
    );
    const start = (page - 1) * PAGE_SIZE;
    const paginated = filtered.slice(
      start,
      start + PAGE_SIZE
    );

    /* Category List */
    const categories: string[] = [
      "Tất cả",
      ...Array.from(
        new Set(
          allNews
            .map((item) => item.category)
            .filter(
              (cat): cat is string =>
                typeof cat === "string"
            )
        )
      ),
    ];

    /* Structured Data */
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Tin tức Thịnh Phú Food",
      url: `${baseUrl}/tin-tuc`,
      description:
        "Tin tức và kiến thức về nông sản, thực phẩm sạch từ Thịnh Phú Food.",
    };

    return (
      <>
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {newsBanners.length > 0 && (
          <HeroSlider banners={newsBanners} />
        )}

        <div className="w-full bg-white">
          <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-3">
                Tin Tức & Kiến Thức
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Cập nhật tin tức mới nhất về nông sản,
                thực phẩm và hoạt động của Thịnh Phú Food.
              </p>
            </div>

            {/* FILTER */}
            <div className="flex flex-col md:flex-row gap-4 justify-between mb-10">
              <div className="flex flex-wrap gap-3">
                {categories.map((cat, index) => {
                  const isActive =
                    (cat === "Tất cả" && !category) ||
                    cat === category;

                  const params = new URLSearchParams();
                  if (cat !== "Tất cả")
                    params.set("category", cat);

                  const href =
                    params.toString().length > 0
                      ? `/tin-tuc?${params.toString()}`
                      : "/tin-tuc";

                  return (
                    <Link
                      key={index}
                      href={href}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
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

            {/* GRID */}
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

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 gap-2">
                {Array.from({ length: totalPages }).map(
                  (_, i) => {
                    const params = new URLSearchParams();

                    if (category)
                      params.set("category", category);
                    if (keyword)
                      params.set("q", keyword);
                    if (i + 1 > 1)
                      params.set(
                        "page",
                        String(i + 1)
                      );

                    const href =
                      params.toString().length > 0
                        ? `/tin-tuc?${params.toString()}`
                        : "/tin-tuc";

                    return (
                      <Link
                        key={i}
                        href={href}
                        className={`px-4 py-2 rounded-lg text-sm ${
                          page === i + 1
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 hover:bg-green-100"
                        }`}
                      >
                        {i + 1}
                      </Link>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("NEWS PAGE ERROR:", error);

    return (
      <div className="text-center py-20 text-red-500">
        Lỗi tải dữ liệu trang Tin tức
      </div>
    );
  }
}