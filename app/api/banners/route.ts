import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";

/* =========================
   Interface Banner
========================= */
interface Banner {
  id: string;
  title: string;
  image: string;
  link?: string;
  createdAt?: number;
}

/* =========================
   GET - Lấy danh sách banner
========================= */
export async function GET() {
  try {
    const snapshot = await adminDb.collection("banners").get();

    const banners: Banner[] = snapshot.docs.map(
      (doc: QueryDocumentSnapshot) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Banner)
    );

    return NextResponse.json(banners);
  } catch (error) {
    console.error("GET banners error:", error);
    return NextResponse.json(
      { error: "Failed to fetch banners" },
      { status: 500 }
    );
  }
}

/* =========================
   POST - Tạo banner mới
========================= */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate cơ bản
    if (!body?.title || !body?.image) {
      return NextResponse.json(
        { error: "Title and image are required" },
        { status: 400 }
      );
    }

    const docRef = await adminDb.collection("banners").add({
      title: body.title,
      image: body.image,
      link: body.link || "",
      createdAt: Date.now(),
    });

    return NextResponse.json({ id: docRef.id });
  } catch (error) {
    console.error("POST banner error:", error);
    return NextResponse.json(
      { error: "Failed to create banner" },
      { status: 500 }
    );
  }
}