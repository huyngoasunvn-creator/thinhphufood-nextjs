'use client';

import React, { useEffect, useState } from 'react';
import {
  Eye,
  FileText,
  Image as ImageIcon,
  Info,
  Layout,
  Link as LinkIcon,
  Save,
  Settings,
  Type,
} from 'lucide-react';
import type { ProfileConfig } from '@/types';

interface AdminProfileConfigProps {
  config: ProfileConfig;
  onUpdate: (config: ProfileConfig) => void;
}

const createFormData = (config: ProfileConfig): ProfileConfig => ({
  ...config,
  title: ['Tài khoản', 'Profile'].includes(config.title) ? 'Giới thiệu' : config.title,
  renderMode: config.renderMode || 'native',
  factoryImageUrl: config.factoryImageUrl || '/images/thinh-phu-factory-info.png',
  headline:
    config.headline || 'Đồng hành cùng bữa cơm Việt bằng những hạt gạo chất lượng',
  description:
    config.description ||
    'Thịnh Phú Food sản xuất và phân phối các dòng gạo phục vụ gia đình, quán ăn, suất ăn công nghiệp, trường học, đại lý và khách hàng doanh nghiệp.',
});

const AdminProfileConfig: React.FC<AdminProfileConfigProps> = ({ config, onUpdate }) => {
  const [formData, setFormData] = useState<ProfileConfig>(() => createFormData(config));

  useEffect(() => {
    setFormData(createFormData(config));
  }, [config]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onUpdate(formData);
    alert('Cập nhật trang Giới thiệu thành công!');
  };

  const inputClass =
    'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-900 outline-none transition-all focus:ring-2 focus:ring-green-500';
  const mode = formData.renderMode || 'native';

  return (
    <div className="max-w-5xl space-y-8 animate-in fade-in duration-500">
      <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center space-x-4">
          <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
            <Layout className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Cấu hình trang Giới thiệu</h3>
            <p className="text-sm text-slate-500">
              Trang nội bộ được khuyến nghị; LadiPage vẫn được giữ làm phương án dự phòng.
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
                  title: 'Trang nội bộ trong website',
                  text: 'Tối ưu tốc độ, mobile, SEO và đồng bộ giao diện.',
                },
                {
                  value: 'embed',
                  title: 'Nhúng LadiPage',
                  text: 'Dùng tạm landing page cũ từ đường dẫn bên ngoài.',
                },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      renderMode: item.value as 'native' | 'embed',
                    })
                  }
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
                  Tiêu đề trên menu
                </label>
                <input
                  required
                  className={inputClass}
                  value={formData.title}
                  onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                />
              </div>

              <div>
                <label className="mb-2 flex items-center text-xs font-bold uppercase tracking-wider text-slate-500">
                  <FileText className="mr-2 h-3 w-3" />
                  Tiêu đề chính
                </label>
                <input
                  className={inputClass}
                  value={formData.headline || ''}
                  onChange={(event) => setFormData({ ...formData, headline: event.target.value })}
                />
              </div>

              <div>
                <label className="mb-2 flex items-center text-xs font-bold uppercase tracking-wider text-slate-500">
                  <FileText className="mr-2 h-3 w-3" />
                  Mô tả doanh nghiệp
                </label>
                <textarea
                  rows={5}
                  className={`${inputClass} resize-y leading-7`}
                  value={formData.description || ''}
                  onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                />
              </div>

              <div>
                <label className="mb-2 flex items-center text-xs font-bold uppercase tracking-wider text-slate-500">
                  <ImageIcon className="mr-2 h-3 w-3" />
                  Ảnh nhà máy
                </label>
                <input
                  className={inputClass}
                  value={formData.factoryImageUrl || ''}
                  onChange={(event) => setFormData({ ...formData, factoryImageUrl: event.target.value })}
                  placeholder="/images/thinh-phu-factory-info.png"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <label className="mb-4 flex items-center text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Settings className="mr-2 h-3 w-3" />
                  Trạng thái
                </label>
                <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4">
                  <div className="flex items-center gap-3">
                    <input
                      id="profileToggle"
                      type="checkbox"
                      className="h-5 w-5 cursor-pointer rounded accent-green-600"
                      checked={formData.isActive}
                      onChange={(event) => setFormData({ ...formData, isActive: event.target.checked })}
                    />
                    <label htmlFor="profileToggle" className="cursor-pointer text-sm font-bold text-slate-700">
                      Hiển thị trang Giới thiệu
                    </label>
                  </div>
                  <Eye className={`h-5 w-5 ${formData.isActive ? 'text-green-500' : 'text-slate-300'}`} />
                </div>
              </div>

              <div>
                <label className="mb-2 flex items-center text-xs font-bold uppercase tracking-wider text-slate-500">
                  <LinkIcon className="mr-2 h-3 w-3" />
                  Link LadiPage dự phòng
                </label>
                <input
                  type="url"
                  className={inputClass}
                  value={formData.externalUrl}
                  onChange={(event) => setFormData({ ...formData, externalUrl: event.target.value })}
                  placeholder="https://marketing.thinhphufood.vn/profile"
                />
              </div>

              <div className="flex items-start gap-3 rounded-3xl border border-blue-100 bg-blue-50 p-6">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                <p className="text-[12px] leading-relaxed text-blue-700">
                  Sơ đồ tổ chức và sáu bước sản xuất đã được dựng trực tiếp trong website. Bạn có thể chỉnh tiêu đề, mô tả và ảnh tại đây; nội dung chi tiết có thể mở rộng thêm sau.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end border-t border-slate-100 pt-6">
            <button type="submit" className="flex items-center gap-3 rounded-2xl bg-green-600 px-12 py-4 font-bold text-white shadow-xl shadow-green-100 transition hover:bg-green-700 active:scale-95">
              <Save className="h-5 w-5" />
              Lưu trang Giới thiệu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfileConfig;
