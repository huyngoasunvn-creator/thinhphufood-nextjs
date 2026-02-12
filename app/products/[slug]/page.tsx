import type { Metadata } from "next";
import ProductClient from "./ProductClient";

const products = [
  {
    slug: "gao-st25",
    name: "Gạo ST25",
    description: "Gạo ST25 ngon nhất Việt Nam, hạt dài thơm tự nhiên.",
    price: "25000",
  },
];

async function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: "Sản phẩm không tồn tại",
      alternates: {
        canonical: `https://thinhphufood.vn/products/${params.slug}`,
      },
    };
  }

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `https://thinhphufood.vn/products/${params.slug}`,
    },
  };
}


export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  if (!product) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "VND",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      <ProductClient slug={params.slug} />
    </>
  );
}
