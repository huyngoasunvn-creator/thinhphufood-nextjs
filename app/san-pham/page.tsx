export const revalidate = 86400;

import ProductsPage from "@/components/product/ProductsPage";
import HeroSlider from "@/components/home/HeroSlider";

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
    const [productsRaw, categoriesRaw, bannersRaw] = await Promise.all([
      getProducts(),
      getCategories(),
      getBannersServer(),
    ]);

    /* ============================= */
    /* 2. SAFE PARSE (tránh lỗi serialize) */
    /* ============================= */
    const products = Array.isArray(productsRaw)
      ? JSON.parse(JSON.stringify(productsRaw))
      : [];

    const categories = Array.isArray(categoriesRaw)
      ? JSON.parse(JSON.stringify(categoriesRaw))
      : [];

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