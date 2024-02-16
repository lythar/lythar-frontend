"use client";
import createClient, { Middleware } from "openapi-fetch";
import type { paths } from "@api";

const middleware: Middleware = {
  async onRequest(req, options) {
    req.headers.set("Authorization", localStorage.getItem("token") || "");
    return req;
  },
}

const client = createClient<paths>({ baseUrl: process.env.NEXT_PUBLIC_API_URL });

client.use(middleware);

export default client;