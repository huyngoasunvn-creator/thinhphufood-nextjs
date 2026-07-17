'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Factory,
  LandPlot,
  PackageCheck,
  PhoneCall,
  ShieldCheck,
  Sprout,
  Warehouse,
  Wheat,
} from 'lucide-react';
import SEOManager from '@/components/common/SEO';
import type { ProfileConfig } from '@/types';

interface ProfileProps {
  config: ProfileConfig;
}

const organization = [
  {
    title: 'Khối nhà máy',
    description: 'Tổ chức sản xuất, kiểm soát vận hành và chất lượng thành phẩm.',
    departments: ['Quản lý nhà máy', 'Phòng sản xuất'],
  },
  {
    title: 'Khối kinh doanh nội địa',
    description: 'Phát triển thị trường trong nước và chăm sóc từng nhóm khách hàng.',
    departments: ['Giám đốc vùng', 'Phòng kinh doanh', 'Phòng kế toán', 'Phòng nhân sự'],
  },
  {
    title: 'Khối kinh doanh quốc tế',
    description: 'Kết nối đối tác và phát triển hoạt động thương mại quốc tế.',
    departments: ['Giám đốc khu vực', 'Bộ phận xuất khẩu'],
  },
];

const productionSteps = [
  {
    icon: Sprout,
    title: 'Chọn giống lúa',
    description:
      'Lựa chọn giống lúa chất lượng cao, phù hợp với vùng canh tác và tiêu chuẩn đầu vào của từng dòng sản phẩm.',
  },
  {
    icon: LandPlot,
    title: 'Làm đất',
    description:
      'Cày bừa, san phẳng đồng ruộng và bổ sung nguồn dinh dưỡng phù hợp để tạo nền đất thuận lợi cho cây lúa phát triển.',
  },
  {
    icon: Wheat,
    title: 'Canh tác',
    description:
      'Áp dụng kinh nghiệm thực tiễn, theo dõi đồng ruộng và tối ưu quy trình canh tác nhằm duy trì chất lượng nguyên liệu ổn định.',
  },
  {
    icon: Warehouse,
    title: 'Bảo quản',
    description:
      'Kiểm soát điều kiện kho, độ ẩm và các nguy cơ ảnh hưởng đến chất lượng trước khi nguyên liệu được đưa vào chế biến.',
  },
  {
    icon: Factory,
    title: 'Chế biến',
    description:
      'Xay xát, đánh bóng, phân loại và tách màu bằng hệ thống thiết bị phù hợp để loại bỏ tạp chất và giữ độ đồng đều của hạt gạo.',
  },
  {
    icon: PackageCheck,
    title: 'Đóng gói',
    description:
      'Thành phẩm được kiểm tra, định lượng và đóng gói theo quy cách trước khi lưu kho, phân phối đến khách hàng.',
  },
];

const strengths = [
  'Phục vụ gia đình, quán ăn, bếp ăn tập thể và doanh nghiệp',
  'Danh mục sản phẩm đa dạng theo nhu cầu sử dụng',
  'Quy trình từ nguyên liệu đến thành phẩm được trình bày rõ ràng',
];

const Profile: React.FC<ProfileProps> = ({ config }) => {
  if (!config.isActive) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-white p-8 text-center">
        <div className="mb-6 rounded-full bg-slate-50 p-4 text-slate-300">
          <ShieldCheck className="h-16 w-16" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Trang giới thiệu đang được cập nhật</h2>
        <p className="mx-auto mt-2 max-w-md leading-relaxed text-slate-500">
          Thịnh Phú Food đang hoàn thiện nội dung doanh nghiệp. Vui lòng quay lại sau.
        </p>
      </div>
    );
  }

  const renderMode = config.renderMode || 'native';
  const pageTitle = ['Tài khoản', 'Profile'].includes(config.title)
    ? 'Giới thiệu Thịnh Phú Food'
    : config.title || 'Giới thiệu Thịnh Phú Food';
  const headline = config.headline || 'Đồng hành cùng bữa cơm Việt bằng những hạt gạo chất lượng';
  const description =
    config.description ||
    'Thịnh Phú Food sản xuất và phân phối các dòng gạo phục vụ gia đình, quán ăn, suất ăn công nghiệp, trường học, đại lý và khách hàng doanh nghiệp.';
  const factoryImageUrl = config.factoryImageUrl || '/images/thinh-phu-factory-info.png';

  if (renderMode === 'embed' && config.externalUrl) {
    return (
      <div className="animate-in fade-in duration-700">
        <SEOManager
          title={pageTitle}
          description="Tìm hiểu doanh nghiệp, quy trình sản xuất và năng lực phục vụ của Thịnh Phú Food."
        />
        <div className="mb-[-4rem] flex h-[85vh] w-full flex-col overflow-hidden bg-white sm:mb-0 sm:h-[92vh]">
          <div className="relative w-full flex-1 overflow-x-auto overflow-y-hidden">
            <iframe
              src={config.externalUrl}
              title={pageTitle}
              className="absolute inset-0 h-full min-w-full border-none"
              style={{ minWidth: '100%', minHeight: '100%' }}
              sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="animate-in fade-in bg-[#f5f8f1] text-slate-950 duration-700">
      <SEOManager
        title={pageTitle}
        description="Tìm hiểu về Thịnh Phú Food, cơ cấu tổ chức, quy trình sản xuất và cam kết mang gạo chất lượng đến khách hàng."
      />

      <section className="relative overflow-hidden bg-emerald-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(34,197,94,0.35),transparent_32%),radial-gradient(circle_at_90%_18%,rgba(251,191,36,0.2),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-emerald-100">
              <Building2 className="h-4 w-4 text-amber-300" />
              Công ty TNHH Lương thực - Thực phẩm Thịnh Phú
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              {headline}
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-emerald-50/85 sm:text-lg">
              {description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/san-pham"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-4 font-black text-emerald-950 transition hover:bg-amber-200"
              >
                Xem sản phẩm
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-4 font-black text-white transition hover:bg-white/15"
              >
                <PhoneCall className="h-4 w-4" />
                Nhận tư vấn và báo giá
              </Link>
            </div>

            <div className="mt-8 space-y-3">
              {strengths.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm font-bold text-emerald-50/90">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.75rem] bg-amber-300/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/30">
              <img
                src={factoryImageUrl}
                alt="Nhà máy, sản phẩm và quy trình sản xuất của Thịnh Phú Food"
                className="h-[420px] w-full rounded-[1.9rem] bg-white object-cover object-top sm:h-[540px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.26em] text-emerald-700">Sơ đồ tổ chức</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
            Phối hợp rõ ràng từ sản xuất đến thị trường
          </h2>
          <p className="mt-5 text-base font-medium leading-7 text-slate-600">
            Cơ cấu được tổ chức theo ba khối chính, giúp hoạt động sản xuất, kinh doanh nội địa và phát triển thị trường quốc tế phối hợp hiệu quả.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="mx-auto w-fit rounded-2xl bg-emerald-700 px-8 py-4 text-center text-lg font-black uppercase text-white shadow-xl shadow-emerald-900/20">
            Ban giám đốc
          </div>
          <div className="mx-auto hidden h-10 w-px bg-emerald-300 md:block" />
          <div className="absolute left-[16.66%] right-[16.66%] top-[79px] hidden h-px bg-emerald-300 md:block" />

          <div className="mt-6 grid gap-5 md:mt-0 md:grid-cols-3">
            {organization.map((group) => (
              <article key={group.title} className="relative rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-950/5">
                <div className="absolute -top-5 left-1/2 hidden h-5 w-px -translate-x-1/2 bg-emerald-300 md:block" />
                <div className="rounded-2xl bg-emerald-600 px-4 py-4 text-center text-base font-black uppercase text-white">
                  {group.title}
                </div>
                <p className="mt-5 min-h-[4.5rem] text-center text-sm font-medium leading-6 text-slate-600">
                  {group.description}
                </p>
                <div className="mt-5 grid gap-3">
                  {group.departments.map((department) => (
                    <div key={department} className="rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 text-center text-sm font-black text-sky-800">
                      {department}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_0.65fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.26em] text-emerald-700">Quy trình sản xuất</p>
              <h2 className="mt-4 max-w-4xl text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
                Sáu bước kiểm soát từ đồng ruộng đến thành phẩm
              </h2>
            </div>
            <p className="text-base font-medium leading-7 text-slate-600">
              Mỗi công đoạn đều có mục tiêu rõ ràng nhằm duy trì chất lượng nguyên liệu, độ đồng đều của hạt gạo và sự thuận tiện khi phân phối.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {productionSteps.map(({ icon: Icon, title, description }, index) => (
              <article key={title} className="group relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-[#f7fbf5] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-2xl hover:shadow-emerald-950/10">
                <div className="absolute right-4 top-2 text-7xl font-black text-emerald-950/[0.05]">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-900/15">
                  <Icon className="h-7 w-7" />
                </div>
                <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-amber-600">
                  Bước {index + 1}
                </p>
                <h3 className="mt-2 text-2xl font-black text-slate-950">{title}</h3>
                <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="overflow-hidden rounded-[2.5rem] bg-emerald-950 p-7 text-white shadow-2xl shadow-emerald-950/20 sm:p-10 lg:p-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-300">Thịnh Phú Food</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.04em] sm:text-5xl">
                Hạt ngọc sạch cho sức khỏe bền lâu
              </h2>
              <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-emerald-50/80">
                Chúng tôi hướng đến việc cung cấp sản phẩm phù hợp, thông tin rõ ràng và dịch vụ đáng tin cậy cho từng bữa cơm và từng đối tác.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-7 py-4 font-black text-emerald-950 transition hover:bg-amber-200"
            >
              Liên hệ Thịnh Phú Food
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
