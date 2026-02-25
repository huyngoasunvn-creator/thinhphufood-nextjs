import ProductsPage from "@/components/product/ProductsPage";
import { getProducts } from "@/lib/server/product-server";
export const dynamic = "force-dynamic";

export default async function Page() {
  const products = await getProducts();

  return (
    <ProductsPage
      products={products}
      categories={["Tất cả", "Gạo trắng", "Gạo lứt", "Nông sản sạch"]}
    />
  );
}