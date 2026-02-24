import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

async function getPosts() {
  const snap = await getDocs(collection(db, "posts"));
  return snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export default async function NewsPage() {
  const posts: any[] = await getPosts();

  return (
    <div className="bg-background min-h-screen pb-20">

      {/* HERO */}
      <section className="text-center py-20 bg-white">
        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
          BLOG & COMMUNITY
        </span>

        <h1 className="text-5xl font-bold mt-6 mb-4 text-gray-900">
          Tin Tức & Kiến Thức
        </h1>

        <p className="text-gray-500 max-w-2xl mx-auto">
          Khám phá thế giới nông sản qua những bài viết chuyên sâu,
          chia sẻ từ đội ngũ chuyên gia của chúng tôi.
        </p>
      </section>

      {/* FILTER BAR */}
      <div className="max-w-6xl mx-auto px-4 -mt-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex gap-3 flex-wrap">
            <button className="bg-primary text-white px-4 py-2 rounded-full text-sm">
              TẤT CẢ
            </button>
            <button className="bg-gray-100 px-4 py-2 rounded-full text-sm">
              KIẾN THỨC
            </button>
            <button className="bg-gray-100 px-4 py-2 rounded-full text-sm">
              KHUYẾN MÃI
            </button>
            <button className="bg-gray-100 px-4 py-2 rounded-full text-sm">
              MÓN NGON
            </button>
            <button className="bg-gray-100 px-4 py-2 rounded-full text-sm">
              TIN CÔNG TY
            </button>
          </div>

          <input
            type="text"
            placeholder="Tìm kiếm nội dung bài viết..."
            className="border rounded-full px-4 py-2 w-full md:w-80"
          />
        </div>
      </div>

      {/* POSTS GRID */}
      <div className="max-w-6xl mx-auto px-4 mt-16 grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/tin-tuc/${post.id}`}
            className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
          >
            {post.thumbnail && (
              <img
                src={post.thumbnail}
                alt={post.title}
                className="h-56 w-full object-cover"
              />
            )}

            <div className="p-5">
              <p className="text-xs text-gray-400 mb-2">
                {new Date(post.createdAt?.seconds * 1000).toLocaleDateString("vi-VN")}
              </p>

              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {post.title}
              </h3>

              <p className="text-sm text-gray-500 line-clamp-3">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}