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
  const productsRaw = await getProducts();
  const categoriesRaw = await getCategories();

  const products = JSON.parse(JSON.stringify(productsRaw ?? []));
  const categories = JSON.parse(JSON.stringify(categoriesRaw ?? []));

  return (
    <ProductsPage
      products={products}
      categories={categories}
      initialCategory={searchParams?.category ?? "all"}
      initialSearch={searchParams?.q ?? ""}
    />
  );
}