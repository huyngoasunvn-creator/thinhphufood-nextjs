import { adminDb } from "@/lib/firebase-admin";
import { Product } from "@/types";
import {
  Query,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";

export async function getProducts(
  onlyActive: boolean = true
): Promise<Product[]> {
  const collectionRef = adminDb.collection("products");

  const query: Query = onlyActive
    ? collectionRef.where("isActive", "==", true)
    : collectionRef;

  const snapshot = await query.get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Product, "id">),
  }));
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

  return {
    id: doc.id,
    ...(doc.data() as Omit<Product, "id">),
  };
}