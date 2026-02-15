import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/core/auth/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/auth/login";

  if (isAuthPage) {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  const protectedPaths = ["/dashboard"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected) {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session)
      return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|favicon.ico).*)",
  ],
};
