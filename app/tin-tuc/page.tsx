import Link from "next/link";
import { adminDb } from "@/lib/firebase-admin";

async function getPosts() {
  try {
    const snapshot = await adminDb.collection("posts").get();

    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Firestore error:", error);
    return [];
  }
}

export default async function NewsPage() {
  const posts: any[] = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-16">

        {posts.length === 0 && (
          <div className="text-center text-gray-500 text-lg">
            Chưa có bài viết nào.
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/tin-tuc/${post.id}`}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition"
            >
              {post.thumbnail && (
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="h-56 w-full object-cover rounded-t-2xl"
                />
              )}

              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-sm text-gray-500 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}