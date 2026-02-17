import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  // Rozszerzenia stron wspierające MDX
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  
  // Nowa nazwa stabilna w 2026
  serverExternalPackages: ['pg'],
  
  // Włączenie Cache Components (następca PPR)
  cacheComponents: true,

  experimental: {
    mdxRs: true, // Szybki kompilator Rust dla MDX
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
}

const withMDX = createMDX({
  // Opcjonalne pluginy remark/rehype
})

export default withMDX(nextConfig)
