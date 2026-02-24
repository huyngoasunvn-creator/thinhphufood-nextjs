import React from 'react';
import './globals.css';
import ClientLayout from './ClientLayout';
import { Be_Vietnam_Pro } from 'next/font/google';

const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  metadataBase: new URL("https://thinhphufood.vercel.app"),
  title: {
    default: "Thịnh Phú Food",
    template: "%s | Thịnh Phú Food",
  },
  description: "Thực phẩm nông sản chất lượng cao",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${beVietnam.className} antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
