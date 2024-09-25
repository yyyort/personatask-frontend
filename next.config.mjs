/** @type {import('next').NextConfig} */
const nextConfig = {
    // proxy api requests to the backend
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                //destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
                destination: 'http://localhost:4000/api/:path*' // Proxy to Backend
            },
        ];
    },
};

export default nextConfig;
