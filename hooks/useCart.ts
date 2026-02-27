import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Product, CartItem } from "@/types";
import { db } from "../services/firebase";
import { useAuth } from "./useAuth";

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  /* ===============================
     1. LOAD CART
  =============================== */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadCart = async () => {
      let remoteItems: CartItem[] = [];

      if (user) {
        try {
          const cartRef = doc(db, "carts", user.uid);
          const cartSnap = await getDoc(cartRef);

          if (cartSnap.exists()) {
            const data = cartSnap.data();
            remoteItems = (data.items || []) as CartItem[];
            setCartItems(remoteItems);
            return;
          }
        } catch (error) {
          console.error("Firestore Cart Load Error:", error);
        }
      }

      // fallback localStorage
      try {
        const localCart: CartItem[] = JSON.parse(
          localStorage.getItem("thinhphu_cart") || "[]"
        );
        setCartItems(localCart);
      } catch {
        setCartItems([]);
      }
    };

    loadCart();
  }, [user]);

  /* ===============================
     2. SAVE CART
  =============================== */
  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem("thinhphu_cart", JSON.stringify(cartItems));

    if (user) {
      const saveToFirestore = async () => {
        try {
          const cartRef = doc(db, "carts", user.uid);
          await setDoc(
            cartRef,
            {
              items: cartItems,
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        } catch (error) {
          console.error("Firestore Cart Save Error:", error);
        }
      };

      saveToFirestore();
    }
  }, [cartItems, user]);

  /* ===============================
     3. ADD TO CART
  =============================== */
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        category: product.category,
        images: product.images ?? [],
        quantity,
      };

      return [...prev, newItem];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const setQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const removeItem = (id: string) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return {
    cartItems,
    cartCount,
    addToCart,
    updateQuantity,
    setQuantity,
    removeItem,
    clearCart,
  };
};