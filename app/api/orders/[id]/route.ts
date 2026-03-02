import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import mongoose from "mongoose";

/* ===============================
   UPDATE ORDER
=============================== */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedOrder) {
      return NextResponse.json({ error: "Không tìm thấy đơn" }, { status: 404 });
    }

    // Format lại cho khớp interface frontend
    return NextResponse.json({
      id: updatedOrder._id.toString(),
      customerName: updatedOrder.customerName,
      phone: updatedOrder.phone,
      address: updatedOrder.address,
      items: updatedOrder.items,
      shippingFee: updatedOrder.shippingFee,
      total: updatedOrder.total,
      status: updatedOrder.status,
      createdAt: updatedOrder.createdAt,
      note: updatedOrder.note,
      paymentMethod: updatedOrder.paymentMethod,
    });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi cập nhật đơn" }, { status: 500 });
  }
}

/* ===============================
   DELETE ORDER (OPTIONAL)
=============================== */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return NextResponse.json({ error: "Không tìm thấy đơn" }, { status: 404 });
    }

    return NextResponse.json({ message: "Xoá thành công" });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi xoá đơn" }, { status: 500 });
  }
}