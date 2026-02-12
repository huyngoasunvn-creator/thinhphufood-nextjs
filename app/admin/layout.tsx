
'use client';

import React from 'react';
import AdminLayout from '../../pages/admin/AdminLayout';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  // Bảo mật: Nếu không phải admin thì đẩy về trang chủ
  React.useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/login');
    }
  }, [user, loading, isAdmin, router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold">Đang xác thực quyền Admin...</div>;
  if (!user || !isAdmin) return null;

  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
