import { adminDb } from "../firebase-admin";
import {
  AboutConfig,
  AboutPageConfig,
  ContactConfig,
  HomePageConfig,
  PopupConfig,
  ProfileConfig,
  SiteConfig,
} from "@/types";

interface GlobalSettings {
  aboutConfig?: AboutConfig;
  homePageConfig?: HomePageConfig;
  aboutPage?: AboutPageConfig;
  contact?: ContactConfig;
  popupConfig?: PopupConfig;
  profile?: ProfileConfig;
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

