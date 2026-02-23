import { getProducts } from "./server/product-server";
import { getBannersServer } from "./server/banner-server";
import { getNewsServer } from "./server/news-server";
import { getSettingsServer } from "./server/settings-server";
import { getCommitmentsServer } from "./server/commitment-server";


export async function getHomeData() {
  try {
    const [products, banners, news, commitments, settings] = await Promise.all([
  getProducts(),
  getBannersServer(),
  getNewsServer(),
  getCommitmentsServer(),
  getSettingsServer(),
]);


    return {
  products: products || [],
  banners: banners || [],
  news: news || [],
  commitments: commitments || [],
  aaboutConfig: settings?.aboutConfig,

};

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
