import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Test",
  description: "Trang noi bo dung de thu nghiem.",
  path: "/test",
  noIndex: true,
});

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
