import { adminDb } from "@/lib/firebase-admin";

export async function getThemeConfig() {
  try {
    const snapshot = await adminDb
      .collection("siteConfig")
      .doc("theme")
      .get();

    if (!snapshot.exists) return null;

    return snapshot.data();
  } catch (error) {
    console.error("Error fetching theme config:", error);
    return null;
  }
}