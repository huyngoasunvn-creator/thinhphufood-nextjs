import { NextResponse } from "next/server";
import {
  updateProduct,
  deleteProduct,
} from "@/lib/server/product-server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  await updateProduct(params.id, body);
  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await deleteProduct(params.id);
  return NextResponse.json({ success: true });
}