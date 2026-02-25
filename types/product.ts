export interface Product {
  id: string;
  name: string;
  slug: string;

  description: string;
  shortDescription?: string;

  price: number;
  comparePrice?: number;
  salePrice?: number;

  unit?: string;
  images: string[];
  videoUrl?: string;

  category: string;
  tags?: string[];

  stock: number;
  rating?: number;
  reviewCount?: number;

  isFeatured?: boolean;
  isBestseller?: boolean;
  isActive: boolean;

  createdAt?: string;
  updatedAt?: string;
}