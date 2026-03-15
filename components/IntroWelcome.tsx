"use client";

import { useEffect, useState } from "react";

export default function IntroWelcome() {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, 600); // bắt đầu fade

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 900); // ẩn hoàn toàn

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

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