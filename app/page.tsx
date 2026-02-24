import HomePage from "@/components/home/HomePage";
import { getHomeData } from "@/lib/home-server";

export default function Home() {
  return <div>TEST 123</div>;
}
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
