import { getProducts } from "./server/product-server";
import { getBannersServer } from "./server/banner-server";
import { getNewsServer } from "./server/news-server";
import { getSettingsServer } from "./server/settings-server";
import { getCommitmentsServer } from "./server/commitment-server";


export async function getHomeData() {
  try {
    const [products, banners, news, commitments, settings] =
      await Promise.all([
        getProducts(),
        getBannersServer(),
        getNewsServer(),
        getCommitmentsServer(),
        getSettingsServer(),
      ]);

    const data = {
      products: (products ?? []).filter(Boolean),
      banners: (banners ?? []).filter(Boolean),
      news: (news ?? []).filter(Boolean),
      commitments: (commitments ?? []).filter(Boolean),
      aboutConfig: settings?.aboutConfig ?? undefined,
    };

    // 🔥 QUAN TRỌNG: convert về plain object
    return JSON.parse(JSON.stringify(data));

  } catch (error) {
    console.error("getHomeData error:", error);

    return {
      products: [],
      banners: [],
      news: [],
      commitments: [],
      aboutConfig: undefined,
    };
  }
}