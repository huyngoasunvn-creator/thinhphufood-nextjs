
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"; // ✅ sửa ở đây
import { Product } from "../types";
import { db } from "../services/firebase";
import {
  PRODUCTS as INITIAL_PRODUCTS,
  CATEGORIES as INITIAL_CATEGORIES,
} from "../data/products";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // 1. Lắng nghe sản phẩm Real-time với xử lý lỗi
    const q = query(collection(db, 'products'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const prods: Product[] = [];
        snapshot.forEach((doc) => prods.push({ id: doc.id, ...doc.data() } as Product));
        
        if (prods.length === 0) {
          setProducts(INITIAL_PRODUCTS);
        } else {
          setProducts(prods);
        }
      },
      (error) => {
        console.warn("Firestore Products Error (Falling back to local data):", error.message);
        setProducts(INITIAL_PRODUCTS);
      }
    );

    // 2. Lắng nghe Categories với xử lý lỗi
    const catUnsubscribe = onSnapshot(collection(db, 'metadata'), 
      (snapshot) => {
        let found = false;
        snapshot.forEach((doc) => {
          if (doc.id === 'categories') {
            setCategories(doc.data().list || INITIAL_CATEGORIES);
            found = true;
          }
        });
        if (!found) setCategories(INITIAL_CATEGORIES);
      },
      (error) => {
        console.warn("Firestore Categories Error (Falling back to local data):", error.message);
        setCategories(INITIAL_CATEGORIES);
      }
    );

    return () => {
      unsubscribe();
      catUnsubscribe();
    };
  }, []);

  const saveProducts = async (updated: Product[]) => {
    setProducts(updated);
  };

  const saveCategories = async (updated: string[]) => {
    setCategories(updated);
  };

  return { products, categories, saveProducts, saveCategories };
};
