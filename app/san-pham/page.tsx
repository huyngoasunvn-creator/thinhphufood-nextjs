import ProductsPage from "@/components/product/ProductsPage";
import { getProducts } from "@/lib/server/product-server";
import { getCategories } from "@/lib/server/category-server";


interface PageProps {
  searchParams?: {
    category?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const productsRaw = await getProducts();
  const categoriesRaw = await getCategories();

  // 🔥 Convert sang plain object
  const products = JSON.parse(JSON.stringify(productsRaw ?? []));
  const categories = JSON.parse(JSON.stringify(categoriesRaw ?? []));

  const categoryId = searchParams?.category;

  const filteredProducts = categoryId
    ? products.filter((product: any) => product.categoryId === categoryId)
    : products;

  return (
    <ProductsPage
      products={filteredProducts}
      categories={categories}
    />
  );
}