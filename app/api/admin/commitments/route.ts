import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  const body = await req.json();

  const docRef = await adminDb.collection("commitments").add(body);

  return NextResponse.json({ id: docRef.id });
}

export async function PUT(req: Request) {
  const body = await req.json();

  await adminDb
    .collection("commitments")
    .doc(body.id)
    .update(body);

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  await adminDb.collection("commitments").doc(id).delete();

  return NextResponse.json({ success: true });
}