import HomePage from "@/components/home/HomePage";
import { SITE_URL } from "@/lib/seo";
import { getHomeData } from "@/lib/home-server";
import type {
  AboutConfig,
  Banner,
  Commitment,
  NewsPost,
  Product,
} from "@/types";

export const revalidate = 3600;

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
        news: (result.news ?? []).slice(0, 3),
        commitments: result.commitments ?? [],
        aboutConfig: result.aboutConfig ?? undefined,
      };
    }
  } catch (error) {
    console.error("getHomeData error:", error);
  }

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Trang chủ Thịnh Phú Food",
    url: SITE_URL,
    description:
      "Gạo ST25 chính hãng, nông sản sạch và tin tức mới nhất từ Thịnh Phú Food.",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeSchema),
        }}
      />
      <HomePage {...data} />
    </>
  );
}
