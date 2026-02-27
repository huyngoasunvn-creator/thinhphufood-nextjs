import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import slugify from "slugify";

/* ================= GET ================= */
export async function GET() {
  try {
    const snapshot = await adminDb
      .collection("categories")
      .orderBy("createdAt", "asc")
      .get();

    const categories = snapshot.docs.map((doc: any) => {
      const data = doc.data();

      return {
        id: doc.id,
        name: data.name ?? "",
        slug: data.slug ?? "",
        parentId: data.parentId ?? null,
        isActive: data.isActive ?? true, // 🔥 mặc định true
      };
    });

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
    const { name, parentId, isActive } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Missing category name" },
        { status: 400 }
      );
    }

    const slug = slugify(name, {
      lower: true,
      locale: "vi",
      strict: true,
    });

    const now = new Date();

    const docRef = await adminDb.collection("categories").add({
      name,
      slug,
      parentId: parentId || null,
      isActive: isActive ?? true, // 🔥 mặc định active
      createdAt: now,
      updatedAt: now,
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

    const childSnapshot = await adminDb
      .collection("categories")
      .where("parentId", "==", id)
      .get();

    const batch = adminDb.batch();

    childSnapshot.docs.forEach((doc: any) => {
      batch.delete(doc.ref);
    });

    batch.delete(adminDb.collection("categories").doc(id));

    await batch.commit();

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
    const { id, newName, parentId, isActive } = await req.json();

    if (!id || !newName) {
      return NextResponse.json(
        { error: "Missing data" },
        { status: 400 }
      );
    }

    const slug = slugify(newName, {
      lower: true,
      locale: "vi",
      strict: true,
    });

    await adminDb.collection("categories").doc(id).update({
      name: newName,
      slug,
      parentId: parentId || null,
      isActive: isActive ?? true, // 🔥 cho phép bật/tắt
      updatedAt: new Date(),
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