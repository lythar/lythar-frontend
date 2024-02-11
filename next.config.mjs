import pwa from "next-pwa";
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
};

const withPWA = pwa({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

export default withPWA(nextConfig);
