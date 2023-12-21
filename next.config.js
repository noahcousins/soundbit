/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: true
  }
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ['i.scdn.co', 'wiigbntntwayaoxtkrjv.supabase.co']
  }
};
