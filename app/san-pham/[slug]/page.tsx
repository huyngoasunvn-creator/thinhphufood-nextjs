import { getProductBySlug } from "@/lib/server/product-server";
import ProductDetail from "@/components/product/ProductDetail";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Script from "next/script";
import { INITIAL_SITE_CONFIG } from "@/data/siteSettings";



interface Props {
  params: {
    slug: string;
  };
}

// ==================
// 🔥 METADATA SEO
// ==================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Không tìm thấy sản phẩm | Thịnh Phú Food",
    };
  }

  const url = `https://thinhphufood.vn/san-pham/${product.slug}`;
  const image = product.images?.[0] || "/placeholder.jpg";
  
  return {
    title: `${product.name} Chính Hãng, Giá Tốt | Thịnh Phú Food`,
    description:
  product.shortDescription ??
  `Mua ${product.name} chất lượng cao tại Thịnh Phú Food.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: product.name,
      description:
  product.shortDescription ??
  `Mua ${product.name} chất lượng cao tại Thịnh Phú Food.`,
      url: url,
      siteName: "Thịnh Phú Food",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDescription,
      images: [image],
    },
  };
}

// ==================
// 🔥 PAGE
// ==================
export default async function Page({ params }: Props) {
  const product = await getProductBySlug(params.slug);
    
  if (!product) {
    return notFound();
  }
  const config = INITIAL_SITE_CONFIG;
  const image = product.images?.[0] || "/placeholder.jpg";

  // 🔥 PRODUCT SCHEMA
  const schema: any = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  image: [image],
  description:
    product.shortDescription ??
    `Mua ${product.name} chất lượng cao tại Thịnh Phú Food.`,
  sku: product.id,

  brand: {
    "@type": "Brand",
    name: "Thịnh Phú Food",
  },

  offers: {
    "@type": "Offer",
    url: `https://thinhphufood.vn/san-pham/${product.slug}`,
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

      <ProductDetail product={product} config={config} />
    </>
  );
}