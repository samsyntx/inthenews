/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, 
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", 
      },
      {
        protocol: "http",
        hostname: "**", 
      },
    ],
  },
  typescript: {
    c: true,
  },
};

module.exports = nextConfig; 
