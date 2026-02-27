import { useState, useEffect } from "react";
import { Order, CartItem } from "@/types";
import { PRODUCTS as INITIAL_PRODUCTS } from "../data/products";

/* ===============================
   Helper: Product -> CartItem
=============================== */
const mapProductToCartItem = (
  product: any,
  quantity: number
): CartItem => {
  if (!product) {
    return {
      id: "unknown",
      name: "Sản phẩm",
      price: 0,
      unit: "",
      category: "",
      images: [],
      quantity,
    };
  }

  return {
    id: product.id ?? "unknown",
    name: product.name ?? "Sản phẩm",
    price: product.price ?? 0,
    unit: product.unit ?? "",
    category: product.category ?? "",
    images: product.images ?? [],
    quantity,
  };
};

/* ===============================
   MOCK DATA
=============================== */
const INITIAL_ORDERS_MOCK: Order[] = [
  {
    id: "DH001",
    customerName: "Nguyễn Văn A",
    phone: "0987654321",
    address: "123 Cách Mạng Tháng 8, Quận 3, TP.HCM",
    items: [
  mapProductToCartItem(INITIAL_PRODUCTS?.[0], 2),
  mapProductToCartItem(INITIAL_PRODUCTS?.[1], 1),
],
    shippingFee: 0,
    total: 115000,
    status: "pending",
    createdAt: "12/05/2024",
    paymentMethod: "cod",
    note: "Giao sau 5h chiều",
  },
  {
    id: "DH002",
    customerName: "Trần Thị B",
    phone: "0123456789",
    address: "456 Lê Lợi, Quận 1, TP.HCM",
    items: [mapProductToCartItem(INITIAL_PRODUCTS?.[2], 5)],
    shippingFee: 30000,
    total: 170000,
    status: "shipping",
    createdAt: "11/05/2024",
    paymentMethod: "transfer",
  },
];

/* ===============================
   HOOK
=============================== */
export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("thinhphu_orders");

    if (saved) {
      setOrders(JSON.parse(saved));
    } else {
      setOrders(INITIAL_ORDERS_MOCK);
      localStorage.setItem(
        "thinhphu_orders",
        JSON.stringify(INITIAL_ORDERS_MOCK)
      );
    }
  }, []);

  const addOrder = (order: Order) => {
    const updated = [order, ...orders];
    setOrders(updated);
    localStorage.setItem("thinhphu_orders", JSON.stringify(updated));
  };

  const saveOrders = (updated: Order[]) => {
    setOrders(updated);
    localStorage.setItem("thinhphu_orders", JSON.stringify(updated));
  };

  return { orders, addOrder, saveOrders };
};