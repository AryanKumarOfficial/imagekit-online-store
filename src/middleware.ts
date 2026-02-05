import {NextRequestWithAuth, withAuth} from "next-auth/middleware";
import {NextResponse} from "next/server";

export default withAuth(
    function middleware(req: NextRequestWithAuth) {
        const {token} = req.nextauth;
        const {pathname} = req.nextUrl;
        const isLoggedIn = !!token;
        if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
            const referer = req.headers.get("referer");
            const homeUrl = new URL("/", req.nextUrl.origin)

            if (referer && new URL(referer).origin === new URL(req.url).origin) {
                return NextResponse.redirect(new URL(referer));
            }
            return NextResponse.redirect(homeUrl);
        }
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({token, req}) => {
                const {pathname} = req.nextUrl;

                // allow webhook endpoints
                if (pathname.startsWith("/api/webhook")) {
                    return true;
                }

                // allow auth related paths
                if (
                    pathname.startsWith("/api/auth") ||
                    pathname === "/login" ||
                    pathname === "/register"
                ) {
                    return true;
                }

                // public paths
                if (
                    pathname.startsWith("/api/products") ||
                    pathname.startsWith("/products") ||
                    pathname === "/" ||
                    pathname === "/about" ||
                    pathname === "/contact" ||
                    pathname === "/privacy" ||
                    pathname === "/terms" ||
                    pathname === "/refund-policy"
                ) {
                    return true;
                }

                // admin paths require admin role
                if (pathname.startsWith("/admin")) {
                    return token?.role === "admin";
                }


                // all other paths require authentication
                return !!token;
            },
        },
    }
);

export const config = {
    matcher: [
        /*
         * match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!_next/static|_next/image|favicon.ico|public).*)",
    ],
};
