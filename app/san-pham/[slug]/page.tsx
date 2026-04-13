import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import { INITIAL_SITE_CONFIG } from "@/data/siteSettings";
import { createPageMetadata, SITE_URL, stripHtml } from "@/lib/seo";
import { getProductBySlug, getProducts } from "@/lib/server/product-server";

export const revalidate = 3600;

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return createPageMetadata({
      title: "Không tìm thấy sản phẩm",
      description: "Sản phẩm bạn đang tìm không tồn tại hoặc đã ngừng kinh doanh.",
      path: `/san-pham/${params.slug}`,
      noIndex: true,
    });
  }

  const image = product.images?.[0] || "/og-image.jpg";
  const description =
    product.shortDescription ||
    stripHtml(product.description, 160) ||
    `Thông tin chi tiết về sản phẩm ${product.name} tại Thịnh Phú Food.`;

  return createPageMetadata({
    title: `${product.name} chính hãng giá tốt`,
    description,
    path: `/san-pham/${product.slug}`,
    image,
  });
}

export default async function Page({ params }: PageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((item) => item.id !== product.id)
    .sort((first, second) => {
      const firstScore =
        Number(first.menuId === product.menuId) * 2 +
        Number(Boolean(product.category) && first.category === product.category);
      const secondScore =
        Number(second.menuId === product.menuId) * 2 +
        Number(
          Boolean(product.category) && second.category === product.category,
        );

      return secondScore - firstScore;
    })
    .slice(0, 4);

  const config = INITIAL_SITE_CONFIG;
  const image = product.images?.[0] || "/og-image.jpg";

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [image],
    description:
      product.shortDescription ||
      stripHtml(product.description, 160) ||
      `Thông tin chi tiết về sản phẩm ${product.name} tại Thịnh Phú Food.`,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "Thịnh Phú Food",
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/san-pham/${product.slug}`,
      priceCurrency: "VND",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Thịnh Phú Food",
      },
    },
  };

  if (product.rating && product.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    };
  }

  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ProductDetail
        product={product}
        config={config}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
