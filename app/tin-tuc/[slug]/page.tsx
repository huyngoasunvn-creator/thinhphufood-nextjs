export const dynamic = "force-dynamic";

import { getNewsBySlug } from "@/server/news-server";

export default async function Page({ params }: any) {
  const post = await getNewsBySlug(params.slug);

  if (!post) {
    return <div>Không tìm thấy bài viết</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </div>
  );
}