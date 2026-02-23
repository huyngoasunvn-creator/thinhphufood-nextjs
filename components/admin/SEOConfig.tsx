
import React from 'react';
import { Search, Eye, Share2, Globe, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { SiteConfig } from '../../types';

interface SEOConfigProps {
  config: SiteConfig;
}

const SEOConfig: React.FC<SEOConfigProps> = ({ config }) => {
  return (
    <div className="max-w-5xl space-y-8 animate-in fade-in duration-500">
      {/* SEO Health Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-4">
            <Globe className="h-6 w-6" />
          </div>
          <h4 className="font-bold text-slate-900">Google Search</h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Trạng thái: Tốt</p>
          <div className="mt-4 text-xs text-slate-500 leading-relaxed">
            Hỗ trợ đầy đủ JSON-LD Rich Snippets cho Sản phẩm & Bài viết.
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <Share2 className="h-6 w-6" />
          </div>
          <h4 className="font-bold text-slate-900">Social OG Tags</h4>
          <p className="text-[10px] text-orange-400 font-bold uppercase mt-1">Trạng thái: Trung bình</p>
          <div className="mt-4 text-xs text-slate-500 leading-relaxed">
            Đã có thẻ meta tĩnh. Link động sẽ dùng meta mặc định của trang chủ.
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <CheckCircle className="h-6 w-6" />
          </div>
          <h4 className="font-bold text-slate-900">Sitemap</h4>
          <p className="text-[10px] text-green-600 font-bold uppercase mt-1">Trạng thái: Tự động</p>
          <div className="mt-4 text-xs text-slate-500 leading-relaxed">
            Cấu trúc đường dẫn chuẩn SEO (Slug-based).
          </div>
        </div>
      </div>

      {/* Google Preview */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center">
          <Search className="h-5 w-5 mr-3 text-blue-600" />
          Xem trước kết quả tìm kiếm Google
        </h3>
        <div className="bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-100 max-w-2xl">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <span className="bg-slate-200 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold">G</span>
              <span className="truncate">thinhphufood.vn › trang-chu</span>
            </div>
            <h4 className="text-xl text-[#1a0dab] font-medium hover:underline cursor-pointer">
              {config.siteName} - Tinh Hoa Gạo Việt | Gạo ST25 & Nông Sản Sạch
            </h4>
            <p className="text-sm text-[#4d5156] leading-relaxed">
              Chuyên cung cấp gạo ST25 ngon nhất thế giới, gạo lứt hữu cơ và nông sản sạch đạt chuẩn VietGAP. Giao hàng hỏa tốc 2h tại nội thành...
            </p>
          </div>
        </div>
        <div className="mt-6 flex items-start space-x-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
          <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-[11px] text-blue-700 leading-relaxed italic">
            * Đây là cách website hiển thị khi khách hàng tìm kiếm tên thương hiệu của bạn trên Google. Bạn có thể thay đổi "Tên Website" trong mục <b>Cấu hình</b> để cập nhật tiêu đề này.
          </p>
        </div>
      </div>

      {/* Social Media Preview */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
        <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center">
          <Eye className="h-5 w-5 mr-3 text-green-600" />
          Xem trước khi chia sẻ (Facebook/Zalo)
        </h3>
        <div className="max-w-sm border border-slate-200 rounded-2xl overflow-hidden shadow-lg mx-auto md:mx-0">
          <img 
            src="https://res.cloudinary.com/dozhznwuf/image/upload/v1770731483/logo-tp-5_yizb09.png" 
            className="w-full aspect-[1.91/1] object-cover bg-slate-100" 
            alt="SEO Image Preview" 
          />
          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase">THINHPHUFOOD.VN</p>
            <h5 className="font-bold text-slate-900 mt-1">{config.siteName} - Tinh Hoa Gạo Việt</h5>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">Chuyên cung cấp gạo ST25, gạo lứt hữu cơ và nông sản sạch đạt chuẩn VietGAP...</p>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-slate-900 rounded-3xl text-white">
          <h4 className="font-bold mb-4 flex items-center text-sm">
            <AlertCircle className="h-4 w-4 mr-2 text-yellow-400" />
            Lưu ý kỹ thuật cho thẻ OG
          </h4>
          <ul className="space-y-3 text-xs opacity-80 list-disc pl-4">
            <li>Robot của Zalo/Facebook chỉ đọc mã nguồn tĩnh ngay khi tải trang.</li>
            <li>Vì website là dạng Ứng dụng (SPA), Robot sẽ luôn lấy ảnh Logo và Tiêu đề mặc định của trang chủ cho mọi liên kết.</li>
            <li>Để từng sản phẩm có ảnh/tiêu đề riêng khi chia sẻ, bạn cần tích hợp dịch vụ như <b>Prerender.io</b> hoặc chuyển đổi sang <b>Next.js (SSR)</b> hoàn toàn.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SEOConfig;
