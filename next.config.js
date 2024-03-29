/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // eslint-disable-next-line
  webpack(config, options) {
    config.module.rules.push({
      loader: '@svgr/webpack',
      issuer: /\.[jt]sx?$/,
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [{
            name: 'preset-default',
            params: {
              override: {
                removeViewBox: false
              }
            }
          }]
        },
        titleProp: true,
      },
      test: /\.svg$/,
    });

    return config;
  }
};
// eslint-disable-next-line
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  // eslint-disable-next-line
  enabled: process.env.ANALYZE === 'true',
});
// eslint-disable-next-line
module.exports = withBundleAnalyzer(nextConfig);
