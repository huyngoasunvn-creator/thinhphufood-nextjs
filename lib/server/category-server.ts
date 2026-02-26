import { adminDb } from "@/lib/firebase-admin";

export async function getCategories() {
  if (!adminDb) return [];

  const snapshot = await adminDb.collection("categories").get();

  return snapshot.docs.map((doc: any) => ({
    id: doc.id,
    name: doc.data().name,
  }));
}