
import React, { useState } from 'react';
import { MonitorPlay, Save, Image as ImageIcon, Type, Link as LinkIcon, Clock, MessageSquare, Eye, EyeOff } from 'lucide-react';
import { PopupConfig } from '../../types';

interface AdminPopupsProps {
  config: PopupConfig;
  onUpdate: (config: PopupConfig) => void;
}

const AdminPopups: React.FC<AdminPopupsProps> = ({ config, onUpdate }) => {
  const [formData, setFormData] = useState<PopupConfig>(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    alert('Cập nhật cấu hình Popup thành công!');
  };

  const inputClass = "w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-slate-900";

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
              <MonitorPlay className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Popup Khuyến Mãi</h3>
              <p className="text-sm text-slate-500">Popup hiển thị khi khách hàng vừa truy cập website</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className={`text-xs font-bold uppercase ${formData.isActive ? 'text-green-600' : 'text-slate-400'}`}>
              {formData.isActive ? 'Đang bật' : 'Đang tắt'}
            </span>
            <button 
              onClick={() => setFormData({...formData, isActive: !formData.isActive})}
              className={`w-14 h-7 rounded-full transition-all relative ${formData.isActive ? 'bg-green-600' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${formData.isActive ? 'right-1' : 'left-1'}`}></div>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center">
                  <Type className="h-3 w-3 mr-2" />
                  Tiêu đề Popup
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
                  <MessageSquare className="h-3 w-3 mr-2" />
                  Nội dung thông điệp
                </label>
                <textarea 
                  required 
                  rows={4} 
                  className={`${inputClass} resize-none`} 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center">
                    <LinkIcon className="h-3 w-3 mr-2" />
                    Chữ nút bấm
                  </label>
                  <input type="text" className={inputClass} value={formData.buttonText} onChange={e => setFormData({...formData, buttonText: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center">
                    <Clock className="h-3 w-3 mr-2" />
                    Độ trễ (giây)
                  </label>
                  <input type="number" min="0" className={inputClass} value={formData.delay} onChange={e => setFormData({...formData, delay: parseInt(e.target.value)})} />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center">
                  <LinkIcon className="h-3 w-3 mr-2" />
                  Đường dẫn đích khi click nút
                </label>
                <input type="text" placeholder="/products" className={inputClass} value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
              </div>
            </div>

            <div className="space-y-6">
               <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center">
                  <ImageIcon className="h-3 w-3 mr-2" />
                  Hình ảnh Popup
               </label>
               <div className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] overflow-hidden relative group transition-all hover:border-green-500">
                  {formData.imageUrl ? (
                    <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                       <ImageIcon className="h-12 w-12 mb-2" />
                       <span className="text-[10px] font-bold">CHƯA CÓ ẢNH</span>
                    </div>
                  )}
               </div>
               <input 
                  type="text" 
                  placeholder="URL hình ảnh (Tỉ lệ 1:1 hoặc 16:9)" 
                  className="w-full px-4 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-green-500" 
                  value={formData.imageUrl} 
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                />
                
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                   <p className="text-[11px] text-blue-700 leading-relaxed italic">
                     * Popup sẽ chỉ xuất hiện 1 lần duy nhất mỗi khi khách hàng mở trình duyệt (session). Bạn có thể thử nghiệm bằng cách mở tab ẩn danh hoặc tải lại trang sau khi xóa cache session.
                   </p>
                </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
            <button type="submit" className="bg-green-600 text-white px-12 py-4 rounded-2xl font-bold flex items-center space-x-3 shadow-xl shadow-green-100 hover:bg-green-700 active:scale-95 transition-all">
              <Save className="h-5 w-5" />
              <span>Lưu cấu hình Popup</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPopups;
