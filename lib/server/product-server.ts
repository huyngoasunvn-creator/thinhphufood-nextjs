import type { Product } from "@/types";
import type {
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { adminDb } from "../firebase-admin";

function safeDate(value: unknown): string {
  if (!value) return "";

  if (typeof (value as { toDate?: () => Date }).toDate === "function") {
    try {
      return (value as { toDate: () => Date }).toDate().toISOString();
    } catch {
      return "";
    }
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "string") {
    return value;
  }

  return "";
}

function mapProduct(doc: QueryDocumentSnapshot<DocumentData>): Product {
  const raw = doc.data() ?? {};

  return {
    id: doc.id,
    name: raw.name ?? "",
    slug: raw.slug ?? "",
    description: raw.description ?? "",
    shortDescription: raw.shortDescription ?? "",
    price: raw.price ?? 0,
    salePrice: raw.salePrice ?? 0,
    comparePrice: raw.comparePrice ?? 0,
    unit: raw.unit ?? "",
    images: Array.isArray(raw.images) ? raw.images : [],
    menuId: raw.menuId ?? raw.categoryId ?? "",
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    stock: raw.stock ?? 0,
    rating: raw.rating ?? 0,
    reviewCount: raw.reviewCount ?? 0,
    isFeatured: raw.isFeatured ?? false,
    isBestseller: raw.isBestseller ?? false,
    isActive: raw.isActive ?? true,
    createdAt: safeDate(raw.createdAt),
    updatedAt: safeDate(raw.updatedAt),
  };
}

function sortProductsByNewest(products: Product[]) {
  return products.sort((first, second) => {
    const firstTime = new Date(first.updatedAt || first.createdAt || 0).getTime();
    const secondTime = new Date(second.updatedAt || second.createdAt || 0).getTime();

    return secondTime - firstTime;
  });
}

export async function getProducts(onlyActive = true): Promise<Product[]> {
  try {
    const snapshot = await adminDb.collection("products").get();

    if (!snapshot.docs) return [];

    const products = sortProductsByNewest(snapshot.docs.map(mapProduct)).filter(
      (product) => !onlyActive || product.isActive !== false,
    );

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("getProducts error:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const snapshot = await adminDb
      .collection("products")
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const product = mapProduct(snapshot.docs[0]);

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error("getProductBySlug error:", error);
    return null;
  }
}

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

export async function updateProduct(id: string, data: Partial<Product>) {
  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined),
  );

  await adminDb.collection("products").doc(id).update({
    ...cleanData,
    updatedAt: new Date(),
  });

  return true;
}

export async function deleteProduct(id: string) {
  await adminDb.collection("products").doc(id).delete();
  return true;
}
