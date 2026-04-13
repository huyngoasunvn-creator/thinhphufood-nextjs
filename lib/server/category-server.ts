import type { QueryDocumentSnapshot } from "firebase-admin/firestore";
import type { Category } from "@/types";
import { adminDb } from "@/lib/firebase-admin";

export async function getCategories(): Promise<Category[]> {
  try {
    if (!adminDb) return [];

    const snapshot = await adminDb.collection("categories").get();

    if (snapshot.empty) return [];

    const categories: Category[] = snapshot.docs
      .map((doc: QueryDocumentSnapshot) => {
        const data = doc.data() as Omit<Category, "id">;

        return {
          id: doc.id,
          ...data,
          isActive: data.isActive !== false,
        };
      })
      .filter((item) => item.isActive !== false);

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
