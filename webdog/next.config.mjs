/** @type {import('next').NextConfig} */
const nextConfig = {
  // Old Wix URLs → new routes, so existing links and Google rankings carry over.
  async redirects() {
    return [
      { source: '/resources', destination: '/case-studies', permanent: true },
      { source: '/post/stannp', destination: '/case-studies/stannp', permanent: true },
      {
        source: '/post/how-we-helped-pass-the-keys-build-a-direct-booking-engine-that-saved-500k-in-commission',
        destination: '/case-studies/pass-the-keys',
        permanent: true,
      },
      {
        source: '/post/how-we-helped-applaud-grow-their-organic-presence-in-the-us-market',
        destination: '/case-studies/applaud',
        permanent: true,
      },
      { source: '/news', destination: '/insights', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/pricing-plans/:path*', destination: '/pricing', permanent: true },
    ];
  },
};
export default nextConfig;
