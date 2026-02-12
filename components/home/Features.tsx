
import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';

const FEATURES = [
  { icon: ShieldCheck, title: "Sạch 100%", desc: "Không chất bảo quản.", color: "bg-blue-50 text-blue-600" },
  { icon: Truck, title: "Giao Nhanh 2h", desc: "Nội thành siêu tốc.", color: "bg-green-50 text-green-600" },
  { icon: RotateCcw, title: "Đổi Trả 7 Ngày", desc: "Hoàn tiền 100%.", color: "bg-orange-50 text-orange-600" },
  { icon: Award, title: "Nguồn Gốc Rõ", desc: "Trực tiếp nông dân.", color: "bg-purple-50 text-purple-600" }
];

const Features: React.FC = () => {
  return (
    <section className="py-8 md:py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {FEATURES.map((feature, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-2 sm:space-y-0 sm:space-x-4 p-3 md:p-4 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl ${feature.color} flex-shrink-0`}>
                <feature.icon className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 text-xs md:text-base">{feature.title}</h3>
                <p className="hidden xs:block text-[10px] md:text-sm text-slate-500 mt-1 leading-snug truncate md:line-clamp-none">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
