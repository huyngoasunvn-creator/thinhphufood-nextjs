import { NextResponse } from "next/server";
import { getProducts } from "@/lib/server/product-server";

export async function GET() {
  const products = await getProducts(false); // 🔥 lấy tất cả
  return NextResponse.json(products);
}