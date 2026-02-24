import { adminDb } from "../firebase-admin";

export async function getNewsServer() {
  const snapshot = await adminDb.collection("news").get();
  console.log("NEWS COUNT:", snapshot.size);

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

export async function getNewsBySlug(slug: string) {
  const snapshot = await adminDb
    .collection("news")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
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
}