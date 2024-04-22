import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.toLowerCase().startsWith("/login") ||
      req.nextUrl.pathname.toLowerCase().startsWith("/register");

    if (isAuthPage) {
      if (isAuth)
        return NextResponse.redirect(new URL("/", req.url));
    } else {
      if (!isAuth) {
        let from = req.nextUrl.pathname;
        if (req.nextUrl.search)
          from += req.nextUrl.search;

        return NextResponse.redirect(
          new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
        );
      }
    }

    if (req.nextUrl.pathname !== req.nextUrl.pathname.toLowerCase())
      return NextResponse.redirect(new URL(req.nextUrl.pathname.toLowerCase(), req.url));

    return NextResponse.next();

  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: "/((?!images|verifyMail).*)",
};
