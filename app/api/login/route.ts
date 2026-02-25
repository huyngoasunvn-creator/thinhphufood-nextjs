import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    // Xác thực token từ Firebase
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    // (Tuỳ chọn) kiểm tra email admin
    if (decodedToken.email !== "admin@thinhphufood.vn") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("admin-token", idToken, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 ngày
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}