import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    console.log("BODY:", body);
    console.log("ITEMS:", body.items);

    const formattedItems = body.items.map((item: any) => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image:
    item.image ||              // nếu cart dùng image
    item.images?.[0] ||        // nếu cart dùng images[]
    null,
    }));

    const newOrder = await Order.create({
      customerName: body.customerName || body.name,
      phone: body.phone || body.phoneNumber,
      email: body.email,
      address: body.address,

      paymentMethod: body.paymentMethod,
      items: formattedItems,
      total: body.total,
      status: "pending",
    });

    return NextResponse.json(newOrder, { status: 201 });

  } catch (error: any) {
    console.error("🔥 CREATE ORDER ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
export async function GET() {
  await connectDB();

  const orders = await Order.find().sort({ createdAt: -1 });

  const formatted = orders.map(order => ({
    ...order.toObject(),
    id: order._id.toString(),
  }));

  return NextResponse.json(formatted);
}