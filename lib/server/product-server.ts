import { adminDb } from "../firebase-admin";
import { Product } from "@/types";
import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";

export async function getProducts(): Promise<Product[]> {
  const snapshot = await adminDb.collection("products").get();

  const data: Product[] = snapshot.docs.map(
    (doc: QueryDocumentSnapshot<DocumentData>) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Product)
  );

  return JSON.parse(JSON.stringify(data));
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const snapshot = await adminDb
    .collection("products")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];

  const data = {
    id: doc.id,
    ...doc.data(),
  };

  return JSON.parse(JSON.stringify(data)) as Product;
}