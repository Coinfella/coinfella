/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
};

module.exports = nextConfig;
