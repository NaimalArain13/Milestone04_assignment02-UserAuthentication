/** @type {import('next').NextConfig} */
const nextConfig = {
   env: {
          NEXTAUTH_URL:
            process.env.NODE_ENV === 'production'
              ? 'https://your-production-domain.com'
              : 'http://localhost:3000',
        },
      
};

export default nextConfig;
