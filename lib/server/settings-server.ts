import { adminDb } from "../firebase-admin";
import { AboutConfig, SiteConfig } from "@/types";

interface GlobalSettings {
  aboutConfig?: AboutConfig;
  siteConfig?: SiteConfig;
}

export async function getSettingsServer(): Promise<GlobalSettings | null> {
  const doc = await adminDb.collection("settings").doc("global").get();

  if (!doc.exists) return null;

  const data: GlobalSettings = {
    ...doc.data(),
  };

  return JSON.parse(JSON.stringify(data));
}

