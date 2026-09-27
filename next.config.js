/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'loxon.com.ph' },
      { protocol: 'https', hostname: 'www.loxon.com.ph' },
    ],
  },
}

module.exports = nextConfig
