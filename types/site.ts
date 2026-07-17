import { Product } from "./product";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  images: string[];
  unit?: string;
  quantity: number;
  category?: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  shippingFee: number;
  total: number;
  status: "pending" | "shipping" | "completed" | "cancelled";
  createdAt: string;
  note?: string;
  paymentMethod: string;
}

export interface NewsPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  relatedIds?: string[];
  isActive: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  contact: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "new" | "read" | "replied";
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  mediaType?: "image" | "video";
  imageUrl: string;
  logoUrl?: string;
  link?: string;
  buttonText?: string;
  isActive: boolean;
  placement: "Trang chủ" | "Tin tức" | "Cửa hàng" | "Nông sản" | string;
  textColor: string;
  overlayOpacity: number;
  order?: number;
  contentAlign?: "left" | "center" | "right";
  createdAt?: number;
}

export interface Commitment {
  id: string;
  iconName: string;
  title: string;
  description: string;
  colorScheme: "green" | "blue" | "orange" | "purple" | "red" | "slate";
}

export interface AboutConfig {
  title: string;
  description: string;
  imageUrl: string;
  stats: {
    label1: string;
    value1: string;
    label2: string;
    value2: string;
  };
  buttonText: string;
  buttonLink: string;
}

export interface HomeProofItem {
  value: string;
  title: string;
  description: string;
}

export interface HomeFeaturedHighlight {
  label: string;
  value: string;
  description: string;
}

export interface HomeProofBenefit {
  title: string;
  description: string;
}

export interface HomeSectionContent {
  isEnabled: boolean;
  badge: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface HomeFeaturedSection extends HomeSectionContent {
  highlights: HomeFeaturedHighlight[];
}

export interface HomeProofSection {
  isEnabled: boolean;
  badge: string;
  title: string;
  description: string;
  items: HomeProofItem[];
  benefits: HomeProofBenefit[];
}

export interface HomePageConfig {
  featuredSection: HomeFeaturedSection;
  proofSection: HomeProofSection;
  trustSection: HomeSectionContent;
  bestsellerSection: HomeSectionContent;
  newsSection: HomeSectionContent;

  topFeaturesSection: {
    isEnabled: boolean;
  };
}

export interface ProfileConfig {
  title: string;
  externalUrl: string;
  isActive: boolean;
  renderMode?: 'native' | 'embed';
  factoryImageUrl?: string;
  headline?: string;
  description?: string;
}

export interface AboutPageConfig {
  title: string;
  externalUrl: string;
  isActive: boolean;
  renderMode?: 'native' | 'embed';
  factoryImageUrl?: string;
  headline?: string;
  description?: string;
}

export interface ContactConfig {
  title: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  mapEmbedUrl: string;
  showMap: boolean;
  workingHours: string;
}

export interface PopupConfig {
  isActive: boolean;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  buttonText: string;
  delay: number;
}

export interface SiteConfig {
  siteName: string;
  hotline: string;
  email: string;
  address: string;
  facebookUrl: string;
  showStock: boolean;
  showTrustBadges: boolean;
  certLabel: string;
  certValue: string;
  shippingLabel: string;
  shippingValue: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  isActive: boolean;
}

export type { Product };
