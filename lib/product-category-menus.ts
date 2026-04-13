import type { Product } from "@/types";
import type { MenuItem } from "@/lib/server/menu-server";

const NON_PRODUCT_MENU_SLUGS = new Set([
  "",
  "/",
  "trang-chu",
  "san-pham",
  "tin-tuc",
  "gioi-thieu",
  "ve-chung-toi",
  "lien-he",
  "contact",
  "about-us",
]);

export function getProductCategoryMenus(
  menus: MenuItem[],
  products: Product[],
): MenuItem[] {
  const menuMap = new Map(menus.map((menu) => [menu.id, menu]));
  const relevantIds = new Set<string>();

  for (const product of products) {
    let currentId = product.menuId;

    while (currentId) {
      if (relevantIds.has(currentId)) {
        break;
      }

      const menu = menuMap.get(currentId);

      if (!menu) {
        break;
      }

      relevantIds.add(currentId);
      currentId = menu.parentId ?? "";
    }
  }

  return menus.filter((menu) => {
    if (!relevantIds.has(menu.id)) {
      return false;
    }

    return !NON_PRODUCT_MENU_SLUGS.has(menu.slug);
  });
}
