import { adminDb } from "../firebase-admin";

export async function getNewsServer() {
  const snapshot = await adminDb.collection("news").get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title || "",
      slug: data.slug || "",
      summary: data.summary || "",
      content: data.content || "",
      image: data.image || "",
      category: data.category || "",
      author: data.author || "",
      date: data.date || "",
    };
  });
}

