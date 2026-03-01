import { adminDb } from "../firebase-admin";
import { QueryDocumentSnapshot, DocumentData } from "firebase-admin/firestore";
import { NewsPost } from "@/types";

/* ============================= */
/* GET ALL ACTIVE NEWS */
/* ============================= */

export async function getNewsServer(): Promise<NewsPost[]> {
  try {
    const snapshot = await adminDb
      .collection("news")
      .orderBy("date", "desc")
      .get();

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
          isActive: raw.isActive ?? true,
        };
      }
    );

    // 👇 LỌC TẠI SERVER (AN TOÀN NHẤT)
    const activeNews = data.filter((item) => item.isActive === true);

    return JSON.parse(JSON.stringify(activeNews));
  } catch (error) {
    console.error("getNewsServer error:", error);
    return [];
  }
}

/* ============================= */
/* GET NEWS BY SLUG */
/* ============================= */

export async function getNewsBySlug(
  slug: string
): Promise<NewsPost | null> {
  try {
    const snapshot = await adminDb
      .collection("news")
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    const raw = doc.data();

    if (raw.isActive === false) return null;

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
        isActive: raw.isActive ?? true,
      })
    );
  } catch (error) {
    console.error("getNewsBySlug error:", error);
    return null;
  }
}