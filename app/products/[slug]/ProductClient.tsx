'use client';

import Script from "next/script";

export default function ProductClient({ slug }: { slug: string }) {
  const product = {
    name: "Gạo ST25",
    description: "Gạo ST25 ngon nhất Việt Nam, hạt dài thơm tự nhiên.",
    price: "25000",
    currency: "VND",
  };

  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.name,
            description: product.description,
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: product.currency,
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />

      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Giá: {product.price} VND</p>
      </div>
    </>
  );
}
