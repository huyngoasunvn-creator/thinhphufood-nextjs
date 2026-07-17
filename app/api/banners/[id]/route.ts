import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await adminDb.collection("banners").doc(params.id).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE banner error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const payload = {
  title: body.title ?? "",
  subtitle: body.subtitle ?? "",
  mediaType: body.mediaType ?? "image",
  imageUrl: body.imageUrl ?? "",
  logoUrl: body.logoUrl ?? "",
  link: body.link ?? "",
  buttonText: body.buttonText ?? "",
  placement: body.placement ?? "Trang chủ",
  textColor: body.textColor ?? "#ffffff",
  overlayOpacity: body.overlayOpacity ?? 0.4,
  order: body.order ?? 0,
  contentAlign: body.contentAlign ?? "left",
  isActive: body.isActive ?? true,
};

await adminDb.collection("banners").doc(params.id).update(payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT banner error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}