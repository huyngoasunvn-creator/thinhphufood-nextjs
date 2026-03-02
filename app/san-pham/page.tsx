export const dynamic = "force-dynamic";

import ProductsPage from "@/components/product/ProductsPage";
import { getProducts } from "@/lib/server/product-server";
import { getCategories } from "@/lib/server/category-server";

interface PageProps {
  searchParams?: {
    category?: string;
    q?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  // ✅ Lấy dữ liệu từ server
  const productsRaw = await getProducts();
  const categoriesRaw = await getCategories();

  // ✅ Fallback an toàn
  const products = Array.isArray(productsRaw)
    ? JSON.parse(JSON.stringify(productsRaw))
    : [];

  const categories = Array.isArray(categoriesRaw)
    ? JSON.parse(JSON.stringify(categoriesRaw))
    : [];

  // ✅ Xử lý searchParams
  const selectedCategory =
    searchParams?.category && searchParams.category !== "all"
      ? searchParams.category
      : null;

  const searchKeyword =
    searchParams?.q && searchParams.q.trim() !== ""
      ? searchParams.q.trim()
      : "";

  return (
    <ProductsPage
      products={products}
      categories={categories}
      initialCategory={selectedCategory ?? undefined}
      initialSearch={searchKeyword}
    />
  );
}