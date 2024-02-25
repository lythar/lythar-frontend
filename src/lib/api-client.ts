"use client";
import createClient, { Middleware } from "openapi-fetch";
import type { paths } from "@api";
import { $TODO } from "@/types/globals";

const middleware: Middleware = {
  async onRequest(req) {
    req.headers.set("Authorization", localStorage.getItem("token") || "");
    return req;
  },
};

const client = createClient<paths>({
  baseUrl: `http://${process.env.NEXT_PUBLIC_API_URL}`,
});

client.use(middleware);

const formClient = createClient<paths>({
  baseUrl: `http://${process.env.NEXT_PUBLIC_API_URL}`,
  bodySerializer: (body: $TODO) => {
    const formData = new FormData();
    for (const key in body) {
      formData.append(key, body[key]);
    }
    return formData;
  },
});

const publicClient = createClient<paths>({
  baseUrl: `http://${process.env.NEXT_PUBLIC_API_URL}`,
});

export { publicClient, formClient };
export default client;
