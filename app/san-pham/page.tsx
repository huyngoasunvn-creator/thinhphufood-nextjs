export const revalidate = 86400;

import ProductsPage from "@/components/product/ProductsPage";
import HeroSlider from "@/components/home/HeroSlider";
import { getMenus } from "@/lib/server/menu-server";
import { getProducts } from "@/lib/server/product-server";
import { getCategories } from "@/lib/server/category-server";
import { getBannersServer } from "@/lib/server/banner-server";

interface PageProps {
  searchParams?: {
    category?: string;
    q?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  try {
    /* ============================= */
    /* 1. FETCH DATA SERVER         */
    /* ============================= */
    const [productsRaw, menusRaw, bannersRaw] = await Promise.all([
  getProducts(),
  getMenus(),
  getBannersServer(),
]);

    /* ============================= */
    /* 2. SAFE PARSE (tránh lỗi serialize) */
    /* ============================= */
    const products = Array.isArray(productsRaw)
      ? JSON.parse(JSON.stringify(productsRaw))
      : [];

    const menus = Array.isArray(menusRaw)
  ? JSON.parse(JSON.stringify(menusRaw))
  : [];

const productMenu = menus.find((m:any)=>m.slug === "/san-pham");

const categories = menus.filter((m:any)=>m.parentId);

    const banners = Array.isArray(bannersRaw)
      ? JSON.parse(JSON.stringify(bannersRaw))
      : [];

    /* ============================= */
    /* 3. FILTER BANNER CHO CỬA HÀNG */
    /* ============================= */
    const shopBanners = banners
      .filter(
        (b: any) =>
          b.placement === "Cửa hàng" && // đúng theo Firestore của bạn
          b.isActive === true
      )
      .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));

    /* ============================= */
    /* 4. HANDLE SEARCH PARAMS      */
    /* ============================= */
    const selectedCategory =
      searchParams?.category && searchParams.category !== "all"
        ? searchParams.category
        : undefined;

    const searchKeyword =
      searchParams?.q && searchParams.q.trim() !== ""
        ? searchParams.q.trim()
        : "";

    /* ============================= */
    /* 5. RENDER PAGE               */
    /* ============================= */
    return (
      <>
        {/* HERO BANNER SHOP */}
        {shopBanners.length > 0 && (
          <HeroSlider banners={shopBanners} />
        )}

        {/* PRODUCT LIST */}
        <ProductsPage
          products={products}
          categories={categories}
          initialCategory={selectedCategory}
          initialSearch={searchKeyword}
        />
      </>
    );
  } catch (error) {
    console.error("SHOP PAGE ERROR:", error);

    return (
      <div className="text-center py-20 text-red-500">
        Lỗi tải dữ liệu trang Cửa hàng
      </div>
    );
  }
}