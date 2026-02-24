import { adminDb } from "../firebase-admin";
import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";
import { NewsPost } from "@/types";

export async function getNewsServer(): Promise<NewsPost[]> {
  const snapshot = await adminDb.collection("news").get();
  console.log("NEWS COUNT:", snapshot.size);

  const data: NewsPost[] = snapshot.docs.map(
    (doc: QueryDocumentSnapshot<DocumentData>) => {
      const raw = doc.data();

      return {
        id: doc.id,
        title: raw.title || "",
        slug: raw.slug || "",
        summary: raw.summary || "",
        content: raw.content || "",
        image: raw.image || "",
        category: raw.category || "",
        author: raw.author || "",
        date: raw.date || "",
      };
    }
  );

  return JSON.parse(JSON.stringify(data));
}

export async function getNewsBySlug(
  slug: string
): Promise<NewsPost | null> {
  const snapshot = await adminDb
    .collection("news")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  const raw = doc.data();

  return JSON.parse(
    JSON.stringify({
      id: doc.id,
      title: raw.title || "",
      slug: raw.slug || "",
      summary: raw.summary || "",
      content: raw.content || "",
      image: raw.image || "",
      category: raw.category || "",
      author: raw.author || "",
      date: raw.date || "",
    })
  );
}