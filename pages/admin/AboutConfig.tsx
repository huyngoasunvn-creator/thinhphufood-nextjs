
import React, { useState } from 'react';
import { Save, Info, Image as ImageIcon, Layout, Type, Link as LinkIcon, BarChart3 } from 'lucide-react';
import { AboutConfig } from '../../types';

interface AdminAboutConfigProps {
  config: AboutConfig;
  onUpdate: (config: AboutConfig) => void;
}

const AdminAboutConfig: React.FC<AdminAboutConfigProps> = ({ config, onUpdate }) => {
  const [formData, setFormData] = useState<AboutConfig>(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    alert('Cập nhật nội dung giới thiệu thành công!');
  };

  const inputClass = "w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-slate-900";

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><Info className="h-6 w-6" /></div>
          <div>
            <h3 className="font-bold text-slate-900">Nội dung Giới thiệu</h3>
            <p className="text-sm text-slate-500">Tùy chỉnh thông điệp "Cánh đồng xanh" trên trang chủ</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center">
                  <Type className="h-3 w-3 mr-2" />
                  Tiêu đề (Hỗ trợ xuống dòng)
                </label>
                <textarea 
                  required 
                  rows={3}
                  className={`${inputClass} resize-none`} 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Mô tả chi tiết</label>
                <textarea 
                  required 
                  rows={5}
                  className={`${inputClass} resize-none text-sm leading-relaxed`} 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Chữ nút bấm</label>
                  <input type="text" className={inputClass} value={formData.buttonText} onChange={e => setFormData({...formData, buttonText: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Liên kết nút</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <input type="text" className={`${inputClass} pl-10`} value={formData.buttonLink} onChange={e => setFormData({...formData, buttonLink: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-4 flex items-center">
                  <ImageIcon className="h-3 w-3 mr-2" />
                  Hình ảnh minh họa
                </label>
                <div className="aspect-video bg-white rounded-xl border-2 border-dashed border-slate-200 overflow-hidden relative flex items-center justify-center mb-4">
                  {formData.imageUrl ? <img src={formData.imageUrl} className="w-full h-full object-cover" alt="" /> : <ImageIcon className="h-10 w-10 text-slate-300" />}
                </div>
                <input required type="text" placeholder="URL hình ảnh" className="w-full px-4 py-2 text-xs border border-slate-200 rounded-xl outline-none" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
              </div>

              <div className="bg-green-50 p-6 rounded-3xl border border-green-100 space-y-4">
                <label className="text-xs font-bold text-green-700 uppercase tracking-wider block mb-2 flex items-center">
                  <BarChart3 className="h-3 w-3 mr-2" />
                  Số liệu thống kê (Stats)
                </label>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <input type="text" placeholder="Gía trị 1 (20k+)" className="w-full px-3 py-2 text-xs rounded-lg border border-green-200 font-bold" value={formData.stats.value1} onChange={e => setFormData({...formData, stats: {...formData.stats, value1: e.target.value}})} />
                    <input type="text" placeholder="Nhãn 1" className="w-full px-3 py-2 text-[10px] rounded-lg border border-green-100" value={formData.stats.label1} onChange={e => setFormData({...formData, stats: {...formData.stats, label1: e.target.value}})} />
                  </div>
                  <div className="space-y-2">
                    <input type="text" placeholder="Gía trị 2 (100%)" className="w-full px-3 py-2 text-xs rounded-lg border border-green-200 font-bold" value={formData.stats.value2} onChange={e => setFormData({...formData, stats: {...formData.stats, value2: e.target.value}})} />
                    <input type="text" placeholder="Nhãn 2" className="w-full px-3 py-2 text-[10px] rounded-lg border border-green-100" value={formData.stats.label2} onChange={e => setFormData({...formData, stats: {...formData.stats, label2: e.target.value}})} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-slate-100">
            <button type="submit" className="bg-green-600 text-white px-12 py-4 rounded-2xl font-bold flex items-center space-x-3 shadow-xl shadow-green-100 hover:bg-green-700 active:scale-95 transition-all">
              <Save className="h-5 w-5" />
              <span>Lưu cấu hình giới thiệu</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAboutConfig;
