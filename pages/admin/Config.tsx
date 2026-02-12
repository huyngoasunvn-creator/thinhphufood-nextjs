
import React, { useState } from 'react';
import { Save, ShieldCheck, Mail, Phone, MapPin, Globe, Type, Eye, EyeOff, Package } from 'lucide-react';
import { SiteConfig } from '../../types';

interface AdminConfigProps {
  config: SiteConfig;
  onUpdate: (config: SiteConfig) => void;
}

const AdminConfig: React.FC<AdminConfigProps> = ({ config, onUpdate }) => {
  const [formData, setFormData] = useState<SiteConfig>(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    alert('Cấu hình hệ thống đã được cập nhật thành công!');
  };

  const inputClass = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-bold text-slate-900 shadow-inner";

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="grid md:grid-cols-2 gap-8">
        {/* General Info */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-4 flex items-center">
            <Type className="h-4 w-4 mr-2 text-green-600" />
            Thông tin thương hiệu
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Tên Website / Thương hiệu</label>
              <input 
                type="text" 
                className={inputClass}
                value={formData.siteName}
                onChange={e => setFormData({...formData, siteName: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Hotline</label>
                <input 
                  type="text" 
                  className={inputClass}
                  value={formData.hotline}
                  onChange={e => setFormData({...formData, hotline: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Email</label>
                <input 
                  type="email" 
                  className={inputClass}
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-4 flex items-center">
            <Package className="h-4 w-4 mr-2 text-orange-600" />
            Cấu hình hiển thị sản phẩm
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <p className="text-sm font-bold text-slate-800">Hiển thị số lượng tồn kho</p>
                <p className="text-[10px] text-slate-500">Cho phép khách thấy còn bao nhiêu kg trong kho</p>
              </div>
              <button 
                type="button"
                onClick={() => setFormData({...formData, showStock: !formData.showStock})}
                className={`w-12 h-6 rounded-full relative transition-all ${formData.showStock ? 'bg-green-600' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.showStock ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <p className="text-sm font-bold text-slate-800">Hiển thị Trust Badges</p>
                <p className="text-[10px] text-slate-500">Phần Chứng nhận & Vận chuyển bên dưới giá</p>
              </div>
              <button 
                type="button"
                onClick={() => setFormData({...formData, showTrustBadges: !formData.showTrustBadges})}
                className={`w-12 h-6 rounded-full relative transition-all ${formData.showTrustBadges ? 'bg-green-600' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.showTrustBadges ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges Editor */}
      {formData.showTrustBadges && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8 animate-in slide-in-from-top-4 duration-300">
          <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-4 flex items-center">
            <ShieldCheck className="h-4 w-4 mr-2 text-blue-600" />
            Nội dung Trust Badges
          </h3>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                <div className="w-1.5 h-4 bg-blue-500 rounded-full mr-2"></div> Badge 1 (Chứng nhận)
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Nhãn (Label)</label>
                  <input type="text" className={inputClass} value={formData.certLabel} onChange={e => setFormData({...formData, certLabel: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Giá trị (Value)</label>
                  <input type="text" className={inputClass} value={formData.certValue} onChange={e => setFormData({...formData, certValue: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                <div className="w-1.5 h-4 bg-orange-500 rounded-full mr-2"></div> Badge 2 (Vận chuyển)
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Nhãn (Label)</label>
                  <input type="text" className={inputClass} value={formData.shippingLabel} onChange={e => setFormData({...formData, shippingLabel: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Giá trị (Value)</label>
                  <input type="text" className={inputClass} value={formData.shippingValue} onChange={e => setFormData({...formData, shippingValue: e.target.value})} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Address & Social */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-4 flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-red-600" />
          Địa chỉ & Mạng xã hội
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Địa chỉ trụ sở</label>
            <textarea className={`${inputClass} h-20 pt-3 resize-none`} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Facebook URL</label>
            <input type="url" className={inputClass} value={formData.facebookUrl} onChange={e => setFormData({...formData, facebookUrl: e.target.value})} />
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button 
          type="submit"
          className="bg-green-600 text-white px-16 py-4 rounded-[2rem] font-black flex items-center space-x-3 hover:bg-green-700 transition-all shadow-xl shadow-green-100 active:scale-95"
        >
          <Save className="h-6 w-6" />
          <span>LƯU CẤU HÌNH HỆ THỐNG</span>
        </button>
      </div>
    </form>
  );
};

export default AdminConfig;
