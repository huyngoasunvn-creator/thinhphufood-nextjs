import { getProductBySlug } from "@/lib/server/product-server";
import ProductDetail from "@/components/product/ProductDetail";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic"; // 🔥 QUAN TRỌNG

interface Props {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: Props) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return notFound();
  }

  return <ProductDetail product={product} />;
}
