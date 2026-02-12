
import { Product, NewsPost } from '../types';

export const generateWebsiteSchema = (siteName: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": siteName,
  "url": "https://thinhphufood.vn/",
  "description": description,
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://thinhphufood.vn/#/products?search={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

export const generateProductSchema = (p: Product, siteName: string, currentUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": p.name,
  "image": p.image,
  "description": p.description.replace(/<[^>]*>?/gm, '').slice(0, 160),
  "sku": p.id,
  "brand": { "@type": "Brand", "name": siteName },
  "offers": {
    "@type": "Offer",
    "url": currentUrl,
    "priceCurrency": "VND",
    "price": p.price,
    "priceValidUntil": "2025-12-31",
    "availability": p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    "itemCondition": "https://schema.org/NewCondition"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": p.rating,
    "reviewCount": "128"
  }
});

export const generateArticleSchema = (n: NewsPost, currentUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": n.title,
  "image": [n.image],
  "datePublished": n.date,
  "dateModified": n.date,
  "author": [{ "@type": "Person", "name": n.author, "url": currentUrl }]
});
