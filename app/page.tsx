import HomePage from "@/components/home/HomePage";
import { getHomeData } from "@/lib/home-server";

export default async function Page() {
  const data = await getHomeData();

  return (
    <HomePage
      products={data.products}
      banners={data.banners}
      news={data.news}
      commitments={data.commitments}
      aboutConfig={data.aboutConfig}
    />
  );
}