// app/middleware.ts (UPDATED - STRICT SESSION VALIDATION)
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Check if accessing protected route
    if (pathname.startsWith("/dashboard")) {
      // If no token, redirect to signin
      if (!token) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }

      // Check if token is expired (optional but recommended)
      if (token.exp) {
        const now = Math.floor(Date.now() / 1000);
        if (now > token.exp) {
          // Token expired, redirect to signin
          return NextResponse.redirect(new URL("/auth/signin", req.url));
        }
      }
    }

    // If accessing signin/signup while authenticated, redirect to dashboard
    if ((pathname === "/auth/signin" || pathname === "/auth/signup") && token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        const isProtectedRoute = pathname.startsWith("/dashboard");

        if (isProtectedRoute && !token) {
          return false;
        }

        return true;
      },
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/auth/signin", "/auth/signup"],
};