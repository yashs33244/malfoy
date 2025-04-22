/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // Optimizes for Docker deployments
  experimental: {
    // Enables the standalone output
    outputStandalone: true,
  },
};

module.exports = nextConfig; 