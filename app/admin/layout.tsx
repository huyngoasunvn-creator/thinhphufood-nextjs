import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "@/lib/firebase-admin";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminHeader from "@/components/admin/layout/AdminHeader";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("admin-token")?.value;

  // Không có cookie → đá về login
  if (!token) {
    redirect("/login");
  }

  try {
    // 🔐 Verify token thật sự
    const decodedToken = await adminAuth.verifyIdToken(token);

    // 🔥 (Optional) Chỉ cho 1 email admin
    if (decodedToken.email !== "admin@thinhphufood.vn") {
      redirect("/login");
    }

  } catch (error) {
    // Token fake hoặc hết hạn
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen relative">
        <AdminHeader />
        <div className="p-8 pb-20">{children}</div>
        <footer className="absolute bottom-0 left-0 right-0 p-4 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest border-t border-slate-200 bg-white/50 backdrop-blur-sm">
          ThinhPhuFood CMS v2.5 • SEO Optimized Engine
        </footer>
      </main>
    </div>
  );
}