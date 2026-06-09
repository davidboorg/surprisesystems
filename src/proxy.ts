import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Skyddar hela /lab-sektionen med ett delat lösenord.
// Login-sidan själv (/lab/login) är öppen så man kan logga in.
const COOKIE_NAME = "lab_session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Släpp igenom login-sidan
  if (pathname === "/lab/login") {
    return NextResponse.next();
  }

  const session = request.cookies.get(COOKIE_NAME)?.value;
  const expected = process.env.LAB_SESSION_TOKEN;

  // Giltig session → släpp in
  if (expected && session && session === expected) {
    return NextResponse.next();
  }

  // Annars → till login, med ?from så vi kan skicka tillbaka efteråt
  const loginUrl = new URL("/lab/login", request.url);
  if (pathname !== "/lab") {
    loginUrl.searchParams.set("from", pathname);
  }
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/lab", "/lab/:path*"],
};
