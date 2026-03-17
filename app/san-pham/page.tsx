export const revalidate = 86400;

import { Suspense } from "react";
import ProductsPage from "@/components/product/ProductsPage";
import HeroSlider from "@/components/home/HeroSlider";
import { getMenus } from "@/lib/server/menu-server";
import { getProducts } from "@/lib/server/product-server";
import { getBannersServer } from "@/lib/server/banner-server";

export default async function Page() {

  const [productsRaw, menusRaw, bannersRaw] = await Promise.all([
    getProducts(),
    getMenus(),
    getBannersServer(),
  ]);

  const products = JSON.parse(JSON.stringify(productsRaw || []));
  const menus = JSON.parse(JSON.stringify(menusRaw || []));
  const banners = JSON.parse(JSON.stringify(bannersRaw || []));

  const categories = menus.filter((m:any)=>m.parentId);

  const shopBanners = banners
    .filter((b:any)=>b.placement === "Cửa hàng" && b.isActive)
    .sort((a:any,b:any)=>(a.order ?? 0)-(b.order ?? 0));

  return (
    <>
      {shopBanners.length > 0 && (
        <HeroSlider banners={shopBanners} />
      )}

      <Suspense fallback={<div className="p-6">Đang tải sản phẩm...</div>}>
        <ProductsPage
          products={products}
          categories={categories}
        />
      </Suspense>
    </>
  );
}