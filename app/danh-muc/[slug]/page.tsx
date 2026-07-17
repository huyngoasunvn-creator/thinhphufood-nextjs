import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HeroSlider from "@/components/home/HeroSlider";
import ProductsPage from "@/components/product/ProductsPage";
import { getProductCategoryMenus } from "@/lib/product-category-menus";
import { createPageMetadata, SITE_URL } from "@/lib/seo";
import { getBannersServer } from "@/lib/server/banner-server";
import { getMenus } from "@/lib/server/menu-server";
import { getProducts } from "@/lib/server/product-server";

export const revalidate = 3600;

type PageProps = {
  params: {
    slug: string;
  };
};

async function getCategoryBySlug(slug: string) {
  const menus = await getMenus();
  const category = menus.find((item) => item.slug === slug);

  return {
    menus,
    category,
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await getCategoryBySlug(params.slug);

  if (!category) {
    return createPageMetadata({
      title: "Không tìm thấy danh mục",
      description: "Danh mục sản phẩm không tồn tại hoặc đã ngừng hiển thị.",
      path: `/danh-muc/${params.slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: `${category.name ?? "Danh mục"} - sản phẩm`,
    description: `Tổng hợp sản phẩm thuộc danh mục ${
      category.name ?? "Thịnh Phú Food"
    } tại Thịnh Phú Food.`,
    path: `/danh-muc/${params.slug}`,
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const [{ menus, category }, products, banners] = await Promise.all([
    getCategoryBySlug(params.slug),
    getProducts(),
    getBannersServer(),
  ]);

  if (!category) {
    return notFound();
  }

  const productCategories = getProductCategoryMenus(menus, products);

  const shopBanners: any[] = banners
    .filter((banner: any) => banner.placement === "Cửa hàng" && banner.isActive)
    .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));

  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    url: `${SITE_URL}/danh-muc/${params.slug}`,
    description: `Danh sách sản phẩm thuộc danh mục ${category.name}.`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(categorySchema),
        }}
      />
      {shopBanners.length > 0 && <HeroSlider banners={shopBanners} />}
      <Suspense fallback={<div className="p-6">Đang tải danh mục...</div>}>
        <ProductsPage
          products={products}
          categories={productCategories}
          initialCategory={category.id}
          basePath={`/danh-muc/${category.slug}`}
          allCategoriesPath="/san-pham"
          categoryPathPrefix="/danh-muc"
          categoryTitle="Danh mục sản phẩm"
        />
      </Suspense>
    </>
  );
}
