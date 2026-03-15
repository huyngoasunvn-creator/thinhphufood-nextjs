import { MetadataRoute } from "next"
import { adminDb } from "@/lib/firebase-admin"
import type { QueryDocumentSnapshot } from "firebase-admin/firestore"

interface News {
  slug: string
  updatedAt?: FirebaseFirestore.Timestamp
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://thinhphufood.vn"

  const snapshot = await adminDb.collection("news").get()

  const newsUrls = snapshot.docs.map((doc) => {
  const data = doc.data() as News;

  return {
    url: `${baseUrl}/tin-tuc/${data.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
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
  ]
}