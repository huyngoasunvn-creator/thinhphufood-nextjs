/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'w.ladicdn.com' },

      // ✅ THÊM DÒNG NÀY
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
    ],
  },

  async redirects() {
    return [
      {
        source: "/products",
        destination: "/san-pham",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;