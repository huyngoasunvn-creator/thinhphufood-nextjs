import { NextResponse } from "next/server";
import { getMenus } from "@/lib/server/menu-server";

export async function GET() {
  try {
    const menus = await getMenus();
    return NextResponse.json(menus);
  } catch (error) {
    console.error(error);
    return NextResponse.json([]);
  }
}
