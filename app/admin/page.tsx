
'use client';

import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="bg-white p-12 rounded-[3rem] border border-dashed border-slate-300 text-center animate-in fade-in duration-500">
      <h2 className="text-2xl font-black text-slate-800">Chào mừng Admin!</h2>
      <p className="text-slate-500 mt-2 font-medium">
        Hệ thống ThinhPhuFood CMS đã sẵn sàng. Hãy chọn các mục ở menu bên trái để bắt đầu quản lý website của bạn.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        <div className="p-6 bg-green-50 rounded-3xl border border-green-100">
          <p className="text-xs font-bold text-green-600 uppercase mb-1">Công nghệ</p>
          <p className="text-xl font-black text-green-800">Next.js 14</p>
        </div>
        <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
          <p className="text-xs font-bold text-blue-600 uppercase mb-1">Database</p>
          <p className="text-xl font-black text-blue-800">Firestore</p>
        </div>
        <div className="p-6 bg-purple-50 rounded-3xl border border-purple-100">
          <p className="text-xs font-bold text-purple-600 uppercase mb-1">SEO</p>
          <p className="text-xl font-black text-purple-800">Optimized</p>
        </div>
        <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100">
          <p className="text-xs font-bold text-orange-600 uppercase mb-1">Security</p>
          <p className="text-xl font-black text-orange-800">Firebase Auth</p>
        </div>
      </div>
    </div>
  );
}
