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
    "Thịnh Phú Food chuyên cung cấp gạo ST25 chính hãng, gạo sạch đạt chuẩn VietGAP. Giao hàng toàn quốc, đảm bảo chất lượng và an toàn thực phẩm.",

  keywords: [
    "gạo ST25",
    "gạo ST25 chính hãng",
    "gạo sạch VietGAP",
    "Thịnh Phú Food",
    "thinhphufood.vn",
  ],

  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://thinhphufood.vn",
    siteName: "Thịnh Phú Food",
    title: "Thịnh Phú Food - Gạo ST25 Chính Hãng",
    description:
      "Gạo ST25 thơm ngon, đạt chuẩn VietGAP, giao hàng toàn quốc.",
    images: [
      {
        url: "/og-image.jpg", // bạn nhớ tạo ảnh này trong thư mục public
        width: 1200,
        height: 630,
        alt: "Thịnh Phú Food - Gạo ST25 Chính Hãng",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Thịnh Phú Food - Gạo ST25",
    description: "Gạo sạch chất lượng cao, đạt chuẩn VietGAP",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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