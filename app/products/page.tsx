import ProductsList from "@/components/product/ProductsList";
import { getProducts } from "@/lib/server/product-server";
export const dynamic = "force-dynamic";

export default async function Page() {
  const products = await getProducts();

  return <ProductsList products={products} />;
}
