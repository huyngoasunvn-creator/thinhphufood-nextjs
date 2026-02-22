import { getProductsServer } from "./server/product-server";
import { getBannersServer } from "./server/banner-server";
import { getNewsServer } from "./server/news-server";
import { getSettingsServer } from "./server/settings-server";

export async function getHomeData() {
  try {
    const [products, banners, news, settings] = await Promise.all([
      getProductsServer(),
      getBannersServer(),
      getNewsServer(),
      getSettingsServer(),
    ]);

    return {
      products: products || [],
      banners: banners || [],
      news: news || [],
      commitments: settings?.commitments || [],
      aboutConfig: settings?.aboutConfig || null,
    };
  } catch (error) {
    console.error("getHomeData error:", error);

    return {
      products: [],
      banners: [],
      news: [],
      commitments: [],
      aboutConfig: null,
    };
  }
}
