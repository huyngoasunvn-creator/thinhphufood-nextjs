
import React, { useState } from 'react';
import { Plus, GripVertical, Edit2, Trash2, Save, X, Check } from 'lucide-react';

interface AdminCategoriesProps {
  categories: string[];
  onUpdate: (categories: string[]) => void;
}

const AdminCategories: React.FC<AdminCategoriesProps> = ({ categories, onUpdate }) => {
  const [newCat, setNewCat] = useState('');
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAdd = () => {
    const trimmed = newCat.trim();
    if (!trimmed) return;
    if (categories.includes(trimmed)) {
      alert('Danh mục này đã tồn tại!');
      return;
    }
    onUpdate([...categories, trimmed]);
    setNewCat('');
  };

  const handleStartEdit = (idx: number, val: string) => {
    setEditingIdx(idx);
    setEditValue(val);
  };

  const handleSaveEdit = () => {
    const trimmed = editValue.trim();
    if (!trimmed || editingIdx === null) return;
    
    const newCategories = [...categories];
    newCategories[editingIdx] = trimmed;
    onUpdate(newCategories);
    setEditingIdx(null);
  };

  const handleDelete = (val: string) => {
    if (val === 'Tất cả') {
      alert('Không thể xóa danh mục mặc định!');
      return;
    }
    if (window.confirm(`Bạn có chắc muốn xóa danh mục "${val}"? Các sản phẩm thuộc danh mục này sẽ không bị xóa nhưng có thể bị sai lệch phân loại.`)) {
      onUpdate(categories.filter(c => c !== val));
    }
  };

  return (
    <div className="max-w-2xl space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
          <div className="p-2 bg-green-50 text-green-600 rounded-lg mr-3">
            <Plus className="h-5 w-5" />
          </div>
          Thêm danh mục mới
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Tên danh mục (vd: Gạo Nhật, Đặc sản vùng cao...)" 
            className="flex-1 px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-slate-900 placeholder:text-slate-400"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button 
            onClick={handleAdd}
            className="bg-green-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all active:scale-95 whitespace-nowrap"
          >
            Thêm danh mục
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Danh sách danh mục ({categories.length})</p>
          <span className="text-[10px] text-slate-400 italic">Kéo thả để sắp xếp (Sắp ra mắt)</span>
        </div>
        <div className="divide-y divide-slate-100">
          {categories.map((cat, idx) => (
            <div key={idx} className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group">
              <div className="flex items-center space-x-4 flex-1">
                <GripVertical className="h-4 w-4 text-slate-300 cursor-grab" />
                
                {editingIdx === idx ? (
                  <div className="flex items-center flex-1 space-x-2 animate-in slide-in-from-left duration-200">
                    <input 
                      autoFocus
                      type="text"
                      className="flex-1 px-3 py-1.5 bg-white border border-green-500 rounded-lg outline-none text-sm font-bold text-slate-900"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                    />
                    <button onClick={handleSaveEdit} className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all">
                      <Check className="h-4 w-4" />
                    </button>
                    <button onClick={() => setEditingIdx(null)} className="p-1.5 bg-slate-100 text-slate-500 rounded-lg hover:bg-slate-200 transition-all">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <span className={`font-bold text-sm ${cat === 'Tất cả' ? 'text-slate-400' : 'text-slate-700'}`}>
                    {cat}
                    {cat === 'Tất cả' && <span className="ml-2 text-[9px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">Mặc định</span>}
                  </span>
                )}
              </div>
              
              {cat !== 'Tất cả' && editingIdx !== idx && (
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleStartEdit(idx, cat)}
                    className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all"
                    title="Chỉnh sửa"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(cat)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    title="Xóa"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 flex items-start space-x-4">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
          <Save className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-blue-900 mb-1">Mẹo nhỏ</h4>
          <p className="text-xs text-blue-700 leading-relaxed">
            Danh mục giúp khách hàng lọc sản phẩm dễ dàng hơn. Sau khi thêm danh mục ở đây, bạn có thể quay lại trang <b>Sản phẩm</b> để cập nhật danh mục cho các mặt hàng hiện có.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
