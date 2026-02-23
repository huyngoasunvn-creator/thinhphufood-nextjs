
import React, { useState } from 'react';
import SEOManager from '../components/common/SEO';
import { ContactConfig } from '../types';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

interface ContactProps {
  config: ContactConfig;
  onSendMessage: (msg: { name: string; contact: string; subject: string; message: string }) => void;
}

const Contact: React.FC<ContactProps> = ({ config, onSendMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(formData);
    alert('Cảm ơn bạn đã gửi liên hệ! Chúng tôi đã nhận được tin nhắn và sẽ phản hồi sớm nhất có thể.');
    setFormData({ name: '', contact: '', subject: '', message: '' });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 animate-in fade-in duration-700">
      <SEOManager 
        title="Liên Hệ" 
        description="Gửi tin nhắn hoặc liên hệ trực tiếp với ThinhPhuFood để được hỗ trợ tốt nhất."
      />

      {/* Contact Header */}
      <section className="bg-green-700 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-900/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">{config.title}</h1>
          <p className="max-w-2xl mx-auto text-green-100 text-lg opacity-90 leading-relaxed font-medium">{config.description}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Contact Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-green-900/5 border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                <span className="w-8 h-1.5 bg-green-600 rounded-full mr-3"></span>
                Thông tin liên lạc
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Địa chỉ</p>
                    <p className="text-slate-700 font-bold leading-relaxed">{config.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Số điện thoại</p>
                    <p className="text-slate-900 font-black text-2xl">{config.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                    <p className="text-slate-700 font-bold">{config.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Thời gian làm việc</p>
                    <p className="text-slate-700 font-bold">{config.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Link Mini Card */}
            <div className="bg-green-800 p-8 rounded-[2.5rem] text-white shadow-xl shadow-green-900/10">
              <h3 className="font-bold mb-4">Theo dõi chúng tôi</h3>
              <p className="text-green-100 text-sm mb-6 opacity-80">Cập nhật những tin tức và khuyến mãi mới nhất qua mạng xã hội.</p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <span className="font-black">f</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer text-[10px] font-bold">
                  Zalo
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-green-900/5 border border-slate-100 h-full">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                <span className="w-8 h-1.5 bg-green-600 rounded-full mr-3"></span>
                Gửi tin nhắn
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Họ tên của bạn</label>
                    <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-bold text-slate-900" placeholder="Nguyễn Văn A" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Số điện thoại / Email</label>
                    <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-bold text-slate-900" placeholder="0987..." value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Chủ đề</label>
                  <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-bold text-slate-900" placeholder="Tư vấn sản phẩm" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Nội dung tin nhắn</label>
                  <textarea required rows={5} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-bold text-slate-900 resize-none" placeholder="Hãy nhập yêu cầu của bạn..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                </div>
                <button type="submit" className="bg-green-600 text-white px-10 py-5 rounded-2xl font-black flex items-center space-x-3 shadow-xl shadow-green-200 hover:bg-green-700 transition-all active:scale-95 group w-full sm:w-auto justify-center">
                  <span>GỬI LIÊN HỆ NGAY</span>
                  <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Google Map Section */}
        {config.showMap && (
          <div className="mt-16 bg-white p-4 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-in slide-in-from-bottom duration-700">
            <div className="aspect-[21/9] w-full rounded-[1.5rem] overflow-hidden bg-slate-100">
              <iframe 
                src={config.mapEmbedUrl}
                className="w-full h-full border-none"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
