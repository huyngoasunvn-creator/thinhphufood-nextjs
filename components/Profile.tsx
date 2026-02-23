
import React from 'react';
import SEOManager from '../components/common/SEO';
import { ProfileConfig } from '../types';
import { ShieldCheck } from 'lucide-react';

interface ProfileProps {
  config: ProfileConfig;
}

const Profile: React.FC<ProfileProps> = ({ config }) => {
  if (!config.isActive) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-white">
        <div className="p-4 bg-slate-50 rounded-full mb-6 text-slate-300">
          <ShieldCheck className="h-16 w-16" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Trang đang bảo trì</h2>
        <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
          Tiện ích dành cho thành viên hiện đang được cập nhật. Vui lòng quay lại sau ít phút nữa để trải nghiệm những tính năng mới nhất từ ThinhPhuFood.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      <SEOManager 
        title={config.title} 
        description="Quản lý thông tin cá nhân và tài khoản thành viên của bạn tại ThinhPhuFood."
      />

      {/* Container tràn viền, loại bỏ mọi khoảng cách và tiêu đề phụ để liền mạch với Footer */}
      <div className="w-full bg-white flex flex-col h-[85vh] sm:h-[92vh] overflow-hidden mb-[-4rem] sm:mb-0">
        <div className="flex-1 w-full relative overflow-x-auto overflow-y-hidden">
          <iframe 
            src={config.externalUrl} 
            title={config.title}
            className="absolute inset-0 w-full h-full border-none min-w-full"
            style={{ minWidth: '100%', minHeight: '100%' }}
            allow="geolocation; microphone; camera"
            sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
