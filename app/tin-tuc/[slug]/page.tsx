export const dynamic = "force-dynamic";

export default function Page({ params }: any) {
  return <div>Slug prod: {params.slug}</div>;
}