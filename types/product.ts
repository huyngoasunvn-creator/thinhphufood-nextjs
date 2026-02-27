export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;

  price: number;
  unit: string;

  images?: string[];

  shortDescription?: string;
  description?: string;

  rating?: number;
  reviewCount?: number;
  stock: number;

  isBestseller?: boolean;
  isActive?: boolean;
  isFeatured?: boolean;

  comparePrice?: number;
  salePrice?: number;
  videoUrl?: string;
  tags?: string[];

  category?: string;

  // ✅ thêm 2 dòng này
  createdAt?: string;
  updatedAt?: string;
}