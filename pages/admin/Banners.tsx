
import React, { useState } from 'react';
import { Plus, Image as ImageIcon, Trash2, Edit2, Eye, EyeOff, Layout, Link as LinkIcon, Palette } from 'lucide-react';
import { Banner } from '../../types';
import BannerForm from './BannerForm';

interface AdminBannersProps {
  banners: Banner[];
  onUpdate: (banners: Banner[]) => void;
}

const AdminBanners: React.FC<AdminBannersProps> = ({ banners, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const handleToggleActive = (id: string) => {
    onUpdate(banners.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Xóa banner này?')) {
      onUpdate(banners.filter(b => b.id !== id));
    }
  };

  const handleSave = (banner: Banner) => {
    if (editingBanner) {
      onUpdate(banners.map(b => b.id === banner.id ? banner : b));
    } else {
      onUpdate([...banners, banner]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Quản lý Banner</h2>
          <p className="text-sm text-slate-500">Tối ưu hóa hình ảnh và thông điệp cho từng vị trí trang web</p>
        </div>
        <button 
          onClick={() => { setEditingBanner(null); setIsModalOpen(true); }}
          className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 hover:bg-green-700 shadow-xl shadow-green-100 transition-all active:scale-95"
        >
          <Plus className="h-5 w-5" />
          <span>Thêm Banner</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {banners.map(banner => (
          <div key={banner.id} className={`bg-white rounded-[2rem] border overflow-hidden shadow-sm hover:shadow-xl transition-all group ${banner.isActive ? 'border-slate-200' : 'border-slate-200 opacity-75'}`}>
            <div className="aspect-[21/9] relative overflow-hidden bg-slate-100">
              <img src={banner.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  banner.placement === 'Trang chủ' ? 'bg-blue-600 text-white' : 
                  banner.placement === 'Tin tức' ? 'bg-purple-600 text-white' : 
                  'bg-orange-600 text-white'
                }`}>
                  {banner.placement}
                </span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => { setEditingBanner(banner); setIsModalOpen(true); }}
                  className="bg-white text-slate-900 p-2.5 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-lg"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleToggleActive(banner.id)}
                  className={`p-2.5 rounded-xl transition-all shadow-lg ${banner.isActive ? 'bg-white text-yellow-600 hover:bg-yellow-600 hover:text-white' : 'bg-green-600 text-white'}`}
                >
                  {banner.isActive ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                <button 
                  onClick={() => handleDelete(banner.id)}
                  className="bg-white text-red-600 p-2.5 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-lg"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 line-clamp-1">{banner.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{banner.subtitle || 'Không có mô tả'}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center space-x-3 text-slate-400">
                  <div className="flex items-center space-x-1" title="Màu chữ">
                    <Palette className="h-3 w-3" />
                    <div className="w-3 h-3 rounded-full border border-slate-200" style={{ backgroundColor: banner.textColor }}></div>
                  </div>
                  <div className="flex items-center space-x-1" title="Liên kết">
                    <LinkIcon className="h-3 w-3" />
                    <span className="text-[10px] font-medium max-w-[80px] truncate">{banner.link || 'N/A'}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <span className={`w-2 h-2 rounded-full ${banner.isActive ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></span>
                  <span className={`text-[10px] font-bold uppercase tracking-tighter ${banner.isActive ? 'text-green-600' : 'text-slate-400'}`}>
                    {banner.isActive ? 'Hiển thị' : 'Đang ẩn'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <BannerForm 
          initialData={editingBanner}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminBanners;
