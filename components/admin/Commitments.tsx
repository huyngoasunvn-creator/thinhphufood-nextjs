
import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Save, X, Leaf, ShieldCheck, Truck, RotateCcw, Award, Star, Heart, CheckCircle } from 'lucide-react';
import { Commitment } from '../../types';

const ICON_MAP: Record<string, any> = {
  Leaf, ShieldCheck, Truck, RotateCcw, Award, Star, Heart, CheckCircle
};

interface AdminCommitmentsProps {
  commitments: Commitment[];
  onUpdate: (commitments: Commitment[]) => void;
}

const AdminCommitments: React.FC<AdminCommitmentsProps> = ({ commitments, onUpdate }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Commitment>({ id: '', iconName: 'Leaf', title: '', description: '', colorScheme: 'green' });

  const handleEdit = (c: Commitment) => {
    setFormData(c);
    setEditingId(c.id);
  };

  const handleSave = () => {
    if (!formData.title || !formData.description) return;

    let updated;
    if (editingId) {
      updated = commitments.map(c => c.id === editingId ? formData : c);
    } else {
      updated = [...commitments, { ...formData, id: Date.now().toString() }];
    }
    onUpdate(updated);
    resetForm();
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ id: '', iconName: 'Leaf', title: '', description: '', colorScheme: 'green' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Xóa cam kết này?')) {
      onUpdate(commitments.filter(c => c.id !== id));
    }
  };

  const getColorClasses = (scheme: string) => {
    switch (scheme) {
      case 'green': return 'bg-green-50 text-green-600';
      case 'blue': return 'bg-blue-50 text-blue-600';
      case 'orange': return 'bg-orange-50 text-orange-600';
      case 'purple': return 'bg-purple-50 text-purple-600';
      case 'red': return 'bg-red-50 text-red-600';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  const inputBaseClass = "w-full px-4 py-3 bg-slate-100/80 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 focus:bg-white text-slate-900 font-bold transition-all placeholder:text-slate-400";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center">
          <Heart className="h-5 w-5 mr-3 text-red-500" />
          {editingId ? 'Chỉnh sửa cam kết' : 'Thêm cam kết mới'}
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tiêu đề</label>
            <input 
              type="text" 
              placeholder="Ví dụ: Chuẩn VietGAP"
              className={inputBaseClass}
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Mô tả ngắn</label>
            <input 
              type="text" 
              placeholder="Ví dụ: Sản phẩm sạch 100%"
              className={inputBaseClass}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Biểu tượng (Icon)</label>
            <select 
              className={`${inputBaseClass} cursor-pointer appearance-none`}
              value={formData.iconName}
              onChange={e => setFormData({...formData, iconName: e.target.value})}
            >
              {Object.keys(ICON_MAP).map(icon => <option key={icon} value={icon}>{icon}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tông màu chủ đạo</label>
            <select 
              className={`${inputBaseClass} cursor-pointer appearance-none`}
              value={formData.colorScheme}
              onChange={e => setFormData({...formData, colorScheme: e.target.value as any})}
            >
              <option value="green">Xanh lá (Tươi mát)</option>
              <option value="blue">Xanh dương (Tin cậy)</option>
              <option value="orange">Cam (Vận chuyển)</option>
              <option value="purple">Tím (Đặc biệt)</option>
              <option value="red">Đỏ (Nổi bật)</option>
            </select>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-50 flex justify-end space-x-3">
          {editingId && (
            <button 
              onClick={resetForm} 
              className="px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
            >
              Hủy bỏ
            </button>
          )}
          <button 
            onClick={handleSave}
            className="bg-green-600 text-white px-10 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center space-x-2 hover:bg-green-700 transition-all shadow-xl shadow-green-100 active:scale-95"
          >
            <Save className="h-4 w-4" />
            <span>{editingId ? 'Cập nhật thay đổi' : 'Lưu cam kết mới'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {commitments.map(c => {
          const IconComp = ICON_MAP[c.iconName] || Heart;
          return (
            <div key={c.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm relative group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-2xl ${getColorClasses(c.colorScheme)} transition-transform group-hover:scale-110 duration-500`}>
                  <IconComp className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-black text-slate-900 text-sm truncate">{c.title}</h4>
                  <p className="text-xs text-slate-500 font-medium line-clamp-1">{c.description}</p>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <button 
                  onClick={() => handleEdit(c)} 
                  className="p-2 text-slate-400 hover:text-blue-600 bg-white shadow-lg border border-slate-100 rounded-xl hover:scale-110 transition-all"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button 
                  onClick={() => handleDelete(c.id)} 
                  className="p-2 text-slate-400 hover:text-red-600 bg-white shadow-lg border border-slate-100 rounded-xl hover:scale-110 transition-all"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
        {commitments.length === 0 && (
          <div className="col-span-full py-24 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200">
            <div className="p-4 bg-slate-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-slate-200" />
            </div>
            <p className="text-slate-400 font-black text-sm uppercase tracking-widest">Chưa có nội dung cam kết</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCommitments;
