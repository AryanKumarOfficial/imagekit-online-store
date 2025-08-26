import {withAuth} from "next-auth/middleware";
import {NextResponse} from "next/server";

export default withAuth(
    function middleware() {
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
                    pathname === "/"
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
