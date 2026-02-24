import { getBanners } from "@/lib/server/banner-server";

export default async function NewsPage() {
  const banners = await getBanners();

  return (
    <div>
      {/* render banners */}
    </div>
  );
}