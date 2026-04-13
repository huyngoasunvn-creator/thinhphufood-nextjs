import type { Metadata } from "next";
import ProductsPage from "@/components/product/ProductsPage";
import { getProductCategoryMenus } from "@/lib/product-category-menus";
import { createPageMetadata } from "@/lib/seo";
import { getMenus } from "@/lib/server/menu-server";
import { getProducts } from "@/lib/server/product-server";

type PageProps = {
  params: {
    keyword: string;
  };
};

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const keyword = decodeURIComponent(params.keyword).replace(/-/g, " ").trim();

  return createPageMetadata({
    title: `Tìm kiếm: ${keyword}`,
    description: `Kết quả tìm kiếm sản phẩm cho từ khóa ${keyword} tại Thịnh Phú Food.`,
    path: `/tim-kiem/${params.keyword}`,
    noIndex: true,
  });
}

export default async function Page({ params }: PageProps) {
  const keyword = decodeURIComponent(params.keyword).replace(/-/g, " ");
  const [products, menus] = await Promise.all([getProducts(), getMenus()]);
  const productCategories = getProductCategoryMenus(menus, products);

  return (
    <ProductsPage
      products={products}
      categories={productCategories}
      initialSearch={keyword}
    />
  );
}
