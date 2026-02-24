import { getBannersServer } from "@/lib/server/banner-server";

export default async function NewsPage() {
  const banners = await getBannersServer();

  return (
    <div>
      {/* render banners */}
    </div>
  );
}