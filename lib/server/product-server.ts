import { adminDb } from "../firebase-admin";
import { Product } from "@/types";

export async function getProducts(): Promise<Product[]> {
  const snapshot = await adminDb.collection("products").get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Product, "id">),
  }));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const snapshot = await adminDb
    .collection("products")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];

  return {
    id: doc.id,
    ...(doc.data() as Omit<Product, "id">),
  };
}
