import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const cookieStore = cookies();
  const LOGGRD_IN = cookieStore.get("isAuth")?.value;
  if (LOGGRD_IN !== "1" || LOGGRD_IN === undefined) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (LOGGRD_IN === "1") {
    if (req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard/employee", req.url));
    }
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
