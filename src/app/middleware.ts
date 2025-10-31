// app/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Protected routes
    if (pathname.startsWith("/dashboard")) {
      // Redirect if not logged in
      if (!token) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }

      // Token expiry check
      const exp = typeof token.exp === "number" ? token.exp : undefined;
      if (exp) {
        const now = Math.floor(Date.now() / 1000);
        if (now > exp) {
          return NextResponse.redirect(new URL("/auth/signin", req.url));
        }
      }
    }

    // Redirect logged-in users away from signin/signup
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
