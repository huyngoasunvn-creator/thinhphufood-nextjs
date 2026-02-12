
import React, { useState, useEffect } from 'react';

import { Save, Phone, Mail, MapPin, Clock, Type, Link as LinkIcon, Info, Eye, EyeOff } from 'lucide-react';
import { ContactConfig } from '../../types';

interface AdminContactConfigProps {
  config?: ContactConfig | null;
  onUpdate: (config: ContactConfig) => void;
}


const AdminContactConfig: React.FC<AdminContactConfigProps> = ({ config, onUpdate }) => {
  const [formData, setFormData] = useState<ContactConfig | null>(config ?? null);

useEffect(() => {
  if (config) {
    setFormData(config);
  }
}, [config]);

if (!formData) return null;


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    alert('Cập nhật thông tin liên hệ thành công!');
  };

  const inputClass = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-400 shadow-inner";

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-50">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl shadow-sm">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Cấu hình Liên Hệ</h3>
              <p className="text-sm text-slate-500 font-medium">Quản lý nội dung trang Liên hệ và Bản đồ dẫn đường</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
            <span className={`text-[10px] font-black uppercase tracking-wider ${formData.showMap ? 'text-green-600' : 'text-slate-400'}`}>
              Bản đồ: {formData.showMap ? 'Hiện' : 'Ẩn'}
            </span>
            <button 
              type="button"
              onClick={() => setFormData({...formData, showMap: !formData.showMap})}
              className={`w-12 h-6 rounded-full transition-all relative ${formData.showMap ? 'bg-green-600' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${formData.showMap ? 'right-1' : 'left-1'}`}></div>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2 flex items-center">
                  <Type className="h-3 w-3 mr-2 text-green-600" />
                  Tiêu đề trang
                </label>
                <input required type="text" className={inputClass} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Mô tả ngắn</label>
                <textarea rows={3} className={`${inputClass} resize-none leading-relaxed`} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2 flex items-center">
                  <MapPin className="h-3 w-3 mr-2 text-green-600" />
                  Địa chỉ chi tiết
                </label>
                <input required type="text" className={inputClass} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2 flex items-center">
                    <Phone className="h-3 w-3 mr-2 text-blue-600" />
                    Hotline
                  </label>
                  <input required type="text" className={inputClass} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2 flex items-center">
                    <Mail className="h-3 w-3 mr-2 text-purple-600" />
                    Email
                  </label>
                  <input required type="email" className={inputClass} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2 flex items-center">
                  <Clock className="h-3 w-3 mr-2 text-orange-600" />
                  Thời gian làm việc
                </label>
                <input required type="text" className={inputClass} value={formData.workingHours} onChange={e => setFormData({...formData, workingHours: e.target.value})} />
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <LinkIcon className="h-3 w-3 mr-2 text-green-600" />
                    Google Maps Embed URL
                  </div>
                  {formData.showMap ? <Eye className="h-3 w-3 text-green-600" /> : <EyeOff className="h-3 w-3 text-slate-400" />}
                </label>
                <input required type="text" placeholder="https://www.google.com/maps/embed?pb=..." className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none text-xs font-mono" value={formData.mapEmbedUrl} onChange={e => setFormData({...formData, mapEmbedUrl: e.target.value})} />
                <div className="mt-4 p-3 bg-blue-50 rounded-xl flex items-start space-x-2 border border-blue-100">
                  <Info className="h-3 w-3 text-blue-500 mt-0.5" />
                  <p className="text-[10px] text-blue-700 leading-relaxed font-bold">
                    {"Vào Google Maps -> Chia sẻ -> Nhúng bản đồ -> Copy nội dung trong thuộc tính src của thẻ iframe."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-8 border-t border-slate-100">
            <button type="submit" className="bg-green-600 text-white px-12 py-5 rounded-2xl font-black flex items-center space-x-3 shadow-xl shadow-green-100 hover:bg-green-700 active:scale-95 transition-all">
              <Save className="h-5 w-5" />
              <span>LƯU CẤU HÌNH LIÊN HỆ</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminContactConfig;
