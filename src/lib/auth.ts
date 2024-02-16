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

export const getJwtPublicKey = () => {
    const secret = process.env.JWT_PUBLIC_KEY;
    if (!secret)
        return "Vl9FQjUtVtz0snTM2RN1apJtQkfa/yIbyU2+HBsRzSM="
        // throw new Error('Missing JWT_SECRET environment variable');
    return secret;
}

export const verifyAuth = async (token: string) => {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJwtPublicKey()));
        return verified.payload as AuthJwtPayload;
    } catch(e) {
        throw new Error('Invalid token');
    }
}

export const logout = async () => {
    cookies().delete('auth-token');

    NextResponse.redirect('/');
}