'use client';

import { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import type {
  AboutConfig,
  AboutPageConfig,
  ContactConfig,
  PopupConfig,
  ProfileConfig,
  SiteConfig,
} from "@/types";
import {
  INITIAL_ABOUT_CONFIG,
  INITIAL_ABOUT_PAGE,
  INITIAL_CONTACT,
  INITIAL_POPUP,
  INITIAL_PROFILE,
  INITIAL_SITE_CONFIG,
} from "@/data/siteSettings";

export function useGlobalSettings() {
  const [contact, setContact] = useState<ContactConfig>(INITIAL_CONTACT);
  const [aboutPage, setAboutPage] =
    useState<AboutPageConfig>(INITIAL_ABOUT_PAGE);
  const [profile, setProfile] = useState<ProfileConfig>(INITIAL_PROFILE);
  const [aboutConfig, setAboutConfig] =
    useState<AboutConfig>(INITIAL_ABOUT_CONFIG);
  const [popupConfig, setPopupConfig] = useState<PopupConfig>(INITIAL_POPUP);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);

  useEffect(() => {
    return onSnapshot(doc(db, "settings", "global"), (snap) => {
      if (!snap.exists()) return;

      const data = snap.data();

      if (data.contact) setContact(data.contact);
      if (data.aboutPage) setAboutPage(data.aboutPage);
      if (data.profile) setProfile(data.profile);
      if (data.aboutConfig) setAboutConfig(data.aboutConfig);
      if (data.popupConfig) setPopupConfig(data.popupConfig);
      if (data.siteConfig) setSiteConfig(data.siteConfig);
    });
  }, []);

  const updateGlobalSettings = async (key: string, value: unknown) => {
    await setDoc(doc(db, "settings", "global"), { [key]: value }, { merge: true });
  };

  return {
    contact,
    aboutPage,
    profile,
    aboutConfig,
    popupConfig,
    siteConfig,
    saveContact: (config: ContactConfig) => updateGlobalSettings("contact", config),
    saveAboutPage: (config: AboutPageConfig) =>
      updateGlobalSettings("aboutPage", config),
    saveProfile: (config: ProfileConfig) =>
      updateGlobalSettings("profile", config),
    saveAboutConfig: (config: AboutConfig) =>
      updateGlobalSettings("aboutConfig", config),
    savePopups: (config: PopupConfig) =>
      updateGlobalSettings("popupConfig", config),
    updateSiteConfig: (config: SiteConfig) =>
      updateGlobalSettings("siteConfig", config),
  };
}
