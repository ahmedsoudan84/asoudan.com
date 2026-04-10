/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  eslint: { ignoreDuringBuilds: true },
  images: { domains: ['images.unsplash.com'] },
}
module.exports = nextConfig