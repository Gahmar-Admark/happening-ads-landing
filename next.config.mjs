/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  webpack(config) {
    // Find the existing rule that handles SVG files (usually handled by Next.js for images)
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    // Add rules for SVG handling
    config.module.rules.push(
      // Keep the default file-loader behavior for SVGs imported with ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Process SVGs with SVGR for React component imports
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/, // Apply to JS/TS/JSX/TSX files
        resourceQuery: { not: [/url/] }, // Exclude *.svg?url
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              prettier: false,
              svgo: false,
              // svgoConfig: {
              //   plugins: [
              //     {
              //       name: 'preset-default',
              //       params: {
              //         overrides: {
              //           cleanupIDs: false, // Preserve id attributes
              //           collapseGroups: false, // Preserve <g> tags
              //           prefixIds: false,
              //           removeViewBox: false,
              //         },
              //       },
              //     },
              //     // Fixed: Proper plugin object structure
                 
              //   ],
              // },
              // titleProp: true, // Allow adding title prop to SVG components
            },
          },
        ],
      }
    );

    // Exclude SVGs from the default file-loader rule to avoid conflicts
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  images: {
    unoptimized: true, // Required for output: 'export' to disable image optimization
  },
  compiler: {
    styledComponents: true, // Enables JSX namespaces for styled-components
  },
};

export default nextConfig;