import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 ngày

    const sessionCookie = await adminAuth.createSessionCookie(token, {
      expiresIn,
    });

    const response = NextResponse.json({ success: true });

    response.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Login failed" }, { status: 401 });
  }
}