'use server';
import { jwtVerify } from "jose";
import { cookies} from "next/headers";
import { NextResponse } from "next/server";

export type AuthJwtPayload = {
    id: string;
    jti: string;
    iat?: number;
    exp: number;
};

export const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error('Missing JWT_SECRET environment variable');
    return secret;
}

export const verifyAuth = async (token: string) => {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecret()));
        return verified.payload as AuthJwtPayload;
    } catch(e) {
        throw new Error('Invalid token');
    }
}

export const logout = async () => {
    cookies().delete('auth-token');

    NextResponse.redirect('/');
}