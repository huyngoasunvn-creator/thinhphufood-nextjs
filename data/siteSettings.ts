
import { Banner, Commitment, AboutConfig, AboutPageConfig, ProfileConfig, PopupConfig, ContactConfig, SiteConfig } from '../types';

export const INITIAL_SITE_CONFIG: SiteConfig = {
  siteName: 'ThinhPhuFood',
  hotline: '0908 123 456',
  email: 'lienhe@thinhphufood.vn',
  address: 'Hẻm 123, Đường Số 7, Quận 7, TP. Hồ Chí Minh',
  facebookUrl: 'https://facebook.com/thinhphufood.gaosach',
  showStock: true,
  showTrustBadges: true,
  certLabel: 'CHỨNG NHẬN',
  certValue: 'Chuẩn VietGAP',
  shippingLabel: 'GIAO HÀNG',
  shippingValue: 'Miễn phí nội thành'
};

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'hero-1',
    title: 'Gạo Ngon Nhất Thế Giới ST25',
    subtitle: 'Hạt gạo sạch, cơm dẻo thơm, trọn vẹn hương vị quê hương Sóc Trăng.',
    imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&q=80&w=1920',
    link: '/products',
    buttonText: 'MUA NGAY',
    isActive: true,
    placement: 'Trang chủ',
    textColor: '#ffffff',
    overlayOpacity: 0.4
  }
];

export const INITIAL_COMMITMENTS: Commitment[] = [
  { id: '1', iconName: 'Leaf', title: 'Sạch 100%', description: 'Không chất bảo quản', colorScheme: 'green' },
  { id: '2', iconName: 'Award', title: 'Chính Gốc', description: 'Nguồn gốc rõ ràng', colorScheme: 'blue' },
  { id: '3', iconName: 'Truck', title: 'Giao Nhanh', description: 'Trong vòng 2 giờ', colorScheme: 'orange' },
  { id: '4', iconName: 'RotateCcw', title: 'Đổi Trả', description: 'Nếu không hài lòng', colorScheme: 'purple' },
];

export const INITIAL_ABOUT_CONFIG: AboutConfig = {
  title: 'ThinhPhuFood\nTâm Tình Trong Từng Hạt Gạo',
  description: 'Khởi nguồn từ khao khát mang bữa cơm sạch đến mọi gia đình, ThinhPhuFood không ngừng tìm kiếm những giống lúa tốt nhất và quy trình chế biến hiện đại nhất.',
  imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000',
  stats: {
    label1: 'Hộ gia đình tin dùng',
    value1: '10,000+',
    label2: 'Chất lượng',
    value2: 'Hữu cơ'
  },
  buttonText: 'Tìm hiểu hành trình của chúng tôi',
  buttonLink: '/about-us'
};

export const INITIAL_ABOUT_PAGE: AboutPageConfig = {
  title: 'Về chúng tôi',
  externalUrl: 'https://marketing.thinhphufood.vn/about',
  isActive: true
};

export const INITIAL_PROFILE: ProfileConfig = {
  title: 'Tài khoản',
  externalUrl: 'https://marketing.thinhphufood.vn/profile',
  isActive: true
};

export const INITIAL_POPUP: PopupConfig = {
  isActive: true,
  title: 'Ưu đãi Khách hàng mới!',
  description: 'Tặng ngay 1kg gạo lứt tím than cho đơn hàng đầu tiên từ 300k.',
  imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800',
  link: '/products',
  buttonText: 'Xem sản phẩm',
  delay: 3
};

export const INITIAL_CONTACT: ContactConfig = {
  title: 'Liên Hệ ThinhPhuFood',
  description: 'Chúng tôi luôn lắng nghe ý kiến đóng góp từ quý khách hàng.',
  address: 'Hẻm 123, Đường Số 7, Quận 7, TP. Hồ Chí Minh',
  phone: '0908 123 456',
  email: 'lienhe@thinhphufood.vn',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.669726937899!2d106.66488007465352!3d10.759917089387884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c7d6928e7%3A0x7d69e4871d87c02b!2zMTIzIMSQxrDhu51uZyBMw7phIFbDoG5nLCBRdeG6rW4gNywgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2s!4v1715760000000!5m2!1svi!2s',
  showMap: true,
  workingHours: '07:30 - 20:00 (Mỗi ngày)'
};
