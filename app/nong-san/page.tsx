import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HeroSlider from "@/components/home/HeroSlider";
import ProductsPage from "@/components/product/ProductsPage";
import {
  findMenuBySlug,
  getSectionCategoryMenus,
  getSectionProducts,
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
  const nongSanRoot = findMenuBySlug(menus, "nong-san");

  if (!nongSanRoot) {
    return createPageMetadata({
      title: "Không tìm thấy trang nông sản",
      description: "Khu nông sản hiện chưa được cấu hình hoặc đang tạm ẩn.",
      path: "/nong-san",
      noIndex: true,
    });
  }

  const categoryId = readFirst(searchParams?.category);
  const keyword = readFirst(searchParams?.q)?.trim();

  let title = `${nongSanRoot.name} sạch, tươi và chọn lọc`;
  let description = `Khám phá các mặt hàng ${nongSanRoot.name.toLowerCase()} sạch, tươi và chọn lọc tại Thịnh Phú Food.`;
  let noIndex = false;

  if (categoryId) {
    const currentCategory = menus.find((item) => item.id === categoryId);
    if (currentCategory) {
      title = `${currentCategory.name} - ${nongSanRoot.name}`;
      description = `Danh sách sản phẩm thuộc danh mục ${currentCategory.name} tại ${nongSanRoot.name}.`;
    }
    noIndex = true;
  }

  if (keyword) {
    title = `Tìm kiếm ${nongSanRoot.name.toLowerCase()}: ${keyword}`;
    description = `Kết quả tìm kiếm ${nongSanRoot.name.toLowerCase()} cho từ khóa ${keyword}.`;
    noIndex = true;
  }

  return createPageMetadata({
    title,
    description,
    path: "/nong-san",
    noIndex,
  });
}

export default async function NongSanPage({ searchParams }: PageProps) {
  const categoryId = readFirst(searchParams?.category) ?? "all";
  const keyword = readFirst(searchParams?.q) ?? "";

  const [allProducts, menus, banners] = await Promise.all([
    getProducts(),
    getMenus(),
    getBannersServer(),
  ]);

  const nongSanRoot = findMenuBySlug(menus, "nong-san");
  if (!nongSanRoot) {
    return notFound();
  }

  const products = getSectionProducts(menus, allProducts, "nong-san");
  const categories = getSectionCategoryMenus(menus, allProducts, "nong-san");

  const nongSanBanners: any[] = banners
    .filter((banner: any) => banner.placement === "Nông sản" && banner.isActive)
    .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));

  const sectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: nongSanRoot.name,
    url: `${SITE_URL}/nong-san`,
    description: `Danh sách sản phẩm thuộc khu ${nongSanRoot.name} tại Thịnh Phú Food.`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sectionSchema),
        }}
      />
      {nongSanBanners.length > 0 && <HeroSlider banners={nongSanBanners} />}
      <Suspense fallback={<div className="p-6">Đang tải nông sản...</div>}>
        <ProductsPage
          products={products}
          categories={categories}
          initialCategory={categoryId}
          initialSearch={keyword}
          basePath="/nong-san"
          categoryTitle={`Danh mục ${nongSanRoot.name.toLowerCase()}`}
          emptyMessage="Chưa có sản phẩm nông sản phù hợp."
        />
      </Suspense>
    </>
  );
}
