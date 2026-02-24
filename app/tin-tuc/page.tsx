import { adminDb } from "@/lib/firebase-admin";
import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";

export async function getBanners() {
  if (!adminDb) {
    console.error("adminDb not initialized");
    return [];
  }

  const snapshot = await adminDb.collection("banners").get();

  return snapshot.docs.map(
    (doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data();

      // Tránh lỗi serialize Date
      return JSON.parse(
        JSON.stringify({
          id: doc.id,
          ...data,
        })
      );
    }
  );
}