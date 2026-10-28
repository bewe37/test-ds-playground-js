/** @type {import('next').NextConfig} */
const nextConfig = {
  // No cacheComponents (or partialPrefetching, which needs it): antd's style registry seeds its
  // cache with Math.random() while rendering, which Cache Components refuses to prerender. The
  // fix it suggests, <Suspense> around the registry, would make every page fully dynamic.
};

export default nextConfig;
