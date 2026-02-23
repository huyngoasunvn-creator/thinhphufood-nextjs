
import React, { useState } from 'react';
import { Mail, Trash2, Eye, MessageSquare, Clock, User, Phone, CheckCircle, Search, Filter } from 'lucide-react';
import { ContactMessage } from '../../types';

interface AdminMessagesProps {
  messages: ContactMessage[];
  onDelete: (id: string) => void;
  onMarkAsRead: (id: string) => void;
}

const AdminMessages: React.FC<AdminMessagesProps> = ({ messages, onDelete, onMarkAsRead }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'new' | 'read'>('all');
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);

  const filtered = messages.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || m.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleOpenMsg = (msg: ContactMessage) => {
    setSelectedMsg(msg);
    if (msg.status === 'new') {
      onMarkAsRead(msg.id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Tìm người gửi, chủ đề..." 
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 text-sm shadow-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
        </div>
        
        <div className="flex items-center space-x-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          {(['all', 'new', 'read'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${filter === f ? 'bg-green-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {f === 'all' ? 'Tất cả' : f === 'new' ? 'Chưa đọc' : 'Đã đọc'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map(msg => (
          <div 
            key={msg.id} 
            onClick={() => handleOpenMsg(msg)}
            className={`bg-white p-5 rounded-3xl border transition-all cursor-pointer group relative ${msg.status === 'new' ? 'border-green-400 shadow-lg shadow-green-900/5' : 'border-slate-100'}`}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${msg.status === 'new' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                {msg.status === 'new' ? <MessageSquare className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className={`font-bold text-slate-900 truncate ${msg.status === 'new' ? 'text-green-700' : ''}`}>
                    {msg.subject}
                  </h4>
                  {msg.status === 'new' && (
                    <span className="px-2 py-0.5 bg-green-600 text-white text-[8px] font-black rounded-full uppercase">Mới</span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center"><User className="h-3 w-3 mr-1" /> {msg.name}</span>
                  <span className="flex items-center"><Phone className="h-3 w-3 mr-1" /> {msg.contact}</span>
                  <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {msg.createdAt}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete(msg.id); }}
                  className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-24 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
             <div className="p-4 bg-slate-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-slate-200" />
             </div>
             <p className="text-slate-400 font-bold">Không có tin nhắn nào phù hợp.</p>
          </div>
        )}
      </div>

      {/* Message Modal */}
      {selectedMsg && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" onClick={() => setSelectedMsg(null)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-8 md:p-12 animate-in zoom-in-95 duration-200">
            <header className="mb-8 border-b border-slate-100 pb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">{selectedMsg.subject}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium">
                    <span className="flex items-center text-green-600"><User className="h-4 w-4 mr-1.5" /> {selectedMsg.name}</span>
                    <span className="flex items-center"><Phone className="h-4 w-4 mr-1.5" /> {selectedMsg.contact}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedMsg(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
            </header>
            
            <div className="bg-slate-50 p-6 rounded-3xl mb-8">
              <p className="text-slate-700 leading-relaxed font-medium whitespace-pre-wrap text-lg">
                "{selectedMsg.message}"
              </p>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> Đã nhận lúc: {selectedMsg.createdAt}</span>
              <button 
                onClick={() => setSelectedMsg(null)}
                className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const XCircle = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default AdminMessages;
