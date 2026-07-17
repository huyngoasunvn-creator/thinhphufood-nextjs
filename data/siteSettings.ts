import {
  AboutConfig,
  AboutPageConfig,
  Banner,
  Commitment,
  ContactConfig,
  HomePageConfig,
  PopupConfig,
  ProfileConfig,
  SiteConfig,
} from '@/types';

export const INITIAL_SITE_CONFIG: SiteConfig = {
  siteName: 'ThinhPhuFood',
  hotline: '0908 123 456',
  email: 'lienhe@thinhphufood.vn',
  address: 'Hẻm 123, Đường Số 7, Quận 7, TP. Hồ Chí Minh',
  facebookUrl: 'https://facebook.com/thinhphufood.gaosach',
  showStock: true,
  showTrustBadges: false,
  certLabel: 'CHỨNG NHẬN',
  certValue: 'Chuẩn VietGAP',
  shippingLabel: 'GIAO HÀNG',
  shippingValue: 'Miễn phí nội thành',
};

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'hero-1',
    title: 'Gạo Ngon Nhất Thế Giới ST25',
    subtitle:
      'Hạt gạo sạch, cơm dẻo thơm, trọn vẹn hương vị quê hương Sóc Trăng.',
    imageUrl:
      'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&q=80&w=1920',
    link: '/san-pham',
    buttonText: 'MUA NGAY',
    isActive: true,
    placement: 'Trang chủ',
    textColor: '#ffffff',
    overlayOpacity: 0.4,
  },
];

export const INITIAL_COMMITMENTS: Commitment[] = [
  {
    id: '1',
    iconName: 'Leaf',
    title: 'Sạch 100%',
    description: 'Không chất bảo quản',
    colorScheme: 'green',
  },
  {
    id: '2',
    iconName: 'Award',
    title: 'Chính gốc',
    description: 'Nguồn gốc rõ ràng',
    colorScheme: 'blue',
  },
  {
    id: '3',
    iconName: 'Truck',
    title: 'Giao nhanh',
    description: 'Trong vòng 2 giờ',
    colorScheme: 'orange',
  },
  {
    id: '4',
    iconName: 'RotateCcw',
    title: 'Đổi trả',
    description: 'Nếu không hài lòng',
    colorScheme: 'purple',
  },
];

export const INITIAL_ABOUT_CONFIG: AboutConfig = {
  title: 'ThinhPhuFood\nTâm Tình Trong Từng Hạt Gạo',
  description:
    'Khởi nguồn từ khao khát mang bữa cơm sạch đến mọi gia đình, ThinhPhuFood không ngừng tìm kiếm những giống lúa tốt nhất và quy trình chế biến hiện đại nhất.',
  imageUrl:
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000',
  stats: {
    label1: 'Hộ gia đình tin dùng',
    value1: '10,000+',
    label2: 'Chất lượng',
    value2: 'Hữu cơ',
  },
  buttonText: 'Tìm hiểu hành trình của chúng tôi',
  buttonLink: '/about-us',
};

export const INITIAL_HOME_PAGE_CONFIG: HomePageConfig = {
  featuredSection: {
    isEnabled: true,
    badge: 'Giải pháp gạo theo nhu cầu',
    title: 'Chọn đúng dòng gạo cho gia đình, quán ăn và doanh nghiệp',
    description:
      'Từ bữa cơm gia đình đến suất ăn công nghiệp và nhu cầu phân phối, Thịnh Phú Food cung cấp nhiều dòng gạo thơm ngon, chất lượng ổn định và dễ lựa chọn.',
    buttonText: 'Khám phá các dòng gạo',
    buttonLink: '/san-pham',
    highlights: [
      {
        label: 'Danh mục nổi bật',
        value: '4+',
        description: 'Phân nhóm rõ ràng theo từng nhu cầu sử dụng.',
      },
      {
        label: 'Sản phẩm đang bán',
        value: '11+',
        description: 'Nhiều lựa chọn cho gia đình, quán ăn và đại lý.',
      },
      {
        label: 'Bài viết hữu ích',
        value: '3+',
        description: 'Kinh nghiệm chọn mua, nấu ngon và bảo quản gạo.',
      },
      {
        label: 'Hỗ trợ nhanh',
        value: '24/7',
        description: 'Tư vấn sản phẩm, báo giá bán lẻ và chính sách mua sỉ.',
      },
    ],
  },
  proofSection: {
    isEnabled: true,
    badge: 'Giá trị Thịnh Phú Food',
    title: 'Chất lượng ổn định cho từng bữa cơm và nhu cầu kinh doanh',
    description:
      'Chúng tôi chú trọng nguồn hàng rõ ràng, chất lượng đồng đều và tư vấn đúng nhu cầu để khách hàng dễ chọn sản phẩm phù hợp, dù mua dùng hằng ngày hay đặt số lượng lớn.',
    items: [
      {
        value: '04+',
        title: 'Nhóm sản phẩm nổi bật',
        description: 'Đa dạng lựa chọn cho từng khẩu vị và mục đích sử dụng.',
      },
      {
        value: '100%',
        title: 'Nguồn hàng chọn lọc',
        description: 'Ưu tiên sản phẩm có thông tin rõ ràng và chất lượng ổn định.',
      },
      {
        value: '24/7',
        title: 'Hỗ trợ nhanh',
        description: 'Tiếp nhận nhanh nhu cầu của khách lẻ, đại lý và doanh nghiệp.',
      },
    ],
    benefits: [
      {
        title: 'Chọn đúng loại gạo theo nhu cầu',
        description: 'Dễ dàng tìm dòng gạo phù hợp cho gia đình, quán ăn, bếp ăn hoặc phân phối.',
      },
      {
        title: 'Thông tin sản phẩm rõ ràng',
        description: 'Đặc điểm và nhóm sử dụng được trình bày dễ hiểu để khách hàng thuận tiện so sánh.',
      },
      {
        title: 'Tư vấn và báo giá thuận tiện',
        description: 'Dễ dàng liên hệ để hỏi sản phẩm, nhận báo giá và chính sách mua số lượng lớn.',
      },
    ],
  },
  trustSection: {
    isEnabled: true,
    badge: 'Vì sao khách chọn Thịnh Phú Food',
    title: 'Gạo chất lượng, nguồn gốc rõ ràng và dịch vụ tận tâm',
    description:
      'Thịnh Phú Food tuyển chọn các dòng gạo phù hợp với nhiều nhu cầu, chú trọng chất lượng ổn định và hỗ trợ khách hàng xuyên suốt từ lúc chọn sản phẩm đến khi nhận hàng.',
    buttonText: 'Tìm hiểu về Thịnh Phú Food',
    buttonLink: '/about-us',
  },
  bestsellerSection: {
    isEnabled: true,
    badge: 'Sản phẩm nổi bật',
    title: 'Dòng gạo được khách hàng lựa chọn nhiều',
    description:
      'Khám phá những sản phẩm nổi bật với hương vị dễ dùng, chất lượng ổn định và phù hợp cho cả nhu cầu gia đình lẫn kinh doanh.',
    buttonText: 'Xem tất cả sản phẩm',
    buttonLink: '/san-pham',
  },
  newsSection: {
    isEnabled: true,
    badge: 'Góc chia sẻ & tin tức',
    title: 'Cẩm nang chọn gạo và chăm sóc bữa ăn',
    description:
      'Cập nhật kiến thức về cách chọn gạo, nấu cơm ngon, bảo quản đúng cách cùng những hoạt động mới nhất từ Thịnh Phú Food.',
    buttonText: 'Xem tất cả tin tức',
    buttonLink: '/tin-tuc',
  },
  topFeaturesSection: {
    isEnabled: true,
  },
};

export const INITIAL_ABOUT_PAGE: AboutPageConfig = {
  title: 'Về chúng tôi',
  externalUrl: 'https://marketing.thinhphufood.vn/about',
  renderMode: 'native',
  factoryImageUrl: '/images/thinh-phu-factory-info.png',
  headline: 'Nguồn gạo chất lượng cho gia đình và doanh nghiệp',
  description:
    'Thịnh Phú Food tuyển chọn, sản xuất và phân phối các dòng gạo ổn định chất lượng cho bữa cơm gia đình, suất ăn công nghiệp, nhà trường, đại lý và khách hàng doanh nghiệp.',
  isActive: true,
};

export const INITIAL_PROFILE: ProfileConfig = {
  title: 'Giới thiệu',
  externalUrl: 'https://marketing.thinhphufood.vn/profile',
  renderMode: 'native',
  factoryImageUrl: '/images/thinh-phu-factory-info.png',
  headline: 'Đồng hành cùng bữa cơm Việt bằng những hạt gạo chất lượng',
  description:
    'Thịnh Phú Food sản xuất và phân phối các dòng gạo phục vụ gia đình, quán ăn, suất ăn công nghiệp, trường học, đại lý và khách hàng doanh nghiệp.',
  isActive: true,
};

export const INITIAL_POPUP: PopupConfig = {
  isActive: true,
  title: 'Ưu đãi Khách hàng mới!',
  description: 'Tặng ngay 1kg gạo lứt tím than cho đơn hàng đầu tiên từ 300k.',
  imageUrl:
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800',
  link: '/san-pham',
  buttonText: 'Xem sản phẩm',
  delay: 3,
};

export const INITIAL_CONTACT: ContactConfig = {
  title: 'Liên hệ ThinhPhuFood',
  description: 'Chúng tôi luôn lắng nghe ý kiến đóng góp từ quý khách hàng.',
  address: 'Hẻm 123, Đường Số 7, Quận 7, TP. Hồ Chí Minh',
  phone: '0908 123 456',
  email: 'lienhe@thinhphufood.vn',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.669726937899!2d106.66488007465352!3d10.759917089387884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c7d6928e7%3A0x7d69e4871d87c02b!2zMTIzIMSQxrDhu51uZyBMw7phIFbDoG5nLCBRdeG6rW4gNywgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2s!4v1715760000000!5m2!1svi!2s',
  showMap: true,
  workingHours: '07:30 - 20:00 (Mỗi ngày)',
};
