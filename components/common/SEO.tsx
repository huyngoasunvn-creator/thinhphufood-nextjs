
import React, { useEffect } from 'react';
// Use next/navigation instead of react-router-dom
import { usePathname } from 'next/navigation';
import { Product, NewsPost } from '../../types';
import { generateWebsiteSchema, generateProductSchema, generateArticleSchema } from '../../helpers/seo';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'product' | 'article';
  data?: Product | NewsPost;
}

const SEOManager: React.FC<SEOProps> = ({ 
  title,
  description = "Chuyên cung cấp gạo ST25, gạo lứt, và các loại nông sản sạch đạt tiêu chuẩn xuất khẩu.",
  image = "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1200",
  type = "website",
  data
}) => {
  const pathname = usePathname();
  const siteName = "ThinhPhuFood";
  const displayTitle = title ? `${title} | ${siteName}` : `ThinhPhuFood - Tinh Hoa Gạo Việt`;
  // In Next.js client side, window.location.href is available
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    document.title = displayTitle;
    
    const updateMeta = (name: string, content: string, isProperty: boolean = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('og:title', displayTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:image', image, true);
    updateMeta('og:url', currentUrl, true);
    updateMeta('og:type', type, true);
    updateMeta('twitter:title', displayTitle, true);
    updateMeta('twitter:description', description, true);
    updateMeta('twitter:image', image, true);

    const existingScript = document.getElementById('json-ld-seo');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.id = 'json-ld-seo';
    script.type = 'application/ld+json';

    let schema: any;
    if (type === 'product' && data) {
      schema = generateProductSchema(data as Product, siteName, currentUrl);
    } else if (type === 'article' && data) {
      schema = generateArticleSchema(data as NewsPost, currentUrl);
    } else {
      schema = generateWebsiteSchema(siteName, description);
    }

    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

  }, [pathname, displayTitle, description, image, type, data]);

  return null;
};

export default SEOManager;
