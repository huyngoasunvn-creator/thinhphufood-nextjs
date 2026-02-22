import { adminDb } from "@/lib/firebase-admin";

export async function getSettingsServer() {
  try {
    const docRef = adminDb.collection("settings").doc("global");
    const snapshot = await docRef.get();

    if (!snapshot.exists) return null;

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  } catch (error) {
    console.error("getSettingsServer error:", error);
    return null;
  }
}
