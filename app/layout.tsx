import React from "react";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import ClientLayout from "./ClientLayout";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import IntroWelcome from "@/components/IntroWelcome";
import ThemeEffect from "@/components/ThemeEffect";
import { getGlobalSeoSchema, rootMetadata } from "@/lib/seo";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalSeoSchema = getGlobalSeoSchema();

  return (
    <html lang="vi">
      <body className={`${beVietnam.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalSeoSchema),
          }}
        />
        <IntroWelcome />
        <CartProvider>
          <ThemeEffect />
          <ClientLayout>{children}</ClientLayout>
        </CartProvider>
      </body>
    </html>
  );
}
