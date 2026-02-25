import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function DELETE(
  req: Request,
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

    await adminDb.collection("banners").doc(params.id).update(body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT banner error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}