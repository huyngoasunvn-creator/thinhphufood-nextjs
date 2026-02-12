
import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'st25-premium',
    name: 'Gạo ST25 Ông Cua Chính Hiệu',
    slug: 'gao-st25-ong-cua-loai-1',
    category: 'Gạo trắng',
    price: 38000,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
    shortDescription: 'Gạo ngon nhất thế giới, hạt dài, cơm dẻo, thơm mùi lá dứa.',
    description: '<p>Gạo ST25 được sản xuất từ giống lúa thơm đặc sản của vùng đất Sóc Trăng.</p>',
    rating: 5,
    isBestseller: true,
    stock: 500
  },
  {
    id: 'brown-rice',
    name: 'Gạo Lứt Tím Than Sóc Trăng',
    slug: 'gao-lut-tim-than-organic',
    category: 'Gạo lứt',
    price: 55000,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1590424600806-2580a3203875?auto=format&fit=crop&q=80&w=800',
    shortDescription: 'Tốt cho người tiểu đường, tim mạch và hỗ trợ giảm cân.',
    description: '<p>Gạo lứt tím than giàu Anthocyanin chống oxy hóa.</p>',
    rating: 4.8,
    stock: 200
  }
];

export const CATEGORIES = ['Tất cả', 'Gạo trắng', 'Gạo lứt', 'Nông sản sạch', 'Gia vị'];
