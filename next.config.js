/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    images: {
      domains: ['aceternity.com', 'images.unsplash.com', 'plus.unsplash.com', 'img.daisyui.com'],
    },
  };
  
  module.exports = nextConfig;
  