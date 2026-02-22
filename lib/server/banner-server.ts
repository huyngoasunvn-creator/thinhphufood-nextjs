import { adminDb } from "../firebase-admin";

export async function getBannersServer() {
  const snapshot = await adminDb.collection("banners").get();

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
