'use client';

import React, { useState } from 'react';
import { Eye, FileText, Image as ImageIcon, Info, Layout, Link as LinkIcon, Save, Settings, Type } from 'lucide-react';
import { AboutPageConfig } from '@/types';

interface AdminAboutPageConfigProps {
  config: AboutPageConfig;
  onUpdate: (config: AboutPageConfig) => void;
}

const AdminAboutPageConfig: React.FC<AdminAboutPageConfigProps> = ({ config, onUpdate }) => {
  const [formData, setFormData] = useState<AboutPageConfig>({
    renderMode: 'native',
    factoryImageUrl: '/images/thinh-phu-factory-info.png',
    headline: 'Nguồn gạo chất lượng cho gia đình và doanh nghiệp',
    description:
      'Thịnh Phú Food tuyển chọn, sản xuất và phân phối các dòng gạo ổn định chất lượng cho bữa cơm gia đình, quán ăn, đại lý và khách hàng doanh nghiệp.',
    ...config,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    alert('Cập nhật cấu hình trang Về chúng tôi thành công!');
  };

  const inputClass =
    'w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-slate-900';
  const textareaClass = `${inputClass} min-h-[112px] resize-y leading-7`;
  const mode = formData.renderMode || 'native';

  return (
    <div className="max-w-5xl space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Layout className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Cấu hình trang Về chúng tôi</h3>
            <p className="text-sm text-slate-500">
              Nên dùng trang nội bộ để giữ khách ở lại web, link ngoài chỉ nên dùng làm phương án dự phòng.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="rounded-[2rem] border border-emerald-100 bg-emerald-50/60 p-5">
            <label className="mb-3 flex items-center text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Settings className="mr-2 h-3 w-3" />
              Chế độ hiển thị
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  value: 'native',
                  title: 'Trang nội bộ trong web',
                  text: 'Tốt hơn cho sale, SEO, tốc độ và CTA sản phẩm.',
                },
                {
                  value: 'embed',
                  title: 'Nhúng link ngoài',
                  text: 'Dùng khi cần giữ landing page cũ hoặc chiến dịch riêng.',
                },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, renderMode: item.value as 'native' | 'embed' })}
                  className={`rounded-3xl border p-5 text-left transition-all ${
                    mode === item.value
                      ? 'border-emerald-500 bg-white shadow-lg shadow-emerald-100'
                      : 'border-emerald-100 bg-white/60 hover:border-emerald-300'
                  }`}
                >
                  <span className="block text-base font-black text-slate-950">{item.title}</span>
                  <span className="mt-2 block text-sm font-medium leading-6 text-slate-500">{item.text}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
            <div className="space-y-6">
              <div>
                <label className="mb-2 flex items-center text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Type className="mr-2 h-3 w-3" />
                  Tiêu đề hiển thị trên menu
                </label>
                <input
                  required
                  type="text"
                  className={inputClass}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-2 flex items-center text-xs font-bold uppercase tracking-wider text-slate-500">
                  <FileText className="mr-2 h-3 w-3" />
                  Tiêu đề chính của trang nội bộ
                </label>
                <input
                  type="text"
                  className={inputClass}
                  value={formData.headline || ''}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-2 flex items-center text-xs font-bold uppercase tracking-wider text-slate-500">
                  <FileText className="mr-2 h-3 w-3" />
                  Mô tả ngắn
                </label>
                <textarea
                  className={textareaClass}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-2 flex items-center text-xs font-bold uppercase tracking-wider text-slate-500">
                  <ImageIcon className="mr-2 h-3 w-3" />
                  Ảnh thông tin nhà máy
                </label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="/images/thinh-phu-factory-info.png"
                  value={formData.factoryImageUrl || ''}
                  onChange={(e) => setFormData({ ...formData, factoryImageUrl: e.target.value })}
                />
                <p className="mt-2 text-xs font-medium text-slate-500">
                  Ảnh hiện tại đã được đặt trong web tại: /images/thinh-phu-factory-info.png
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <label className="mb-4 flex items-center text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Settings className="mr-2 h-3 w-3" />
                  Trạng thái hiển thị
                </label>

                <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="aboutPageToggle"
                      className="h-5 w-5 cursor-pointer rounded accent-green-600"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                    <label htmlFor="aboutPageToggle" className="cursor-pointer text-sm font-bold text-slate-700">
                      Kích hoạt trang Về chúng tôi
                    </label>
                  </div>
                  <Eye className={`h-5 w-5 ${formData.isActive ? 'text-green-500' : 'text-slate-300'}`} />
                </div>
              </div>

              <div>
                <label className="mb-2 flex items-center text-xs font-bold uppercase tracking-wider text-slate-500">
                  <LinkIcon className="mr-2 h-3 w-3" />
                  Link ngoài nếu chọn chế độ nhúng
                </label>
                <input
                  type="url"
                  className={inputClass}
                  placeholder="https://marketing.thinhphufood.vn/about"
                  value={formData.externalUrl}
                  onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                />
              </div>

              <div className="flex items-start space-x-3 rounded-3xl border border-blue-100 bg-blue-50 p-6">
                <Info className="mt-0.5 h-4 w-4 text-blue-500" />
                <p className="text-[12px] leading-relaxed text-blue-700">
                  Các thẻ thống kê, quy trình và cam kết đang được trình bày cố định để trang gọn và dễ bán hơn.
                  Phần cần chỉnh thường xuyên là tiêu đề, mô tả, ảnh nhà máy và chế độ nhúng/nội bộ.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end border-t border-slate-100 pt-6">
            <button
              type="submit"
              className="flex items-center space-x-3 rounded-2xl bg-green-600 px-12 py-4 font-bold text-white shadow-xl shadow-green-100 transition-all hover:bg-green-700 active:scale-95"
            >
              <Save className="h-5 w-5" />
              <span>Lưu cấu hình Về chúng tôi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAboutPageConfig;
