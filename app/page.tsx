import HomePage from "@/components/home/HomePage";
import { getHomeData } from "@/lib/home-server";
import { getNewsServer } from "@/lib/server/news-server";
import {
  Product,
  Banner,
  NewsPost,
  Commitment,
  AboutConfig,
} from "@/types";

export default async function Page() {
  let data: {
    products: Product[];
    banners: Banner[];
    news: NewsPost[];
    commitments: Commitment[];
    aboutConfig?: AboutConfig;
  } = {
    products: [],
    banners: [],
    news: [],
    commitments: [],
    aboutConfig: undefined,
  };

  try {
    const result = await getHomeData();

    // 👇 LẤY NEWS ĐÃ FILTER isActive
    const activeNews = await getNewsServer();

    if (result) {
      data = {
        products: result.products ?? [],
        banners: result.banners ?? [],
        news: activeNews.slice(0, 3), // 👈 LẤY 3 BÀI MỚI NHẤT
        commitments: result.commitments ?? [],
        aboutConfig: result.aboutConfig ?? undefined,
      };
    }
  } catch (error) {
    console.error("Lỗi getHomeData:", error);
  }

  return <HomePage {...data} />;
}