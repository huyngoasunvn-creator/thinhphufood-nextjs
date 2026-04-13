import type { Metadata } from "next";
import { INITIAL_CONTACT } from "@/data/siteSettings";
import { createPageMetadata } from "@/lib/seo";
import { getSettingsServer } from "@/lib/server/settings-server";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettingsServer();
  const contact = settings?.contact ?? INITIAL_CONTACT;

  return createPageMetadata({
    title: contact.title || "Liên hệ",
    description:
      contact.description ||
      "Thông tin liên hệ, địa chỉ và cách kết nối nhanh với Thịnh Phú Food.",
    path: "/contact",
  });
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
