import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import type { QuerySnapshot, DocumentData } from "firebase-admin/firestore";

export async function GET() {
  try {
    const snapshot = await adminDb
      .collection("categories")
      .get() as QuerySnapshot<DocumentData>;

    const categories = snapshot.docs.map(
  (doc: FirebaseFirestore.QueryDocumentSnapshot) => ({
    id: doc.id,
    name: doc.data().name,
  })
);

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Fetch categories error:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}