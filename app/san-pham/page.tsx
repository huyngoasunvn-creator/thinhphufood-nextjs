import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import HeroSlider from "@/components/home/HeroSlider";
import ProductsPage from "@/components/product/ProductsPage";
import {
  getSectionCategoryMenus,
  getSectionProducts,
  findMenuBySlug,
} from "@/lib/menu-sections";
import { createPageMetadata, SITE_URL } from "@/lib/seo";
import { getBannersServer } from "@/lib/server/banner-server";
import { getMenus } from "@/lib/server/menu-server";
import { getProducts } from "@/lib/server/product-server";

export const revalidate = 3600;

type PageProps = {
  searchParams?: {
    category?: string;
    q?: string;
  };
};

function readFirst(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const menus = await getMenus();
  const productRoot = findMenuBySlug(menus, "san-pham");

  if (!productRoot) {
    return createPageMetadata({
      title: "Không tìm thấy trang sản phẩm",
      description: "Trang sản phẩm hiện chưa được cấu hình.",
      path: "/san-pham",
      noIndex: true,
    });
  }

  const categoryId = readFirst(searchParams?.category);
  const keyword = readFirst(searchParams?.q)?.trim();

  let title = "Sản phẩm gạo ST25 và nông sản sạch";
  let description =
    "Khám phá danh sách gạo ST25, gạo sạch và nông sản chất lượng cao tại Thịnh Phú Food.";
  let noIndex = false;

  if (categoryId) {
    const currentCategory = menus.find((item) => item.id === categoryId);

    if (currentCategory?.slug) {
      title = `${currentCategory.name ?? "Danh mục"} - sản phẩm nổi bật`;
      description = `Tổng hợp sản phẩm thuộc danh mục ${
        currentCategory.name ?? "Thịnh Phú Food"
      } tại Thịnh Phú Food.`;
    }

    noIndex = true;
  }

  if (keyword) {
    title = `Tìm kiếm sản phẩm: ${keyword}`;
    description = `Kết quả tìm kiếm sản phẩm cho từ khóa ${keyword} tại Thịnh Phú Food.`;
    noIndex = true;
  }

  return createPageMetadata({
    title,
    description,
    path: "/san-pham",
    noIndex,
  });
}

export default async function Page({ searchParams }: PageProps) {
  const categoryId = readFirst(searchParams?.category) ?? "all";
  const keyword = readFirst(searchParams?.q) ?? "";

  const [allProducts, menus, banners] = await Promise.all([
    getProducts(),
    getMenus(),
    getBannersServer(),
  ]);

  const productRoot = findMenuBySlug(menus, "san-pham");
  if (!productRoot) {
    return notFound();
  }

  if (categoryId !== "all") {
    const legacyCategory = menus.find((item) => item.id === categoryId);

    if (legacyCategory?.slug) {
      const query = keyword.trim()
        ? `?q=${encodeURIComponent(keyword.trim())}`
        : "";
      redirect(`/danh-muc/${legacyCategory.slug}${query}`);
    }
  }

  const products = getSectionProducts(menus, allProducts, "san-pham");
  const productCategories = getSectionCategoryMenus(menus, allProducts, "san-pham");

  const shopBanners: any[] = banners
    .filter((banner: any) => banner.placement === "Cửa hàng" && banner.isActive)
    .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));

  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Danh sách sản phẩm Thịnh Phú Food",
    url: `${SITE_URL}/san-pham`,
    description:
      "Danh sách sản phẩm gạo ST25 và nông sản sạch đang kinh doanh tại Thịnh Phú Food.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productListSchema),
        }}
      />
      {shopBanners.length > 0 && <HeroSlider banners={shopBanners} />}
      <Suspense fallback={<div className="p-6">Đang tải sản phẩm...</div>}>
        <ProductsPage
          products={products}
          categories={productCategories}
          initialCategory={categoryId}
          initialSearch={keyword}
          basePath="/san-pham"
          allCategoriesPath="/san-pham"
          categoryPathPrefix="/danh-muc"
          categoryTitle="Danh mục sản phẩm"
        />
      </Suspense>
    </>
  );
}
