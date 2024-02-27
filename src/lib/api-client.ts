"use client";
import createClient, { Middleware } from "openapi-fetch";
import type { paths } from "@api";
import { getApiUrl } from "./utils";

const middleware: Middleware = {
  async onRequest(req) {
    req.headers.set("Authorization", localStorage.getItem("token") || "");
    return req;
  },
};

const client = createClient<paths>({
  baseUrl: getApiUrl(),
});

client.use(middleware);

const publicClient = createClient<paths>({
  baseUrl: getApiUrl(),
});

export { publicClient };
export default client;
