import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {

    // 👉 chỉ check login nếu có (nếu bạn có login)
    // const token = request.cookies.get("adminToken")

    // if (!token) {
    //   return NextResponse.redirect(new URL("/", request.url))
    // }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}