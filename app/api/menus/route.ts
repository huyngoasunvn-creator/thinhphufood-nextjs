import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET() {
  try {

    const snapshot = await adminDb
      .collection("menus")
      .orderBy("order")
      .get();

    const menus = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(menus);

  } catch (error) {
    console.error(error);
    return NextResponse.json([]);
  }
}