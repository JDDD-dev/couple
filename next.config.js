/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.googleusercontent.com'
        }
      ]
    }
  }
}

module.exports = nextConfig
