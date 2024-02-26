import pwa from "@ducanh2912/next-pwa";
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5505",
        pathname: "/api/uploaded/**",
      },
    ],
  },
};

const withPWA = pwa({
  dest: "public",
});

export default withPWA(nextConfig);
