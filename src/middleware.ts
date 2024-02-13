"use server";
import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get('auth-token')?.value;

    if(pathname === "/logout") {
        return NextResponse.redirect(new URL("/", req.url), { status: 302, headers: {
            "Set-Cookie": "auth-token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure;"
        } });
    }


    const verifiedToken = token ? await verifyAuth(token).catch(console.log) : false;

    const privatePaths = [/^\/app/];
    const isPrivate = privatePaths.some((path) => path.test(pathname));
    if(isPrivate && !verifiedToken) {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url, { status: 302 })
    }

    if(verifiedToken && pathname === '/') {
        return NextResponse.redirect(new URL("/app", req.url), { status: 302 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
    matches: ['/app', '/']
}