import { adminDb } from "@/lib/firebase-admin";

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  isActive: boolean;
  order: number;
  updatedAt?: { toDate?: () => Date } | Date | string | null;
}

export async function getMenus(): Promise<MenuItem[]> {
  const snapshot = await adminDb
    .collection("menus")
    .orderBy("order", "asc")
    .get();

  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      name: String(doc.data().name ?? ""),
      slug: String(doc.data().slug ?? ""),
      parentId: (doc.data().parentId as string | null | undefined) ?? null,
      isActive: doc.data().isActive !== false,
      order: Number(doc.data().order ?? 0),
      updatedAt: doc.data().updatedAt ?? null,
    }))
    .filter((item) => item.isActive);
}

export async function createMenu(data: Record<string, unknown>) {
  return adminDb.collection("menus").add(data);
}

export async function updateMenu(id: string, data: Record<string, unknown>) {
  return adminDb.collection("menus").doc(id).update(data);
}

export async function deleteMenu(id: string) {
  return adminDb.collection("menus").doc(id).delete();
}
