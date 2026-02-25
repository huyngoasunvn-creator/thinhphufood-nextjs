import { adminDb } from "../firebase-admin";
import { Product } from "@/types";
import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";

export async function getProducts(): Promise<Product[]> {
  const snapshot = await adminDb.collection("products").get();

  return snapshot.docs.map(
    (doc: QueryDocumentSnapshot<DocumentData>) => {
      const raw = doc.data();

      return {
        id: doc.id,
        name: raw.name || "",
        slug: raw.slug || "",
        description: raw.description || "",
        shortDescription: raw.shortDescription || "",
        price: raw.price || 0,
        salePrice: raw.salePrice || 0,
        images: raw.images || [],
        category: raw.category || "",
        tags: raw.tags || [],
        stock: raw.stock || 0,
        comparePrice: raw.comparePrice || 0,
        rating: raw.rating || 0,
        reviewCount: raw.reviewCount || 0,
        isFeatured: raw.isFeatured || false,
        isActive: raw.isActive ?? true,
        createdAt: raw.createdAt?.toDate?.().toISOString?.() || "",
        updatedAt: raw.updatedAt?.toDate?.().toISOString?.() || "",
      };
    }
  );
} // 👈 DẤU NÀY ANH BỊ THIẾU

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
  const raw = doc.data();

  const product: Product = {
    id: doc.id,
    name: raw.name || "",
    slug: raw.slug || "",
    description: raw.description || "",
    shortDescription: raw.shortDescription || "",
    price: raw.price || 0,
    salePrice: raw.salePrice || 0,
    images: raw.images || [],
    category: raw.category || "",
    tags: raw.tags || [],
    stock: raw.stock || 0,
    comparePrice: raw.comparePrice || 0,
    rating: raw.rating || 0,
    reviewCount: raw.reviewCount || 0,
    isFeatured: raw.isFeatured || false,
    isActive: raw.isActive ?? true,
    createdAt: raw.createdAt?.toDate?.().toISOString?.() || "",
    updatedAt: raw.updatedAt?.toDate?.().toISOString?.() || "",
  };

  return product;
}