/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Optimizes for Docker deployments
};

module.exports = nextConfig; 