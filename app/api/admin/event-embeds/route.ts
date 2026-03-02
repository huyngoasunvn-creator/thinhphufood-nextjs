import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import EventEmbed from '@/models/EventEmbed'

// GET
export async function GET() {
  try {
    await connectDB()

    const config = await EventEmbed.findOne().sort({ createdAt: -1 })

    return NextResponse.json(config)
  } catch (error) {
    console.error('GET EventEmbed error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// POST (Tạo hoặc cập nhật nếu đã tồn tại)
export async function POST(req: Request) {
  try {
    await connectDB()

    const body = await req.json()

    let config = await EventEmbed.findOne()

    if (config) {
      // Nếu đã tồn tại → update
      config = await EventEmbed.findByIdAndUpdate(
        config._id,
        body,
        { new: true }
      )
    } else {
      // Nếu chưa có → tạo mới
      config = await EventEmbed.create(body)
    }

    return NextResponse.json(config)
  } catch (error) {
    console.error('POST EventEmbed error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}