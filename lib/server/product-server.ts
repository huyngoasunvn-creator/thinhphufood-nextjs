import { adminDb } from "../firebase-admin";
import type { Product } from "@/types";
import type {
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase-admin/firestore";

/* ================= SAFE DATE HELPER ================= */

function safeDate(value: any): string {
  if (!value) return "";

  // Firestore Timestamp
  if (typeof value?.toDate === "function") {
    try {
      return value.toDate().toISOString();
    } catch {
      return "";
    }
  }

  // Native Date
  if (value instanceof Date) {
    return value.toISOString();
  }

  // Already string
  if (typeof value === "string") {
    return value;
  }

  return "";
}

/* ================= MAP HELPER ================= */

function mapProduct(
  doc: QueryDocumentSnapshot<DocumentData>
): Product {
  const raw = doc?.data?.() ?? {};

  return {
    id: doc?.id ?? "",
    name: raw?.name ?? "",
    slug: raw?.slug ?? "",
    description: raw?.description ?? "",
    shortDescription: raw?.shortDescription ?? "",
    price: raw?.price ?? 0,
    salePrice: raw?.salePrice ?? 0,
    comparePrice: raw?.comparePrice ?? 0,
    unit: raw?.unit ?? "",
    images: Array.isArray(raw?.images) ? raw.images : [],
    categoryId: raw?.categoryId ?? "",
    tags: Array.isArray(raw?.tags) ? raw.tags : [],
    stock: raw?.stock ?? 0,
    rating: raw?.rating ?? 0,
    reviewCount: raw?.reviewCount ?? 0,

    /* 🔥 QUAN TRỌNG */
    isFeatured: raw?.isFeatured ?? false,
    isBestseller: raw?.isBestseller ?? false,   // ✅ FIX LỖI Ở ĐÂY
    isActive: raw?.isActive ?? true,

    createdAt: safeDate(raw?.createdAt),
    updatedAt: safeDate(raw?.updatedAt),
  };
}

/* ================= GET ALL ================= */

export async function getProducts(
  onlyActive: boolean = true
): Promise<Product[]> {
  try {
    const snapshot = await adminDb
  .collection("products")
  .orderBy("createdAt", "desc")
  .get();

    if (!snapshot?.docs) return [];

    let products = snapshot.docs.map(mapProduct);

    if (onlyActive) {
      products = products.filter(
        (product) => product && product.isActive !== false
      );
    }

    // 🔥 ÉP VỀ PLAIN OBJECT 100%
    return JSON.parse(JSON.stringify(products));

  } catch (error) {
    console.error("getProducts error:", error);
    return [];
  }
}

/* ================= GET BY SLUG ================= */

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  try {
    const snapshot = await adminDb
      .collection("products")
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (!snapshot || snapshot.empty) return null;

    const product = mapProduct(snapshot.docs[0]);

    // 🔥 ÉP VỀ PLAIN OBJECT
    return JSON.parse(JSON.stringify(product));

  } catch (error) {
    console.error("getProductBySlug error:", error);
    return null;
  }
}
/* ================= CREATE ================= */

export async function createProduct(
  data: Omit<Product, "id" | "createdAt" | "updatedAt">
) {
  const docRef = await adminDb.collection("products").add({
    ...data,

    rating: data.rating ?? 5,
    reviewCount: data.reviewCount ?? 1,
    isActive: data.isActive ?? true,
    isFeatured: data.isFeatured ?? false,
    isBestseller: data.isBestseller ?? false,
    stock: data.stock ?? 0,

    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await docRef.update({ id: docRef.id });

  return docRef.id;
}

/* ================= UPDATE ================= */

export async function updateProduct(
  id: string,
  data: Partial<Product>
) {
  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined)
  );

  await adminDb.collection("products").doc(id).update({
    ...cleanData,
    updatedAt: new Date(),
  });

  return true;
}

/* ================= DELETE ================= */

export async function deleteProduct(id: string) {
  await adminDb.collection("products").doc(id).delete();
  return true;
}