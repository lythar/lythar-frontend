import { exampleUsers } from "@/example_data";
import { getJwtSecret } from "@/lib/auth";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { username, password } = await req.json();

    if (!username || !password) {
        return NextResponse.json({ error: "Username and password required" }, {
            status: 400
        });
    }

    const user = exampleUsers.find((user) => user.username === username);

    if (!user || user.password !== password) {
        return NextResponse.json({ error: "Invalid username or password" }, {
            status: 401
        });
    }

    const token = await new SignJWT({ id: user.id })
        .setProtectedHeader({ alg: 'HS256' })
        .setJti(nanoid())
        .setExpirationTime('1d')
        .sign(new TextEncoder().encode(getJwtSecret()));

    return NextResponse.json({ success: true }, {
        headers: {
            'Set-Cookie': `auth-token=${token}; Path=/; HttpOnly`
        }
    });
}

export async function GET() {
    return NextResponse.json({ success: true });
}