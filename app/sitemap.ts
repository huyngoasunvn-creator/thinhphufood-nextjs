import { MetadataRoute } from "next";
import { buildMenuMap, findSectionRoot } from "@/lib/menu-sections";
import { SITE_URL } from "@/lib/seo";
import { getMenus } from "@/lib/server/menu-server";
import { getNewsServer } from "@/lib/server/news-server";
import { getProducts } from "@/lib/server/product-server";

function toDate(value?: string | Date | { toDate?: () => Date } | null) {
  if (!value) {
    return new Date();
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  }

  if (typeof value?.toDate === "function") {
    return value.toDate();
  }

  return new Date();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, news, menus] = await Promise.all([
    getProducts(),
    getNewsServer(),
    getMenus(),
  ]);

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/san-pham`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/nong-san`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/tin-tuc`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/profile`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/su-kien`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/san-pham/${product.slug}`,
    lastModified: toDate(product.updatedAt || product.createdAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const newsUrls: MetadataRoute.Sitemap = news.map((post) => ({
    url: `${SITE_URL}/tin-tuc/${post.slug}`,
    lastModified: toDate(post.date),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const menuMap = buildMenuMap(menus as any);

  const categoryUrls: MetadataRoute.Sitemap = menus
    .filter((item) => item.slug)
    .flatMap((item) => {
      if (item.slug === "san-pham" || item.slug === "nong-san") {
        return [];
      }

      const sectionRoot = findSectionRoot(item as any, menuMap as any);

      if (sectionRoot?.slug === "san-pham") {
        return [
          {
            url: `${SITE_URL}/danh-muc/${item.slug}`,
            lastModified: toDate(item.updatedAt),
            changeFrequency: "weekly" as const,
            priority: 0.65,
          },
        ];
      }

      if (sectionRoot?.slug === "nong-san") {
        return [
          {
            url: `${SITE_URL}/nong-san?category=${item.id}`,
            lastModified: toDate(item.updatedAt),
            changeFrequency: "weekly" as const,
            priority: 0.65,
          },
        ];
      }

      return [
        {
          url: `${SITE_URL}/danh-muc/${item.slug}`,
          lastModified: toDate(item.updatedAt),
          changeFrequency: "weekly" as const,
          priority: item.parentId ? 0.65 : 0.75,
        },
      ];
    });

  return [...staticUrls, ...categoryUrls, ...productUrls, ...newsUrls];
}
