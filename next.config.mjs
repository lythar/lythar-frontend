import pwa from "@ducanh2912/next-pwa";
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
};

const withPWA = pwa({
  dest: "public",
});

export default withPWA(nextConfig);
