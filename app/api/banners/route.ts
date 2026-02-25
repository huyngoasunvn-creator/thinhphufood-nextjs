import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const snapshot = await adminDb.collection("banners").get();

    const banners = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(banners);
  } catch (error) {
    console.error("GET banners error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const docRef = await adminDb.collection("banners").add({
      ...body,
      createdAt: Date.now(),
    });

    return NextResponse.json({ id: docRef.id });
  } catch (error) {
    console.error("POST banner error:", error);
    return NextResponse.json({ error: "Failed to create banner" }, { status: 500 });
  }
}