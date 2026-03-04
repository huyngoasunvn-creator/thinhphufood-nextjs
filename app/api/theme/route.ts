import { NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export async function GET() {
  const snap = await adminDb.collection("siteConfig").doc("theme").get()

  if (!snap.exists) {
    return NextResponse.json({
      enabled: false,
      type: "none",
      adminEnabled: true,
    })
  }

  return NextResponse.json(snap.data())
}

export async function PUT(req: Request) {
  const body = await req.json()

  await adminDb
    .collection("siteConfig")
    .doc("theme")
    .set(body, { merge: true })

  // 🔥 QUAN TRỌNG: phải return JSON
  return NextResponse.json(body)
}