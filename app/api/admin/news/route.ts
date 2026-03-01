import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

// GET - Lấy tất cả bài viết
export async function GET() {
  try {
    const snapshot = await adminDb
      .collection("news")
      .orderBy("date", "desc")
      .get();

    const news = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(news);
  } catch (error) {
    console.error("GET news error:", error);
    return NextResponse.json(
      { error: "Không lấy được danh sách tin tức" },
      { status: 500 }
    );
  }
}

// POST - Tạo bài viết mới
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newPost = {
      ...body,
      date: new Date().toISOString(),
      isActive: true, // 👈 mặc định hiển thị
    };

    const docRef = await adminDb.collection("news").add(newPost);

    return NextResponse.json({
      id: docRef.id,
      ...newPost,
    });
  } catch (error) {
    console.error("POST news error:", error);
    return NextResponse.json(
      { error: "Không tạo được bài viết" },
      { status: 500 }
    );
  }
}