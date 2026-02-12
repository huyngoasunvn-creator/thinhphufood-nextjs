import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://thinhphufood.vn",
      lastModified: new Date(),
    },
    {
      url: "https://thinhphufood.vn/products",
      lastModified: new Date(),
    },
    {
      url: "https://thinhphufood.vn/news",
      lastModified: new Date(),
    },
    {
      url: "https://thinhphufood.vn/contact",
      lastModified: new Date(),
    },
  ];
}
