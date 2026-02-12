
import React from 'react';
import SEOManager from '../components/common/SEO';
import { AboutPageConfig } from '../types';
import { HelpCircle } from 'lucide-react';

interface AboutUsProps {
  config: AboutPageConfig;
}

const AboutUs: React.FC<AboutUsProps> = ({ config }) => {
  if (!config.isActive) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-white">
        <div className="p-4 bg-slate-50 rounded-full mb-6 text-slate-300">
          <HelpCircle className="h-16 w-16" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Trang đang cập nhật nội dung</h2>
        <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
          Chúng tôi đang chuẩn bị những câu chuyện thú vị nhất để kể cho bạn nghe. Vui lòng quay lại sau ít phút nữa nhé!
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      <SEOManager 
        title={config.title} 
        description="Tìm hiểu về hành trình mang nông sản sạch đến mọi nhà của ThinhPhuFood."
      />

      {/* Container tràn viền, loại bỏ mọi khoảng cách và tiêu đề phụ để liền mạch với Footer */}
      <div className="w-full bg-white flex flex-col h-[85vh] sm:h-[92vh] overflow-hidden mb-[-4rem] sm:mb-0">
        <div className="flex-1 w-full relative overflow-x-auto overflow-y-hidden">
          <iframe 
            src={config.externalUrl} 
            title={config.title}
            className="absolute inset-0 w-full h-full border-none min-w-full"
            style={{ minWidth: '100%', minHeight: '100%' }}
            sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
