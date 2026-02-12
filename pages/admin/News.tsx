
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Calendar, User } from 'lucide-react';
import { NewsPost } from '../../types';
import AdminNewsForm from './AdminNewsForm';

interface AdminNewsProps {
  news: NewsPost[];
  onUpdate: (news: NewsPost[]) => void;
}

const AdminNews: React.FC<AdminNewsProps> = ({ news, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSave = (post: NewsPost) => {
    let updated;
    if (editingPost) {
      updated = news.map(n => n.id === post.id ? post : n);
    } else {
      updated = [post, ...news];
    }
    onUpdate(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Xóa bài viết này?')) {
      const updated = news.filter(n => n.id !== id);
      onUpdate(updated);
    }
  };

  const filtered = news.filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Tìm bài viết..." 
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 text-sm shadow-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
        </div>
        <button 
          onClick={() => {setEditingPost(null); setIsModalOpen(true);}}
          className="bg-green-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center space-x-2 hover:bg-green-700 shadow-xl shadow-green-100 transition-all active:scale-95"
        >
          <Plus className="h-5 w-5" />
          <span>Viết bài mới</span>
        </button>
      </div>

      <div className="grid gap-4">
        {filtered.map(post => (
          <div key={post.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-6 group hover:border-green-300 transition-all">
            <div className="w-full md:w-32 h-24 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0">
              <img src={post.image} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase mb-2 inline-block">
                {post.category}
              </span>
              <h4 className="font-bold text-slate-900 line-clamp-1 group-hover:text-green-600 transition-colors leading-tight">
                {post.title}
              </h4>
              <div className="flex items-center space-x-4 mt-2 text-[11px] text-slate-400 font-medium">
                <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" /> {post.date}</span>
                <span className="flex items-center uppercase"><User className="h-3 w-3 mr-1" /> {post.author}</span>
              </div>
            </div>
            <div className="flex space-x-2 w-full md:w-auto">
              <button 
                onClick={() => {setEditingPost(post); setIsModalOpen(true);}}
                className="flex-1 md:flex-none p-3 bg-slate-50 text-slate-500 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all flex justify-center"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button 
                onClick={() => handleDelete(post.id)}
                className="flex-1 md:flex-none p-3 bg-slate-50 text-slate-500 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all flex justify-center"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
             <p className="text-slate-400 font-medium">Chưa có bài viết nào được đăng.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <AdminNewsForm 
          initialData={editingPost}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminNews;
