
import React, { useState } from 'react';
import { Image as ImageIcon, Upload, Loader2, Link as LinkIcon } from 'lucide-react';
import { uploadImage } from '../../../services/storage';

interface ProductFormMediaProps {
  image: string;
  onChange: (url: string) => void;
}

const ProductFormMedia: React.FC<ProductFormMediaProps> = ({ image, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadImage(file, 'products');
      onChange(url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Lỗi khi tải ảnh lên!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ảnh đại diện sản phẩm</label>
        <div className="flex bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
           <button 
            type="button"
            onClick={() => setMode('upload')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${mode === 'upload' ? 'bg-green-600 text-white' : 'text-slate-400'}`}
           >
             TẢI LÊN
           </button>
           <button 
            type="button"
            onClick={() => setMode('url')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${mode === 'url' ? 'bg-green-600 text-white' : 'text-slate-400'}`}
           >
             DÁN LINK
           </button>
        </div>
      </div>

      <div className="aspect-video bg-white rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden relative group flex items-center justify-center">
        {uploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 text-green-600 animate-spin mb-2" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Đang xử lý...</span>
          </div>
        ) : image ? (
          <img src={image} className="w-full h-full object-cover" alt="Main Preview" />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <ImageIcon className="h-10 w-10 mb-2" />
            <span className="text-[10px] font-bold uppercase">CHƯA CÓ ẢNH</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        {mode === 'upload' ? (
          <label className="flex items-center justify-center space-x-2 w-full py-3 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all shadow-sm">
            <Upload className="h-4 w-4 text-green-600" />
            <span className="text-sm font-bold text-slate-700">Chọn file từ máy tính</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
          </label>
        ) : (
          <div className="relative">
            <LinkIcon className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Dán URL hình ảnh..." 
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none text-xs font-mono" 
              value={image} 
              onChange={(e) => onChange(e.target.value)} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFormMedia;
