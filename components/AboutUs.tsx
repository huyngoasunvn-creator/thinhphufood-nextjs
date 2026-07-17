import React from 'react';
import Link from 'next/link';
import SEOManager from './common/SEO';
import { AboutPageConfig } from '@/types';
import {
  ArrowRight,
  CheckCircle2,
  Factory,
  HelpCircle,
  PhoneCall,
  ShieldCheck,
  Truck,
  Wheat,
} from 'lucide-react';

interface AboutUsProps {
  config: AboutPageConfig;
}

const stats = [
  {
    value: '20.000m²',
    label: 'Diện tích nhà máy',
    text: 'Không gian sản xuất, kho bãi và vận hành được bố trí đồng bộ.',
  },
  {
    value: '500 tấn/ngày',
    label: 'Công suất',
    text: 'Đáp ứng nhu cầu ổn định cho đại lý, suất ăn và khách hàng doanh nghiệp.',
  },
  {
    value: '8 bước',
    label: 'Quy trình khép kín',
    text: 'Từ tiếp nhận lúa, sấy, xay xát, tách màu đến đóng gói thành phẩm.',
  },
  {
    value: '24/7',
    label: 'Tư vấn nhanh',
    text: 'Hỗ trợ chọn dòng gạo, báo giá và điều phối đơn hàng thuận tiện.',
  },
];

const process = [
  'Tiếp nhận và kiểm tra nguồn lúa đầu vào',
  'Sấy, xay xát và đánh bóng bằng hệ thống máy hiện đại',
  'Phân loại, tách màu để giữ độ đồng đều của hạt gạo',
  'Đóng gói, lưu kho và giao hàng theo nhu cầu từng nhóm khách',
];

const commitments = [
  {
    icon: Wheat,
    title: 'Nguồn gốc rõ ràng',
    text: 'Ưu tiên vùng nguyên liệu ổn định, dễ kiểm soát chất lượng.',
  },
  {
    icon: ShieldCheck,
    title: 'Chọn lọc kỹ lưỡng',
    text: 'Quy trình sản xuất tập trung vào độ sạch, độ đồng đều và an toàn thực phẩm.',
  },
  {
    icon: Truck,
    title: 'Phục vụ linh hoạt',
    text: 'Phù hợp cho gia đình, quán ăn, suất ăn công nghiệp, đại lý và doanh nghiệp.',
  },
];

const responsibilityItems = [
  {
    title: 'Đồng hành cùng nông dân',
    text: 'Sát cánh cùng nông dân đồng bằng sông Cửu Long, hỗ trợ giống lúa, kỹ thuật canh tác và đầu ra ổn định để cùng phát triển bền vững.',
  },
  {
    title: 'Đảm bảo an toàn thực phẩm',
    text: 'Đặt sức khỏe người tiêu dùng lên hàng đầu, kiểm soát chất lượng từ chọn giống, chế biến đến đóng gói thành phẩm.',
  },
  {
    title: 'Sản xuất thân thiện hơn',
    text: 'Ưu tiên kỹ thuật canh tác và sản xuất giảm tác động xấu đến môi trường, hướng tới bao bì và vận hành có trách nhiệm.',
  },
  {
    title: 'Gắn kết giáo dục và cộng đồng',
    text: 'Quan tâm đến các hoạt động học bổng, thiện nguyện và đóng góp cho đời sống địa phương nơi Thịnh Phú đồng hành.',
  },
  {
    title: 'Nâng tầm gạo Việt',
    text: 'Không ngừng cải thiện sản phẩm, dịch vụ và trải nghiệm mua hàng để đưa hạt gạo Việt đến gần hơn với nhiều nhóm khách hàng.',
  },
];

const AboutUs: React.FC<AboutUsProps> = ({ config }) => {
  if (!config.isActive) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-white">
        <div className="p-4 bg-slate-50 rounded-full mb-6 text-slate-300">
          <HelpCircle className="h-16 w-16" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Trang đang cập nhật nội dung</h2>
        <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
          Thịnh Phú Food đang chuẩn bị nội dung giới thiệu đầy đủ hơn. Vui lòng quay lại sau ít phút.
        </p>
      </div>
    );
  }

  const renderMode = config.renderMode || 'native';
  const factoryImageUrl = config.factoryImageUrl || '/images/thinh-phu-factory-info.png';
  const headline = config.headline || 'Nguồn gạo chất lượng cho gia đình và doanh nghiệp';
  const description =
    config.description ||
    'Thịnh Phú Food tuyển chọn, sản xuất và phân phối các dòng gạo ổn định chất lượng cho bữa cơm gia đình, suất ăn công nghiệp, nhà trường, đại lý và khách hàng doanh nghiệp.';

  if (renderMode === 'embed' && config.externalUrl) {
    return (
      <div className="animate-in fade-in duration-700">
        <SEOManager
          title={config.title}
          description="Tìm hiểu hành trình mang nông sản sạch đến mọi nhà của Thịnh Phú Food."
        />

        <div className="w-full bg-white flex flex-col h-[85vh] sm:h-[92vh] overflow-hidden mb-[-4rem] sm:mb-0">
          <div className="flex-1 w-full relative overflow-x-auto overflow-y-hidden">
            <iframe
              src={config.externalUrl}
              title={config.title}
              className="absolute inset-0 w-full h-full border-none min-w-full"
              style={{ minWidth: '100%', minHeight: '100%' }}
              sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="animate-in fade-in duration-700 bg-[#f4fbf6] text-slate-950">
      <SEOManager
        title={config.title}
        description="Tìm hiểu năng lực sản xuất, quy trình và cam kết chất lượng của Thịnh Phú Food."
      />

      <section className="relative overflow-hidden bg-emerald-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(16,185,129,0.38),transparent_34%),radial-gradient(circle_at_78%_8%,rgba(245,158,11,0.24),transparent_28%)]" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#f4fbf6] to-transparent" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-emerald-100 backdrop-blur">
                <Factory className="h-4 w-4 text-amber-300" />
                Thịnh Phú Food
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                {headline}
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-emerald-50/85">
                {description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/san-pham"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-4 text-base font-black text-emerald-950 shadow-2xl shadow-amber-950/20 transition hover:bg-amber-200"
                >
                  Xem sản phẩm
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-base font-black text-white backdrop-blur transition hover:bg-white/15"
                >
                  <PhoneCall className="h-4 w-4" />
                  Nhận báo giá
                </Link>
              </div>

              <div className="mt-9 grid max-w-2xl gap-3 sm:grid-cols-3">
                {['Gạo sạch', 'Quy trình rõ', 'Giao hàng linh hoạt'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-black text-emerald-50">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-amber-300/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2.2rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/30">
                <div className="h-[360px] overflow-hidden rounded-[1.6rem] bg-emerald-900 sm:h-[460px] lg:h-[540px]">
                  <img
                    src={factoryImageUrl}
                    alt="Nhà máy và quy trình sản xuất Thịnh Phú Food"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="absolute bottom-5 left-5 rounded-3xl bg-white p-5 text-emerald-950 shadow-2xl shadow-black/20">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">Năng lực</p>
                <p className="mt-1 text-3xl font-black">500 tấn/ngày</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-10 pb-16 sm:px-8 lg:pt-14 lg:pb-24">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-[1.6rem] border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-950/5">
              <p className="text-3xl font-black tracking-[-0.04em] text-slate-950">{item.value}</p>
              <p className="mt-3 text-xs font-black uppercase tracking-[0.2em] text-emerald-700">{item.label}</p>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-8 rounded-[2.2rem] border border-emerald-100 bg-white p-5 shadow-sm sm:p-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-700">Thông tin nhà máy</p>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Một bức tranh nhanh về quy mô, sản phẩm và quy trình của Thịnh Phú
            </h2>
            <p className="mt-4 text-base font-medium leading-7 text-slate-600">
              Ảnh thông tin nhà máy được đặt ở đây để khách hàng có thể xem tổng quan sau khi đã hiểu lời hứa thương hiệu. Cách này giữ phần đầu trang gọn hơn, nhưng vẫn có đủ bằng chứng để tạo niềm tin.
            </p>
          </div>
          <div className="overflow-hidden rounded-[1.7rem] border border-slate-100 bg-slate-50">
            <img
              src={factoryImageUrl}
              alt="Infographic thông tin nhà máy Thịnh Phú Food"
              className="max-h-[720px] w-full object-contain"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] bg-emerald-950 p-7 text-white shadow-2xl shadow-emerald-950/15 sm:p-9">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-300">Quy trình sản xuất</p>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">
              Làm rõ năng lực nhà máy để khách hàng yên tâm trước khi mua
            </h2>
            <div className="mt-7 space-y-4">
              {process.map((item, index) => (
                <div key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-sm font-black text-emerald-950">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-base font-bold leading-7 text-white/90">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {commitments.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-5 rounded-[1.6rem] border border-emerald-100 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-950">{title}</h3>
                  <p className="mt-2 text-base font-medium leading-7 text-slate-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-emerald-100 bg-white p-7 shadow-sm sm:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-700">Cam kết & trách nhiệm</p>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Không chỉ bán gạo, Thịnh Phú xây dựng niềm tin trong từng bữa ăn
            </h2>
            <p className="mt-4 text-base font-medium leading-7 text-slate-600">
              Từ cộng đồng nông dân đến khách hàng sử dụng cuối cùng, Thịnh Phú Food hướng đến một chuỗi giá trị rõ ràng, an toàn và có trách nhiệm hơn.
            </p>
          </div>

          <div className="mt-8 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-5">
            {responsibilityItems.map((item, index) => (
              <div
                key={item.title}
                className="flex h-full flex-col rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-xl hover:shadow-emerald-950/5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-black text-white">
                  {index + 1}
                </span>
                <h3 className="mt-5 min-h-[3rem] text-base font-black leading-6 text-slate-950">{item.title}</h3>
                <p className="mt-3 flex-1 text-justify text-sm font-medium leading-6 text-slate-600 [hyphens:auto]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.5rem] bg-emerald-50 p-5 text-base font-bold leading-7 text-emerald-950">
            Những trách nhiệm này giúp Thịnh Phú Food không chỉ là đơn vị cung cấp gạo, mà còn là người bạn đồng hành đáng tin cậy của khách hàng, cộng đồng và môi trường.
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] bg-emerald-950 text-center text-white shadow-2xl shadow-emerald-950/15">
          <div className="px-7 py-10 sm:px-10">
            <CheckCircle2 className="mx-auto h-10 w-10 text-amber-300" />
            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Cần chọn dòng gạo phù hợp cho nhu cầu của bạn?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base font-medium leading-7 text-emerald-50/80">
              Khách hàng có thể xem nhanh danh mục sản phẩm hoặc liên hệ Thịnh Phú Food để được tư vấn dòng gạo, quy cách đóng gói và báo giá phù hợp.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/san-pham" className="rounded-full bg-amber-300 px-6 py-4 font-black text-emerald-950 transition hover:bg-amber-200">
                Xem toàn bộ danh mục
              </Link>
              <Link href="/contact" className="rounded-full border border-white/20 bg-white/10 px-6 py-4 font-black text-white transition hover:bg-white/15">
                Liên hệ tư vấn
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
