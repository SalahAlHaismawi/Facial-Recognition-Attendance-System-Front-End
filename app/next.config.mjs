/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com'],
    },

    // Ignore build errors
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
