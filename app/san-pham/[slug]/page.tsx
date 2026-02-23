import ProductDetail from '@/components/product/ProductDetail';
import { getProductBySlug } from '@/lib/server/product-server';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}
export const dynamic = "force-dynamic";

export default async function Page({ params }: PageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
