import { Product } from "@/types/product";
import { CartItem } from "@/types";

export const toCartItem = (
  product: Product,
  quantity: number
): CartItem => ({
  id: product.id,
  name: product.name,
  price: product.price,
  unit: product.unit,
  category: product.category,
  images: product.images ?? [],   // 🔥 FIX CỐT LÕI
  quantity
});