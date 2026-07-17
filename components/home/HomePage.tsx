'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Boxes,
  Building2,
  CheckCircle,
  Heart,
  Leaf,
  Newspaper,
  RotateCcw,
  ShieldCheck,
  Sprout,
  Truck,
  type LucideIcon,
} from 'lucide-react';

import Hero from '@/components/home/Hero';
import HeroSlider from '@/components/home/HeroSlider';
import ProductCard from '@/components/product/ProductCard';
import {
  AboutConfig,
  Banner,
  Commitment,
  HomePageConfig,
  NewsPost,
  Product,
} from '@/types';

type HomeMenu = {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  isActive: boolean;
  order: number;
};

type FeaturedCategory = {
  id: string;
  name: string;
  href: string;
  imageUrl: string;
  productCount: number;
  eyebrow: string;
  description: string;
  icon: LucideIcon;
  order: number;
};

type TrustPoint = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  colorScheme?: string;
};

interface HomeProps {
  products?: Product[];
  banners?: Banner[];
  news?: NewsPost[];
  commitments?: Commitment[];
  aboutConfig?: AboutConfig;
  homePageConfig?: HomePageConfig;
  menus?: HomeMenu[];
  onAddToCart?: (product: Product) => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Leaf,
  ShieldCheck,
  Truck,
  RotateCcw,
  Award,
  Heart,
  CheckCircle,
};

const ROOT_SECTION_META: Record<
  string,
  { description: string; href: string; icon: LucideIcon }
> = {
  'san-pham': {
    description:
      'Các dòng gạo thơm, dẻo và dễ chọn cho gia đình, quán ăn, đại lý và doanh nghiệp.',
    href: '/san-pham',
    icon: Boxes,
  },
  'nong-san': {
    description:
      'Bổ sung thêm nông sản sạch, tiện chọn mua cùng trong một nơi.',
    href: '/nong-san',
    icon: Sprout,
  },
};

const FALLBACK_TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: 'Nguồn gốc rõ ràng',
    description: 'Ưu tiên sản phẩm có thông tin minh bạch để khách yên tâm khi chọn mua.',
  },
  {
    icon: RotateCcw,
    title: 'Dễ chọn đúng nhu cầu',
    description: 'Có sẵn nhóm hàng phù hợp cho gia đình, quán ăn, đại lý và doanh nghiệp.',
  },
  {
    icon: Truck,
    title: 'Giao hàng thuận tiện',
    description: 'Hỗ trợ giao nhanh và tư vấn rõ ràng để khách đặt hàng dễ hơn.',
  },
  {
    icon: BadgeCheck,
    title: 'Tư vấn nhanh, dễ hiểu',
    description: 'Thông tin ngắn gọn, dễ hỏi giá và dễ chốt đơn hơn ngay từ đầu.',
  },
];

const FLOW_POINTS = [
  {
    icon: Boxes,
    title: 'Chọn đúng loại gạo theo nhu cầu',
    description: 'Dễ dàng tìm dòng gạo phù hợp cho gia đình, quán ăn, bếp ăn hoặc phân phối.',
  },
  {
    icon: BadgeCheck,
    title: 'Thông tin sản phẩm rõ ràng',
    description: 'Đặc điểm và nhóm sử dụng được trình bày dễ hiểu để khách hàng thuận tiện so sánh.',
  },
  {
    icon: Truck,
    title: 'Tư vấn và báo giá thuận tiện',
    description: 'Dễ dàng liên hệ để hỏi sản phẩm, nhận báo giá và chính sách mua số lượng lớn.',
  },
];

const FEATURED_HIGHLIGHTS = [
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
];

const getColorClasses = (scheme?: string) => {
  switch (scheme) {
    case 'green':
      return 'bg-green-50 text-green-700';
    case 'blue':
      return 'bg-blue-50 text-blue-700';
    case 'orange':
      return 'bg-orange-50 text-orange-700';
    case 'purple':
      return 'bg-purple-50 text-purple-700';
    case 'red':
      return 'bg-red-50 text-red-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

const getStatAccent = (value: string) => (/^\d+$/.test(value.trim()) ? '+' : '');

const replaceDemoCopy = (
  value: string | undefined,
  demoValues: string[],
  replacement: string,
) => {
  const normalizedValue = value?.trim() || '';
  return demoValues.includes(normalizedValue) ? replacement : normalizedValue;
};

const normalizeCommitmentCopy = (title: string, description: string) => {
  if (['Giao Hàng 2h', 'Giao hàng 2h'].includes(title.trim())) {
    return {
      title: 'Giao hàng thuận tiện',
      description: 'Hỗ trợ sắp xếp giao hàng phù hợp theo khu vực và đơn hàng.',
    };
  }

  if (['Đổi Trả 7 Ngày', 'Đổi trả 7 ngày'].includes(title.trim())) {
    return {
      title: 'Hỗ trợ đổi trả',
      description: 'Tiếp nhận nhanh khi sản phẩm giao đến có vấn đề cần hỗ trợ.',
    };
  }

  if (['Sản phẩm sạch 100%', 'Sạch 100%'].includes(title.trim())) {
    return {
      title: 'Sản phẩm chọn lọc',
      description: 'Ưu tiên chất lượng ổn định và thông tin nguồn hàng rõ ràng.',
    };
  }

  return { title, description };
};

const Home: React.FC<HomeProps> = ({
  products = [],
  banners = [],
  news = [],
  commitments = [],
  aboutConfig,
  homePageConfig,
  menus = [],
  onAddToCart,
}) => {
  const heroBanners = Array.isArray(banners)
    ? banners
        .filter(
          (banner) =>
            banner &&
            banner.id &&
            banner.placement === 'Trang chủ' &&
            banner.isActive
        )
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : [];

  const safeAbout = aboutConfig || {
    title: '',
    description: '',
    imageUrl: '',
    buttonText: 'Xem thêm',
    buttonLink: '/about-us',
    stats: { value1: '', label1: '', value2: '', label2: '' },
  };

  const mergedHomePageConfig = {
    topFeaturesSection: { isEnabled: true, ...(homePageConfig?.topFeaturesSection || {}) },
    featuredSection: {
      isEnabled: true,
      badge: 'Giải pháp gạo theo nhu cầu',
      title: 'Chọn đúng dòng gạo cho gia đình, quán ăn và doanh nghiệp',
      description:
        'Từ bữa cơm gia đình đến suất ăn công nghiệp và nhu cầu phân phối, Thịnh Phú Food cung cấp nhiều dòng gạo thơm ngon, chất lượng ổn định và dễ lựa chọn.',
      buttonText: 'Khám phá các dòng gạo',
      buttonLink: '/san-pham',
      highlights: FEATURED_HIGHLIGHTS,
      ...(homePageConfig?.featuredSection || {}),
    },
    proofSection: {
      isEnabled: true,
      badge: 'Giá trị Thịnh Phú Food',
      title: 'Chất lượng ổn định cho từng bữa cơm và nhu cầu kinh doanh',
      description:
        'Chúng tôi chú trọng nguồn hàng rõ ràng, chất lượng đồng đều và tư vấn đúng nhu cầu để khách hàng dễ chọn sản phẩm phù hợp, dù mua dùng hằng ngày hay đặt số lượng lớn.',
      items: [
        { value: '04+', title: 'Nhóm sản phẩm nổi bật', description: 'Đa dạng lựa chọn cho từng khẩu vị và mục đích sử dụng.' },
        { value: '100%', title: 'Nguồn hàng chọn lọc', description: 'Ưu tiên sản phẩm có thông tin rõ ràng và chất lượng ổn định.' },
        { value: '24/7', title: 'Hỗ trợ nhanh', description: 'Tiếp nhận nhanh nhu cầu của khách lẻ, đại lý và doanh nghiệp.' },
      ],
      benefits: FLOW_POINTS,
      ...(homePageConfig?.proofSection || {}),
    },
    trustSection: {
      isEnabled: true,
      badge: 'Vì sao khách chọn Thịnh Phú Food',
      title: 'Gạo chất lượng, nguồn gốc rõ ràng và dịch vụ tận tâm',
      description:
        'Thịnh Phú Food tuyển chọn các dòng gạo phù hợp với nhiều nhu cầu, chú trọng chất lượng ổn định và hỗ trợ khách hàng xuyên suốt từ lúc chọn sản phẩm đến khi nhận hàng.',
      buttonText: 'Tìm hiểu về Thịnh Phú Food',
      buttonLink: '/about-us',
      ...(homePageConfig?.trustSection || {}),
    },
    bestsellerSection: {
      isEnabled: true,
      badge: 'Sản phẩm nổi bật',
      title: 'Dòng gạo được khách hàng lựa chọn nhiều',
      description: 'Khám phá những sản phẩm nổi bật với hương vị dễ dùng, chất lượng ổn định và phù hợp cho cả nhu cầu gia đình lẫn kinh doanh.',
      buttonText: 'Xem tất cả sản phẩm',
      buttonLink: '/san-pham',
      ...(homePageConfig?.bestsellerSection || {}),
    },
    newsSection: {
      isEnabled: true,
      badge: 'Góc chia sẻ & tin tức',
      title: 'Cẩm nang chọn gạo và chăm sóc bữa ăn',
      description: 'Cập nhật kiến thức về cách chọn gạo, nấu cơm ngon, bảo quản đúng cách cùng những hoạt động mới nhất từ Thịnh Phú Food.',
      buttonText: 'Xem tất cả tin tức',
      buttonLink: '/tin-tuc',
      ...(homePageConfig?.newsSection || {}),
    },
  };

  const safeHomePageConfig = {
    ...mergedHomePageConfig,
    featuredSection: {
      ...mergedHomePageConfig.featuredSection,
      badge: replaceDemoCopy(
        mergedHomePageConfig.featuredSection.badge,
        ['GẠO SẠCH THỊNH PHÚ', 'Danh mục dễ chọn'],
        'Giải pháp gạo theo nhu cầu',
      ),
      title: replaceDemoCopy(
        mergedHomePageConfig.featuredSection.title,
        [
          'Nguồn gạo chất lượng cho gia đình và doanh nghiệp',
          'Các dòng gạo nổi bật để khách vào là thấy đúng loại mình cần',
        ],
        'Chọn đúng dòng gạo cho gia đình, quán ăn và doanh nghiệp',
      ),
      description: replaceDemoCopy(
        mergedHomePageConfig.featuredSection.description,
        [
          'Cung cấp đa dạng dòng gạo thơm, dẻo, ngon ổn định với mức giá phù hợp cho đại lý, quán ăn và hộ gia đình, suất ăn công nghiệp, trường học,..',
          'Từ gạo cho gia đình đến dòng phù hợp cho quán ăn, đại lý và doanh nghiệp. Chọn nhanh nhóm phù hợp để xem đúng sản phẩm cần mua.',
        ],
        'Từ bữa cơm gia đình đến suất ăn công nghiệp và nhu cầu phân phối, Thịnh Phú Food cung cấp nhiều dòng gạo thơm ngon, chất lượng ổn định và dễ lựa chọn.',
      ),
      highlights: mergedHomePageConfig.featuredSection.highlights?.map((item, index) => {
        const polished = FEATURED_HIGHLIGHTS[index];
        const isDemoHighlight = [
          'Dễ chọn',
          'Sản phẩm đang bán',
          'Bài viết hữu ích',
          'Hỗ trợ nhanh',
        ].includes(item.label.trim());

        return isDemoHighlight && polished
          ? { ...item, label: polished.label, description: polished.description }
          : item;
      }),
    },
    proofSection: {
      ...mergedHomePageConfig.proofSection,
      badge: replaceDemoCopy(
        mergedHomePageConfig.proofSection.badge,
        ['GẠO THỊNH PHÚ', 'Khách hàng dễ yên tâm hơn'],
        'Giá trị Thịnh Phú Food',
      ),
      title: replaceDemoCopy(
        mergedHomePageConfig.proofSection.title,
        ['Tinh tuyển những dòng gạo phù hợp cho mọi nhu cầu'],
        'Chất lượng ổn định cho từng bữa cơm và nhu cầu kinh doanh',
      ),
      description: replaceDemoCopy(
        mergedHomePageConfig.proofSection.description,
        [
          'Từ bữa cơm gia đình đến nhu cầu kinh doanh, Thịnh Phú luôn chú trọng chất lượng, sự ổn định và trải nghiệm chọn mua dễ dàng.',
        ],
        'Chúng tôi chú trọng nguồn hàng rõ ràng, chất lượng đồng đều và tư vấn đúng nhu cầu để khách hàng dễ chọn sản phẩm phù hợp, dù mua dùng hằng ngày hay đặt số lượng lớn.',
      ),
      benefits: mergedHomePageConfig.proofSection.benefits?.map((item, index) => {
        const polished = FLOW_POINTS[index];
        const isDemoBenefit = [
          'Chọn đúng loại gạo cần mua',
          'Thấy nhanh điểm nổi bật',
          'Liên hệ và báo giá thuận tiện',
        ].includes(item.title.trim());

        return isDemoBenefit && polished
          ? { title: polished.title, description: polished.description }
          : item;
      }),
    },
    trustSection: {
      ...mergedHomePageConfig.trustSection,
      badge: replaceDemoCopy(
        mergedHomePageConfig.trustSection.badge,
        ['Lý do khách hàng quay lại'],
        'Vì sao khách chọn Thịnh Phú Food',
      ),
      title: replaceDemoCopy(
        mergedHomePageConfig.trustSection.title,
        [
          'Nguồn gạo chất lượng,dễ chọn và đáng tin cậy',
          'Gạo sạch, thông tin rõ ràng và trải nghiệm mua hàng yên tâm hơn',
        ],
        'Gạo chất lượng, nguồn gốc rõ ràng và dịch vụ tận tâm',
      ),
      description: replaceDemoCopy(
        mergedHomePageConfig.trustSection.description,
        [
          'Thịnh Phú cung cấp đa dạng dòng gạo thơm ngon với thông tin rõ ràng, giúp khách dễ lựa chọn cho gia đình, quán ăn và kinh doanh.',
          'Với thực phẩm, khách thường quan tâm nhất là nguồn gốc, chất lượng, cách chọn mua và cách liên hệ. Càng rõ ràng, khách càng dễ tin và dễ đặt hàng.',
        ],
        'Thịnh Phú Food tuyển chọn các dòng gạo phù hợp với nhiều nhu cầu, chú trọng chất lượng ổn định và hỗ trợ khách hàng xuyên suốt từ lúc chọn sản phẩm đến khi nhận hàng.',
      ),
    },
    bestsellerSection: {
      ...mergedHomePageConfig.bestsellerSection,
      title: replaceDemoCopy(
        mergedHomePageConfig.bestsellerSection.title,
        ['Đặc sản bán chạy', 'Sản phẩm được nhiều khách hàng lựa chọn'],
        'Dòng gạo được khách hàng lựa chọn nhiều',
      ),
      description: replaceDemoCopy(
        mergedHomePageConfig.bestsellerSection.description,
        [
          'Chỉ những sản phẩm được đánh dấu bán chạy trong admin mới xuất hiện tại đây.',
          'Những dòng gạo được quan tâm nhiều, phù hợp cho bữa ăn gia đình, quán ăn và nhu cầu mua sỉ.',
        ],
        'Khám phá những sản phẩm nổi bật với hương vị dễ dùng, chất lượng ổn định và phù hợp cho cả nhu cầu gia đình lẫn kinh doanh.',
      ),
    },
    newsSection: {
      ...mergedHomePageConfig.newsSection,
      title: replaceDemoCopy(
        mergedHomePageConfig.newsSection.title,
        ['Cẩm nang sống khỏe', 'Kinh nghiệm chọn gạo và chăm sóc bữa ăn'],
        'Cẩm nang chọn gạo và chăm sóc bữa ăn',
      ),
      description: replaceDemoCopy(
        mergedHomePageConfig.newsSection.description,
        [
          'Các bài viết mới giúp tăng độ tin cậy cho thương hiệu và giữ người xem ở lại lâu hơn.',
          'Các bài viết ngắn giúp khách hiểu hơn về cách chọn gạo, bảo quản và sử dụng sao cho ngon hơn mỗi ngày.',
        ],
        'Cập nhật kiến thức về cách chọn gạo, nấu cơm ngon, bảo quản đúng cách cùng những hoạt động mới nhất từ Thịnh Phú Food.',
      ),
    },
  };

  const safeProducts = Array.isArray(products) ? products.filter((product) => product && product.id) : [];
  const safeNews = Array.isArray(news) ? news.filter((post) => post && post.id) : [];
  const safeCommitments = Array.isArray(commitments) ? commitments.filter((item) => item && item.id) : [];
  const safeMenus = Array.isArray(menus) ? menus.filter((item) => item && item.id) : [];
  const bestsellers = safeProducts.filter((product) => product.isBestseller === true).slice(0, 4);
  const latestNews = safeNews.slice(0, 3);
  const bestsellerGridClass =
    bestsellers.length === 1
      ? 'mx-auto max-w-sm grid-cols-1'
      : bestsellers.length === 2
        ? 'mx-auto max-w-3xl grid-cols-2'
        : bestsellers.length === 3
          ? 'mx-auto max-w-5xl grid-cols-2 md:grid-cols-3'
          : 'grid-cols-2 lg:grid-cols-4';

  const featuredCategories = React.useMemo<FeaturedCategory[]>(() => {
    const roots = safeMenus.filter((menu) => menu.parentId === null && ROOT_SECTION_META[menu.slug]);
    const cards = roots.flatMap((root) => {
      const children = safeMenus.filter((menu) => menu.parentId === root.id);
      const rootMeta = ROOT_SECTION_META[root.slug];

      return children
        .map((menu) => {
          const categoryProducts = safeProducts.filter((product) => product.menuId === menu.id);
          if (categoryProducts.length === 0) return null;
          const coverProduct = categoryProducts.find((product) => product.images?.[0]) ?? categoryProducts[0];

          return {
            id: menu.id,
            name: menu.name,
            href:
              root.slug === 'san-pham'
                ? `/danh-muc/${menu.slug}`
                : `${rootMeta.href}?category=${menu.id}`,
            imageUrl: coverProduct?.images?.[0] ?? '/placeholder.jpg',
            productCount: categoryProducts.length,
            eyebrow: root.name,
            description:
              menu.slug === 'gao-st'
                ? 'Nhóm gạo chủ lực cho khách hàng cần sản phẩm dễ nhận diện và dễ bán.'
                : rootMeta.description,
            icon: rootMeta.icon,
            order: menu.order ?? 0,
          };
        })
        .filter(Boolean) as FeaturedCategory[];
    });

    return cards
      .sort((a, b) => (b.productCount !== a.productCount ? b.productCount - a.productCount : a.order - b.order))
      .slice(0, 4);
  }, [safeMenus, safeProducts]);

  const trustPoints = React.useMemo<TrustPoint[]>(() => {
    if (safeCommitments.length > 0) {
      return safeCommitments.slice(0, 4).map((item) => {
        const copy = normalizeCommitmentCopy(item.title, item.description);

        return {
          id: item.id,
          icon: ICON_MAP[item.iconName] || Heart,
          title: copy.title,
          description: copy.description,
          colorScheme: item.colorScheme,
        };
      });
    }

    return FALLBACK_TRUST_POINTS.map((item, index) => ({
      id: `fallback-${index}`,
      icon: item.icon,
      title: item.title,
      description: item.description,
      colorScheme: 'green',
    }));
  }, [safeCommitments]);

  const showcaseStats =
    safeHomePageConfig.proofSection.items?.length > 0
      ? safeHomePageConfig.proofSection.items.slice(0, 3)
      : [
          {
            title: safeAbout?.stats?.label1 || 'Nhóm gạo nổi bật',
            value: safeAbout?.stats?.value1 || String(featuredCategories.length || 4),
            description: 'Phân nhóm rõ ràng để khách mới vào vẫn biết nên xem ở đâu.',
          },
          {
            title: safeAbout?.stats?.label2 || 'Sản phẩm đang bán',
            value: safeAbout?.stats?.value2 || String(safeProducts.length),
            description: 'Hình ảnh và nội dung rõ ràng giúp khách dễ chọn hơn.',
          },
          {
            title: 'Bài viết hữu ích',
            value: String(latestNews.length || 3),
            description: 'Giúp khách có thêm thông tin trước khi quyết định mua.',
          },
        ];

  const quickOverview = safeHomePageConfig.featuredSection.highlights?.length
    ? safeHomePageConfig.featuredSection.highlights.slice(0, 4)
    : FEATURED_HIGHLIGHTS;

  const proofDisplayTitle = React.useMemo(() => {
    const rawTitle = safeHomePageConfig.proofSection.title?.trim() || '';

    if (rawTitle === 'Những điểm chạm tạo cảm giác tin cậy ngay từ trang chủ') {
      return 'Những điểm chạm tạo cảm giác tin cậy ngay từ trang chủ và giúp khách dễ quyết định xem sản phẩm hơn';
    }

    if (rawTitle === 'Thông tin rõ ràng ngay từ đầu giúp khách chọn mua dễ hơn') {
      return 'Thông tin rõ ràng ngay từ đầu giúp khách chọn mua dễ hơn và yên tâm hơn khi tìm đúng sản phẩm cần';
    }

    return rawTitle;
  }, [safeHomePageConfig.proofSection.title]);

  const proofDisplayDescription = React.useMemo(() => {
    const rawDescription = safeHomePageConfig.proofSection.description?.trim() || '';

    if (
      rawDescription ===
      'Các con số và thông điệp ngắn giúp khách hiểu nhanh doanh nghiệp đang bán gì và phục vụ ai.'
    ) {
      return 'Chỉ với vài giây đầu tiên, khách có thể hiểu website đang bán gì, phù hợp với nhu cầu nào và nên bấm vào đâu để xem tiếp hoặc liên hệ nhanh hơn.';
    }

    if (
      rawDescription ===
      'Khi vào trang chủ, khách chỉ cần vài giây để biết website bán gì, phù hợp với ai và nên bấm vào đâu tiếp theo.'
    ) {
      return 'Khi vào trang chủ, khách chỉ cần vài giây để biết website bán gì, phù hợp với nhu cầu nào và nên bấm vào đâu tiếp theo để xem hàng hoặc hỏi giá.';
    }

    return rawDescription;
  }, [safeHomePageConfig.proofSection.description]);

  return (
    <div className="animate-in fade-in duration-700">
      {heroBanners.length > 1 ? <HeroSlider banners={heroBanners} /> : heroBanners.length === 1 ? <Hero banners={heroBanners} /> : null}

      {safeHomePageConfig.topFeaturesSection.isEnabled && (
        <section className="bg-gradient-to-b from-white via-white to-emerald-50/40 py-8 md:py-10">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 md:grid-cols-4 md:gap-5">
            {trustPoints.map((item) => {
              const IconComp = item.icon;

              return (
                <div
                  key={item.id}
                  className="group rounded-[1.75rem] border border-emerald-100/80 bg-white/90 p-4 shadow-[0_20px_40px_-30px_rgba(22,101,52,0.45)] transition duration-300 hover:-translate-y-1 hover:border-emerald-200"
                >
                  <div className={`mb-4 inline-flex rounded-2xl p-2.5 ${getColorClasses(item.colorScheme)}`}>
                    <IconComp className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <h3 className="text-sm font-semibold leading-tight text-slate-900 md:text-base">{item.title || ''}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 md:text-sm">{item.description || ''}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {safeHomePageConfig.featuredSection.isEnabled && (
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.10),transparent_35%),linear-gradient(180deg,#ffffff_0%,#f7fbf8_100%)] py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[2.25rem] border border-emerald-100/80 bg-white/90 p-6 shadow-[0_30px_90px_-50px_rgba(21,128,61,0.45)] md:p-8 lg:p-10">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-emerald-200/30 blur-3xl" />
                <div className="absolute right-0 top-10 h-48 w-48 rounded-full bg-orange-100/40 blur-3xl" />
              </div>
              <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700">
                    <Building2 className="h-4 w-4" />
                    {safeHomePageConfig.featuredSection.badge}
                  </div>
                  <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">{safeHomePageConfig.featuredSection.title}</h2>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">{safeHomePageConfig.featuredSection.description}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={safeHomePageConfig.featuredSection.buttonLink || '/san-pham'}
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-700"
                    >
                      {safeHomePageConfig.featuredSection.buttonText || 'Xem toàn bộ danh mục'}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-3 font-bold text-emerald-700 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50"
                    >
                      Nhận báo giá nhanh
                    </Link>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {quickOverview.map((item) => (
                    <div key={item.label} className="rounded-[1.75rem] border border-slate-200/70 bg-white/90 p-5 shadow-[0_18px_38px_-34px_rgba(15,23,42,0.5)]">
                      <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
                      <p className="mt-3 text-3xl font-black tracking-tight text-slate-900">
                        {item.value}
                        {getStatAccent(item.value) && <span className="ml-1 text-xl text-emerald-500">{getStatAccent(item.value)}</span>}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {featuredCategories.map((category) => {
                const Icon = category.icon;

                return (
                  <Link
                    key={category.id}
                    href={category.href}
                    className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_70px_-32px_rgba(21,128,61,0.35)]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={category.imageUrl} alt={category.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                      <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                        <Icon className="h-4 w-4" />
                        {category.eyebrow}
                      </div>
                      <div className="absolute bottom-5 left-5 right-5 text-white">
                        <p className="text-sm font-semibold opacity-90">{category.productCount} sản phẩm</p>
                        <h3 className="mt-1 text-2xl font-black leading-tight">{category.name}</h3>
                      </div>
                    </div>
                    <div className="space-y-4 p-5">
                      <p className="text-sm leading-relaxed text-slate-500">{category.description}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
                        Khám phá danh mục
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}

              {featuredCategories.length === 0 && (
                <div className="col-span-full rounded-[2rem] border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center text-slate-500">
                  Chưa có danh mục đủ dữ liệu để đưa lên trang chủ.
                </div>
              )}
            </div>

            {safeHomePageConfig.proofSection.isEnabled && (
              <div className="relative mt-12 overflow-hidden rounded-[2.5rem] bg-[#0a4b3d] px-6 py-8 shadow-[0_35px_80px_-40px_rgba(6,78,59,0.65)] md:px-8 md:py-10 lg:px-10 lg:py-12">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-x-0 top-0 h-px bg-white/12" />
                  <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-white/6 blur-3xl" />
                  <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-emerald-300/8 blur-3xl" />
                </div>
                <div className="relative">
                  <div className="max-w-4xl">
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-50/90">
                      {safeHomePageConfig.proofSection.badge}
                    </span>
                    <h3 className="mt-5 text-3xl font-black leading-[1.05] text-white md:max-w-4xl md:text-5xl">
                      {proofDisplayTitle}
                    </h3>
                    <p className="mt-4 max-w-4xl text-sm leading-relaxed text-emerald-50/78 md:text-lg">
                      {proofDisplayDescription}
                    </p>
                  </div>

                  <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="rounded-[2rem] bg-white px-6 py-6 text-slate-900 shadow-[0_22px_55px_-32px_rgba(255,255,255,0.65)] md:px-7 md:py-7">
                      <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-emerald-700/75">
                        {showcaseStats[0]?.title}
                      </p>
                      <div className="mt-3 flex items-end gap-2">
                        <p className="text-5xl font-black tracking-tight md:text-6xl">
                          {showcaseStats[0]?.value}
                        </p>
                        {getStatAccent(showcaseStats[0]?.value || '') && (
                          <span className="pb-2 text-2xl font-bold text-emerald-500">
                            {getStatAccent(showcaseStats[0]?.value || '')}
                          </span>
                        )}
                      </div>
                      <p className="mt-3 max-w-lg text-base leading-relaxed text-slate-600">
                        {showcaseStats[0]?.description}
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {showcaseStats.slice(1).map((item) => {
                        const accent = getStatAccent(item.value);

                        return (
                          <div
                            key={`${item.title}-${item.value}`}
                            className="rounded-[1.75rem] border border-white/10 bg-white/[0.08] p-6 text-white"
                          >
                            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-50/68">
                              {item.title}
                            </p>
                            <p className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                              {item.value}
                              {accent && (
                                <span className="ml-1 text-2xl text-emerald-200">
                                  {accent}
                                </span>
                              )}
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-emerald-50/72">
                              {item.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 md:grid-cols-3">
                    {(safeHomePageConfig.proofSection.benefits?.length
                      ? safeHomePageConfig.proofSection.benefits.slice(0, 3)
                      : FLOW_POINTS
                    ).map((item, index) => {
                      const Icon = FLOW_POINTS[index]?.icon || Boxes;

                      return (
                        <div
                          key={item.title}
                          className="flex items-start gap-3 rounded-[1.5rem] border border-white/8 bg-black/10 px-4 py-4 text-white"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-emerald-100">
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold leading-snug">{item.title}</p>
                            <p className="mt-1 text-sm leading-relaxed text-emerald-50/68">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {safeHomePageConfig.trustSection.isEnabled && (
        <section className="bg-gradient-to-b from-white to-primary/5 py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 md:gap-16 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="order-2 space-y-6 lg:order-1">
                <div className="space-y-4">
                  <span className="inline-block rounded-full bg-primary-light/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">{safeHomePageConfig.trustSection.badge}</span>
                  <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-4xl">{safeHomePageConfig.trustSection.title}</h2>
                  <p className="text-base font-medium leading-relaxed text-slate-500 md:text-lg">{safeHomePageConfig.trustSection.description}</p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {trustPoints.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={`why-${item.id}`} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className={`inline-flex rounded-2xl p-3 ${getColorClasses(item.colorScheme)}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.description}</p>
                      </div>
                    );
                  })}
                </div>
                <Link
                  href={safeHomePageConfig.trustSection.buttonLink || '/about-us'}
                  className="group inline-flex items-center space-x-3 rounded-2xl bg-primary px-8 py-4 font-extrabold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-1 hover:bg-primary-dark hover:shadow-primary/50"
                >
                  <span>{safeHomePageConfig.trustSection.buttonText || 'Tìm hiểu thêm'}</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                </Link>
              </div>
              <div className="group relative order-1 lg:order-2">
                <div className="absolute -inset-4 -rotate-2 rounded-[3rem] bg-gradient-to-br from-green-50 to-green-100 shadow-lg shadow-green-200/30 transition-all duration-700 ease-out group-hover:rotate-0" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/50 bg-white shadow-xl">
                  <img src={safeAbout.imageUrl || '/placeholder.jpg'} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Về Thịnh Phú Food" />
                </div>
                <div className="absolute -bottom-6 -right-6 hidden rounded-3xl border border-slate-50 bg-white p-6 shadow-xl md:block">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/40">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xl font-black text-slate-900">{safeAbout?.stats?.value2 || 'Uy tín'}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{safeAbout?.stats?.label2 || 'Đồng hành cùng khách hàng'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {safeHomePageConfig.bestsellerSection.isEnabled && (
        <section className="bg-gradient-to-b from-primary/5 to-white py-12 md:py-18">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <header className="mb-8 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between">
              <div className="text-center md:text-left">
                <div className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">{safeHomePageConfig.bestsellerSection.badge}</div>
                <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{safeHomePageConfig.bestsellerSection.title}</h2>
                <p className="text-slate-500">{safeHomePageConfig.bestsellerSection.description}</p>
              </div>
              <Link
                href={safeHomePageConfig.bestsellerSection.buttonLink || '/san-pham'}
                className="group inline-flex items-center rounded-xl border border-primary/10 bg-white px-5 py-3 font-bold text-primary shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <span>{safeHomePageConfig.bestsellerSection.buttonText || 'Xem tất cả sản phẩm'}</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </header>
            {bestsellers.length > 0 ? (
              <div className={`grid gap-4 md:gap-8 ${bestsellerGridClass}`}>
                {bestsellers.map((product) => (
                  <ProductCard key={product?.id} product={product} onAddToCart={onAddToCart} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-white/60 px-6 py-12 text-center text-slate-500">
                Chưa có sản phẩm nào được đánh dấu bán chạy để hiển thị ở trang chủ.
              </div>
            )}
          </div>
        </section>
      )}

      {safeHomePageConfig.newsSection.isEnabled && (
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-green-600">
              <Newspaper className="h-4 w-4" />
              <span>{safeHomePageConfig.newsSection.badge}</span>
            </div>
            {latestNews.length > 0 ? (
              <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-8">
                {latestNews.map((post) => (
                  <Link key={post?.id} href={post?.slug ? `/tin-tuc/${post.slug}` : '#'} className="group text-left">
                    <div className="mb-6 aspect-[16/10] overflow-hidden rounded-3xl shadow-xl shadow-green-900/5">
                      <img src={post?.image || ''} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" alt={post?.title || ''} />
                    </div>
                    <h3 className="mb-2 line-clamp-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-green-700">{post?.title || ''}</h3>
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                      <span>{post?.category || 'Tin tức'}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span>{post?.date || ''}</span>
                    </div>
                    <p className="line-clamp-2 text-sm leading-relaxed text-slate-500">{post?.summary || ''}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-10 rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center text-slate-500">
                Chưa có bài viết mới để hiển thị ở trang chủ.
              </div>
            )}
            <div className="mt-8 text-center md:text-left">
              <Link
                href={safeHomePageConfig.newsSection.buttonLink || '/tin-tuc'}
                className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-5 py-3 font-bold text-green-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {safeHomePageConfig.newsSection.buttonText || 'Xem tất cả tin tức'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
