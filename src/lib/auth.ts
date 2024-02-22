"use server";
import { importSPKI, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export type AuthJwtPayload = {
  id: string;
  jti: string;
  iat?: number;
  exp: number;
};

export const getJwtPublicKey = () => {
  const secret = process.env.JWT_PUBLIC_KEY;
  if (!secret) throw new Error("Missing JWT_SECRET environment variable");
  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const publicKey = await importSPKI(getJwtPublicKey(), "RS256");
    const verified = await jwtVerify(token, publicKey);
    return verified.payload as AuthJwtPayload;
  } catch (e) {
    console.error(e);
    throw new Error("Invalid token");
  }
};

export const logout = async () => {
  cookies().delete("token");

  NextResponse.redirect("/");
};
