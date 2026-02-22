import { adminDb } from "../firebase-admin";

export async function getNewsServer() {
  const snapshot = await adminDb.collection("news").get();

  return snapshot.docs.map((doc) => {
  const data = doc.data();

  return JSON.parse(
    JSON.stringify({
      id: doc.id,
      ...data,
    })
  );
});

}
