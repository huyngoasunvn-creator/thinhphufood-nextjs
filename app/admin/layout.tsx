'use client';

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminHeader from "@/components/admin/layout/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // ❌ chưa đăng nhập
    if (!user) {
      router.replace("/login");
      return;
    }

    // ❌ không phải admin
    if (!isAdmin) {
      router.replace("/");
      return;
    }
  }, [user, isAdmin, loading, router]);

  // 🔄 Đang kiểm tra quyền
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Đang kiểm tra quyền truy cập...</p>
      </div>
    );
  }

  // 🚫 Không đủ quyền → không render gì
  if (!user || !isAdmin) {
    return null;
  }

  // ✅ Đủ quyền → render admin UI
  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen relative">
        <AdminHeader />
        <div className="p-8 pb-20">{children}</div>
      </main>
    </div>
  );
}