/** @type {import('next').NextConfig} */
const nextConfig = {
    headers: async () => {
        return [
            {
                source: '/firebase-messaging-sw.js',
                headers: [
                    {
                        key: 'Service-Worker-Allowed',
                        value: '/',
                    },
                ],
            },
        ]
    }
};

export default nextConfig;
