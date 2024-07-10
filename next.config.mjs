/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jkuhktbimkshohrktrhc.supabase.co'
      }
    ]
  }
};

export default nextConfig;
