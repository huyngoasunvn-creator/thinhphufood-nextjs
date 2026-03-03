import { adminDb } from "../firebase-admin";
import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";

export async function getBannersServer() {
  const snapshot = await adminDb
    .collection("banners")
    .where("isActive", "==", true)
    .orderBy("order", "asc")
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}