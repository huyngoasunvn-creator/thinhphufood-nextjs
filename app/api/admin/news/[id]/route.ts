import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

interface Params {
  params: {
    id: string;
  };
}

// PATCH - Cập nhật trạng thái
export async function PATCH(req: Request, { params }: Params) {
  try {
    const body = await req.json();

    await adminDb.collection("news").doc(params.id).update(body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH news error:", error);
    return NextResponse.json(
      { error: "Không cập nhật được bài viết" },
      { status: 500 }
    );
  }
}

// DELETE - Xóa bài
export async function DELETE(
  req: Request,
  { params }: Params
) {
  try {
    await adminDb.collection("news").doc(params.id).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE news error:", error);
    return NextResponse.json(
      { error: "Không xóa được bài viết" },
      { status: 500 }
    );
  }
}