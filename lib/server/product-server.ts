import { adminDb } from "../firebase-admin";

export async function getProductsServer() {
  const snapshot = await adminDb.collection("products").get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}
