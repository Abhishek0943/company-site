/** @type {import('next').NextConfig} */
const nextConfig = {
  // This will tell Next.js to export the site as static HTML
  output: 'export',

  // Optional: To ensure Netlify handles routing correctly with static files
  // in case you have dynamic routes, you can use redirects.
  redirects: async () => [
    {
      source: '/old-route',
      destination: '/new-route',
      permanent: true,
    },
  ],
};

export default nextConfig;