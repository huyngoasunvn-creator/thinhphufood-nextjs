import type { Metadata } from "next";
import { INITIAL_PROFILE } from "@/data/siteSettings";
import { createPageMetadata } from "@/lib/seo";
import { getSettingsServer } from "@/lib/server/settings-server";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettingsServer();
  const profile = settings?.profile ?? INITIAL_PROFILE;
  const pageTitle = ["Tài khoản", "Profile"].includes(profile.title)
    ? "Giới thiệu Thịnh Phú Food"
    : profile.title || "Giới thiệu Thịnh Phú Food";

  return createPageMetadata({
    title: pageTitle,
    description:
      profile.description ||
      "Tìm hiểu về Thịnh Phú Food, cơ cấu tổ chức, quy trình sản xuất và năng lực cung cấp gạo cho gia đình, đại lý và doanh nghiệp.",
    path: "/profile",
  });
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
