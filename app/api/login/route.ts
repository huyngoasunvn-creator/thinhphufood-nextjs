import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    const decodedToken = await adminAuth.verifyIdToken(token);

    const response = NextResponse.json({
      success: true,
      uid: decodedToken.uid,
      email: decodedToken.email,
    });

    response.cookies.set("session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      { error: "Login failed" },
      { status: 401 }
    );
  }
}