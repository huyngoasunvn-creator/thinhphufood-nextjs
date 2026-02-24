import { getNewsBySlug } from "@/lib/server/news-server";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getNewsBySlug(params.slug);

  if (!data) {
  return <div>KHÔNG TÌM THẤY DATA</div>;
}

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

      {data.date && (
        <p className="text-gray-500 mb-6 text-sm">
          {data.date}
        </p>
      )}

      {data.image && (
        <div className="relative w-full h-[400px] mb-6">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  );
}
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const news = await getNewsBySlug(params.slug);

  if (!news) return {};

  return {
    title: news.title,
    description: news.summary,
    openGraph: {
      title: news.title,
      description: news.summary,
      images: [news.image],
    },
  };
}
