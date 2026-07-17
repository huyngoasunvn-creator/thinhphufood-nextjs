import type { Product } from "@/types";
import type { MenuItem } from "@/lib/server/menu-server";
import { getProductCategoryMenus } from "@/lib/product-category-menus";

export const SECTION_ROOT_SLUGS = new Set(["san-pham", "nong-san"]);

export function buildMenuMap(menus: MenuItem[]) {
  return new Map(menus.map((menu) => [menu.id, menu]));
}

export function findMenuBySlug(menus: MenuItem[], slug: string) {
  return menus.find((menu) => menu.slug === slug) ?? null;
}

export function findSectionRoot(
  menu: MenuItem | null | undefined,
  menuMap: Map<string, MenuItem>,
) {
  let current = menu ?? null;

  while (current) {
    if (SECTION_ROOT_SLUGS.has(current.slug)) {
      return current;
    }

    current = current.parentId ? menuMap.get(current.parentId) ?? null : null;
  }

  return null;
}

export function getDescendantMenuIds(
  menus: MenuItem[],
  rootId: string,
  includeRoot = true,
) {
  const ids = new Set<string>();

  if (includeRoot) {
    ids.add(rootId);
  }

  const visit = (parentId: string) => {
    for (const menu of menus) {
      if (menu.parentId === parentId) {
        ids.add(menu.id);
        visit(menu.id);
      }
    }
  };

  visit(rootId);
  return ids;
}

export function getSectionProducts(
  menus: MenuItem[],
  products: Product[],
  rootSlug: string,
) {
  const rootMenu = findMenuBySlug(menus, rootSlug);
  if (!rootMenu) return [];

  const descendantIds = getDescendantMenuIds(menus, rootMenu.id, true);
  return products.filter((product) => descendantIds.has(product.menuId || ""));
}

export function getSectionCategoryMenus(
  menus: MenuItem[],
  products: Product[],
  rootSlug: string,
) {
  const rootMenu = findMenuBySlug(menus, rootSlug);
  if (!rootMenu) return [];

  const descendantIds = getDescendantMenuIds(menus, rootMenu.id, true);
  const scopedProducts = products.filter((product) =>
    descendantIds.has(product.menuId || ""),
  );

  return getProductCategoryMenus(menus, scopedProducts).filter(
    (menu) => menu.id !== rootMenu.id && descendantIds.has(menu.id),
  );
}
