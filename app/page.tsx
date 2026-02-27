import HomePage from "@/components/home/HomePage";
import { getHomeData } from "@/lib/home-server";
import { Product, Banner, NewsPost, Commitment, AboutConfig } from "@/types";

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

    if (result) {
      data = {
        products: result.products ?? [],
        banners: result.banners ?? [],
        news: result.news ?? [],
        commitments: result.commitments ?? [],
        aboutConfig: result.aboutConfig ?? undefined,
      };
    }
  } catch (error) {
    console.error("Lỗi getHomeData:", error);
  }

  return <HomePage {...data} />;
}