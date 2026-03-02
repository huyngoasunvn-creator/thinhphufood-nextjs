import { NextResponse } from "next/server"
import connectDB from "@/lib/connectDB"
import EventEmbed from "@/models/EventEmbed"
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  await connectDB()

  const events = await EventEmbed.find({
    showOnHeader: true,
    isActive: true
  }).sort({ order: 1 })

  return NextResponse.json(events)
}