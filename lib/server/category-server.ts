import { adminDb } from "@/lib/firebase-admin";
import type { Category } from "@/types";
import type { QueryDocumentSnapshot } from "firebase-admin/firestore";

export async function getCategories(): Promise<Category[]> {
  try {
    if (!adminDb) return [];

    const snapshot = await adminDb
      .collection("categories")
      .get();

    if (snapshot.empty) return [];

    const categories: Category[] = snapshot.docs.map(
      (doc: QueryDocumentSnapshot) => {
        const data = doc.data() as Omit<Category, "id">;

        return {
          id: doc.id,
          ...data,
        };
      }
    );

    return categories.filter((cat) => cat.isActive);
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return [];
  }
}