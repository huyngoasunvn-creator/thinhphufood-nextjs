"use client";

import { useEffect, useState } from "react";
import Snow from "./Snow";
import Tet from "./Tet";

type ThemeConfig = {
  enabled: boolean;
  type: "snow" | "tet" | null;
};

export default function ThemeEffect() {
  const [config, setConfig] = useState<ThemeConfig | null>(null);

  useEffect(() => {
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
  }, []);

  if (!config?.enabled) return null;

  if (config.type === "snow") return <Snow />;
  if (config.type === "tet") return <Tet />;

  return null;
}