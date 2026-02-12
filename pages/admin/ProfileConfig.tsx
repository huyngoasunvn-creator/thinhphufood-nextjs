
import React, { useState } from 'react';
import { Save, UserCircle, Link as LinkIcon, Eye, Info, Type, Settings } from 'lucide-react';
import { ProfileConfig } from '../../types';

interface AdminProfileConfigProps {
  config: ProfileConfig;
  onUpdate: (config: ProfileConfig) => void;
}

const AdminProfileConfig: React.FC<AdminProfileConfigProps> = ({ config, onUpdate }) => {
  const [formData, setFormData] = useState<ProfileConfig>(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    alert('Cập nhật cấu hình trang Profile thành công!');
  };

  const inputClass = "w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-slate-900";

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
            <UserCircle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Cấu hình Trang Cá Nhân (Profile)</h3>
            <p className="text-sm text-slate-500">Quản lý việc nhúng trang quản lý thành viên từ link bên ngoài</p>
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
                  placeholder="https://marketing.thinhphufood.vn"
                  value={formData.externalUrl} 
                  onChange={e => setFormData({...formData, externalUrl: e.target.value})} 
                />
                <p className="text-[10px] text-slate-400 mt-2 px-2 italic">
                  * Hệ thống sẽ tự động nhúng trang này vào thân bài của website bằng công nghệ Iframe.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block flex items-center">
                  <Settings className="h-3 w-3 mr-2" />
                  Trạng thái tiện ích
                </label>
                
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      id="profileToggle" 
                      className="w-5 h-5 accent-green-600 rounded cursor-pointer" 
                      checked={formData.isActive} 
                      onChange={e => setFormData({...formData, isActive: e.target.checked})} 
                    />
                    <label htmlFor="profileToggle" className="text-sm font-bold text-slate-700 cursor-pointer">
                      Kích hoạt trang Profile
                    </label>
                  </div>
                  <Eye className={`h-5 w-5 ${formData.isActive ? 'text-green-500' : 'text-slate-300'}`} />
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start space-x-3">
                  <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                  <p className="text-[11px] text-blue-700 leading-relaxed">
                    Khi tắt, khách hàng truy cập vào trang Cá nhân sẽ thấy thông báo bảo trì. Các link trong menu vẫn sẽ tồn tại.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-4">Xem trước (Preview)</label>
                <div className="aspect-video bg-white rounded-xl border border-slate-100 flex flex-col items-center justify-center p-4">
                  <div className="w-full h-2 bg-slate-100 rounded-full mb-3"></div>
                  <div className="w-3/4 h-2 bg-slate-50 rounded-full mb-3"></div>
                  <div className="text-[9px] text-slate-300 font-mono text-center truncate w-full">
                    {formData.externalUrl || 'URL preview...'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-slate-100">
            <button type="submit" className="bg-green-600 text-white px-12 py-4 rounded-2xl font-bold flex items-center space-x-3 shadow-xl shadow-green-100 hover:bg-green-700 active:scale-95 transition-all">
              <Save className="h-5 w-5" />
              <span>Lưu cấu hình Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfileConfig;
