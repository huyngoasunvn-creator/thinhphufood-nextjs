
import React, { useState } from 'react';
import { Save, Info, Link as LinkIcon, Eye, Type, Settings, Layout } from 'lucide-react';
import { AboutPageConfig } from '../../types';

interface AdminAboutPageConfigProps {
  config: AboutPageConfig;
  onUpdate: (config: AboutPageConfig) => void;
}

const AdminAboutPageConfig: React.FC<AdminAboutPageConfigProps> = ({ config, onUpdate }) => {
  const [formData, setFormData] = useState<AboutPageConfig>(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    alert('Cập nhật cấu hình trang Giới thiệu thành công!');
  };

  const inputClass = "w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-slate-900";

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <Layout className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Cấu hình Trang Giới thiệu (Nhúng)</h3>
            <p className="text-sm text-slate-500">Quản lý link nhúng trang giới thiệu chi tiết cho website</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center">
                  <Type className="h-3 w-3 mr-2" />
                  Tiêu đề hiển thị (Menu)
                </label>
                <input 
                  required 
                  type="text"
                  className={inputClass}
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center">
                  <LinkIcon className="h-3 w-3 mr-2" />
                  Đường dẫn nhúng (External URL)
                </label>
                <input 
                  required 
                  type="url"
                  className={inputClass}
                  placeholder="https://marketing.thinhphufood.vn/about"
                  value={formData.externalUrl} 
                  onChange={e => setFormData({...formData, externalUrl: e.target.value})} 
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block flex items-center">
                  <Settings className="h-3 w-3 mr-2" />
                  Trạng thái hiển thị
                </label>
                
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      id="aboutPageToggle" 
                      className="w-5 h-5 accent-green-600 rounded cursor-pointer" 
                      checked={formData.isActive} 
                      onChange={e => setFormData({...formData, isActive: e.target.checked})} 
                    />
                    <label htmlFor="aboutPageToggle" className="text-sm font-bold text-slate-700 cursor-pointer">
                      Kích hoạt trang Giới thiệu
                    </label>
                  </div>
                  <Eye className={`h-5 w-5 ${formData.isActive ? 'text-green-500' : 'text-slate-300'}`} />
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-start space-x-3">
                  <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                  <p className="text-[11px] text-blue-700 leading-relaxed">
                    Trang Giới thiệu sẽ được nhúng vào thân bài. Bạn có thể thay đổi link này để cập nhật nội dung mà không cần sửa code.
                  </p>
                </div>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-slate-100">
            <button type="submit" className="bg-green-600 text-white px-12 py-4 rounded-2xl font-bold flex items-center space-x-3 shadow-xl shadow-green-100 hover:bg-green-700 active:scale-95 transition-all">
              <Save className="h-5 w-5" />
              <span>Lưu cấu hình Giới thiệu</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAboutPageConfig;
