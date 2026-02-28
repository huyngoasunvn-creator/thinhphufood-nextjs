import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  const { idToken } = await req.json();

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    if (decodedToken.email !== "admin@thinhphufood.vn") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("session", idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;

  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}