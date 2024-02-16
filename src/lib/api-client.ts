"use client";
import createClient from "openapi-fetch";
import type { paths } from "@api";

const client = createClient<paths>({ baseUrl: process.env.NEXT_PUBLIC_API_URL });

export default client;