"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Snow from "./Snow";
import Tet from "./Tet";

type ThemeConfig = {
  enabled: boolean;
  type: "snow" | "tet" | null;
};

export default function ThemeEffect() {
  const [config, setConfig] = useState<ThemeConfig | null>(null);
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    if (isAdminRoute) return;

    const fetchTheme = async () => {
      try {
        const res = await fetch("/api/theme", {
          cache: "no-store", // 🔥 thêm dòng này
        });

        const data = await res.json();
        setConfig(data);
      } catch (error) {
        console.error("Theme fetch error:", error);
      }
    };

    fetchTheme();
  }, [isAdminRoute]);

  if (isAdminRoute || !config?.enabled) return null;

  if (config.type === "snow") return <Snow />;
  if (config.type === "tet") return <Tet />;

  return null;
}
