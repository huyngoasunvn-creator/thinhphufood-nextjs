import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Su kien",
  description:
    "Cap nhat cac su kien, chuong trinh noi bat va chien dich dang dien ra cua Thinh Phu Food.",
  path: "/su-kien",
});

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
