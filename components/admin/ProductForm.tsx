
import React, { useState } from 'react';
import { X, Save, Info } from 'lucide-react';
import { Product } from '../../types';
import RichTextEditor from '../../components/admin/RichTextEditor';
import ProductMultiMedia from '../../components/admin/products/ProductMultiMedia';

interface ProductFormProps {
  initialData?: Product | null;
  categories: string[];
  onSave: (product: Product) => void;
  onClose: () => void;
}

const generateSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/([^0-9a-z-\s])/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const ProductForm: React.FC<ProductFormProps> = ({ initialData, categories, onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<Product>>(initialData || {
    name: '',
    slug: '',
    category: categories[1] || 'Gạo trắng',
    price: 0,
    unit: 'kg',
    image: '',
    images: [],
    videoUrl: '',
    shortDescription: '',
    description: '',
    stock: 100,
    rating: 5,
    isBestseller: false
  });

  const handleNameChange = (name: string) => {
    const updates: Partial<Product> = { name };
    if (!initialData || !formData.slug) {
      updates.slug = generateSlug(name);
    }
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      id: initialData?.id || Date.now().toString(),
      slug: formData.slug || generateSlug(formData.name || ''),
      images: formData.images || []
    } as Product;
    onSave(productData);
  };

  const inputClass = "w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-slate-900 placeholder:text-slate-400";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-5xl h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 flex-shrink-0 bg-white z-10">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              {initialData ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
            </h3>
            <p className="text-xs text-slate-400 font-medium">Cập nhật thông tin chi tiết và hình ảnh sản phẩm</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 custom-scroll bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 px-1">Tên sản phẩm</label>
                  <input required type="text" className={inputClass} value={formData.name} onChange={(e) => handleNameChange(e.target.value)} />
                </div>

                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 px-1">Đường dẫn SEO (Slug)</label>
                  <input required type="text" className={`${inputClass} font-mono text-xs`} value={formData.slug} onChange={(e) => setFormData({...formData, slug: generateSlug(e.target.value)})} />
                  <p className="text-[10px] text-slate-400 mt-1 px-1 italic">Ví dụ: gao-st25-ngon-nhat-the-gioi</p>
                </div>
                
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 px-1">Danh mục</label>
                  <select className={`${inputClass} appearance-none cursor-pointer`} value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value as any})}>
                    {categories.filter(c => c !== 'Tất cả').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 px-1">Giá bán / Đơn vị</label>
                  <div className="flex space-x-2">
                    <input type="number" className={`${inputClass} flex-1 font-bold text-green-700`} value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} />
                    <input type="text" className="w-20 px-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none text-center font-bold" value={formData.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})} />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 px-1 flex items-center">
                  <Info className="h-3 w-3 mr-2 text-green-600" />
                  Mô tả ngắn (Hiển thị cạnh ảnh sản phẩm)
                </label>
                <textarea 
                  rows={3} 
                  placeholder="Nhập tóm tắt ngắn về đặc tính nổi bật..."
                  className={`${inputClass} resize-none`} 
                  value={formData.shortDescription} 
                  onChange={(e) => setFormData({...formData, shortDescription: e.target.value})} 
                />
              </div>

              <RichTextEditor label="Mô tả chi tiết" value={formData.description || ''} onChange={(val) => setFormData({...formData, description: val})} />
            </div>

            <div className="lg:col-span-5 space-y-8">
              <ProductMultiMedia 
                mainImage={formData.image || ''} 
                otherImages={formData.images || []}
                onMainImageChange={(url) => setFormData({...formData, image: url})}
                onOtherImagesChange={(urls) => setFormData({...formData, images: urls})}
              />

              <div className="bg-green-50 p-6 rounded-3xl border border-green-100">
                 <div className="flex items-center space-x-3 mb-4">
                   <input 
                    type="checkbox" 
                    id="isBestseller" 
                    className="w-5 h-5 accent-green-600 rounded cursor-pointer" 
                    checked={formData.isBestseller} 
                    onChange={(e) => setFormData({...formData, isBestseller: e.target.checked})} 
                   />
                   <label htmlFor="isBestseller" className="text-sm font-bold text-green-800 cursor-pointer">Sản phẩm bán chạy</label>
                 </div>
                 <label className="text-xs font-bold text-green-600 block mb-2 uppercase tracking-tight">Số lượng trong kho</label>
                 <input 
                  type="number" 
                  className="w-full px-4 py-2 bg-white border border-green-200 rounded-xl outline-none font-bold" 
                  value={formData.stock} 
                  onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})} 
                 />
              </div>
            </div>
          </div>
        </form>

        <div className="px-8 py-6 border-t border-slate-100 flex justify-end space-x-4 flex-shrink-0 bg-white">
          <button onClick={onClose} className="px-8 py-3 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all">Hủy</button>
          <button onClick={handleSubmit} className="bg-green-600 text-white px-12 py-3 rounded-2xl font-bold flex items-center space-x-2 shadow-xl hover:bg-green-700 active:scale-95 transition-all">
            <Save className="h-5 w-5" />
            <span>Lưu sản phẩm</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
