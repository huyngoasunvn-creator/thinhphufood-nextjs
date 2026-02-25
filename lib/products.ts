import { adminDb } from "@/lib/firebase-admin";
import { Product } from "@/types";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";

export async function getProducts(): Promise<Product[]> {
  const snapshot = await adminDb
    .collection("products")
    .where("isActive", "==", true)
    .get();

  return snapshot.docs.map((doc: QueryDocumentSnapshot) => {
    const data = doc.data() as Omit<Product, "id">;

    return {
      id: doc.id,
      ...data,
    };
  });
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const snapshot = await adminDb
    .collection("products")
    .where("slug", "==", slug)
    .where("isActive", "==", true)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc: QueryDocumentSnapshot = snapshot.docs[0];
  const data = doc.data() as Omit<Product, "id">;

  return {
    id: doc.id,
    ...data,
  };
}