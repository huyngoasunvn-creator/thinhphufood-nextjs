import ProductsPage from "@/components/product/ProductsPage";
import { getProducts } from "@/lib/server/product-server";
import { getMenus } from "@/lib/server/menu-server";

interface Props {
  params: {
    keyword: string;
  };
}

export default async function Page({ params }: Props) {

  const keyword = decodeURIComponent(params.keyword).replace(/-/g, " ");

  const [productsRaw, menusRaw] = await Promise.all([
    getProducts(),
    getMenus(),
  ]);

  const products = JSON.parse(JSON.stringify(productsRaw || []));
  const menus = JSON.parse(JSON.stringify(menusRaw || []));

  const categories = menus.filter((m:any)=>m.parentId);

  return (
    <ProductsPage
      products={products}
      categories={categories}
      initialSearch={keyword}
    />
  );
}