import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

/* ================= GET ================= */
export async function GET() {
  try {
    const snapshot = await adminDb.collection("categories").get();

    const categories = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      name: doc.data().name,
    }));

    return NextResponse.json(categories);
  } catch (error) {
    console.error("GET categories error:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

/* ================= POST ================= */
export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Missing category name" },
        { status: 400 }
      );
    }

    const docRef = await adminDb.collection("categories").add({
      name,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
    });
  } catch (error) {
    console.error("Create category error:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}

/* ================= DELETE ================= */
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing category id" },
        { status: 400 }
      );
    }

    await adminDb.collection("categories").doc(id).delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete category error:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}

/* ================= PUT ================= */
export async function PUT(req: Request) {
  try {
    const { id, newName } = await req.json();

    if (!id || !newName) {
      return NextResponse.json(
        { error: "Missing data" },
        { status: 400 }
      );
    }

    await adminDb.collection("categories").doc(id).update({
      name: newName,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update category error:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}