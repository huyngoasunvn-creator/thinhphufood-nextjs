import type { Metadata } from "next";
import { INITIAL_ABOUT_PAGE } from "@/data/siteSettings";
import { createPageMetadata } from "@/lib/seo";
import { getSettingsServer } from "@/lib/server/settings-server";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettingsServer();
  const aboutPage = settings?.aboutPage ?? INITIAL_ABOUT_PAGE;

  return createPageMetadata({
    title: aboutPage.title || "Về chúng tôi",
    description:
      "Tìm hiểu về hành trình mang nông sản sạch và gạo chất lượng cao đến mọi gia đình của Thịnh Phú Food.",
    path: "/about-us",
  });
}

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
