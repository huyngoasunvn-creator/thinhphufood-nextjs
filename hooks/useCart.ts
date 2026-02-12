
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore"; // ✅ sửa ở đây
import { Product, CartItem } from "../types";
import { db } from "../services/firebase";
import { useAuth } from "./useAuth";


export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  // 1. Tải giỏ hàng ban đầu
  useEffect(() => {
    const loadCart = async () => {
      let remoteItems: CartItem[] = [];
      
      if (user) {
        try {
          const cartRef = doc(db, 'carts', user.uid);
          const cartSnap = await getDoc(cartRef);
          if (cartSnap.exists()) {
            remoteItems = cartSnap.data().items || [];
            setCartItems(remoteItems);
            return;
          }
        } catch (error) {
          console.error("Firestore Cart Load Error (Using local storage instead):", error);
        }
      }
      
      const localCart = JSON.parse(localStorage.getItem('thinhphu_cart') || '[]');
      setCartItems(localCart);
    };

    loadCart();
  }, [user]);

  // 2. Lưu giỏ hàng khi có thay đổi
  useEffect(() => {
    localStorage.setItem('thinhphu_cart', JSON.stringify(cartItems));
    
    if (user) {
      const saveToFirestore = async () => {
        try {
          const cartRef = doc(db, 'carts', user.uid);
          await setDoc(cartRef, { items: cartItems, updatedAt: new Date().toISOString() }, { merge: true });
        } catch (error) {
          console.error("Firestore Cart Save Error:", error);
        }
      };
      saveToFirestore();
    }
  }, [cartItems, user]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const setQuantity = (id: string, quantity: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item));
  };

  const removeItem = (id: string) => setCartItems(prev => prev.filter(item => item.id !== id));
  
  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return { cartItems, cartCount, addToCart, updateQuantity, setQuantity, removeItem, clearCart };
};
