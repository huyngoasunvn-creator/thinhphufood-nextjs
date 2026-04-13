import Link from "next/link";
import type { Metadata } from "next";
import HeroSlider from "@/components/home/HeroSlider";
import { createPageMetadata, SITE_URL } from "@/lib/seo";
import { getBannersServer } from "@/lib/server/banner-server";
import { getNewsServer } from "@/lib/server/news-server";

export const revalidate = 3600;

const PAGE_SIZE = 6;

type Props = {
  searchParams?: {
    page?: string;
    category?: string;
    q?: string;
  };
};

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .trim();
}

function buildNewsPath(category?: string, keyword?: string, page?: number) {
  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  if (keyword) {
    params.set("q", keyword);
  }

  if (page && page > 1) {
    params.set("page", String(page));
  }

  return params.toString() ? `/tin-tuc?${params.toString()}` : "/tin-tuc";
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const page = Number(searchParams?.page || 1);
  const category = searchParams?.category || "";
  const keyword = searchParams?.q || "";

  let title = "Tin tức và kiến thức";
  let description =
    "Cập nhật tin tức mới nhất, kinh nghiệm lựa chọn nông sản và kiến thức hữu ích từ Thịnh Phú Food.";

  if (category) {
    title = `Tin tức ${category}`;
    description = `Tổng hợp bài viết thuộc chuyên mục ${category} tại Thịnh Phú Food.`;
  }

  if (keyword) {
    title = `Tìm kiếm tin tức: ${keyword}`;
    description = `Kết quả tìm kiếm bài viết cho từ khóa ${keyword} tại Thịnh Phú Food.`;
  }

  if (page > 1) {
    title = `${title} - trang ${page}`;
  }

  return createPageMetadata({
    title,
    description,
    path: buildNewsPath(category, keyword, page),
    noIndex: Boolean(keyword),
  });
}

export default async function NewsPage({ searchParams }: Props) {
  const [allNews, banners] = await Promise.all([
    getNewsServer(),
    getBannersServer(),
  ]);

  const rawPage = Number(searchParams?.page || 1);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  const category = searchParams?.category || "";
  const rawKeyword = searchParams?.q || "";
  const keyword = normalizeText(rawKeyword);

  let filtered = Array.isArray(allNews) ? allNews : [];

  if (category) {
    filtered = filtered.filter((item) => item.category === category);
  }

  if (keyword) {
    filtered = filtered.filter((item) => {
      const haystack = normalizeText(
        `${item.title || ""} ${item.summary || ""} ${item.category || ""}`,
      );
      return haystack.includes(keyword);
    });
  }

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const safePage =
    totalPages > 0 ? Math.min(page, totalPages) : 1;
  const start = (safePage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  const categories = [
    "Tất cả",
    ...Array.from(
      new Set(
        allNews
          .map((item) => item.category)
          .filter((item): item is string => typeof item === "string" && item.length > 0),
      ),
    ),
  ];

  const newsBanners: any[] = banners
    .filter((banner: any) => {
      const placement = (banner.placement || "").toLowerCase();
      return placement.includes("tin") && banner.isActive !== false;
    })
    .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Tin tức Thịnh Phú Food",
    url: `${SITE_URL}/tin-tuc`,
    description:
      "Tin tức và kiến thức về nông sản, thực phẩm sạch từ Thịnh Phú Food.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {newsBanners.length > 0 && <HeroSlider banners={newsBanners} />}

      <div className="w-full bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3">Tin Tức & Kiến Thức</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cập nhật tin tức mới nhất về nông sản, thực phẩm và hoạt động của
              Thịnh Phú Food.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between mb-10">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => {
                const isAll = cat === "Tất cả";
                const isActive = (isAll && !category) || cat === category;
                const href = isAll
                  ? "/tin-tuc"
                  : buildNewsPath(cat, undefined, undefined);

                return (
                  <Link
                    key={cat}
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
                defaultValue={rawKeyword}
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

          {paginated.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-12 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Chưa có bài viết phù hợp
              </h2>
              <p className="text-gray-600">
                Hãy thử đổi từ khóa tìm kiếm hoặc chọn chuyên mục khác.
              </p>
            </div>
          ) : (
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
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-12 gap-2">
              {Array.from({ length: totalPages }).map((_, index) => {
                const currentPage = index + 1;
                const href = buildNewsPath(
                  category || undefined,
                  rawKeyword || undefined,
                  currentPage,
                );

                return (
                  <Link
                    key={currentPage}
                    href={href}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      safePage === currentPage
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 hover:bg-green-100"
                    }`}
                  >
                    {currentPage}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
