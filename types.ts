
export interface Product {
  id: string;
  name: string;
  slug: string; // Đường dẫn thân thiện SEO
  category: string;
  price: number;
  unit: string;
  image: string;
  images?: string[];
  videoUrl?: string;
  shortDescription?: string;
  description: string;
  rating: number;
  isBestseller?: boolean;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'Tất cả' | 'Gạo trắng' | 'Gạo lứt' | 'Nông sản sạch' | 'Gia vị';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  shippingFee: number;
  total: number;
  status: 'pending' | 'shipping' | 'completed' | 'cancelled';
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
}

export interface ContactMessage {
  id: string;
  name: string;
  contact: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  link?: string;
  buttonText?: string;
  isActive: boolean;
  placement: 'Trang chủ' | 'Tin tức' | 'Cửa hàng';
  textColor: string;
  overlayOpacity: number;
}

export interface Commitment {
  id: string;
  iconName: string;
  title: string;
  description: string;
  colorScheme: 'green' | 'blue' | 'orange' | 'purple' | 'red' | 'slate';
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

export interface ProfileConfig {
  title: string;
  externalUrl: string;
  isActive: boolean;
}

export interface AboutPageConfig {
  title: string;
  externalUrl: string;
  isActive: boolean;
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
