import { db } from "@/services/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

const menuCollection = collection(db, "menus");

export async function getMenus() {
  const q = query(menuCollection, orderBy("order", "asc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function createMenu(data: any) {
  return await addDoc(menuCollection, data);
}

export async function updateMenu(id: string, data: any) {
  const ref = doc(db, "menus", id);
  return await updateDoc(ref, data);
}

export async function deleteMenu(id: string) {
  const ref = doc(db, "menus", id);
  return await deleteDoc(ref);
}