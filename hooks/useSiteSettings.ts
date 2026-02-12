
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore"; // ✅ sửa ở đây

import { db } from "../services/firebase";
import {
  Banner,
  Commitment,
  AboutConfig,
  AboutPageConfig,
  ProfileConfig,
  PopupConfig,
  ContactConfig,
  SiteConfig,
  NewsPost,
} from "../types";

import {
  INITIAL_SITE_CONFIG,
  INITIAL_BANNERS,
  INITIAL_COMMITMENTS,
  INITIAL_ABOUT_PAGE,
  INITIAL_PROFILE,
  INITIAL_ABOUT_CONFIG,
  INITIAL_POPUP,
  INITIAL_CONTACT,
} from "../data/siteSettings";

import { SAMPLE_NEWS } from "../data/news";


export const useSiteSettings = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [news, setNews] = useState<NewsPost[]>([]);
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [contact, setContact] = useState<ContactConfig>(INITIAL_CONTACT);
  const [aboutPage, setAboutPage] = useState<AboutPageConfig>(INITIAL_ABOUT_PAGE);
  const [profile, setProfile] = useState<ProfileConfig>(INITIAL_PROFILE);
  const [aboutConfig, setAboutConfig] = useState<AboutConfig>(INITIAL_ABOUT_CONFIG);
  const [popupConfig, setPopupConfig] = useState<PopupConfig>(INITIAL_POPUP);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);

  useEffect(() => {
    // 1. Lắng nghe Tin tức (News)
    const newsQ = query(collection(db, 'news'), orderBy('date', 'desc'));
    const unsubNews = onSnapshot(newsQ, (snap) => {
      const data: NewsPost[] = [];
      snap.forEach(doc => data.push({ id: doc.id, ...doc.data() } as NewsPost));
      setNews(data.length > 0 ? data : SAMPLE_NEWS);
    }, () => setNews(SAMPLE_NEWS));

    // 2. Lắng nghe Banners
    const unsubBanners = onSnapshot(collection(db, 'banners'), (snap) => {
      const data: Banner[] = [];
      snap.forEach(doc => data.push({ id: doc.id, ...doc.data() } as Banner));
      setBanners(data.length > 0 ? data : INITIAL_BANNERS);
    }, () => setBanners(INITIAL_BANNERS));

    // 3. Lắng nghe Cam kết (Commitments)
    const unsubCommitments = onSnapshot(collection(db, 'commitments'), (snap) => {
      const data: Commitment[] = [];
      snap.forEach(doc => data.push({ id: doc.id, ...doc.data() } as Commitment));
      setCommitments(data.length > 0 ? data : INITIAL_COMMITMENTS);
    }, () => setCommitments(INITIAL_COMMITMENTS));

    // 4. Lắng nghe Cấu hình toàn cục (Settings)
    const unsubSettings = onSnapshot(doc(db, 'settings', 'global'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data.contact) setContact(data.contact);
        if (data.aboutPage) setAboutPage(data.aboutPage);
        if (data.profile) setProfile(data.profile);
        if (data.aboutConfig) setAboutConfig(data.aboutConfig);
        if (data.popupConfig) setPopupConfig(data.popupConfig);
        if (data.siteConfig) setSiteConfig(data.siteConfig);
      }
    });

    return () => {
      unsubNews();
      unsubBanners();
      unsubCommitments();
      unsubSettings();
    };
  }, []);

  // Các hàm lưu dữ liệu lên Firestore
  const saveNews = async (updated: NewsPost[]) => {
    // Tìm bài viết bị xóa
    const currentIds = updated.map(n => n.id);
    news.forEach(async (old) => {
      if (!currentIds.includes(old.id)) {
        await deleteDoc(doc(db, 'news', old.id));
      }
    });
    // Cập nhật hoặc thêm mới
    for (const item of updated) {
      await setDoc(doc(db, 'news', item.id), item);
    }
  };

  const saveBanners = async (updated: Banner[]) => {
    const currentIds = updated.map(b => b.id);
    banners.forEach(async (old) => {
      if (!currentIds.includes(old.id)) await deleteDoc(doc(db, 'banners', old.id));
    });
    for (const item of updated) {
      await setDoc(doc(db, 'banners', item.id), item);
    }
  };

  const saveCommitments = async (updated: Commitment[]) => {
    const currentIds = updated.map(c => c.id);
    commitments.forEach(async (old) => {
      if (!currentIds.includes(old.id)) await deleteDoc(doc(db, 'commitments', old.id));
    });
    for (const item of updated) {
      await setDoc(doc(db, 'commitments', item.id), item);
    }
  };

  const updateGlobalSettings = async (key: string, value: any) => {
    await setDoc(doc(db, 'settings', 'global'), { [key]: value }, { merge: true });
  };

  const updateSiteConfig = (config: SiteConfig) => updateGlobalSettings('siteConfig', config);
  const saveContact = (config: ContactConfig) => updateGlobalSettings('contact', config);
  const saveAboutConfig = (config: AboutConfig) => updateGlobalSettings('aboutConfig', config);
  const saveAboutPage = (config: AboutPageConfig) => updateGlobalSettings('aboutPage', config);
  const saveProfile = (config: ProfileConfig) => updateGlobalSettings('profile', config);
  const savePopups = (config: PopupConfig) => updateGlobalSettings('popupConfig', config);

  return {
    banners, news, commitments, contact, aboutPage, profile, aboutConfig, popupConfig, siteConfig,
    updateSiteConfig, saveNews, saveBanners, saveCommitments, saveContact, saveAboutConfig, saveAboutPage, saveProfile, savePopups
  };
};
