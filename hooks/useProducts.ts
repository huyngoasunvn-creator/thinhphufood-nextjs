'use client'

import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { Product } from "@/types";
import { db } from "../services/firebase";

export const useProducts = () => {

  const [products, setProducts] = useState<Product[]>([]);

  interface Category {
    id: string;
    name: string;
  }

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {

    const q = query(collection(db, 'products'), orderBy('name', 'asc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {

        const prods: Product[] = [];

        snapshot.forEach((doc) =>
          prods.push({ id: doc.id, ...doc.data() } as Product)
        );

        setProducts(prods);

      },
      (error) => {
        console.warn("Firestore Products Error:", error.message);
        setProducts([]);
      }
    );

    const catUnsubscribe = onSnapshot(
      collection(db, 'metadata'),
      (snapshot) => {

        let found = false;

        snapshot.forEach((doc) => {

          if (doc.id === 'categories') {
            setCategories(doc.data().list || []);
            found = true;
          }

        });

        if (!found) setCategories([]);

      },
      (error) => {
        console.warn("Firestore Categories Error:", error.message);
        setCategories([]);
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

  const saveCategories = async (updated: Category[]) => {
    setCategories(updated);
  };

  return { products, categories, saveProducts, saveCategories };

};