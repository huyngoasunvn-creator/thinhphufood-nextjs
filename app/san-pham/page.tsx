import ProductsPage from "@/components/product/ProductsPage";
import { getProducts } from "@/lib/server/product-server";
import { getCategories } from "@/lib/server/category-server";

export const dynamic = "force-dynamic";

export default async function Page() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <ProductsPage
      products={products}
      categories={[
        { id: "all", name: "Tất cả" },
        ...categories,
      ]}
    />
  );
}