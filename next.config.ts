import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {},
  images: {
    domains: ['firebasestorage.googleapis.com']
  }
}

export default nextConfig
