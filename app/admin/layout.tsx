import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "@/lib/firebase-admin";
import AdminClientLayout from "./layout/AdminClientLayout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    await adminAuth.verifySessionCookie(token, true); // thêm true
  } catch (error) {
    console.error("SESSION VERIFY ERROR:", error);
    redirect("/login");
  }

  return <AdminClientLayout>{children}</AdminClientLayout>;
}