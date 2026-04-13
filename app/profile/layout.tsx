import type { Metadata } from "next";
import { INITIAL_PROFILE } from "@/data/siteSettings";
import { createPageMetadata } from "@/lib/seo";
import { getSettingsServer } from "@/lib/server/settings-server";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettingsServer();
  const profile = settings?.profile ?? INITIAL_PROFILE;

  return createPageMetadata({
    title: profile.title || "Tai khoan",
    description: "Trang thong tin tai khoan nguoi dung.",
    path: "/profile",
    noIndex: true,
  });
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
