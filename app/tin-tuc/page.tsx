import { getNewsServer } from "@/lib/server/news-server";
import { NewsPost } from "@/types";
import Link from "next/link";

export default async function NewsPage() {
  const news: NewsPost[] = await getNewsServer();
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Tin tức</h1>

      {news.length === 0 && <p>Chưa có bài viết nào.</p>}

      <div className="grid md:grid-cols-3 gap-6">
        {news.map((item: NewsPost) => (
          <div key={item.id} className="border p-4 rounded">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover mb-4"
            />

            <h2 className="text-xl font-semibold mb-2">
              {item.title}
            </h2>

            <p className="text-sm text-gray-500 mb-2">
              {item.date}
            </p>

            <p className="mb-3">
              {item.summary}
            </p>

            <Link
              href={`/tin-tuc/${item.slug}`}
              className="text-green-600 font-semibold"
            >
              Xem chi tiết →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}