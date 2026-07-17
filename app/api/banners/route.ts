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
  mediaType?: "image" | "video";
  imageUrl: string;
  link?: string;
  buttonText?: string;
  placement?: string;
  textColor?: string;
  overlayOpacity?: number;
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

    const docRef = await adminDb.collection("banners").add({
  title: body.title,
  subtitle: body.subtitle || "",
  mediaType: body.mediaType || "image",
  imageUrl: body.imageUrl,
  logoUrl: body.logoUrl || "",
  link: body.link || "",
  buttonText: body.buttonText || "",
  placement: body.placement ?? "Trang chủ",
  textColor: body.textColor || "#ffffff",
  overlayOpacity: body.overlayOpacity ?? 0.4,
  order: body.order ?? 0,
  contentAlign: body.contentAlign || "left",
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