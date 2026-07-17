
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
// Use next/link instead of react-router-dom
import Link from 'next/link';
import { SiteConfig } from '@/types';

interface FooterProps {
  config: SiteConfig;
}

const Footer: React.FC<FooterProps> = ({ config }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="https://res.cloudinary.com/dozhznwuf/image/upload/v1770731483/logo-tp-5_yizb09.png" 
                alt="ThinhPhuFood Logo" 
                className="h-12 w-auto object-contain brightness-110"
              />
              <span className="text-xl font-bold text-white tracking-tight uppercase">
                {config.siteName}
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Tự hào mang hạt gạo Việt chất lượng cao đến mọi gia đình Việt. Chúng tôi cam kết sản phẩm sạch, nguồn gốc rõ ràng và giá cả bình ổn.
            </p>
            <div className="flex space-x-4">
              <a href={config.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-green-500 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-green-500 transition-colors"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Liên kết nhanh</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products" className="hover:text-green-500 transition-colors">Tất cả sản phẩm</Link></li>
              <li><Link href="/products" className="hover:text-green-500 transition-colors">Gạo đặc sản ST25</Link></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Chính sách vận chuyển</a></li>
              
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-white font-semibold mb-6">Chính sách</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-green-500 transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Điều khoản dịch vụ</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Chính sách đổi trả</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Kiểm tra đơn hàng</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Thông tin liên hệ</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>{config.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>{config.hotline} (Hotline)</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>{config.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs space-y-4 md:space-y-0">
          <p>© {currentYear} {config.siteName}. Tất cả quyền được bảo lưu.</p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
