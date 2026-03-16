"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function IntroWelcome() {
  const pathname = usePathname();

  const [visible, setVisible] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {

    // chỉ chạy intro cho các trang này
    if (
      pathname === "/san-pham" ||
      pathname === "/tin-tuc" ||
      pathname === "/"
    ) {

      setVisible(true);
      setFade(false);

      const fadeTimer = setTimeout(() => {
        setFade(true);
      }, 400);

      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, 700);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }

  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-b from-white to-green-50 transition-opacity duration-500 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <h1 className="px-6 text-center text-2xl sm:text-3xl md:text-4xl font-semibold text-green-700 leading-relaxed animate-intro">
        ThinhPhuFood kính chào <br className="sm:hidden" /> Quý Khách!
      </h1>
    </div>
  );
}