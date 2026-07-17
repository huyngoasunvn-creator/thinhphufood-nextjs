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

function normalizeSlug(value: unknown) {
  return String(value ?? "")
    .trim()
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
}

export async function getMenus(): Promise<MenuItem[]> {
  const snapshot = await adminDb
    .collection("menus")
    .orderBy("order", "asc")
    .get();

  const allMenus = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: String(doc.data().name ?? ""),
      slug: normalizeSlug(doc.data().slug),
      parentId: (doc.data().parentId as string | null | undefined) ?? null,
      isActive: doc.data().isActive !== false,
      order: Number(doc.data().order ?? 0),
      updatedAt: doc.data().updatedAt ?? null,
    }));

  const activeMenus = allMenus.filter((item) => item.isActive);
  const activeMap = new Map(activeMenus.map((item) => [item.id, item]));

  const hasActiveAncestors = (menu: MenuItem) => {
    let currentParentId = menu.parentId;

    while (currentParentId) {
      const parent = activeMap.get(currentParentId);

      if (!parent) {
        return false;
      }

      currentParentId = parent.parentId;
    }

    return true;
  };

  return activeMenus.filter(hasActiveAncestors);
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
