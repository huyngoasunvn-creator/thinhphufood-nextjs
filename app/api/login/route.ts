import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json(
        { error: "Missing token" },
        { status: 400 }
      );
    }

    // Verify token
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    // Kiểm tra email tồn tại
    if (!decodedToken.email) {
      return NextResponse.json(
        { error: "Email not found" },
        { status: 401 }
      );
    }

    // Chỉ cho admin email này
    if (decodedToken.email !== "admin@thinhphufood.vn") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Tạo session cookie (chuẩn Firebase)
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 ngày

    const sessionCookie = await adminAuth.createSessionCookie(
      idToken,
      { expiresIn }
    );

    const response = NextResponse.json({ success: true });

    response.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expiresIn / 1000,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}