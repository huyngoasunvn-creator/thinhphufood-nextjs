import type { Metadata } from "next";
import { INITIAL_SITE_CONFIG } from "@/data/siteSettings";

export const SITE_URL = "https://thinhphufood.vn";
export const SITE_NAME = "Thịnh Phú Food";
export const BRAND_NAME = "Thịnh Phú Food";
export const DEFAULT_OG_IMAGE = "/og-image.jpg";
export const DEFAULT_TITLE = "Gạo ST25 chính hãng và nông sản sạch";
export const DEFAULT_DESCRIPTION =
  "Thịnh Phú Food chuyên cung cấp gạo ST25 chính hãng, nông sản sạch và giao hàng nhanh tới khách hàng trên toàn quốc.";
export const DEFAULT_KEYWORDS = [
  "gạo ST25",
  "gạo ST25 chính hãng",
  "gạo sạch",
  "nông sản sạch",
  "Thịnh Phú Food",
  "thinhphufood.vn",
];

type MetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
  type?: "website" | "article";
};

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, SITE_URL).toString();
}

export function buildFullTitle(title?: string) {
  return title ? `${title} | ${SITE_NAME}` : `${BRAND_NAME} - ${DEFAULT_TITLE}`;
}

export function stripHtml(value?: string, maxLength = 160) {
  if (!value) {
    return "";
  }

  const plainText = value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return `${plainText.slice(0, maxLength - 1).trim()}…`;
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND_NAME} - ${DEFAULT_TITLE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${BRAND_NAME} - ${DEFAULT_TITLE}`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: `${BRAND_NAME} - ${DEFAULT_TITLE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_NAME} - ${DEFAULT_TITLE}`,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  keywords = DEFAULT_KEYWORDS,
  noIndex = false,
  type = "website",
}: MetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const socialTitle = buildFullTitle(title);
  const socialImage = absoluteUrl(image);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "vi_VN",
      type,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            "max-image-preview": "none",
            "max-snippet": 0,
            "max-video-preview": 0,
          },
        }
      : undefined,
  };
}

export function getGlobalSeoSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        name: BRAND_NAME,
        url: SITE_URL,
        logo: absoluteUrl("/logo.png"),
        image: absoluteUrl(DEFAULT_OG_IMAGE),
        telephone: INITIAL_SITE_CONFIG.hotline,
        email: INITIAL_SITE_CONFIG.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: INITIAL_SITE_CONFIG.address,
          addressCountry: "VN",
        },
        sameAs: [INITIAL_SITE_CONFIG.facebookUrl],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: BRAND_NAME,
        publisher: {
          "@id": `${SITE_URL}#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/tim-kiem/{search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}
