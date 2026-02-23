
import React, { useState } from 'react';
import { X, Save, Image as ImageIcon, Layout, Link as LinkIcon, Type, Eye } from 'lucide-react';
import { Banner } from '../../types';

interface BannerFormProps {
  initialData?: Banner | null;
  onSave: (banner: Banner) => void;
  onClose: () => void;
}

const BannerForm: React.FC<BannerFormProps> = ({ initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<Banner>>(initialData || {
    title: '',
    subtitle: '',
    imageUrl: '',
    link: '',
    buttonText: 'Xem thêm',
    isActive: true,
    placement: 'Trang chủ',
    textColor: '#ffffff',
    overlayOpacity: 0.4
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: initialData?.id || Date.now().toString(),
    } as Banner);
  };

  const inputClass = "w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-slate-900";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-4xl h-[85vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-white z-10">
          <h3 className="text-xl font-extrabold text-slate-900 flex items-center">
            <Layout className="h-6 w-6 mr-3 text-green-600" />
            {initialData ? 'Chỉnh sửa Banner' : 'Thêm Banner mới'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 bg-white grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Tiêu đề chính</label>
              <input required type="text" className={inputClass} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Mô tả phụ</label>
              <textarea rows={3} className={`${inputClass} resize-none`} value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Chữ nút bấm</label>
                <input type="text" className={inputClass} value={formData.buttonText} onChange={e => setFormData({...formData, buttonText: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Đường dẫn link</label>
                <input type="text" className={inputClass} placeholder="/products" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Vị trí hiển thị</label>
              <select className={inputClass} value={formData.placement} onChange={e => setFormData({...formData, placement: e.target.value as any})}>
                <option value="Trang chủ">Trang chủ (Hero)</option>
                <option value="Tin tức">Trang Tin tức (Header)</option>
                <option value="Cửa hàng">Trang Cửa hàng (Header)</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-4">Hình ảnh Banner</label>
              <div className="aspect-[21/9] bg-white rounded-xl border-2 border-dashed border-slate-200 overflow-hidden relative flex items-center justify-center">
                {formData.imageUrl ? <img src={formData.imageUrl} className="w-full h-full object-cover" alt="" /> : <ImageIcon className="h-10 w-10 text-slate-300" />}
              </div>
              <input required type="text" placeholder="URL hình ảnh (1920x800px)" className="w-full mt-4 px-4 py-2 text-xs border border-slate-200 rounded-xl" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Màu chữ</label>
                <div className="flex items-center space-x-2">
                  <input type="color" className="h-10 w-10 rounded cursor-pointer" value={formData.textColor} onChange={e => setFormData({...formData, textColor: e.target.value})} />
                  <input type="text" className="flex-1 px-3 py-2 border rounded-xl text-xs font-mono" value={formData.textColor} onChange={e => setFormData({...formData, textColor: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Độ mờ phủ nền ({Math.round((formData.overlayOpacity || 0) * 100)}%)</label>
                <input type="range" min="0" max="1" step="0.1" className="w-full h-10 accent-green-600" value={formData.overlayOpacity} onChange={e => setFormData({...formData, overlayOpacity: parseFloat(e.target.value)})} />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl border border-green-100">
              <div className="flex items-center space-x-3">
                <input type="checkbox" id="activeToggle" className="w-5 h-5 accent-green-600 rounded" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} />
                <label htmlFor="activeToggle" className="text-sm font-bold text-green-800">Hiển thị banner ngay</label>
              </div>
              <Eye className={`h-5 w-5 ${formData.isActive ? 'text-green-600' : 'text-slate-300'}`} />
            </div>
          </div>
        </form>

        <div className="px-8 py-6 border-t border-slate-100 flex justify-end space-x-4 bg-white">
          <button onClick={onClose} className="px-8 py-3 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all">Hủy</button>
          <button onClick={handleSubmit} className="bg-green-600 text-white px-12 py-3 rounded-2xl font-bold flex items-center space-x-2 shadow-xl hover:bg-green-700 active:scale-95 transition-all">
            <Save className="h-5 w-5" />
            <span>Lưu Banner</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerForm;
