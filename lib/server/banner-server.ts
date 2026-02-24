import { adminDb } from "../firebase-admin";
import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";

export async function getBanners() {
  const snapshot = await adminDb.collection("banners").get();

  return snapshot.docs.map(
    (doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data();

      return JSON.parse(
        JSON.stringify({
          id: doc.id,
          ...data,
        })
      );
    }
  );
}