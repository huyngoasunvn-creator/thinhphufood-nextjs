
import React, { useState } from 'react';
import { X, Save, Image as ImageIcon, FileText, Calendar, Upload, Loader2, Link as LinkIcon } from 'lucide-react';
import { NewsPost } from '../../types';
import RichTextEditor from '../../components/admin/RichTextEditor';
import { uploadImage } from '../../services/storage';

interface AdminNewsFormProps {
  initialData?: NewsPost | null;
  onSave: (post: NewsPost) => void;
  onClose: () => void;
}

const AdminNewsForm: React.FC<AdminNewsFormProps> = ({ initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<NewsPost>>(initialData || {
    title: '',
    category: 'Kiến thức',
    summary: '',
    content: '',
    image: '',
    author: 'Admin ThinhPhu',
    date: new Date().toISOString().split('T')[0],
  });
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const postData = {
      ...formData,
      id: initialData?.id || Date.now().toString(),
      slug: formData.title?.toLowerCase().replace(/ /g, '-') || '',
    } as NewsPost;
    onSave(postData);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadImage(file, 'news');
      setFormData({ ...formData, image: url });
    } catch (error) {
      console.error("Upload error:", error);
      alert("Lỗi khi tải ảnh lên!");
    } finally {
      setUploading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium text-slate-900 placeholder:text-slate-400";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-5xl h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 flex-shrink-0 bg-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><FileText className="h-5 w-5" /></div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {initialData ? 'Chỉnh sửa bài viết' : 'Viết bài mới'}
              </h3>
              <p className="text-xs text-slate-400 font-medium tracking-tight uppercase">Soạn thảo nội dung Blog & Tin tức</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>
        
        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 custom-scroll bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Tiêu đề bài viết</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ví dụ: 5 Cách phân biệt gạo ST25 thật và giả"
                  className={inputClass}
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Tóm tắt ngắn (Summary)</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Mô tả ngắn gọn nội dung để thu hút người đọc..."
                  className={`${inputClass} resize-none`}
                  value={formData.summary}
                  onChange={(e) => setFormData({...formData, summary: e.target.value})}
                />
              </div>

              <RichTextEditor 
                label="Nội dung chi tiết bài viết"
                value={formData.content || ''} 
                onChange={(val) => setFormData({...formData, content: val})} 
              />
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-4">Ảnh bìa bài viết</label>
                <div className="aspect-[16/10] bg-white rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden relative group shadow-inner flex items-center justify-center">
                  {uploading ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
                      <span className="text-[10px] font-bold mt-2">ĐANG TẢI...</span>
                    </div>
                  ) : formData.image ? (
                    <img src={formData.image} className="w-full h-full object-cover" alt="Cover" />
                  ) : (
                    <ImageIcon className="h-10 w-10 text-slate-300" />
                  )}
                </div>
                
                <div className="mt-4 space-y-3">
                  <label className="flex items-center justify-center space-x-2 w-full py-2 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all shadow-sm">
                    <Upload className="h-4 w-4 text-green-600" />
                    <span className="text-xs font-bold text-slate-700">Tải ảnh từ máy</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
                  </label>
                  
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Hoặc dán URL ảnh..."
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Chuyên mục</label>
                  <select 
                    className={inputClass}
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Kiến thức">Kiến thức</option>
                    <option value="Khuyến mãi">Khuyến mãi</option>
                    <option value="Món ngon">Món ngon</option>
                    <option value="Tin công ty">Tin công ty</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center">
                    <Calendar className="h-3 w-3 mr-2 text-blue-500" />
                    Ngày đăng bài
                  </label>
                  <input 
                    required
                    type="date"
                    className={inputClass}
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Tác giả</label>
                  <input 
                    type="text" 
                    className={inputClass}
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-slate-100 flex justify-end space-x-4 flex-shrink-0 bg-white shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
          <button 
            type="button"
            onClick={onClose}
            className="px-8 py-3 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
          >
            Hủy bỏ
          </button>
          <button 
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-12 py-3 rounded-2xl font-bold flex items-center space-x-2 shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
          >
            <Save className="h-5 w-5" />
            <span>Lưu bài viết</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNewsForm;
