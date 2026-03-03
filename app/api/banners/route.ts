import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";

/* =========================
   Interface Banner
========================= */
interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  link?: string;
  placement?: string;
  order?: number;
  isActive?: boolean;
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
    console.log("BODY:", body);

    const docRef = await adminDb.collection("banners").add({
  title: body.title,
  subtitle: body.subtitle,
  imageUrl: body.imageUrl,
  link: body.link,
  placement: body.placement ?? "Trang chủ",
  order: body.order ?? 0,
  isActive: body.isActive ?? true,
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