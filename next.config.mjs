/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/valentine-web',
  assetPrefix: '/valentine-web',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
