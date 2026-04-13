import { adminDb } from "../firebase-admin";
import type {
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import type { NewsPost } from "@/types";

function mapNews(doc: QueryDocumentSnapshot<DocumentData>): NewsPost {
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

function sortNewsByNewest(news: NewsPost[]) {
  return news.sort(
    (first, second) =>
      new Date(second.date || 0).getTime() - new Date(first.date || 0).getTime(),
  );
}

export async function getNewsServer(): Promise<NewsPost[]> {
  try {
    const snapshot = await adminDb.collection("news").get();
    const activeNews = sortNewsByNewest(
      snapshot.docs.map(mapNews).filter((item) => item.isActive !== false),
    );

    return JSON.parse(JSON.stringify(activeNews));
  } catch (error) {
    console.error("getNewsServer error:", error);
    return [];
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  try {
    const snapshot = await adminDb
      .collection("news")
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const news = mapNews(snapshot.docs[0]);

    if (news.isActive === false) return null;

    return JSON.parse(JSON.stringify(news));
  } catch (error) {
    console.error("getNewsBySlug error:", error);
    return null;
  }
}

export async function getRelatedNewsServer(
  category?: string,
  currentSlug?: string,
  limit = 3,
): Promise<NewsPost[]> {
  if (!category) {
    return [];
  }

  const allNews = await getNewsServer();

  return allNews
    .filter(
      (item) => item.category === category && item.slug !== currentSlug,
    )
    .slice(0, limit);
}
