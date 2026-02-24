import { MetadataRoute } from "next";
import { adminDb } from "@/lib/firebase-admin";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://thinhphufood.vn";

  // 🔥 Lấy toàn bộ bài viết
  const snapshot = await adminDb.collection("news").get();

  const newsUrls = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      url: `${baseUrl}/tin-tuc/${data.slug}`,
      lastModified: data.updatedAt?.toDate?.() || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/san-pham`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tin-tuc`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lien-he`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },

    ...newsUrls,
  ];
}