/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: '/hr-management', // 👈 important for GitHub Pages
  assetPrefix: '/hr-management',
  output: 'export' // 👈 REQUIRED to generate static site
};

module.exports = nextConfig;
