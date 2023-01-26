/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'files.stripe.com'
    ]
  },

  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
