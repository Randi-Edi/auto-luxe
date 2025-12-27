/** @type {import('next').NextConfig} */
const nextConfig = {
  // Using SSR (Server-Side Rendering)
  // Pages will be rendered on the server for each request
  // This allows for dynamic content from Sanity CMS with real-time updates
  trailingSlash: true,
  reactStrictMode: true,
  transpilePackages: ['next-sanity'],
  compiler: {
    styledComponents: true,
  },
  images: {
    // Enable Next.js Image Optimization for better performance
    // Images will be optimized on-demand during SSR
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

module.exports = nextConfig



