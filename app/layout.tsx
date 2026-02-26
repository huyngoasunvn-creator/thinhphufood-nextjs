import React from "react";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Be_Vietnam_Pro } from "next/font/google";
import type { Metadata } from "next";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thinhphufood.vn"),

  title: {
    default: "Thịnh Phú Food - Gạo ST25 Chính Hãng",
    template: "%s | Thịnh Phú Food",
  },

  description:
    "Chuyên cung cấp gạo ST25, gạo sạch đạt chuẩn VietGAP. Giao hàng toàn quốc.",

  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://thinhphufood.vn",
    siteName: "Thịnh Phú Food",
    title: "Thịnh Phú Food - Gạo ST25 Chính Hãng",
    description:
      "Gạo ST25 thơm ngon, đạt chuẩn VietGAP, giao hàng toàn quốc.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Thịnh Phú Food",
    description: "Gạo sạch chất lượng cao",
  },

  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${beVietnam.className} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}